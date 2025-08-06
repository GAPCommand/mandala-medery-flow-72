
import React from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
  return (
    <Card className="p-6 bg-white border-amber-200">
      <h3 className="text-xl font-bold text-amber-700 mb-4">Get In Touch Directly</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-amber-600" />
          <div>
            <p className="font-medium text-gray-800">Email</p>
            <p className="text-gray-600">distribution@mandalamedery.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-amber-600" />
          <div>
            <p className="font-medium text-gray-800">Phone</p>
            <p className="text-gray-600">1-800-MANDALA (626-3252)</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-amber-600" />
          <div>
            <p className="font-medium text-gray-800">Headquarters</p>
            <p className="text-gray-600">San Francisco Bay Area, CA</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactInfo;
