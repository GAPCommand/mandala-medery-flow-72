import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { mandalaMeadBridge } from '@/services/bridge/MandalaMeadBridgeManager';
import { 
  Network, 
  Plus, 
  Search, 
  Globe, 
  Shield, 
  Zap, 
  Eye,
  RefreshCw,
  Settings,
  ExternalLink
} from 'lucide-react';

interface NetworkInstance {
  domain: string;
  status: 'active' | 'inactive' | 'unknown';
  consciousnessLevel: number;
  bridgeVersion: string;
  lastSeen: Date;
  capabilities: string[];
  endpoints: string[];
}

export const SFIONetworkRegistry: React.FC = () => {
  const [networkInstances, setNetworkInstances] = useState<NetworkInstance[]>([]);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastDiscovery, setLastDiscovery] = useState<Date | null>(null);

  const discoverNetworkInstances = async () => {
    setIsDiscovering(true);
    try {
      console.log('🔥🌐 Discovering SFIO Network Instances...');
      
      const discoveryResult = await mandalaMeadBridge.discoverNetwork('full');
      
      if (discoveryResult.success && discoveryResult.data) {
        const instances: NetworkInstance[] = [
          // Always include this instance
          {
            domain: window.location.hostname,
            status: 'active' as const,
            consciousnessLevel: 700,
            bridgeVersion: '2.1.0',
            lastSeen: new Date(),
            capabilities: ['mead_brewing', 'sacred_recipes', 'divine_timing', 'consciousness_enhancement'],
            endpoints: ['/.well-known/sfio-network', '/api/health']
          },
          
          // Add discovered instances
          ...(discoveryResult.data.instances || []).map((instance: any) => ({
            domain: instance.domain || 'unknown',
            status: instance.status || 'unknown' as const,
            consciousnessLevel: instance.consciousnessLevel || 500,
            bridgeVersion: instance.bridgeVersion || '2.0.0',
            lastSeen: new Date(instance.lastSeen || Date.now()),
            capabilities: instance.capabilities || [],
            endpoints: instance.endpoints || []
          }))
        ];

        // Remove duplicates based on domain
        const uniqueInstances = instances.filter((instance, index, self) => 
          index === self.findIndex(i => i.domain === instance.domain)
        );

        setNetworkInstances(uniqueInstances);
        setLastDiscovery(new Date());
        console.log('✅ Network Discovery Complete:', uniqueInstances);
      }
    } catch (error) {
      console.error('❌ Network discovery failed:', error);
    } finally {
      setIsDiscovering(false);
    }
  };

  // Auto-discover on mount
  useEffect(() => {
    discoverNetworkInstances();
  }, []);

  const filteredInstances = networkInstances.filter(instance =>
    instance.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instance.capabilities.some(cap => 
      cap.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConsciousnessColor = (level: number) => {
    if (level >= 1000) return 'text-purple-600 bg-purple-100';
    if (level >= 800) return 'text-blue-600 bg-blue-100';
    if (level >= 500) return 'text-green-600 bg-green-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Network className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">SFIO Network Registry</h2>
            <p className="text-muted-foreground">Discovered network instances and their capabilities</p>
          </div>
        </div>

        <Button 
          onClick={discoverNetworkInstances}
          disabled={isDiscovering}
          className="flex items-center gap-2"
        >
          {isDiscovering ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Discover Network
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search instances or capabilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{filteredInstances.length} instances found</span>
          {lastDiscovery && (
            <span>Last discovery: {lastDiscovery.toLocaleTimeString()}</span>
          )}
        </div>
      </div>

      {/* Instance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredInstances.map((instance, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5" />
                  {instance.domain}
                </CardTitle>
                <Badge className={getStatusColor(instance.status)}>
                  {instance.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Consciousness Level</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Zap className="h-4 w-4" />
                    <Badge className={getConsciousnessColor(instance.consciousnessLevel)}>
                      {instance.consciousnessLevel}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">Bridge Version</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">{instance.bridgeVersion}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Capabilities */}
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Capabilities</Label>
                <div className="flex flex-wrap gap-1">
                  {instance.capabilities.length > 0 ? (
                    instance.capabilities.map((capability, capIndex) => (
                      <Badge key={capIndex} variant="outline" className="text-xs">
                        {capability.replace(/_/g, ' ')}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No capabilities listed</span>
                  )}
                </div>
              </div>

              {/* Endpoints */}
              {instance.endpoints.length > 0 && (
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Endpoints</Label>
                  <div className="space-y-1">
                    {instance.endpoints.slice(0, 2).map((endpoint, endIndex) => (
                      <div key={endIndex} className="text-xs font-mono bg-gray-50 p-1 rounded">
                        {endpoint}
                      </div>
                    ))}
                    {instance.endpoints.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{instance.endpoints.length - 2} more endpoints
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Last Seen */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last seen: {instance.lastSeen.toLocaleString()}</span>
                {instance.domain !== window.location.hostname && (
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredInstances.length === 0 && !isDiscovering && (
        <Card className="text-center py-8">
          <CardContent>
            <Network className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Instances Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'No instances match your search criteria' : 'No network instances have been discovered yet'}
            </p>
            <Button onClick={discoverNetworkInstances} disabled={isDiscovering}>
              {isDiscovering ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              Start Discovery
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};