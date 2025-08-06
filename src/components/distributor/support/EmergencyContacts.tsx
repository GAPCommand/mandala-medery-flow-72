
import React from 'react';
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { EmergencyContact } from './types';

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
}

const EmergencyContacts = ({ contacts }: EmergencyContactsProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
      <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
        <AlertCircle className="h-6 w-6 mr-2" />
        Emergency Sacred Support
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contacts.map((contact, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-red-200 text-center">
            <h3 className="font-bold text-red-800 mb-2">{contact.name}</h3>
            <p className="text-lg font-mono text-red-700 mb-2">{contact.phone}</p>
            <p className="text-sm text-red-600">{contact.description}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-red-600 mt-4 text-center">
        For non-emergency issues, please use regular support channels above
      </p>
    </Card>
  );
};

export default EmergencyContacts;
