import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Search, Loader2, Plus } from "lucide-react";
import { useMandalaData } from "@/hooks/useMandalaData";
import { useAuth } from "@/hooks/useAuth";
import AddEntityModal from '@/components/modals/AddEntityModal';

const DistributorPortal = () => {
  const { distributors, loading } = useMandalaData();
  const { userRoles } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const isManager = userRoles.includes('admin') || userRoles.includes('super_admin') || userRoles.includes('sales_rep');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  // Mock additional data for demonstration
  const mockDistributorData = {
    'Golden Gate Wine Distributors': { lastOrder: 'Dec 10, 2024', totalVolume: '2,400 bottles' },
    'Bay Area Specialty Beverages': { lastOrder: 'Dec 8, 2024', totalVolume: '1,200 bottles' },
    'Sacred Spirits Collective': { lastOrder: 'Nov 28, 2024', totalVolume: '800 bottles' }
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Oakland Distribution Network
          </h2>
          <p className="text-lg text-gray-600">
            Building sacred partnerships across the West Coast wine trade
          </p>
        </div>
        {isManager && (
          <Button 
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Distributor
          </Button>
        )}
      </div>

      {/* Distributor Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <h3 className="text-2xl font-bold text-green-800 mb-2">{distributors.filter(d => d.status === 'active').length}</h3>
          <p className="text-green-600">Active Distributors</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">{distributors.filter(d => d.status === 'pending').length}</h3>
          <p className="text-blue-600">Pending Applications</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">8,400</h3>
          <p className="text-purple-600">Bottles This Month</p>
        </Card>
      </div>

      {/* Distributor List */}
      <div className="space-y-4">
        {distributors.map((distributor) => {
          const mockData = mockDistributorData[distributor.company_name as keyof typeof mockDistributorData];
          
          return (
            <Card key={distributor.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-red-50 border-red-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-red-900">{distributor.company_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      distributor.distributor_tier === 'Premium Partner' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {distributor.distributor_tier}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      distributor.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {distributor.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Contact:</span> {distributor.contact_name}
                    </div>
                    <div>
                      <span className="font-medium">Territory:</span> {distributor.territory}
                    </div>
                    <div>
                      <span className="font-medium">Last Order:</span> {mockData?.lastOrder || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Total Volume:</span> {mockData?.totalVolume || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                    <Search className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {distributors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No distributors found.</p>
        </div>
      )}

      <AddEntityModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        entityType="distributor"
        onSuccess={() => {
          // Refresh data or show success message
          console.log('Distributor added successfully');
        }}
      />
    </section>
  );
};

export default DistributorPortal;
