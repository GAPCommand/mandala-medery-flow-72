
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContentConfigurationProps {
  config: any;
  onContentUpdate: (section: string, field: string, value: string) => void;
}

const ContentConfiguration: React.FC<ContentConfigurationProps> = ({
  config,
  onContentUpdate
}) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h4 className="font-semibold mb-4">Hero Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input
              id="heroTitle"
              value={config.content.heroSection.title}
              onChange={(e) => onContentUpdate('heroSection', 'title', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Input
              id="heroSubtitle"
              value={config.content.heroSection.subtitle}
              onChange={(e) => onContentUpdate('heroSection', 'subtitle', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="heroDescription">Hero Description</Label>
          <Textarea
            id="heroDescription"
            value={config.content.heroSection.description}
            onChange={(e) => onContentUpdate('heroSection', 'description', e.target.value)}
            rows={3}
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4">Product Terminology</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="singular">Singular Form</Label>
            <Input
              id="singular"
              value={config.content.productTerminology.singular}
              onChange={(e) => onContentUpdate('productTerminology', 'singular', e.target.value)}
              placeholder="Product"
            />
          </div>
          <div>
            <Label htmlFor="plural">Plural Form</Label>
            <Input
              id="plural"
              value={config.content.productTerminology.plural}
              onChange={(e) => onContentUpdate('productTerminology', 'plural', e.target.value)}
              placeholder="Products"
            />
          </div>
          <div>
            <Label htmlFor="category">Category Name</Label>
            <Input
              id="category"
              value={config.content.productTerminology.category}
              onChange={(e) => onContentUpdate('productTerminology', 'category', e.target.value)}
              placeholder="Premium Products"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentConfiguration;
