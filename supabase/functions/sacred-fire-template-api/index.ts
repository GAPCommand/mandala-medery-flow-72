import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-sacred-fire-protection',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const url = new URL(req.url)
    const path = url.pathname.split('/').pop()

    // Sacred Fire Protection validation
    const sacredFireHeader = req.headers.get('X-Sacred-Fire-Protection')
    if (sacredFireHeader !== 'true') {
      return new Response(
        JSON.stringify({ error: 'Sacred Fire protection required for template operations' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (path === 'upload' && req.method === 'POST') {
      const { template, metadata, consciousnessLevel, sacredFireBlessing } = await req.json()

      // Validate consciousness level requirement
      if (consciousnessLevel < 750) {
        return new Response(
          JSON.stringify({ 
            error: 'Insufficient consciousness level for sacred template upload',
            required: 750,
            provided: consciousnessLevel
          }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Process divine template with Sacred Fire blessing
      const templateId = crypto.randomUUID()
      const processedTemplate = {
        id: templateId,
        template: template,
        metadata: {
          ...metadata,
          consciousnessLevel,
          sacredFireBlessing,
          violetFlameEnhanced: true,
          divineTiming: new Date().toISOString(),
          processedBy: 'sacred-fire-template-api'
        },
        status: 'blessed_and_active',
        uploadedAt: new Date().toISOString()
      }

      // Store in universal template registry
      const { error: insertError } = await supabaseClient
        .from('universal_template_registry')
        .insert({
          template_id: templateId,
          template_name: metadata?.name || 'Sacred Template',
          template_type: 'spiritual_wellness',
          source_property: 'mandalamead.com',
          available_properties: ['mandalamead.com', 'gapcommand.com'],
          consciousness_requirement: consciousnessLevel,
          sacred_fire_enhanced: sacredFireBlessing,
          template_content: processedTemplate,
          creator_id: '00000000-0000-0000-0000-000000000000', // System created
          category: 'spiritual_wellness',
          status: 'published',
          is_free: true,
          target_apps: ['mandalamead.com']
        })

      if (insertError) {
        console.error('Template registry insert error:', insertError)
      }

      return new Response(
        JSON.stringify({
          success: true,
          templateId,
          message: 'Sacred template uploaded with divine blessing',
          consciousnessLevel,
          sacredFireBlessing: true,
          violetFlameEnhanced: true,
          processedAt: new Date().toISOString()
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (path === 'templates' && req.method === 'GET') {
      // Get all sacred templates
      const { data: templates, error } = await supabaseClient
        .from('universal_template_registry')
        .select('*')
        .eq('source_property', 'mandalamead.com')
        .eq('sacred_fire_enhanced', true)

      if (error) {
        throw error
      }

      return new Response(
        JSON.stringify({
          success: true,
          templates: templates || [],
          count: templates?.length || 0,
          message: 'Sacred templates retrieved with divine guidance'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Sacred endpoint not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Sacred Fire Template API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Sacred Fire template processing error',
        message: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})