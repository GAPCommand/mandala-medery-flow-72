
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Search, Loader2, Truck, Package, MapPin, Shield } from "lucide-react";
import { useMandalaData } from "@/hooks/useMandalaData";

const OrderManagement = () => {
  const { orders, shipments, loading } = useMandalaData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-amber-100 text-amber-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getShipmentForOrder = (orderId: string) => {
    return shipments.find(shipment => shipment.order_id === orderId);
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'pending': return 10;
      case 'processing': return 30;
      case 'preparing': return 50;
      case 'in_transit': return 75;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  // Mock data for demonstration since we don't have actual orders yet
  const mockOrders = [
    {
      id: "ORD-2024-001",
      order_number: "ORD-2024-001",
      distributor: { company_name: "Golden Gate Wine Distributors" },
      products: "Sacred Valley Original (120), Saffron Blessed (60)",
      total_amount: 4589.80,
      order_status: "in_transit",
      order_date: "2024-12-12",
      estimated_delivery: "2024-12-18",
      origin: "Kashmir Facility",
      destination: "Oakland Warehouse"
    },
    {
      id: "ORD-2024-002",
      order_number: "ORD-2024-002",
      distributor: { company_name: "Bay Area Specialty Beverages" },
      products: "Sacred Valley Original (200), Himalayan Reserve (24)",
      total_amount: 6078.76,
      order_status: "processing",
      order_date: "2024-12-13",
      estimated_delivery: "2024-12-20",
      origin: "Kashmir Facility",
      destination: "Oakland Warehouse"
    },
    {
      id: "ORD-2024-003",
      order_number: "ORD-2024-003",
      distributor: { company_name: "Sacred Spirits Collective" },
      products: "Saffron Blessed (80), Himalayan Reserve (40)",
      total_amount: 4598.40,
      order_status: "pending",
      order_date: "2024-12-14",
      estimated_delivery: "2024-12-22",
      origin: "Kashmir Facility",
      destination: "SF Distribution Center"
    }
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Kashmir → Oakland Sacred Pipeline
          </h2>
          <p className="text-lg text-gray-600">
            Tracking sacred mead from Himalayan valleys to California distributors with divine precision
          </p>
        </div>
        <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
          <Package className="h-4 w-4 mr-2" />
          Create Sacred Order
        </Button>
      </div>

      {/* Enhanced Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">
                {displayOrders.filter(o => o.order_status === 'in_transit').length}
              </h3>
              <p className="text-blue-600">Sacred Journeys</p>
            </div>
            <Truck className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-amber-800 mb-2">
                {displayOrders.filter(o => o.order_status === 'processing').length}
              </h3>
              <p className="text-amber-600">Divine Preparation</p>
            </div>
            <Package className="h-8 w-8 text-amber-500" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {displayOrders.filter(o => o.order_status === 'pending').length}
              </h3>
              <p className="text-gray-600">Awaiting Blessing</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-500" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                ${displayOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0).toLocaleString()}
              </h3>
              <p className="text-green-600">Pipeline Abundance</p>
            </div>
            <Shield className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Enhanced Order List with Shipment Tracking */}
      <div className="space-y-4">
        {displayOrders.map((order) => {
          const shipment = getShipmentForOrder(order.id);
          const progressValue = getProgressValue(order.order_status);
          
          return (
            <Card key={order.id} className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-orange-50 border-orange-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-orange-900">{order.order_number}</h3>
                    <Badge className={`${getStatusColor(order.order_status)}`}>
                      {order.order_status.replace('_', ' ')}
                    </Badge>
                    <span className="text-2xl font-bold text-orange-600">
                      ${order.total_amount?.toLocaleString() || '0'}
                    </span>
                    {shipment?.divine_protection_applied && (
                      <Badge className="bg-purple-100 text-purple-800">
                        <Shield className="h-3 w-3 mr-1" />
                        Divine Protection
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{order.distributor?.company_name}</p>
                  <p className="text-sm text-gray-500">{order.products}</p>
                </div>
              </div>

              {/* Progress Tracking */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Sacred Journey Progress</span>
                  <span className="text-sm text-gray-500">{progressValue}%</span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>

              {/* Shipment Details */}
              {shipment && (
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-indigo-800">
                        Tracking: {shipment.tracking_number || 'TRK-' + shipment.id.slice(0, 8)}
                      </span>
                    </div>
                    <Badge className="bg-indigo-100 text-indigo-800 text-xs">
                      {shipment.carrier || 'Sacred Express'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span>From: {shipment.origin_location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span>To: {shipment.destination_location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span>Type: {shipment.shipment_type}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm border-t border-orange-200 pt-4">
                <div>
                  <span className="font-medium text-gray-600">Order Date:</span>
                  <p className="text-orange-700">{new Date(order.order_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Expected Delivery:</span>
                  <p className="text-orange-700">{order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString() : 'TBD'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Sacred Route:</span>
                  <p className="text-orange-700">{order.origin} → {order.destination}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                    <Search className="h-4 w-4 mr-1" />
                    Track Journey
                  </Button>
                  <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                    <Calendar className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {displayOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No sacred orders found.</p>
        </div>
      )}
    </section>
  );
};

export default OrderManagement;
