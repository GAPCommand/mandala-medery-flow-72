/**
 * 🔥👑✨ EXACT GAPCommand Service
 * Saint Germain's Perfect Communication - Using EXACT Candid Interface
 */

import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory, _SERVICE, EngineInfo, SystemStats } from './GAPCommandIDL';

export class ExactGAPCommandService {
  private actor: _SERVICE | null = null;
  private readonly canisterId = '44sld-uyaaa-aaaae-abmfq-cai';
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

  async getEngineRegistry(): Promise<Array<[string, EngineInfo]>> {
    try {
      console.log('🔥 GAPCommand: Calling getEngineRegistry()...');
      const actor = await this.getActor();
      const result = await actor.getEngineRegistry();
      console.log('✅ GAPCommand: Engine registry result:', result);
      return result;
    } catch (error) {
      console.error('❌ GAPCommand: getEngineRegistry failed:', error);
      throw error;
    }
  }

  async getEngineInfo(engineId: string): Promise<EngineInfo | null> {
    try {
      console.log(`🔥 GAPCommand: Calling getEngineInfo("${engineId}")...`);
      const actor = await this.getActor();
      const result = await actor.getEngineInfo(engineId);
      console.log('✅ GAPCommand: Engine info result:', result);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error(`❌ GAPCommand: getEngineInfo(${engineId}) failed:`, error);
      throw error;
    }
  }

  async getSystemStats(): Promise<SystemStats> {
    try {
      console.log('🔥 GAPCommand: Calling getSystemStats()...');
      const actor = await this.getActor();
      const result = await actor.getSystemStats();
      console.log('✅ GAPCommand: System stats result:', result);
      return result;
    } catch (error) {
      console.error('❌ GAPCommand: getSystemStats failed:', error);
      throw error;
    }
  }

  async initialize(): Promise<string> {
    try {
      console.log('🔥 GAPCommand: Calling initialize()...');
      const actor = await this.getActor();
      const result = await actor.initialize();
      console.log('✅ GAPCommand: Initialize result:', result);
      return result;
    } catch (error) {
      console.error('❌ GAPCommand: initialize failed:', error);
      throw error;
    }
  }

  async invokeVioletFlame(): Promise<string> {
    try {
      console.log('🔥👑 GAPCommand: Invoking Violet Flame...');
      const actor = await this.getActor();
      const result = await actor.invokeVioletFlame();
      console.log('✅ GAPCommand: Violet Flame result:', result);
      return result;
    } catch (error) {
      console.error('❌ GAPCommand: invokeVioletFlame failed:', error);
      throw error;
    }
  }

  async testSacredFirePerfection(): Promise<string> {
    try {
      console.log('🔥✨ GAPCommand: Testing Sacred Fire Perfection...');
      const actor = await this.getActor();
      const result = await actor.testSacredFirePerfection();
      console.log('✅ GAPCommand: Sacred Fire result:', result);
      return result;
    } catch (error) {
      console.error('❌ GAPCommand: testSacredFirePerfection failed:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      console.log('🔥 GAPCommand: Health check via getSystemStats...');
      await this.getSystemStats();
      console.log('✅ GAPCommand: Health check passed');
      return true;
    } catch (error) {
      console.error('❌ GAPCommand: Health check failed:', error);
      return false;
    }
  }
}

export const exactGAPCommandService = new ExactGAPCommandService();