
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrderDetailsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-amber-700">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-amber-600">Order details functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsPage;
