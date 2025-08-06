
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useMandalaData } from '@/hooks/useMandalaData';
import { toast } from 'sonner';

interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface AddOrderFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddOrderForm = ({ onSuccess, onCancel }: AddOrderFormProps) => {
  const { user } = useAuth();
  const { distributors, products, loading: dataLoading } = useMandalaData();
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    distributor_id: '',
    estimated_delivery: ''
  });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.distributor_id) {
      newErrors.distributor_id = 'Please select a distributor';
    }
    
    if (orderItems.length === 0) {
      newErrors.orderItems = 'Please add at least one product to the order';
    }
    
    orderItems.forEach((item, index) => {
      if (item.quantity <= 0) {
        newErrors[`item_${index}_quantity`] = 'Quantity must be greater than 0';
      }
      if (item.unit_price < 0) {
        newErrors[`item_${index}_price`] = 'Price cannot be negative';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addOrderItem = () => {
    if (products.length > 0) {
      const firstProduct = products[0];
      setOrderItems(prev => [...prev, {
        product_id: firstProduct.id,
        product_name: firstProduct.name,
        quantity: 1,
        unit_price: firstProduct.wholesale_price || 0,
        total_price: firstProduct.wholesale_price || 0
      }]);
    } else {
      toast.error('No products available to add');
    }
  };

  const updateOrderItem = (index: number, field: keyof OrderItem, value: any) => {
    setOrderItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      
      if (field === 'product_id') {
        const product = products.find(p => p.id === value);
        if (product) {
          updated[index].product_name = product.name;
          updated[index].unit_price = product.wholesale_price || 0;
          updated[index].total_price = updated[index].quantity * (product.wholesale_price || 0);
        }
      } else if (field === 'quantity' || field === 'unit_price') {
        updated[index].total_price = updated[index].quantity * updated[index].unit_price;
      }
      
      return updated;
    });
    
    // Clear related errors when user makes changes
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`item_${index}_quantity`];
      delete newErrors[`item_${index}_price`];
      delete newErrors.orderItems;
      return newErrors;
    });
  };

  const removeOrderItem = (index: number) => {
    setOrderItems(prev => prev.filter((_, i) => i !== index));
    
    // Clear related errors
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`item_${index}_quantity`];
      delete newErrors[`item_${index}_price`];
      if (orderItems.length <= 1) {
        delete newErrors.orderItems;
      }
      return newErrors;
    });
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total_price, 0);
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 3).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }
    
    if (!user) {
      toast.error('Authentication required');
      return;
    }

    setLoading(true);
    
    try {
      const orderNumber = generateOrderNumber();
      const totalAmount = calculateTotal();

      // Get distributor address for destination_address
      const selectedDistributor = distributors.find(d => d.id === formData.distributor_id);
      const destinationAddress = selectedDistributor?.address || {};

      // Create the order using mandala_orders table with all required fields
      const { data: order, error: orderError } = await supabase
        .from('mandala_orders')
        .insert({
          order_number: orderNumber,
          distributor_id: formData.distributor_id,
          order_status: 'pending',
          order_type: 'wholesale',
          subtotal: totalAmount,
          discount_amount: 0,
          tax_amount: 0,
          shipping_amount: 0,
          total_amount: totalAmount,
          destination_address: destinationAddress,
          estimated_delivery: formData.estimated_delivery || null,
          order_date: new Date().toISOString(),
          metadata: {
            created_by: user.id,
            item_count: orderItems.length,
            order_source: 'admin_form'
          }
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      if (order && orderItems.length > 0) {
        const orderItemsData = orderItems.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          line_total: item.total_price
        }));

        const { error: itemsError } = await supabase
          .from('mandala_order_items')
          .insert(orderItemsData);

        if (itemsError) throw itemsError;
      }

      toast.success(`Order ${orderNumber} created successfully!`);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading form data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-amber-700">Create New Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="distributor">Distributor *</Label>
              <Select 
                value={formData.distributor_id} 
                onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, distributor_id: value }));
                  setErrors(prev => ({ ...prev, distributor_id: '' }));
                }}
                required
              >
                <SelectTrigger className={errors.distributor_id ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select distributor" />
                </SelectTrigger>
                <SelectContent>
                  {distributors.filter(d => d.status === 'active').map((distributor) => (
                    <SelectItem key={distributor.id} value={distributor.id}>
                      {distributor.company_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.distributor_id && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.distributor_id}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="estimated_delivery">Estimated Delivery</Label>
              <Input
                id="estimated_delivery"
                type="date"
                value={formData.estimated_delivery}
                onChange={(e) => setFormData(prev => ({ ...prev, estimated_delivery: e.target.value }))}
              />
            </div>
          </div>

          {/* Order Items Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Order Items</h3>
              <Button 
                type="button" 
                onClick={addOrderItem} 
                variant="outline" 
                size="sm"
                disabled={products.length === 0}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Product
              </Button>
            </div>

            {errors.orderItems && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-red-600 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.orderItems}
                </p>
              </div>
            )}

            {orderItems.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end p-3 border rounded">
                <div>
                  <Label>Product</Label>
                  <Select 
                    value={item.product_id} 
                    onValueChange={(value) => updateOrderItem(index, 'product_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateOrderItem(index, 'quantity', parseInt(e.target.value) || 1)}
                    className={errors[`item_${index}_quantity`] ? 'border-red-500' : ''}
                  />
                  {errors[`item_${index}_quantity`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`item_${index}_quantity`]}</p>
                  )}
                </div>
                <div>
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.unit_price}
                    onChange={(e) => updateOrderItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                    className={errors[`item_${index}_price`] ? 'border-red-500' : ''}
                  />
                  {errors[`item_${index}_price`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`item_${index}_price`]}</p>
                  )}
                </div>
                <div>
                  <Label>Total</Label>
                  <div className="h-9 flex items-center font-semibold">
                    ${item.total_price.toFixed(2)}
                  </div>
                </div>
                <div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeOrderItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {orderItems.length > 0 && (
              <div className="flex justify-end">
                <Badge variant="secondary" className="text-lg p-2">
                  Total: ${calculateTotal().toFixed(2)}
                </Badge>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || orderItems.length === 0}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                'Create Order'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddOrderForm;
