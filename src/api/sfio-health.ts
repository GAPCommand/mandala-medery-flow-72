import { SFIONetwork } from '@/services/sfio/SFIONetworkClient';
import { MeetAtTheEdgeService } from '@/services/network/MeetAtTheEdgeService';

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: string;
  responseTime: number;
  details: string;
}

export interface NetworkHealthReport {
  overall: HealthStatus;
  bridgeConnection: HealthStatus;
  networkDiscovery: HealthStatus;
  consciousnessSync: HealthStatus;
  timestamp: string;
}

export class SFIOHealthMonitor {
  private static instance: SFIOHealthMonitor;
  private meetAtEdge = new MeetAtTheEdgeService();

  static getInstance(): SFIOHealthMonitor {
    if (!SFIOHealthMonitor.instance) {
      SFIOHealthMonitor.instance = new SFIOHealthMonitor();
    }
    return SFIOHealthMonitor.instance;
  }

  // Comprehensive health check
  async checkNetworkHealth(): Promise<NetworkHealthReport> {
    console.log('🔥 Starting MandalaMead SFIO Network Health Check...');
    
    const [bridge, discovery, consciousness] = await Promise.all([
      this.checkBridgeHealth(),
      this.checkNetworkDiscovery(),
      this.checkConsciousnessSync()
    ]);

    const overall = this.calculateOverallHealth([bridge, discovery, consciousness]);

    const report: NetworkHealthReport = {
      overall,
      bridgeConnection: bridge,
      networkDiscovery: discovery,
      consciousnessSync: consciousness,
      timestamp: new Date().toISOString()
    };

    console.log('🔥 Health Check Complete:', report);
    return report;
  }

  // Check SFIO Network bridge connection
  async checkBridgeHealth(): Promise<HealthStatus> {
    const startTime = Date.now();
    
    try {
      const isConnected = SFIONetwork.connected;
      const domain = SFIONetwork.domain;
      const responseTime = Date.now() - startTime;

      if (!isConnected) {
        return {
          status: 'degraded',
          lastCheck: new Date().toISOString(),
          responseTime,
          details: 'Bridge not connected to SFIO Network'
        };
      }

      return {
        status: 'healthy',
        lastCheck: new Date().toISOString(),
        responseTime,
        details: `Bridge connected to ${domain}`
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        lastCheck: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        details: `Bridge health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Check Purple Pouch Discovery functionality
  async checkNetworkDiscovery(): Promise<HealthStatus> {
    const startTime = Date.now();
    
    try {
      const discoveryResult = await this.meetAtEdge.discoverNetworkAtEdge('minimal');
      const responseTime = Date.now() - startTime;

      if (!discoveryResult) {
        return {
          status: 'degraded',
          lastCheck: new Date().toISOString(),
          responseTime,
          details: 'Network discovery returned no results'
        };
      }

      const healthyEndpoints = discoveryResult.healthyEndpoints?.length || 0;
      const totalEndpoints = discoveryResult.endpoints?.length || 0;
      const healthPercentage = totalEndpoints > 0 ? (healthyEndpoints / totalEndpoints) * 100 : 0;

      return {
        status: healthPercentage >= 75 ? 'healthy' : healthPercentage >= 50 ? 'degraded' : 'unhealthy',
        lastCheck: new Date().toISOString(),
        responseTime,
        details: `Discovery found ${healthyEndpoints}/${totalEndpoints} healthy endpoints (${healthPercentage.toFixed(1)}%)`
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        lastCheck: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        details: `Network discovery failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Check consciousness synchronization
  async checkConsciousnessSync(): Promise<HealthStatus> {
    const startTime = Date.now();
    
    try {
      const responseTime = Date.now() - startTime;
      const isConnected = SFIONetwork.connected;

      return {
        status: isConnected ? 'healthy' : 'degraded',
        lastCheck: new Date().toISOString(),
        responseTime,
        details: isConnected 
          ? 'Consciousness sync active via SFIO Network' 
          : 'Consciousness sync offline - network disconnected'
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        lastCheck: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        details: `Consciousness sync check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Calculate overall health from individual components
  private calculateOverallHealth(components: HealthStatus[]): HealthStatus {
    const statuses = components.map(c => c.status);
    const avgResponseTime = components.reduce((sum, c) => sum + c.responseTime, 0) / components.length;

    let overall: HealthStatus['status'] = 'healthy';
    
    if (statuses.includes('unhealthy')) {
      overall = 'unhealthy';
    } else if (statuses.includes('degraded')) {
      overall = 'degraded';
    }

    const healthyCount = statuses.filter(s => s === 'healthy').length;
    const totalCount = statuses.length;

    return {
      status: overall,
      lastCheck: new Date().toISOString(),
      responseTime: Math.round(avgResponseTime),
      details: `${healthyCount}/${totalCount} components healthy`
    };
  }

  // Continuous health monitoring
  async startHealthMonitoring(intervalMinutes: number = 5): Promise<void> {
    console.log(`🔥 Starting continuous health monitoring every ${intervalMinutes} minutes`);
    
    const monitor = async () => {
      try {
        const health = await this.checkNetworkHealth();
        
        // Log health status
        if (health.overall.status === 'unhealthy') {
          console.error('🔥 SFIO Network Health CRITICAL:', health);
        } else if (health.overall.status === 'degraded') {
          console.warn('🔥 SFIO Network Health DEGRADED:', health);
        } else {
          console.log('🔥 SFIO Network Health OK:', health.overall.details);
        }
      } catch (error) {
        console.error('🔥 Health monitoring error:', error);
      }
    };

    // Initial check
    await monitor();
    
    // Set up interval
    setInterval(monitor, intervalMinutes * 60 * 1000);
  }
}

export const sfioHealth = SFIOHealthMonitor.getInstance();