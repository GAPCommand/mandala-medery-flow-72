
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeadsManagement from '@/components/crm/LeadsManagement';
import AdminCrmDashboard from '@/components/admin/AdminCrmDashboard';

const CrmLeadsPage = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">CRM Dashboard</TabsTrigger>
          <TabsTrigger value="leads">Contact Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <AdminCrmDashboard />
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-6">
          <LeadsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrmLeadsPage;
