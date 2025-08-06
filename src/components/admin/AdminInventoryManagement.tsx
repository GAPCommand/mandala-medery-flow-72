
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMandalaData } from '@/hooks/useMandalaData';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Calendar,
  MapPin,
  Settings,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminInventoryManagement = () => {
  const { products, inventoryBatches, loading } = useMandalaData();
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-2 text-amber-600">Loading sacred inventory...</p>
      </div>
    );
  }

  // Calculate stock levels from inventory batches
  const getProductStockLevel = (productId: string) => {
    const productBatches = inventoryBatches.filter(batch => 
      batch.product_id === productId && batch.status === 'active'
    );
    return productBatches.reduce((sum, batch) => sum + (batch.quantity_available || 0), 0);
  };

  const lowStockProducts = products.filter(product => getProductStockLevel(product.id) < 50);
  const totalInventoryValue = products.reduce((sum, p) => {
    const stockLevel = getProductStockLevel(p.id);
    return sum + (stockLevel * (p.wholesale_price || 0));
  }, 0);
  const activeBatches = inventoryBatches.filter(b => b.status === 'active');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-700">Sacred Inventory Management</h1>
          <p className="text-amber-600 mt-1">
            {isAdvancedMode ? 'Advanced inventory control and analytics' : 'Essential inventory overview'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsAdvancedMode(!isAdvancedMode)}
            className="flex items-center space-x-2"
          >
            {isAdvancedMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{isAdvancedMode ? 'Simple View' : 'Advanced View'}</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Batch</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-amber-600" />
              <div>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-sm text-gray-600">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{lowStockProducts.length}</p>
                <p className="text-sm text-gray-600">Low Stock Alerts</p>
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
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{activeBatches.length}</p>
                <p className="text-sm text-gray-600">Active Batches</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Inventory Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Sacred Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => {
              const stockLevel = getProductStockLevel(product.id);
              const isLowStock = stockLevel < 50;
              const stockPercentage = Math.min((stockLevel / 200) * 100, 100);
              
              return (
                <div key={product.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category} | ${product.wholesale_price}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                        {stockLevel} units
                      </p>
                      {isLowStock && (
                        <Badge variant="destructive" className="text-xs">Low Stock</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Stock Level</span>
                      <span>{stockLevel}/200 optimal</span>
                    </div>
                    <Progress 
                      value={stockPercentage} 
                      className={`h-2 ${isLowStock ? 'text-red-600' : 'text-green-600'}`}
                    />
                  </div>
                  
                  {isAdvancedMode && (
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Reorder Point:</span>
                        <p className="font-medium">50 units</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Lead Time:</span>
                        <p className="font-medium">14 days</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Restock:</span>
                        <p className="font-medium">Dec 1, 2024</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Turnover Rate:</span>
                        <p className="font-medium">2.3x/month</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sacred Batches Overview */}
      {isAdvancedMode && (
        <Card>
          <CardHeader>
            <CardTitle>Sacred Batch Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeBatches.map((batch) => (
                <div key={batch.id} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-emerald-900">Batch: {batch.batch_number}</h4>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      ⚡ {batch.consciousness_blessing_level}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span>Produced: {new Date(batch.production_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Package className="h-3 w-3 text-gray-500" />
                      <span>Available: {batch.quantity_available}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span>Source: {batch.sacred_honey_source}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Settings className="h-3 w-3 text-gray-500" />
                      <span>Status: {batch.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts */}
      {lowStockProducts.length > 0 && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Inventory Alerts</h4>
                <p className="text-amber-700 text-sm mt-1">
                  {lowStockProducts.length} products are running low on stock and need immediate attention.
                </p>
                <div className="mt-2">
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    Review Low Stock Items
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminInventoryManagement;
