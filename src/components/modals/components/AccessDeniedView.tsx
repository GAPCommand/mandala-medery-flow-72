
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface AccessDeniedViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessDeniedView = ({ isOpen, onClose }: AccessDeniedViewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-amber-700 flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            Sacred Access Required
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-6">
          <p className="text-gray-600 mb-4">
            Divine blessing required to access product management. 
            Please contact your Sacred Fire Administrator.
          </p>
          <Button onClick={onClose} className="bg-gradient-to-r from-amber-600 to-orange-600">
            Return to Catalog
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessDeniedView;
