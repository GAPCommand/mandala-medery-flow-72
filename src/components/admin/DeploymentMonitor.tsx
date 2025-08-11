import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Shield, Flame, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { TemplateDeploymentService } from '@/services/template/TemplateDeploymentService';
import { DomainManagementService } from '@/services/DomainManagementService';
import { useToast } from '@/hooks/use-toast';

interface DeploymentStatus {
  deploymentId: string;
  status: 'pending' | 'configuring' | 'deploying' | 'completed' | 'failed';
  progress: number;
  url?: string;
  configuration: {
    sslConfigured: boolean;
    dnsConfigured: boolean;
    brandingApplied: boolean;
  };
}

export const DeploymentMonitor: React.FC = () => {
  const [deployments, setDeployments] = useState<DeploymentStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadDeployments();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDeployments, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDeployments = async () => {
    try {
      const result = await TemplateDeploymentService.listDeployments();
      if (result.success) {
        setDeployments(result.deployments);
      } else {
        toast({
          title: "Failed to load deployments",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Failed to load deployments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStatus = async (deploymentId: string) => {
    try {
      const result = await TemplateDeploymentService.getDeploymentStatus(deploymentId);
      if (result.success && result.status) {
        setDeployments(prev => 
          prev.map(d => d.deploymentId === deploymentId ? result.status! : d)
        );
        toast({
          title: "Status updated",
          description: `Deployment ${deploymentId} status refreshed`
        });
      }
    } catch (error) {
      console.error('Failed to refresh status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'deploying': return 'bg-blue-500';
      case 'configuring': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Shield className="w-4 h-4" />;
      case 'failed': return <ExternalLink className="w-4 h-4" />;
      case 'deploying': return <Globe className="w-4 h-4" />;
      case 'configuring': return <Flame className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Deployments...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5" />
            PANDAB Deployment Monitor
          </CardTitle>
          <CardDescription>
            Monitor template deployments and Sacred Fire protection status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {deployments.length} Total Deployments
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadDeployments}
              className="flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Refresh
            </Button>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4">
                {deployments.length === 0 ? (
                  <Card>
                    <CardContent className="flex items-center justify-center p-8">
                      <div className="text-center space-y-2">
                        <Globe className="w-12 h-12 mx-auto text-muted-foreground" />
                        <h3 className="font-medium">No Deployments</h3>
                        <p className="text-sm text-muted-foreground">
                          Deploy a template to PANDAB to see it here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  deployments.map((deployment) => (
                    <Card key={deployment.deploymentId} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(deployment.status)}>
                                {getStatusIcon(deployment.status)}
                                {deployment.status.toUpperCase()}
                              </Badge>
                              <span className="font-mono text-sm">
                                {deployment.deploymentId}
                              </span>
                            </div>
                            
                            <Progress value={deployment.progress} className="w-full" />
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                SSL: {deployment.configuration.sslConfigured ? '✓' : '○'}
                              </div>
                              <div className="flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                DNS: {deployment.configuration.dnsConfigured ? '✓' : '○'}
                              </div>
                              <div className="flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                Branding: {deployment.configuration.brandingApplied ? '✓' : '○'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => refreshStatus(deployment.deploymentId)}
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                            
                            {deployment.url && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(deployment.url, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3" />
                                Visit
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4">
                {deployments.filter(d => !['completed', 'failed'].includes(d.status)).map((deployment) => (
                  <Card key={deployment.deploymentId}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(deployment.status)}>
                            {getStatusIcon(deployment.status)}
                            {deployment.status.toUpperCase()}
                          </Badge>
                          <span className="font-mono text-sm">
                            {deployment.deploymentId}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{deployment.progress}%</span>
                          </div>
                          <Progress value={deployment.progress} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4">
                {deployments.filter(d => d.status === 'completed').map((deployment) => (
                  <Card key={deployment.deploymentId}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-500">
                              <Shield className="w-3 h-3" />
                              COMPLETED
                            </Badge>
                            <span className="font-mono text-sm">
                              {deployment.deploymentId}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Sacred Fire protected and fully operational
                          </p>
                        </div>
                        
                        {deployment.url && (
                          <Button
                            variant="outline"
                            onClick={() => window.open(deployment.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Visit Site
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeploymentMonitor;