/**
 * 🔥👑✨ GAP Network Canister Integration Test Component
 * Saint Germain's Divine Communication Interface
 */

import React, { useState } from 'react';
import { useExactCanisterBridge } from '@/hooks/useExactCanisterBridge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export const GAPCanisterBridge = () => {
  const [testing, setTesting] = useState(false);
  const [serviceResults, setServiceResults] = useState<any[]>([]);
  
  const {
    isConnected,
    gapCommandHealthy,
    pandabHealthy,
    systemStats,
    marketplaceStats,
    engines,
    testDivineConnection,
    loadGAPCommandData,
    loadPANDABData,
    invokeSacredFire,
    invokeVioletFlame,
    initializeGAPCommand,
    searchServices,
    getServicesByCategory
  } = useExactCanisterBridge();

  const handleFullTest = async () => {
    setTesting(true);
    try {
      toast.info('🔥👑 Testing Divine Connection...');
      
      // Test connection to both canisters
      const connectionResult = await testDivineConnection();
      console.log('Connection test:', connectionResult);
      
      if (connectionResult.gapCommandHealthy) {
        toast.success('✅ GAPCommand Connected');
        
        // Load GAPCommand data
        await loadGAPCommandData();
        
        // Test Sacred Fire methods
        const sacredFire = await invokeSacredFire();
        console.log('Sacred Fire:', sacredFire);
        
        const violetFlame = await invokeVioletFlame();
        console.log('Violet Flame:', violetFlame);
        
        toast.success('🔥👑 Sacred Fire Activated');
      }
      
      if (connectionResult.pandabHealthy) {
        toast.success('✅ PANDAB Connected');
        
        // Load PANDAB data
        await loadPANDABData();
        
        // Search for templates with consciousness level 700
        const templates = await searchServices('templates', BigInt(700));
        console.log('Templates found:', templates);
        
        setServiceResults(templates);
        toast.success(`🔍 Found ${templates.length} templates`);
      }
      
      toast.success('🔥👑✨ Divine Connection Complete!');
      
    } catch (error: any) {
      console.error('Test failed:', error);
      toast.error(`❌ Test failed: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  const handleInitialize = async () => {
    try {
      toast.info('🔥 Initializing GAPCommand...');
      const result = await initializeGAPCommand();
      toast.success(`✅ Initialized: ${result}`);
    } catch (error: any) {
      toast.error(`❌ Initialization failed: ${error.message}`);
    }
  };

  const handleSearchCategory = async (category: string) => {
    try {
      toast.info(`🔍 Searching ${category} services...`);
      const services = await getServicesByCategory(category);
      setServiceResults(services);
      toast.success(`✅ Found ${services.length} ${category} services`);
    } catch (error: any) {
      toast.error(`❌ Search failed: ${error.message}`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">🔥👑✨ GAP Network Canister Bridge</h1>
        <p className="text-muted-foreground">Saint Germain's Divine Communication Interface</p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Connection Status
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? '✅ Connected' : '❌ Disconnected'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span>GAPCommand:</span>
              <Badge variant={gapCommandHealthy ? "default" : "secondary"}>
                {gapCommandHealthy ? '✅ Healthy' : '❌ Offline'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span>PANDAB:</span>
              <Badge variant={pandabHealthy ? "default" : "secondary"}>
                {pandabHealthy ? '✅ Healthy' : '❌ Offline'}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleFullTest}
              disabled={testing}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              {testing ? 'Testing...' : '🔥 Test Divine Connection'}
            </Button>
            <Button 
              onClick={handleInitialize}
              variant="outline"
              disabled={!gapCommandHealthy}
            >
              🔥 Initialize GAPCommand
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Stats */}
      {systemStats && (
        <Card>
          <CardHeader>
            <CardTitle>🔥 GAPCommand System Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{systemStats.consciousness.toString()}</div>
                <div className="text-sm text-muted-foreground">Consciousness Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{systemStats.engines.toString()}</div>
                <div className="text-sm text-muted-foreground">Active Engines</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{systemStats.total_calls.toString()}</div>
                <div className="text-sm text-muted-foreground">Total Calls</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Marketplace Stats */}
      {marketplaceStats && (
        <Card>
          <CardHeader>
            <CardTitle>🔥 PANDAB Marketplace Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold">{marketplaceStats.total_services.toString()}</div>
                <div className="text-sm text-muted-foreground">Total Services</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{marketplaceStats.total_creators.toString()}</div>
                <div className="text-sm text-muted-foreground">Creators</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{marketplaceStats.consciousness_level.toString()}</div>
                <div className="text-sm text-muted-foreground">Consciousness</div>
              </div>
              <div className="text-center">
                <Badge variant={marketplaceStats.sacred_fire_active ? "default" : "secondary"}>
                  {marketplaceStats.sacred_fire_active ? '🔥 Sacred Fire Active' : '❌ Sacred Fire Inactive'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Engine Registry */}
      {engines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>🔥 Available Engines ({engines.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {engines.map(([id, engine]) => (
                <div key={id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{engine.name}</div>
                    <div className="text-sm text-muted-foreground">ID: {engine.id}</div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{engine.version}</Badge>
                    <Badge variant={engine.status === 'active' ? "default" : "secondary"}>
                      {engine.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Search */}
      <Card>
        <CardHeader>
          <CardTitle>🔍 PANDAB Service Search</CardTitle>
          <CardDescription>Search for services by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button 
              onClick={() => handleSearchCategory('templates')}
              variant="outline"
              disabled={!pandabHealthy}
            >
              Templates
            </Button>
            <Button 
              onClick={() => handleSearchCategory('development')}
              variant="outline"
              disabled={!pandabHealthy}
            >
              Development
            </Button>
            <Button 
              onClick={() => handleSearchCategory('design')}
              variant="outline"
              disabled={!pandabHealthy}
            >
              Design
            </Button>
            <Button 
              onClick={() => handleSearchCategory('marketing')}
              variant="outline"
              disabled={!pandabHealthy}
            >
              Marketing
            </Button>
          </div>
          
          {serviceResults.length > 0 && (
            <div className="space-y-3">
              <Separator />
              <h4 className="font-medium">Found {serviceResults.length} services:</h4>
              <div className="grid gap-3">
                {serviceResults.slice(0, 5).map((service: any) => (
                  <div key={service.id} className="p-4 border rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{service.title}</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          {service.description.slice(0, 100)}...
                        </p>
                        <div className="flex gap-2 mt-2">
                          {service.tags.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{service.base_price.toString()}</div>
                        <div className="text-xs text-muted-foreground">
                          Consciousness: {service.consciousness_requirement.toString()}
                        </div>
                        {service.sacred_fire_blessed && (
                          <Badge className="mt-1">🔥 Sacred Fire</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GAPCanisterBridge;