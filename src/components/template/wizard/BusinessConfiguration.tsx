
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BusinessConfigurationProps {
  config: any;
  onConfigUpdate: (updates: any) => void;
}

const BusinessConfiguration: React.FC<BusinessConfigurationProps> = ({
  config,
  onConfigUpdate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h4 className="font-semibold">Pricing Configuration</h4>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select value={config.business.pricing.currency} onValueChange={(value) => onConfigUpdate({
            business: { 
              ...config.business, 
              pricing: { 
                ...config.business.pricing, 
                currency: value 
              }
            }
          })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
              <SelectItem value="GBP">GBP - British Pound</SelectItem>
              <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            step="0.01"
            value={config.business.pricing.taxRate * 100}
            onChange={(e) => onConfigUpdate({
              business: {
                ...config.business,
                pricing: {
                  ...config.business.pricing,
                  taxRate: parseFloat(e.target.value) / 100
                }
              }
            })}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-semibold">Order Configuration</h4>
        <div>
          <Label htmlFor="minOrder">Minimum Order Quantity</Label>
          <Input
            id="minOrder"
            type="number"
            value={config.business.orderFlow.minimumOrderQuantity}
            onChange={(e) => onConfigUpdate({
              business: {
                ...config.business,
                orderFlow: {
                  ...config.business.orderFlow,
                  minimumOrderQuantity: parseInt(e.target.value)
                }
              }
            })}
          />
        </div>
        
        <div>
          <Label htmlFor="freeShipping">Free Shipping Threshold</Label>
          <Input
            id="freeShipping"
            type="number"
            value={config.business.pricing.freeShippingThreshold}
            onChange={(e) => onConfigUpdate({
              business: {
                ...config.business,
                pricing: {
                  ...config.business.pricing,
                  freeShippingThreshold: parseFloat(e.target.value)
                }
              }
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessConfiguration;
