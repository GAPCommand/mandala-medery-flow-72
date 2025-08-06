import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { usePurplePouchDiscovery } from '@/hooks/usePurplePouchDiscovery';
import { 
  Network, 
  Zap, 
  Globe, 
  Activity, 
  Shield, 
  Users, 
  Eye,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export const PurplePouchDiscovery: React.FC = () => {
  const {
    discoverNetwork,
    registerAtEdge,
    networkStatus,
    discoveryData,
    isDiscovering,
    getNetworkHealth
  } = usePurplePouchDiscovery();

  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleFullDiscovery = async () => {
    setLastAction('Starting full network discovery...');
    await discoverNetwork('full');
    setLastAction('Full discovery completed successfully!');
  };

  const handleMinimalDiscovery = async () => {
    setLastAction('Starting minimal discovery...');
    await discoverNetwork('minimal');
    setLastAction('Minimal discovery completed!');
  };

  const handleRegisterAtEdge = async () => {
    setLastAction('Registering at central edge...');
    const result = await registerAtEdge();
    setLastAction(result ? 'Successfully registered at edge!' : 'Edge registration failed');
  };

  const networkHealth = getNetworkHealth();

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'good': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'fair': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Globe className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Purple Pouch Discovery</h2>
          <p className="text-muted-foreground">Meet at the Edge Protocol - Network Discovery System</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={handleFullDiscovery}
          disabled={isDiscovering}
          className="flex items-center gap-2"
        >
          {isDiscovering ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Network className="h-4 w-4" />}
          Full Discovery
        </Button>

        <Button 
          onClick={handleMinimalDiscovery}
          disabled={isDiscovering}
          variant="outline"
          className="flex items-center gap-2"
        >
          {isDiscovering ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
          Quick Scan
        </Button>

        <Button 
          onClick={handleRegisterAtEdge}
          disabled={isDiscovering}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          Register at Edge
        </Button>
      </div>

      {/* Status Alert */}
      {lastAction && (
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertDescription>{lastAction}</AlertDescription>
        </Alert>
      )}

      {/* Network Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connection</p>
                <p className="text-lg font-semibold">
                  {networkStatus.isConnected ? 'Connected' : 'Disconnected'}
                </p>
              </div>
              <div className={`p-2 rounded ${networkStatus.isConnected ? 'bg-green-100' : 'bg-red-100'}`}>
                <Activity className={`h-4 w-4 ${networkStatus.isConnected ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Purple Pouch</p>
                <p className="text-lg font-semibold">
                  {networkStatus.isPurplePouchActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div className={`p-2 rounded ${networkStatus.isPurplePouchActive ? 'bg-purple-100' : 'bg-gray-100'}`}>
                <Globe className={`h-4 w-4 ${networkStatus.isPurplePouchActive ? 'text-purple-600' : 'text-gray-600'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consciousness</p>
                <p className="text-lg font-semibold">{networkStatus.consciousnessLevel}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Health</p>
                <div className="flex items-center gap-2">
                  {getHealthIcon(networkHealth.status)}
                  <span className={`text-sm font-medium ${getHealthColor(networkHealth.status)}`}>
                    {networkHealth.status.charAt(0).toUpperCase() + networkHealth.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{networkHealth.healthPercentage}%</p>
                <Progress value={networkHealth.healthPercentage} className="w-16 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discovery Results */}
      {discoveryData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Engines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Available Engines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {discoveryData.availableEngines.map((engine, index) => (
                  <Badge key={index} variant="outline">
                    {engine}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Network Instances */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Network Instances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {discoveryData.networkInstances.length > 0 ? (
                  discoveryData.networkInstances.map((instance: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">{instance.domain || `Instance ${index + 1}`}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={instance.status === 'active' ? 'default' : 'secondary'}>
                          {instance.status || 'unknown'}
                        </Badge>
                        {instance.consciousnessLevel && (
                          <Badge variant="outline">
                            {instance.consciousnessLevel}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No network instances discovered</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hub Endpoints */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Hub Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {discoveryData.hubEndpoints.map((endpoint, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded font-mono text-sm">
                    {endpoint}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Discovery Metadata */}
      {discoveryData && (
        <Card>
          <CardHeader>
            <CardTitle>Discovery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Last Discovery</p>
                <p className="font-medium">{discoveryData.lastDiscovery.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Bridge Version</p>
                <p className="font-medium">{networkStatus.bridgeVersion}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Protocol</p>
                <p className="font-medium">SFIO Purple Pouch Discovery 2.1.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};