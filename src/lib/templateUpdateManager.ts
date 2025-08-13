export interface TemplateVersion {
  version: string;
  releaseDate: string;
  type: 'major' | 'minor' | 'patch' | 'hotfix';
  changes: TemplateChange[];
  breaking: boolean;
  description: string;
  migration?: string;
}

export interface TemplateChange {
  type: 'feature' | 'bugfix' | 'enhancement' | 'security' | 'ui' | 'engine';
  category: 'frontend' | 'backend' | 'config' | 'dependencies';
  description: string;
  files: string[];
  preserveCustomizations: boolean;
  requiresManualReview?: boolean;
}

export interface UpdateStatus {
  currentVersion: string;
  latestVersion: string;
  availableUpdates: TemplateVersion[];
  updateAvailable: boolean;
  securityUpdatesAvailable: boolean;
  lastChecked: string;
}

export interface CustomerCustomization {
  file: string;
  originalContent: string;
  customizedContent: string;
  customizationType: 'branding' | 'styling' | 'content' | 'functionality';
  lastModified: string;
  preservable: boolean;
}

export class TemplateUpdateManager {
  private masterVersion: string = '2.1.0';
  private updateServerUrl: string;

  constructor(updateServerUrl: string) {
    this.updateServerUrl = updateServerUrl;
  }

  async checkForUpdates(currentVersion: string, templateId: string): Promise<UpdateStatus> {
    try {
      const response = await fetch(`${this.updateServerUrl}/check-updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentVersion,
          templateId,
          checkDate: new Date().toISOString()
        })
      });

      const data = await response.json();
      
      return {
        currentVersion,
        latestVersion: this.masterVersion,
        availableUpdates: data.availableUpdates || [],
        updateAvailable: this.compareVersions(currentVersion, this.masterVersion) < 0,
        securityUpdatesAvailable: data.securityUpdatesAvailable || false,
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to check for updates:', error);
      throw error;
    }
  }

  async performUpdate(
    templateId: string, 
    targetVersion: string,
    preserveCustomizations: boolean = true,
    autoDeployAfterUpdate: boolean = false
  ): Promise<{
    success: boolean;
    updatedFiles: string[];
    conflicts: CustomerCustomization[];
    deploymentUrl?: string;
    rollbackAvailable: boolean;
  }> {
    try {
      console.log(`🔥 Starting template update to version ${targetVersion}`);

      // 1. Backup current version
      const backupId = await this.createBackup(templateId);
      
      // 2. Analyze customizations
      const customizations = await this.analyzeCustomizations(templateId);
      
      // 3. Get update package
      const updatePackage = await this.getUpdatePackage(targetVersion);
      
      // 4. Apply updates with customization preservation
      const updateResult = await this.applyUpdatesWithCustomizationPreservation(
        templateId,
        updatePackage,
        customizations,
        preserveCustomizations
      );

      // 5. Auto-deploy if requested
      let deploymentUrl;
      if (autoDeployAfterUpdate && updateResult.success) {
        deploymentUrl = await this.triggerAutoDeployment(templateId);
      }

      return {
        success: updateResult.success,
        updatedFiles: updateResult.updatedFiles,
        conflicts: updateResult.conflicts,
        deploymentUrl,
        rollbackAvailable: true
      };

    } catch (error: any) {
      console.error('Template update failed:', error);
      return {
        success: false,
        updatedFiles: [],
        conflicts: [],
        rollbackAvailable: true
      };
    }
  }

  private async createBackup(templateId: string): Promise<string> {
    const backupId = `backup_${templateId}_${Date.now()}`;
    
    // Store current template state in backup
    await fetch(`${this.updateServerUrl}/create-backup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId,
        backupId,
        timestamp: new Date().toISOString()
      })
    });

    return backupId;
  }

  private async analyzeCustomizations(templateId: string): Promise<CustomerCustomization[]> {
    // Get original template files vs current customer files
    const response = await fetch(`${this.updateServerUrl}/analyze-customizations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId })
    });

    return response.json();
  }

  private async getUpdatePackage(targetVersion: string) {
    const response = await fetch(`${this.updateServerUrl}/get-update-package`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetVersion })
    });

    return response.json();
  }

  private async applyUpdatesWithCustomizationPreservation(
    templateId: string,
    updatePackage: any,
    customizations: CustomerCustomization[],
    preserveCustomizations: boolean
  ) {
    const updatedFiles: string[] = [];
    const conflicts: CustomerCustomization[] = [];

    for (const fileUpdate of updatePackage.fileUpdates) {
      const existingCustomization = customizations.find(c => c.file === fileUpdate.file);
      
      if (existingCustomization && preserveCustomizations) {
        if (existingCustomization.preservable) {
          // Merge update with customization
          const mergedContent = await this.mergeContentIntelligently(
            fileUpdate.content,
            existingCustomization.customizedContent,
            existingCustomization.customizationType
          );
          
          if (mergedContent.hasConflicts) {
            conflicts.push(existingCustomization);
          } else {
            updatedFiles.push(fileUpdate.file);
          }
        } else {
          conflicts.push(existingCustomization);
        }
      } else {
        // Direct update - no customizations to preserve
        updatedFiles.push(fileUpdate.file);
      }
    }

    return {
      success: conflicts.length === 0,
      updatedFiles,
      conflicts
    };
  }

  private async mergeContentIntelligently(
    newContent: string,
    customizedContent: string,
    customizationType: string
  ): Promise<{ content: string; hasConflicts: boolean }> {
    
    switch (customizationType) {
      case 'branding':
        // Preserve brand colors, names, logos while updating functionality
        return this.mergeBrandingContent(newContent, customizedContent);
      
      case 'styling':
        // Preserve custom CSS while updating component structure
        return this.mergeStylingContent(newContent, customizedContent);
      
      case 'content':
        // Preserve custom text while updating layout
        return this.mergeContentText(newContent, customizedContent);
      
      default:
        // Conservative merge - flag as conflict if uncertain
        return { content: customizedContent, hasConflicts: true };
    }
  }

  private async mergeBrandingContent(newContent: string, customizedContent: string) {
    // Use regex to preserve brand-specific values while updating code structure
    const brandVariables = this.extractBrandVariables(customizedContent);
    let mergedContent = newContent;
    
    // Replace brand variables in new content
    for (const [key, value] of Object.entries(brandVariables)) {
      mergedContent = mergedContent.replace(
        new RegExp(`${key}:\\s*['"].*?['"]`, 'g'),
        `${key}: '${value}'`
      );
    }
    
    return { content: mergedContent, hasConflicts: false };
  }

  private extractBrandVariables(content: string): Record<string, string> {
    const brandVars: Record<string, string> = {};
    
    // Extract common brand variables
    const patterns = [
      /name:\s*['"]([^'"]+)['"]/g,
      /tagline:\s*['"]([^'"]+)['"]/g,
      /primaryColor:\s*['"]([^'"]+)['"]/g,
      /secondaryColor:\s*['"]([^'"]+)['"]/g,
      /domain:\s*['"]([^'"]+)['"]/g
    ];
    
    patterns.forEach(pattern => {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        const key = match[0].split(':')[0];
        brandVars[key] = match[1];
      }
    });
    
    return brandVars;
  }

  private async mergeStylingContent(newContent: string, customizedContent: string) {
    // Preserve custom CSS classes and styles while updating component structure
    return { content: customizedContent, hasConflicts: true }; // TODO: Implement intelligent CSS merging
  }

  private async mergeContentText(newContent: string, customizedContent: string) {
    // Preserve custom text content while updating surrounding markup
    return { content: customizedContent, hasConflicts: true }; // TODO: Implement content preservation
  }

  private async triggerAutoDeployment(templateId: string): Promise<string> {
    const response = await fetch(`${this.updateServerUrl}/trigger-deployment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId,
        deploymentType: 'auto-update',
        timestamp: new Date().toISOString()
      })
    });

    const result = await response.json();
    return result.deploymentUrl;
  }

  private compareVersions(version1: string, version2: string): number {
    const v1parts = version1.split('.').map(Number);
    const v2parts = version2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
      const v1part = v1parts[i] || 0;
      const v2part = v2parts[i] || 0;
      
      if (v1part < v2part) return -1;
      if (v1part > v2part) return 1;
    }
    return 0;
  }

  async rollbackToVersion(templateId: string, backupId: string): Promise<boolean> {
    try {
      await fetch(`${this.updateServerUrl}/rollback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, backupId })
      });
      return true;
    } catch (error) {
      console.error('Rollback failed:', error);
      return false;
    }
  }
}