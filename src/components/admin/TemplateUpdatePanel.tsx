import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  RefreshCw, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  GitBranch,
  Clock,
  Zap
} from 'lucide-react';
import { TemplateUpdateManager, UpdateStatus, TemplateVersion } from '@/lib/templateUpdateManager';
import { useToast } from '@/hooks/use-toast';

interface UpdatePanelProps {
  templateId: string;
  currentVersion: string;
  apiKey: string;
}

export const TemplateUpdatePanel: React.FC<UpdatePanelProps> = ({
  templateId,
  currentVersion,
  apiKey
}) => {
  const { toast } = useToast();
  const [updateManager] = useState(() => new TemplateUpdateManager(
    'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1/template-update-server'
  ));
  
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [preserveCustomizations, setPreserveCustomizations] = useState(true);
  const [autoDeployAfterUpdate, setAutoDeployAfterUpdate] = useState(false);

  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    setIsChecking(true);
    try {
      const status = await updateManager.checkForUpdates(currentVersion, templateId);
      setUpdateStatus(status);
      
      if (status.securityUpdatesAvailable) {
        toast({
          title: "🛡️ Security Updates Available",
          description: "Important security updates are available for your template",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Update Check Failed",
        description: "Could not check for updates. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  const performUpdate = async (targetVersion: string) => {
    setIsUpdating(true);
    
    try {
      const result = await updateManager.performUpdate(
        templateId,
        targetVersion,
        preserveCustomizations,
        autoDeployAfterUpdate
      );

      if (result.success) {
        toast({
          title: "🔥 Update Successful!",
          description: `Template updated to v${targetVersion}. ${result.updatedFiles.length} files updated.`,
        });

        if (result.deploymentUrl) {
          toast({
            title: "🚀 Auto-Deployment Complete",
            description: `Your updated template is live at: ${result.deploymentUrl}`,
          });
        }

        // Refresh update status
        await checkForUpdates();
      } else {
        toast({
          title: "Update Issues Detected",
          description: `${result.conflicts.length} conflicts need manual review`,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getVersionBadgeVariant = (type: string) => {
    switch (type) {
      case 'major': return 'destructive';
      case 'minor': return 'default';
      case 'patch': return 'secondary';
      case 'hotfix': return 'outline';
      default: return 'secondary';
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="h-4 w-4 text-red-600" />;
      case 'feature': return <Zap className="h-4 w-4 text-blue-600" />;
      case 'bugfix': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <RefreshCw className="h-4 w-4 text-gray-600" />;
    }
  };

  if (!updateStatus) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Template Updates
          </CardTitle>
          <CardDescription>Check for template updates and improvements</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={checkForUpdates} disabled={isChecking}>
            {isChecking ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Checking for Updates...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Check for Updates
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Template Version Management
          </CardTitle>
          <CardDescription>
            Current version: v{updateStatus.currentVersion} | Latest: v{updateStatus.latestVersion}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Last checked: {new Date(updateStatus.lastChecked).toLocaleString()}
              </span>
            </div>
            <Button variant="outline" onClick={checkForUpdates} disabled={isChecking}>
              {isChecking ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>

          {updateStatus.updateAvailable ? (
            <Alert>
              <Download className="h-4 w-4" />
              <AlertDescription>
                {updateStatus.availableUpdates.length} update(s) available for your template
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your template is up to date
              </AlertDescription>
            </Alert>
          )}

          {updateStatus.securityUpdatesAvailable && (
            <Alert variant="destructive">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Security updates available - Update recommended immediately
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {updateStatus.availableUpdates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Available Updates</CardTitle>
            <CardDescription>
              Choose which version to update to
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {updateStatus.availableUpdates.map((version: TemplateVersion) => (
              <div key={version.version} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={getVersionBadgeVariant(version.type)}>
                      v{version.version}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(version.releaseDate).toLocaleDateString()}
                    </span>
                    {version.breaking && (
                      <Badge variant="destructive">Breaking Changes</Badge>
                    )}
                  </div>
                  <Button 
                    onClick={() => performUpdate(version.version)}
                    disabled={isUpdating}
                    size="sm"
                  >
                    {isUpdating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Update
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-sm">{version.description}</p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Changes:</h4>
                  {version.changes.map((change, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      {getChangeIcon(change.type)}
                      <div className="flex-1">
                        <span className="font-medium">{change.type}:</span> {change.description}
                        {change.requiresManualReview && (
                          <Badge variant="outline" className="ml-2">Manual Review Required</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {version.migration && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Migration Required:</strong> {version.migration}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Update Settings</CardTitle>
          <CardDescription>
            Configure how updates are applied to your template
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="preserve-customizations">Preserve Customizations</Label>
              <p className="text-sm text-muted-foreground">
                Keep your brand colors, content, and styling during updates
              </p>
            </div>
            <Switch
              id="preserve-customizations"
              checked={preserveCustomizations}
              onCheckedChange={setPreserveCustomizations}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-deploy">Auto-Deploy After Update</Label>
              <p className="text-sm text-muted-foreground">
                Automatically deploy to production after successful update
              </p>
            </div>
            <Switch
              id="auto-deploy"
              checked={autoDeployAfterUpdate}
              onCheckedChange={setAutoDeployAfterUpdate}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};