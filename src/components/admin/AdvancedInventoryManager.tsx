
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  RefreshCw, 
  Plus,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { useMandalaData } from '@/hooks/useMandalaData';

interface BatchInfo {
  id: string;
  batchNumber: string;
  productName: string;
  productionDate: string;
  expiryDate: string;
  quantityProduced: number;
  quantityAvailable: number;
  status: 'active' | 'reserved' | 'depleted' | 'expired';
  sacredSource: string;
  consciousnessLevel: number;
}

const AdvancedInventoryManager = () => {
  const { inventoryBatches, products } = useMandalaData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showLowStock, setShowLowStock] = useState(false);

  // Mock data for demonstration
  const mockBatches: BatchInfo[] = [
    {
      id: '1',
      batchNumber: 'KSH-2024-001',
      productName: 'Sacred Valley Original',
      productionDate: '2024-11-15',
      expiryDate: '2026-11-15',
      quantityProduced: 500,
      quantityAvailable: 420,
      status: 'active',
      sacredSource: 'Gulmarg Sacred Valley',
      consciousnessLevel: 750
    },
    {
      id: '2',
      batchNumber: 'SAF-2024-002',
      productName: 'Saffron Blessed Mead',
      productionDate: '2024-10-30',
      expiryDate: '2026-10-30',
      quantityProduced: 300,
      quantityAvailable: 25,
      status: 'active',
      sacredSource: 'Pahalgam Monastery Gardens',
      consciousnessLevel: 850
    },
    {
      id: '3',
      batchNumber: 'HIM-2024-003',
      productName: 'Himalayan Elixir',
      productionDate: '2024-12-01',
      expiryDate: '2026-12-01',
      quantityProduced: 200,
      quantityAvailable: 200,
      status: 'active',
      sacredSource: 'Himalayan Sacred Peaks',
      consciousnessLevel: 900
    }
  ];

  const filteredBatches = mockBatches.filter(batch => {
    const matchesSearch = batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    const matchesLowStock = !showLowStock || (batch.quantityAvailable / batch.quantityProduced) < 0.2;
    
    return matchesSearch && matchesStatus && matchesLowStock;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-blue-100 text-blue-800';
      case 'depleted': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockLevel = (available: number, produced: number) => {
    const percentage = (available / produced) * 100;
    if (percentage < 20) return { level: 'Low', color: 'text-red-600' };
    if (percentage < 50) return { level: 'Medium', color: 'text-yellow-600' };
    return { level: 'Good', color: 'text-green-600' };
  };

  const totalInventoryValue = mockBatches.reduce((sum, batch) => 
    sum + (batch.quantityAvailable * 150), 0
  );

  const lowStockItems = mockBatches.filter(batch => 
    (batch.quantityAvailable / batch.quantityProduced) < 0.2
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-800">Advanced Inventory Management</h1>
          <p className="text-amber-600 mt-1">Sacred batch tracking and consciousness-aware inventory control</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Batch
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{mockBatches.length}</p>
                <p className="text-sm text-gray-600">Active Batches</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${totalInventoryValue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Inventory Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{lowStockItems}</p>
                <p className="text-sm text-gray-600">Low Stock Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-sm text-gray-600">Fulfillment Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search batches or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="reserved">Reserved</option>
              <option value="depleted">Depleted</option>
              <option value="expired">Expired</option>
            </select>
            <Button
              variant={showLowStock ? "default" : "outline"}
              onClick={() => setShowLowStock(!showLowStock)}
              size="sm"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Low Stock Only
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Batch Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sacred Inventory Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Batch Number</th>
                  <th className="text-left p-3">Product</th>
                  <th className="text-left p-3">Production Date</th>
                  <th className="text-left p-3">Stock Level</th>
                  <th className="text-left p-3">Available/Produced</th>
                  <th className="text-left p-3">Sacred Source</th>
                  <th className="text-left p-3">Consciousness</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBatches.map((batch) => {
                  const stockLevel = getStockLevel(batch.quantityAvailable, batch.quantityProduced);
                  return (
                    <tr key={batch.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{batch.batchNumber}</td>
                      <td className="p-3">{batch.productName}</td>
                      <td className="p-3">{new Date(batch.productionDate).toLocaleDateString()}</td>
                      <td className="p-3">
                        <span className={`font-medium ${stockLevel.color}`}>
                          {stockLevel.level}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{batch.quantityAvailable}</span>
                          <span className="text-gray-400">/</span>
                          <span className="text-gray-600">{batch.quantityProduced}</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2 ml-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(batch.quantityAvailable / batch.quantityProduced) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-sm">{batch.sacredSource}</td>
                      <td className="p-3">
                        <Badge className="bg-purple-100 text-purple-800">
                          {batch.consciousnessLevel}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusColor(batch.status)}>
                          {batch.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Reserve</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Inventory Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Package className="h-6 w-6" />
              <span>Create Batch</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Reorder Alert</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedInventoryManager;
