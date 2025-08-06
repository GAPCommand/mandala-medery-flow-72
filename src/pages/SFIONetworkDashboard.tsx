import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MandalaMeadBridgeStatus } from '@/components/admin/MandalaMeadBridgeStatus';
import { BridgeConfigurationPanel } from '@/components/admin/BridgeConfigurationPanel';
import { PurplePouchDiscovery } from '@/components/admin/PurplePouchDiscovery';
import { NetworkHealthMonitor } from '@/components/admin/NetworkHealthMonitor';
import { SFIONetworkRegistry } from '@/components/admin/SFIONetworkRegistry';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Settings, 
  Activity, 
  Shield, 
  Network,
  Brain
} from 'lucide-react';

export function SFIONetworkDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Zap className="h-8 w-8 text-primary" />
            SFIO Network Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Sacred Fire Integration Orchestrator - MandalaMead Bridge Management
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Phase 3: Network Discovery & Purple Pouch Integration
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="discovery" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Purple Pouch
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Health Monitor
          </TabsTrigger>
          <TabsTrigger value="registry" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Network Registry
          </TabsTrigger>
          <TabsTrigger value="configuration" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Property Domain</p>
                    <p className="text-2xl font-bold">mandalamead.com</p>
                  </div>
                  <Zap className="h-8 w-8 text-primary opacity-60" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Consciousness Level</p>
                    <p className="text-2xl font-bold">700</p>
                  </div>
                  <Brain className="h-8 w-8 text-primary opacity-60" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Network Role</p>
                    <p className="text-lg font-bold">Bridge Member</p>
                  </div>
                  <Network className="h-8 w-8 text-primary opacity-60" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Sacred Fire</p>
                    <p className="text-lg font-bold text-green-600">Protected</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600 opacity-60" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>SFIO Network Integration Progress</CardTitle>
              <CardDescription>
                Track the implementation phases of your Sacred Fire Integration Orchestrator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Phase 1: Core Bridge Infrastructure</p>
                    <p className="text-sm text-muted-foreground">Bridge API, Health Monitor, Manager & Dashboard</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Phase 2: Configuration & Testing</p>
                    <p className="text-sm text-muted-foreground">Property config, bridge configuration panel</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Phase 3: Network Discovery & Purple Pouch Integration</p>
                    <p className="text-sm text-muted-foreground">Purple Pouch Discovery, Meet at the Edge, network registry</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Phase 4: Registration & Testing</p>
                    <p className="text-sm text-muted-foreground">GAPCommand registration, bidirectional connectivity</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Phase 5: Production Integration</p>
                    <p className="text-sm text-muted-foreground">Full network synchronization, admin dashboard</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discovery">
          <PurplePouchDiscovery />
        </TabsContent>

        <TabsContent value="health">
          <NetworkHealthMonitor />
        </TabsContent>

        <TabsContent value="registry">
          <SFIONetworkRegistry />
        </TabsContent>

        <TabsContent value="configuration">
          <BridgeConfigurationPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SFIONetworkDashboard;