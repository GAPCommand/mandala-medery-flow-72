
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, TrendingUp, Settings, Filter } from 'lucide-react';

interface Territory {
  id: string;
  name: string;
  distributors: number;
  revenue: number;
  status: 'active' | 'inactive' | 'pending';
  manager: string;
  coordinates: { lat: number; lng: number };
  coverage: number;
}

const TerritoryMap = () => {
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const territories: Territory[] = [
    { 
      id: '1', 
      name: 'Northern California', 
      distributors: 12, 
      revenue: 245000, 
      status: 'active', 
      manager: 'Sarah Chen',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      coverage: 85
    },
    { 
      id: '2', 
      name: 'Pacific Northwest', 
      distributors: 8, 
      revenue: 180000, 
      status: 'active', 
      manager: 'Mike Rodriguez',
      coordinates: { lat: 47.6062, lng: -122.3321 },
      coverage: 72
    },
    { 
      id: '3', 
      name: 'Southwest Region', 
      distributors: 15, 
      revenue: 320000, 
      status: 'active', 
      manager: 'Lisa Thompson',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      coverage: 90
    }
  ];

  const filteredTerritories = territories.filter(territory => 
    filterStatus === 'all' || territory.status === filterStatus
  );

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-800">Territory Coverage Map</h2>
          <p className="text-amber-600">Sacred distribution network visualization</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-amber-200 rounded-md"
          >
            <option value="all">All Territories</option>
            <option value="active">Active Only</option>
            <option value="pending">Pending</option>
          </select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-amber-800">Distribution Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg border border-amber-200 relative overflow-hidden">
              {/* Map Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                  <p className="text-amber-700 font-medium">Interactive Territory Map</p>
                  <p className="text-amber-600 text-sm">Real-time coverage visualization</p>
                </div>
              </div>
              
              {/* Territory Markers */}
              {filteredTerritories.map((territory, index) => (
                <div
                  key={territory.id}
                  className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-200 ${
                    territory.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  } ${selectedTerritory?.id === territory.id ? 'scale-150 ring-4 ring-white' : 'hover:scale-125'}`}
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`
                  }}
                  onClick={() => setSelectedTerritory(territory)}
                  title={territory.name}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Territory Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-800">Territory Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedTerritory ? (
              <>
                <div>
                  <h3 className="font-bold text-amber-800 text-lg">{selectedTerritory.name}</h3>
                  <Badge className={`mt-1 ${
                    selectedTerritory.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedTerritory.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-amber-600">Manager:</span>
                    <span className="font-medium">{selectedTerritory.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-600">Distributors:</span>
                    <span className="font-medium">{selectedTerritory.distributors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-600">Revenue:</span>
                    <span className="font-medium">${selectedTerritory.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-600">Coverage:</span>
                    <span className="font-medium">{selectedTerritory.coverage}%</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200">
                  <Button size="sm" className="w-full mb-2">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Territory
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    View Analytics
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                <p className="text-amber-600">Select a territory to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Territory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTerritories.map((territory) => (
          <Card 
            key={territory.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTerritory?.id === territory.id ? 'ring-2 ring-amber-400' : ''
            }`}
            onClick={() => setSelectedTerritory(territory)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-amber-800">{territory.name}</h3>
                <Badge className={
                  territory.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }>
                  {territory.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Users className="h-3 w-3 text-amber-600 mr-1" />
                  <span>{territory.distributors}</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span>${territory.revenue.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TerritoryMap;
