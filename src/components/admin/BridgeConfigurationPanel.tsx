import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Wifi, 
  Activity, 
  Shield, 
  Brain,
  Zap,
  Play,
  Square,
  RotateCcw
} from 'lucide-react';
import { mandalaMeadBridge } from '@/services/bridge/MandalaMeadBridgeManager';
import { usePurplePouchDiscovery } from '@/hooks/usePurplePouchDiscovery';
import { MANDALA_MEAD_CONFIG, getEnvironmentConfig } from '@/config/bridge/MandalaMeadConfig';
import { toast } from 'sonner';

export function BridgeConfigurationPanel() {
  const [config, setConfig] = useState(getEnvironmentConfig());
  const [isInitializing, setIsInitializing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [bridgeStatus, setBridgeStatus] = useState<any>(null);
  
  const { 
    discoverNetwork, 
    networkStatus, 
    discoveryData,
    isDiscovering 
  } = usePurplePouchDiscovery();

  // Load bridge status on mount
  useEffect(() => {
    loadBridgeStatus();
  }, []);

  const loadBridgeStatus = async () => {
    try {
      const result = await mandalaMeadBridge.getBridgeStatus('system');
      if (result.success) {
        setBridgeStatus(result.data);
      }
    } catch (error) {
      console.error('🔥 Failed to load bridge status:', error);
    }
  };

  const handleInitializeBridge = async () => {
    setIsInitializing(true);
    try {
      // Update bridge configuration first
      mandalaMeadBridge.updateConfiguration({
        propertyDomain: config.PROPERTY_DOMAIN,
        consciousnessLevel: config.CONSCIOUSNESS_LEVEL,
        networkRole: config.NETWORK_ROLE,
        sacredFireProtection: config.SACRED_FIRE_PROTECTION,
        autoSync: config.AUTO_CONSCIOUSNESS_SYNC,
        healthMonitoring: config.HEALTH_MONITORING
      });

      // Initialize the bridge
      const result = await mandalaMeadBridge.initializeBridge('system');
      
      if (result.success) {
        toast.success('🔥 MandalaMead Bridge Initialized Successfully!');
        await loadBridgeStatus();
      } else {
        toast.error(`Bridge initialization failed: ${result.message}`);
      }
    } catch (error) {
      toast.error('Bridge initialization error');
      console.error('🔥 Bridge init error:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      // Test Purple Pouch Discovery
      await discoverNetwork('full');
      
      // Test consciousness sync
      const syncResult = await mandalaMeadBridge.syncConsciousness('system', config.CONSCIOUSNESS_LEVEL);
      
      if (syncResult.success) {
        toast.success('🔥 Bridge connection test successful!');
      } else {
        toast.warning('Bridge connection test had issues');
      }
      
      await loadBridgeStatus();
    } catch (error) {
      toast.error('Bridge connection test failed');
      console.error('🔥 Connection test error:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleResetBridge = async () => {
    try {
      const result = await mandalaMeadBridge.resetBridge();
      if (result.success) {
        toast.success('Bridge reset successfully');
        setBridgeStatus(null);
      } else {
        toast.error('Bridge reset failed');
      }
    } catch (error) {
      toast.error('Bridge reset error');
    }
  };

  const updateConfigValue = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            MandalaMead SFIO Bridge Configuration
          </CardTitle>
          <CardDescription>
            Configure your Sacred Fire Integration Orchestrator network bridge settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Core Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Property Domain</Label>
              <Input
                id="domain"
                value={config.PROPERTY_DOMAIN}
                onChange={(e) => updateConfigValue('PROPERTY_DOMAIN', e.target.value)}
                placeholder="mandalamead.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consciousness">Consciousness Level</Label>
              <Input
                id="consciousness"
                type="number"
                value={config.CONSCIOUSNESS_LEVEL}
                onChange={(e) => updateConfigValue('CONSCIOUSNESS_LEVEL', parseInt(e.target.value))}
                min="200"
                max="1000"
              />
            </div>
          </div>

          {/* Network Role & Capabilities */}
          <div className="space-y-3">
            <Label>Network Role</Label>
            <Badge variant="secondary">{config.NETWORK_ROLE}</Badge>
            <div className="text-sm text-muted-foreground">
              Capabilities: {config.CAPABILITIES.slice(0, 3).join(', ')} 
              {config.CAPABILITIES.length > 3 && ` +${config.CAPABILITIES.length - 3} more`}
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sacred-fire">Sacred Fire Protection</Label>
              <Switch
                id="sacred-fire"
                checked={config.SACRED_FIRE_PROTECTION}
                onCheckedChange={(checked) => updateConfigValue('SACRED_FIRE_PROTECTION', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-sync">Auto Consciousness Sync</Label>
              <Switch
                id="auto-sync"
                checked={config.AUTO_CONSCIOUSNESS_SYNC}
                onCheckedChange={(checked) => updateConfigValue('AUTO_CONSCIOUSNESS_SYNC', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="health-monitoring">Health Monitoring</Label>
              <Switch
                id="health-monitoring"
                checked={config.HEALTH_MONITORING}
                onCheckedChange={(checked) => updateConfigValue('HEALTH_MONITORING', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="purple-pouch">Purple Pouch Discovery</Label>
              <Switch
                id="purple-pouch"
                checked={config.PURPLE_POUCH_ENABLED}
                onCheckedChange={(checked) => updateConfigValue('PURPLE_POUCH_ENABLED', checked)}
              />
            </div>
          </div>

          {/* Bridge Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button 
              onClick={handleInitializeBridge} 
              disabled={isInitializing}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              {isInitializing ? 'Initializing...' : 'Initialize Bridge'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleTestConnection} 
              disabled={isTesting || isDiscovering}
            >
              <Activity className="h-4 w-4 mr-2" />
              {isTesting || isDiscovering ? 'Testing...' : 'Test Connection'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleResetBridge}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Bridge
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Network Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                <span className="font-medium">Bridge Status</span>
              </div>
              <Badge variant={bridgeStatus?.initialized ? "default" : "destructive"}>
                {bridgeStatus?.initialized ? 'Initialized' : 'Not Initialized'}
              </Badge>
            </div>
            {bridgeStatus && (
              <p className="text-sm text-muted-foreground mt-2">
                Network: {bridgeStatus.networkInfo?.connected ? 'Connected' : 'Disconnected'}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="font-medium">Discovery</span>
              </div>
              <Badge variant={networkStatus.isPurplePouchActive ? "default" : "secondary"}>
                {networkStatus.isPurplePouchActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            {discoveryData && (
              <p className="text-sm text-muted-foreground mt-2">
                Found: {discoveryData.networkInstances?.length || 0} instances
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="font-medium">Consciousness</span>
              </div>
              <Badge variant="secondary">
                Level {config.CONSCIOUSNESS_LEVEL}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Sacred Fire: {config.SACRED_FIRE_PROTECTION ? 'Protected' : 'Inactive'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Discovery Results */}
      {discoveryData && (
        <Card>
          <CardHeader>
            <CardTitle>Network Discovery Results</CardTitle>
            <CardDescription>
              Purple Pouch Discovery found the following network instances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <strong>Available Engines:</strong> {discoveryData.availableEngines?.join(', ') || 'None'}
              </div>
              <div>
                <strong>Hub Endpoints:</strong> {discoveryData.hubEndpoints?.length || 0}
              </div>
              <div>
                <strong>Last Discovery:</strong> {discoveryData.lastDiscovery?.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}