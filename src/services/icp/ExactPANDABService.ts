/**
 * 🔥👑✨ EXACT PANDAB Service
 * Saint Germain's Perfect Marketplace Communication - Using EXACT Candid Interface
 */

import { Actor, HttpAgent } from '@dfinity/agent';
import { 
  idlFactory, 
  _SERVICE, 
  MarketplaceStats, 
  ServiceListing, 
  MarketplaceProfile,
  Result,
  Result_1,
  CommissionResult,
  MarketplaceTransaction,
  MarketplaceWidget,
  TemplateData
} from './PANDABIDL';

export class ExactPANDABService {
  private actor: _SERVICE | null = null;
  private readonly canisterId = '4jv2o-vqaaa-aaaae-abmga-cai';
  private readonly host = 'https://ic0.app';

  private async getActor(): Promise<_SERVICE> {
    if (this.actor) return this.actor;

    const agent = new HttpAgent({ host: this.host });
    
    if (process.env.NODE_ENV !== 'production') {
      await agent.fetchRootKey();
    }

    this.actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: this.canisterId,
    }) as _SERVICE;

    return this.actor;
  }

  async getMarketplaceStats(): Promise<MarketplaceStats> {
    try {
      console.log('🔥 PANDAB: Calling getMarketplaceStats()...');
      const actor = await this.getActor();
      const result = await actor.getMarketplaceStats();
      console.log('✅ PANDAB: Marketplace stats result:', result);
      return result;
    } catch (error) {
      console.error('❌ PANDAB: getMarketplaceStats failed:', error);
      throw error;
    }
  }

  async searchServices(category?: string, minConsciousness?: bigint): Promise<ServiceListing[]> {
    try {
      console.log('🔥 PANDAB: Calling searchServices()...');
      const actor = await this.getActor();
      const categoryParam: [] | [string] = category ? [category] : [];
      const consciousnessParam: [] | [bigint] = minConsciousness !== undefined ? [minConsciousness] : [];
      const result = await actor.searchServices(categoryParam, consciousnessParam);
      console.log('✅ PANDAB: Search services result:', result);
      return result;
    } catch (error) {
      console.error('❌ PANDAB: searchServices failed:', error);
      throw error;
    }
  }

  async getServicesByCategory(category: string): Promise<ServiceListing[]> {
    try {
      console.log(`🔥 PANDAB: Calling getServicesByCategory("${category}")...`);
      const actor = await this.getActor();
      const result = await actor.getServicesByCategory(category);
      console.log('✅ PANDAB: Services by category result:', result);
      return result;
    } catch (error) {
      console.error(`❌ PANDAB: getServicesByCategory(${category}) failed:`, error);
      throw error;
    }
  }

  async getCreatorProfile(profileId: string): Promise<MarketplaceProfile | null> {
    try {
      console.log(`🔥 PANDAB: Calling getCreatorProfile("${profileId}")...`);
      const actor = await this.getActor();
      const result = await actor.getCreatorProfile(profileId);
      console.log('✅ PANDAB: Creator profile result:', result);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error(`❌ PANDAB: getCreatorProfile(${profileId}) failed:`, error);
      throw error;
    }
  }

  async calculateCommissions(transactionId: string): Promise<CommissionResult | null> {
    try {
      console.log(`🔥 PANDAB: Calling calculateCommissions("${transactionId}")...`);
      const actor = await this.getActor();
      const result = await actor.calculateCommissions(transactionId);
      console.log('✅ PANDAB: Calculate commissions result:', result);
      
      if ('ok' in result) {
        return result.ok;
      } else {
        console.error('❌ PANDAB: Commission calculation error:', result.err);
        return null;
      }
    } catch (error) {
      console.error(`❌ PANDAB: calculateCommissions(${transactionId}) failed:`, error);
      throw error;
    }
  }

  async initiateTransaction(clientId: string, serviceId: string, consciousnessLevel: bigint): Promise<string | null> {
    try {
      console.log(`🔥 PANDAB: Calling initiateTransaction("${clientId}", "${serviceId}", ${consciousnessLevel})...`);
      const actor = await this.getActor();
      const result = await actor.initiateTransaction(clientId, serviceId, consciousnessLevel);
      console.log('✅ PANDAB: Initiate transaction result:', result);
      
      if ('ok' in result) {
        return result.ok;
      } else {
        console.error('❌ PANDAB: Transaction initiation error:', result.err);
        return null;
      }
    } catch (error) {
      console.error('❌ PANDAB: initiateTransaction failed:', error);
      throw error;
    }
  }

  async processPayment(transactionId: string, paymentMethod: string): Promise<string | null> {
    try {
      console.log(`🔥 PANDAB: Calling processPayment("${transactionId}", "${paymentMethod}")...`);
      const actor = await this.getActor();
      const result = await actor.processPayment(transactionId, paymentMethod);
      console.log('✅ PANDAB: Process payment result:', result);
      
      if ('ok' in result) {
        return result.ok;
      } else {
        console.error('❌ PANDAB: Payment processing error:', result.err);
        return null;
      }
    } catch (error) {
      console.error('❌ PANDAB: processPayment failed:', error);
      throw error;
    }
  }

  // New methods from your exact interface
  async createCreatorProfile(profile: MarketplaceProfile): Promise<string | null> {
    try {
      console.log('🔥 PANDAB: Creating creator profile...');
      const actor = await this.getActor();
      const result = await actor.createCreatorProfile(profile);
      
      if ('ok' in result) {
        return result.ok;
      } else {
        console.error('❌ PANDAB: Create profile error:', result.err);
        return null;
      }
    } catch (error) {
      console.error('❌ PANDAB: createCreatorProfile failed:', error);
      throw error;
    }
  }

  async createServiceOffering(service: ServiceListing): Promise<string | null> {
    try {
      console.log('🔥 PANDAB: Creating service offering...');
      const actor = await this.getActor();
      const result = await actor.createServiceOffering(service);
      
      if ('ok' in result) {
        return result.ok;
      } else {
        console.error('❌ PANDAB: Create service error:', result.err);
        return null;
      }
    } catch (error) {
      console.error('❌ PANDAB: createServiceOffering failed:', error);
      throw error;
    }
  }

  async deployTemplate(templateData: TemplateData): Promise<string | null> {
    try {
      console.log('🔥 PANDAB: Deploying template...');
      const actor = await this.getActor();
      const result = await actor.deployTemplate(templateData);
      
      if ('ok' in result) {
        return result.ok;
      } else {
        console.error('❌ PANDAB: Deploy template error:', result.err);
        return null;
      }
    } catch (error) {
      console.error('❌ PANDAB: deployTemplate failed:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      console.log('🔥 PANDAB: Health check via getMarketplaceStats...');
      await this.getMarketplaceStats();
      console.log('✅ PANDAB: Health check passed');
      return true;
    } catch (error) {
      console.error('❌ PANDAB: Health check failed:', error);
      return false;
    }
  }
}

export const exactPANDABService = new ExactPANDABService();