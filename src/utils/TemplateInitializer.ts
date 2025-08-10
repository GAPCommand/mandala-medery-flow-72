import { TemplateConfigService } from '@/services/TemplateConfigService';

export class TemplateInitializer {
  private static initialized = false;

  public static initialize(): void {
    if (this.initialized) return;
    
    // Initialize template service (this will inject CSS variables)
    TemplateConfigService.getInstance();
    
    this.initialized = true;
  }
}