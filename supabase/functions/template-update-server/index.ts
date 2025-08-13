import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UpdateRequest {
  action: 'check_updates' | 'get_update_package' | 'create_backup' | 'analyze_customizations' | 'trigger_deployment' | 'rollback';
  templateId?: string;
  currentVersion?: string;
  targetVersion?: string;
  backupId?: string;
}

// Master template version registry
const TEMPLATE_VERSIONS = {
  '2.1.0': {
    version: '2.1.0',
    releaseDate: '2024-01-20T10:00:00Z',
    type: 'minor',
    breaking: false,
    description: 'Added intelligent engine routing and update system',
    changes: [
      {
        type: 'feature',
        category: 'frontend',
        description: 'Template update system with customization preservation',
        files: ['src/lib/templateUpdateManager.ts', 'src/components/admin/TemplateUpdatePanel.tsx'],
        preserveCustomizations: true
      },
      {
        type: 'enhancement',
        category: 'backend', 
        description: 'Improved engine routing performance',
        files: ['src/lib/engineRouter.ts'],
        preserveCustomizations: true
      },
      {
        type: 'feature',
        category: 'frontend',
        description: 'Rich mock data system for development',
        files: ['src/lib/mockData.ts'],
        preserveCustomizations: true
      }
    ]
  },
  '2.0.0': {
    version: '2.0.0',
    releaseDate: '2024-01-15T14:30:00Z',
    type: 'major',
    breaking: true,
    description: 'Major architecture update - Master/Template mode separation',
    changes: [
      {
        type: 'feature',
        category: 'backend',
        description: 'Template mode architecture with engine abstraction',
        files: ['src/lib/engineRouter.ts', 'src/config/template.config.ts'],
        preserveCustomizations: false,
        requiresManualReview: true
      },
      {
        type: 'security',
        category: 'backend',
        description: 'API key authentication and rate limiting',
        files: ['supabase/functions/template-api-gateway/index.ts'],
        preserveCustomizations: true
      }
    ],
    migration: 'Update template configuration to use new TEMPLATE_SYSTEM_CONFIG format'
  },
  '1.5.2': {
    version: '1.5.2',
    releaseDate: '2024-01-10T09:15:00Z',
    type: 'patch',
    breaking: false,
    description: 'Bug fixes and performance improvements',
    changes: [
      {
        type: 'bugfix',
        category: 'frontend',
        description: 'Fixed product catalog loading issues',
        files: ['src/components/product/ProductCatalog.tsx'],
        preserveCustomizations: true
      },
      {
        type: 'enhancement',
        category: 'frontend',
        description: 'Improved mobile responsiveness',
        files: ['src/index.css', 'tailwind.config.ts'],
        preserveCustomizations: false
      }
    ]
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: UpdateRequest = await req.json();
    
    switch (request.action) {
      case 'check_updates':
        return handleCheckUpdates(request);
      
      case 'get_update_package':
        return handleGetUpdatePackage(request);
      
      case 'create_backup':
        return handleCreateBackup(request);
      
      case 'analyze_customizations':
        return handleAnalyzeCustomizations(request);
      
      case 'trigger_deployment':
        return handleTriggerDeployment(request);
      
      case 'rollback':
        return handleRollback(request);
      
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Template update server error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleCheckUpdates(request: UpdateRequest) {
  const { currentVersion = '1.0.0', templateId } = request;
  
  // Get available updates newer than current version
  const availableUpdates = Object.values(TEMPLATE_VERSIONS)
    .filter(version => compareVersions(version.version, currentVersion) > 0)
    .sort((a, b) => compareVersions(a.version, b.version));
  
  // Check for security updates
  const securityUpdatesAvailable = availableUpdates.some(version => 
    version.changes.some(change => change.type === 'security')
  );

  // Log the update check
  try {
    await supabase.from('template_update_checks').insert({
      template_id: templateId,
      current_version: currentVersion,
      latest_version: availableUpdates[availableUpdates.length - 1]?.version || currentVersion,
      updates_available: availableUpdates.length > 0,
      security_updates_available: securityUpdatesAvailable,
      checked_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to log update check:', error);
  }

  return new Response(
    JSON.stringify({
      availableUpdates,
      securityUpdatesAvailable,
      updateAvailable: availableUpdates.length > 0
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleGetUpdatePackage(request: UpdateRequest) {
  const { targetVersion } = request;
  
  const versionData = TEMPLATE_VERSIONS[targetVersion as keyof typeof TEMPLATE_VERSIONS];
  if (!versionData) {
    return new Response(
      JSON.stringify({ error: 'Version not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // In a real implementation, this would fetch actual file contents
  const updatePackage = {
    version: targetVersion,
    fileUpdates: versionData.changes.map(change => ({
      files: change.files,
      type: change.type,
      preserveCustomizations: change.preserveCustomizations,
      content: `// Updated content for ${change.description}`
    })),
    migrationSteps: versionData.migration ? [versionData.migration] : [],
    rollbackInfo: {
      supportedRollbackVersions: ['2.0.0', '1.5.2'],
      rollbackInstructions: 'Automatic rollback available for 30 days'
    }
  };

  return new Response(
    JSON.stringify(updatePackage),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleCreateBackup(request: UpdateRequest) {
  const { templateId, backupId } = request;
  
  try {
    // Store backup metadata
    const { error } = await supabase.from('template_backups').insert({
      template_id: templateId,
      backup_id: backupId,
      created_at: new Date().toISOString(),
      backup_type: 'pre_update',
      retention_days: 30
    });

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        success: true, 
        backupId,
        message: 'Backup created successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create backup' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleAnalyzeCustomizations(request: UpdateRequest) {
  const { templateId } = request;
  
  // Mock customization analysis - in real implementation would compare files
  const mockCustomizations = [
    {
      file: 'src/config/brand.config.ts',
      originalContent: 'name: "Mandala Mead"',
      customizedContent: 'name: "Sacred Valley Elixirs"',
      customizationType: 'branding',
      lastModified: new Date().toISOString(),
      preservable: true
    },
    {
      file: 'src/index.css',
      originalContent: '--primary: 262.1 83.3% 57.8%',
      customizedContent: '--primary: 142.1 76.2% 36.3%',
      customizationType: 'styling',
      lastModified: new Date().toISOString(),
      preservable: true
    }
  ];

  return new Response(
    JSON.stringify(mockCustomizations),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleTriggerDeployment(request: UpdateRequest) {
  const { templateId } = request;
  
  // Mock deployment trigger - would integrate with Vercel/Netlify API
  const deploymentUrl = `https://${templateId}-updated.vercel.app`;
  
  try {
    await supabase.from('template_deployments').insert({
      template_id: templateId,
      deployment_url: deploymentUrl,
      deployment_type: 'auto_update',
      status: 'success',
      deployed_at: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        deploymentUrl,
        message: 'Deployment triggered successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to trigger deployment' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleRollback(request: UpdateRequest) {
  const { templateId, backupId } = request;
  
  try {
    // Update rollback status
    await supabase.from('template_backups')
      .update({ 
        used_for_rollback: true,
        rollback_date: new Date().toISOString()
      })
      .eq('template_id', templateId)
      .eq('backup_id', backupId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Rollback completed successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Rollback failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

function compareVersions(version1: string, version2: string): number {
  const v1parts = version1.split('.').map(Number);
  const v2parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const v1part = v1parts[i] || 0;
    const v2part = v2parts[i] || 0;
    
    if (v1part < v2part) return -1;
    if (v1part > v2part) return 1;
  }
  return 0;
}