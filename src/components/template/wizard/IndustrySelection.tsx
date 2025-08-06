
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INDUSTRY_PRESETS } from '@/config/template.config';

interface IndustrySelectionProps {
  selectedIndustry: string;
  onIndustrySelect: (industry: string) => void;
}

const IndustrySelection: React.FC<IndustrySelectionProps> = ({
  selectedIndustry,
  onIndustrySelect
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Choose Your Industry Preset</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(INDUSTRY_PRESETS).map(([key, preset]) => (
          <Card 
            key={key}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedIndustry === key ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onIndustrySelect(key)}
          >
            <CardContent className="p-4 text-center">
              <h4 className="font-semibold capitalize">{key}</h4>
              <p className="text-sm text-gray-600 mt-2">{preset.brand?.name}</p>
              <Badge variant="secondary" className="mt-2">
                {preset.brand?.industry}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IndustrySelection;
