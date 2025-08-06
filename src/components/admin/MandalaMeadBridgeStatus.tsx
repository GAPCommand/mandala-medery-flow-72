import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Wifi, 
  Database, 
  Brain, 
  Shield, 
  RefreshCw, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';
import { mandalaMeadBridge, BridgeOperationResult } from '@/services/bridge/MandalaMeadBridgeManager';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface BridgeStatusData {
  initialized: boolean;
  configuration: any;
  authentication: any;
  health: any;
  networkInfo: any;
}

export function MandalaMeadBridgeStatus() {
  const { user } = useAuth();
  const [bridgeData, setBridgeData] = useState<BridgeStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBridgeStatus = async () => {
    if (!user) return;
    
    try {
      const result = await mandalaMeadBridge.getBridgeStatus(user.id);
      if (result.success) {
        setBridgeData(result.data);
      } else {
        toast.error('Failed to load bridge status');
      }
    } catch (error) {
      console.error('🔥 Bridge status error:', error);
      toast.error('Bridge status check failed');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleInitializeBridge = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const result = await mandalaMeadBridge.initializeBridge(user.id);
      if (result.success) {
        toast.success('Bridge initialized successfully');
        await loadBridgeStatus();
      } else {
        toast.error(`Bridge initialization failed: ${result.message}`);
      }
    } catch (error) {
      toast.error('Bridge initialization error');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncConsciousness = async () => {
    if (!user) return;
    
    setRefreshing(true);
    try {
      const result = await mandalaMeadBridge.syncConsciousness(user.id);
      if (result.success) {
        toast.success('Consciousness synchronized');
        await loadBridgeStatus();
      } else {
        toast.error(`Sync failed: ${result.message}`);
      }
    } catch (error) {
      toast.error('Consciousness sync error');
    } finally {
      setRefreshing(false);
    }
  };

  const handleDiscoverNetwork = async () => {
    setRefreshing(true);
    try {
      const result = await mandalaMeadBridge.discoverNetwork('full');
      if (result.success) {
        toast.success(`Network discovery complete - ${result.data.networkInstances.length} instances found`);
        await loadBridgeStatus();
      } else {
        toast.error(`Discovery failed: ${result.message}`);
      }
    } catch (error) {
      toast.error('Network discovery error');
    } finally {
      setRefreshing(false);
    }
  };

  const refreshStatus = async () => {
    setRefreshing(true);
    await loadBridgeStatus();
  };

  useEffect(() => {
    loadBridgeStatus();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'unhealthy':
        return 'bg-red-500';
      default:
        return 'bg-muted';
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            MandalaMead SFIO Bridge Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading bridge status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!bridgeData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            MandalaMead SFIO Bridge Status
          </CardTitle>
          <CardDescription>
            Bridge not initialized. Click below to connect to the Sacred Fire Network.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleInitializeBridge} className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            Initialize SFIO Bridge
          </Button>
        </CardContent>
      </Card>
    );
  }

  const healthData = bridgeData.health;
  const config = bridgeData.configuration;

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                MandalaMead SFIO Bridge
              </CardTitle>
              <CardDescription>
                Sacred Fire Integration Orchestrator Network Bridge
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshStatus}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Network Connection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  <span className="font-medium">Network Connection</span>
                </div>
                <Badge variant={bridgeData.networkInfo.connected ? "default" : "destructive"}>
                  {bridgeData.networkInfo.connected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
              {bridgeData.networkInfo.connected && (
                <p className="text-sm text-muted-foreground">
                  Connected to: {bridgeData.networkInfo.domain}
                </p>
              )}
            </div>

            {/* Authentication Status */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Authentication</span>
                </div>
                <Badge variant={bridgeData.authentication.authenticated ? "default" : "destructive"}>
                  {bridgeData.authentication.authenticated ? 'Authenticated' : 'Not Authenticated'}
                </Badge>
              </div>
              {bridgeData.authentication.lastAuth && (
                <p className="text-sm text-muted-foreground">
                  Last auth: {new Date(bridgeData.authentication.lastAuth).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Consciousness Level */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="font-medium">Consciousness Level</span>
              </div>
              <Badge variant="secondary">
                Level {config.consciousnessLevel}
              </Badge>
            </div>
            <Progress value={(config.consciousnessLevel / 1000) * 100} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Sacred Fire Protection: {config.sacredFireProtection ? 'Active' : 'Inactive'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Health Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(healthData.overall.status)}
                <span className="font-medium">Overall</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(healthData.overall.status)}`} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {healthData.overall.details}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {healthData.overall.responseTime}ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(healthData.bridgeConnection.status)}
                <span className="font-medium">Bridge</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(healthData.bridgeConnection.status)}`} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {healthData.bridgeConnection.details}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="font-medium">Discovery</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(healthData.networkDiscovery.status)}`} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {healthData.networkDiscovery.details}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bridge Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bridge Operations</CardTitle>
          <CardDescription>
            Manage your MandalaMead SFIO Network bridge connection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleSyncConsciousness} 
              disabled={refreshing}
              variant="outline"
            >
              <Brain className="h-4 w-4 mr-2" />
              Sync Consciousness
            </Button>
            <Button 
              onClick={handleDiscoverNetwork} 
              disabled={refreshing}
              variant="outline"
            >
              <Activity className="h-4 w-4 mr-2" />
              Discover Network
            </Button>
            <Button 
              onClick={() => toast.info('Bridge configuration coming soon!')} 
              variant="outline"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure Bridge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}