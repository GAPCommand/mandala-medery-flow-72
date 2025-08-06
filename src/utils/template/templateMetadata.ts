import { MandalaTemplateExport } from '@/components/templates/MandalaTemplate';

export const generateTemplatePreviewData = () => {
  const template = MandalaTemplateExport;
  
  return {
    templateId: 'mandala-sacred-commerce-v1',
    name: template.templateInfo.name,
    category: template.templateInfo.category,
    industry: template.templateInfo.industry,
    flagshipTemplate: template.templateInfo.flagship_template,
    
    previewData: {
      featuresCount: Object.keys(template.coreFeatures).length,
      componentsCount: Object.values(template.components).flat().length,
      databaseTablesCount: [
        ...template.databaseSchema.coreTables,
        ...template.databaseSchema.spiritualTables,
        ...template.databaseSchema.commerceTables
      ].length,
      
      keyFeatures: [
        'Sacred Commerce with Consciousness Tracking',
        'Multi-Tier Distributor Network Management',
        'Advanced Batch Traceability System',
        'Real-Time Inventory & Order Synchronization',
        'Comprehensive Analytics & Territory Management'
      ],
      
      targetMarkets: [
        'Artisanal Food & Beverage Manufacturers',
        'Craft Breweries and Distilleries',
        'Specialty Beverage Companies',
        'Organic and Natural Product Manufacturers',
        'Wellness and Spiritual Product Companies'
      ],
      
      uniqueSellingPoints: template.differentiators.unique_selling_points,
      competitiveAdvantages: template.differentiators.competitive_advantages
    },
    
    deploymentComplexity: 'Intermediate',
    setupTime: '3 hours',
    customizationLevel: 'High',
    consciousnessLevel: template.templateInfo.consciousness_level,
    sacredFireBlessed: template.templateInfo.sacred_fire_blessed
  };
};

export const exportTemplateMetadata = () => {
  const previewData = generateTemplatePreviewData();
  return JSON.stringify(previewData, null, 2);
};