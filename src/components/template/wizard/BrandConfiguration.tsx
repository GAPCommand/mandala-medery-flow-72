
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BrandConfigurationProps {
  config: any;
  onBrandUpdate: (field: string, value: any) => void;
}

const BrandConfiguration: React.FC<BrandConfigurationProps> = ({
  config,
  onBrandUpdate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="brandName">Brand Name</Label>
          <Input
            id="brandName"
            value={config.brand.name}
            onChange={(e) => onBrandUpdate('name', e.target.value)}
            placeholder="Your Brand Name"
          />
        </div>
        
        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={config.brand.tagline}
            onChange={(e) => onBrandUpdate('tagline', e.target.value)}
            placeholder="Your Brand Tagline"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={config.brand.description}
            onChange={(e) => onBrandUpdate('description', e.target.value)}
            placeholder="Brief description of your brand..."
            rows={3}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Contact Email</Label>
          <Input
            id="email"
            type="email"
            value={config.brand.contact.email}
            onChange={(e) => onBrandUpdate('contact', { 
              ...config.brand.contact, 
              email: e.target.value 
            })}
            placeholder="hello@yourbrand.com"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={config.brand.contact.phone}
            onChange={(e) => onBrandUpdate('contact', { 
              ...config.brand.contact, 
              phone: e.target.value 
            })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div>
          <Label htmlFor="domain">Website Domain</Label>
          <Input
            id="domain"
            value={config.brand.domain}
            onChange={(e) => onBrandUpdate('domain', e.target.value)}
            placeholder="yourbrand.com"
          />
        </div>
      </div>
    </div>
  );
};

export default BrandConfiguration;
