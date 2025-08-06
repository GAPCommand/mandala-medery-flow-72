import { useState } from 'react';
import { TemplateDeploymentService } from '@/services/template/TemplateDeploymentService';

export const useTemplateDeployment = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const deployToPANDAB = async (options?: { creatorId?: string; baseUrl?: string; includeAssets?: boolean }) => {
    setIsDeploying(true);
    setError(null);
    
    try {
      const result = await TemplateDeploymentService.deployToPANDAB(options);
      setDeploymentResult(result);
      
      if (!result.success) {
        setError(result.error);
      }
      
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Unknown deployment error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsDeploying(false);
    }
  };

  const validateTemplate = async (options?: { creatorId?: string; baseUrl?: string; includeAssets?: boolean }) => {
    try {
      return await TemplateDeploymentService.validateTemplateData(options);
    } catch (err: any) {
      return { valid: false, errors: [err.message] };
    }
  };

  const convertTemplate = async (options?: { creatorId?: string; baseUrl?: string; includeAssets?: boolean }) => {
    try {
      return await TemplateDeploymentService.convertToTemplateData(options);
    } catch (err: any) {
      throw new Error(`Template conversion failed: ${err.message}`);
    }
  };

  return {
    deployToPANDAB,
    validateTemplate,
    convertTemplate,
    isDeploying,
    deploymentResult,
    error
  };
};