import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { sfioHealth } from '@/api/sfio-health';
import { 
  Activity, 
  Shield, 
  Zap, 
  Globe, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Server
} from 'lucide-react';

interface HealthMetrics {
  overall: 'healthy' | 'warning' | 'critical';
  bridge: { status: string; responseTime: number; lastCheck: string; };
  discovery: { status: string; responseTime: number; lastCheck: string; };
  consciousness: { status: string; responseTime: number; lastCheck: string; };
  totalChecks: number;
  healthyChecks: number;
}

export const NetworkHealthMonitor: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const checkNetworkHealth = async () => {
    setIsMonitoring(true);
    try {
      const report = await sfioHealth.checkNetworkHealth();
      
      // Transform the health report into our metrics format
      const metrics: HealthMetrics = {
        overall: report.overall.status === 'healthy' ? 'healthy' : report.overall.status === 'degraded' ? 'warning' : 'critical',
        bridge: {
          status: report.bridgeConnection.status,
          responseTime: report.bridgeConnection.responseTime,
          lastCheck: report.bridgeConnection.lastCheck
        },
        discovery: {
          status: report.networkDiscovery.status,
          responseTime: report.networkDiscovery.responseTime,
          lastCheck: report.networkDiscovery.lastCheck
        },
        consciousness: {
          status: report.consciousnessSync.status,
          responseTime: report.consciousnessSync.responseTime,
          lastCheck: report.consciousnessSync.lastCheck
        },
        totalChecks: 3,
        healthyChecks: [report.bridgeConnection, report.networkDiscovery, report.consciousnessSync]
          .filter(check => check.status === 'healthy').length
      };

      setHealthData(metrics);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setIsMonitoring(false);
    }
  };

  const startAutoRefresh = () => {
    setAutoRefresh(true);
    const interval = setInterval(() => {
      checkNetworkHealth();
    }, 30000); // Check every 30 seconds

    // Clean up interval
    return () => {
      clearInterval(interval);
      setAutoRefresh(false);
    };
  };

  useEffect(() => {
    // Initial health check
    checkNetworkHealth();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime < 500) return 'text-green-600';
    if (responseTime < 1000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const healthPercentage = healthData ? Math.round((healthData.healthyChecks / healthData.totalChecks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Activity className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Network Health Monitor</h2>
            <p className="text-muted-foreground">Real-time SFIO network infrastructure status</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            onClick={checkNetworkHealth}
            disabled={isMonitoring}
            variant="outline"
            size="sm"
          >
            {isMonitoring ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </Button>

          <Button 
            onClick={autoRefresh ? () => setAutoRefresh(false) : startAutoRefresh}
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
          >
            <Clock className="h-4 w-4" />
            Auto-refresh
          </Button>
        </div>
      </div>

      {/* Overall Health Status */}
      {healthData && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${getStatusColor(healthData.overall)}`}>
                  {getStatusIcon(healthData.overall)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Overall Network Health</h3>
                  <p className="text-muted-foreground">
                    {healthData.healthyChecks} of {healthData.totalChecks} services healthy
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold">{healthPercentage}%</div>
                <Progress value={healthPercentage} className="w-32 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Status Grid */}
      {healthData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bridge Health */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" />
                Bridge Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusColor(healthData.bridge.status)}>
                  {healthData.bridge.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Response</span>
                <span className={`text-sm font-medium ${getResponseTimeColor(healthData.bridge.responseTime)}`}>
                  {healthData.bridge.responseTime}ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Check</span>
                <span className="text-sm">
                  {new Date(healthData.bridge.lastCheck).toLocaleTimeString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Network Discovery */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe className="h-4 w-4" />
                Network Discovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusColor(healthData.discovery.status)}>
                  {healthData.discovery.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Response</span>
                <span className={`text-sm font-medium ${getResponseTimeColor(healthData.discovery.responseTime)}`}>
                  {healthData.discovery.responseTime}ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Check</span>
                <span className="text-sm">
                  {new Date(healthData.discovery.lastCheck).toLocaleTimeString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Consciousness Sync */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4" />
                Consciousness Sync
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusColor(healthData.consciousness.status)}>
                  {healthData.consciousness.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Response</span>
                <span className={`text-sm font-medium ${getResponseTimeColor(healthData.consciousness.responseTime)}`}>
                  {healthData.consciousness.responseTime}ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Check</span>
                <span className="text-sm">
                  {new Date(healthData.consciousness.lastCheck).toLocaleTimeString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Auto-refresh Status */}
      {autoRefresh && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Auto-refresh is enabled - health checks run every 30 seconds
          </AlertDescription>
        </Alert>
      )}

      {/* Last Update Info */}
      {lastUpdate && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Last health check completed</span>
              <span>{lastUpdate.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};