
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddTerritoryForm from '@/components/forms/AddTerritoryForm';
import AddDistributorForm from '@/components/forms/AddDistributorForm';
import AddOrderForm from '@/components/forms/AddOrderForm';
import AddUserForm from '@/components/forms/AddUserForm';

interface AddEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: 'territory' | 'distributor' | 'order' | 'user' | null;
  onSuccess?: () => void;
}

const AddEntityModal = ({ isOpen, onClose, entityType, onSuccess }: AddEntityModalProps) => {
  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  const renderForm = () => {
    switch (entityType) {
      case 'territory':
        return <AddTerritoryForm onSuccess={handleSuccess} onCancel={onClose} />;
      case 'distributor':
        return <AddDistributorForm onSuccess={handleSuccess} onCancel={onClose} />;
      case 'order':
        return <AddOrderForm onSuccess={handleSuccess} onCancel={onClose} />;
      case 'user':
        return <AddUserForm onSuccess={handleSuccess} onCancel={onClose} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (entityType) {
      case 'territory':
        return 'Add Territory';
      case 'distributor':
        return 'Add Distributor';
      case 'order':
        return 'Create Order';
      case 'user':
        return 'Invite User';
      default:
        return 'Add Entity';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntityModal;
