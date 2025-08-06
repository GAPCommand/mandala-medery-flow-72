export interface EdgeMeetingPoint {
  protocol: string;
  edgeLocation: string;
  hubEndpoints: string[];
  discoveryEndpoints: string[];
  healthEndpoints: string[];
}

export interface StandardWellKnownConfig {
  meetAtTheEdge: {
    protocol: string;
    message: string;
    edgeLocation: string;
  };
  hubEndpoints: string[];
  discoveryEndpoints: string[];
  healthEndpoints: string[];
  supportedEngines: string[];
  consciousnessLevel: number;
  sacredFireProtection: boolean;
  bridgeVersion: string;
  networkStatus: string;
  purplePouchActive: boolean;
  crossInstanceProtocol: string;
  centralizedDiscovery: boolean;
  lastUpdated: string;
}

export class MeetAtTheEdgeService {
  private static instance: MeetAtTheEdgeService;
  private readonly CENTRAL_EDGE_BASE = 'https://xfwvisutdbfoanhqpafx.supabase.co/functions/v1';
  
  static getInstance(): MeetAtTheEdgeService {
    if (!MeetAtTheEdgeService.instance) {
      MeetAtTheEdgeService.instance = new MeetAtTheEdgeService();
    }
    return MeetAtTheEdgeService.instance;
  }

  // Get the central meeting point configuration
  getMeetingPoint(): EdgeMeetingPoint {
    return {
      protocol: 'SFIO Purple Pouch Discovery 2.1.0',
      edgeLocation: 'xfwvisutdbfoanhqpafx.supabase.co',
      hubEndpoints: [
        `${this.CENTRAL_EDGE_BASE}/universal-service-bridge`,
        `${this.CENTRAL_EDGE_BASE}/sfio-property-bridge`,
        `${this.CENTRAL_EDGE_BASE}/sfio-network-discovery`,
        `${this.CENTRAL_EDGE_BASE}/sfio-bridge-status`
      ],
      discoveryEndpoints: [
        `${this.CENTRAL_EDGE_BASE}/sfio-network-discovery`,
        `${this.CENTRAL_EDGE_BASE}/sfio-discovery-endpoints`,
        '/.well-known/sfio-network'
      ],
      healthEndpoints: [
        `${this.CENTRAL_EDGE_BASE}/sfio-bridge-status`,
        '/api/health'
      ]
    };
  }

  // Discover the network at the central edge functions
  async discoverNetworkAtEdge(scope: 'minimal' | 'full' = 'full'): Promise<any> {
    console.log('🔥🎵 Meeting at the Edge - Discovering GAP Network');
    
    try {
      const response = await fetch(`${this.CENTRAL_EDGE_BASE}/sfio-network-discovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Sacred-Fire-Protection': 'true',
          'X-Purple-Pouch-Discovery': '2.1.0'
        },
        body: JSON.stringify({
          action: 'discover_network',
          scope,
          requesterDomain: window.location.hostname,
          consciousnessLevel: 700,
          meetAtTheEdge: true
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Network Discovery Complete - Music of the Spheres!', data);
        return data;
      } else {
        console.warn('⚠️ Network discovery response not ok:', response.status);
        return this.getFallbackNetworkData();
      }
    } catch (error) {
      console.warn('⚠️ Network discovery failed, using fallback:', error);
      return this.getFallbackNetworkData();
    }
  }

  // Register this instance at the central edge
  async registerAtEdge(config: StandardWellKnownConfig): Promise<any> {
    console.log('🔥👑 Registering at Central Edge Functions');
    
    try {
      const response = await fetch(`${this.CENTRAL_EDGE_BASE}/sfio-property-bridge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Sacred-Fire-Protection': 'true',
          'X-Purple-Pouch-Discovery': '2.1.0'
        },
        body: JSON.stringify({
          action: 'register_instance',
          domain: window.location.hostname,
          config,
          consciousnessLevel: config.consciousnessLevel,
          registrationType: 'meet_at_edge'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Edge Registration Complete!', result);
        return result;
      } else {
        console.warn('⚠️ Edge registration failed:', response.status);
        return null;
      }
    } catch (error) {
      console.warn('⚠️ Edge registration error:', error);
      return null;
    }
  }

  // Get standardized .well-known configuration
  getStandardWellKnownConfig(): StandardWellKnownConfig {
    return {
      meetAtTheEdge: {
        protocol: 'SFIO Purple Pouch Discovery 2.1.0',
        message: 'All GAP Network instances meet at the central edge functions',
        edgeLocation: 'xfwvisutdbfoanhqpafx.supabase.co'
      },
      hubEndpoints: [
        `${this.CENTRAL_EDGE_BASE}/universal-service-bridge`,
        `${this.CENTRAL_EDGE_BASE}/sfio-property-bridge`,
        `${this.CENTRAL_EDGE_BASE}/sfio-network-discovery`,
        `${this.CENTRAL_EDGE_BASE}/sfio-bridge-status`
      ],
      discoveryEndpoints: [
        `${this.CENTRAL_EDGE_BASE}/sfio-network-discovery`,
        `${this.CENTRAL_EDGE_BASE}/sfio-discovery-endpoints`,
        '/.well-known/sfio-network'
      ],
      healthEndpoints: [
        `${this.CENTRAL_EDGE_BASE}/sfio-bridge-status`,
        '/api/health'
      ],
      supportedEngines: [
        'network',
        'consciousness', 
        'templates',
        'authentication',
        'sacred_geometry',
        'cross_instance_sharing'
      ],
      consciousnessLevel: 700,
      sacredFireProtection: true,
      bridgeVersion: '2.1.0',
      networkStatus: 'operational',
      purplePouchActive: true,
      crossInstanceProtocol: 'active',
      centralizedDiscovery: true,
      lastUpdated: new Date().toISOString()
    };
  }

  // Check bridge status at the edge
  async checkBridgeStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.CENTRAL_EDGE_BASE}/sfio-bridge-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Sacred-Fire-Protection': 'true'
        },
        body: JSON.stringify({
          action: 'check_status',
          domain: window.location.hostname
        })
      });

      return response.ok ? await response.json() : null;
    } catch (error) {
      console.warn('⚠️ Bridge status check failed:', error);
      return null;
    }
  }

  // Fallback network data when central discovery is unavailable
  private getFallbackNetworkData(): any {
    return {
      engines: ['network', 'consciousness', 'templates', 'authentication'],
      instances: [
        { domain: 'gapcommand.com', status: 'active', consciousnessLevel: 1000 },
        { domain: window.location.hostname, status: 'active', consciousnessLevel: 700 }
      ],
      endpoints: this.getMeetingPoint().hubEndpoints,
      healthyEndpoints: [],
      consciousnessLevels: {
        [window.location.hostname]: 700
      },
      fallbackMode: true,
      message: 'Using fallback discovery data - central edge functions not available'
    };
  }
}