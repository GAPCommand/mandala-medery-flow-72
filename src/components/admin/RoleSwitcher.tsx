
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Crown,
  Users,
  ChefHat,
  Eye,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

const RoleSwitcher = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const { userRoles } = useAuthContext();
  const navigate = useNavigate();

  const isAdmin = userRoles.includes('admin') || userRoles.includes('super_admin') || userRoles.includes('staff');

  if (!isAdmin) {
    return null;
  }

  const roles = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access and management',
      icon: Crown,
      path: '/dashboard',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'distributor',
      name: 'Distributor',
      description: 'Product ordering and territory management',
      icon: Users,
      path: '/distributor',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'restaurant',
      name: 'Restaurant Partner',
      description: 'Sacred dining experiences and events',
      icon: ChefHat,
      path: '/restaurant',
      color: 'bg-amber-100 text-amber-800'
    }
  ];

  const handleRoleSwitch = () => {
    const role = roles.find(r => r.id === selectedRole);
    if (role) {
      navigate(role.path);
    }
  };

  const currentPath = window.location.pathname;
  const currentRole = roles.find(r => 
    currentPath.startsWith(r.path) || 
    (r.id === 'admin' && currentPath.startsWith('/dashboard'))
  );

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-purple-600" />
          <span>Role Experience Center</span>
          <Badge className="bg-purple-100 text-purple-800">Admin Only</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          As an administrator, you can experience the platform from different user perspectives to better understand each role's workflow and needs.
        </p>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Switch to Role:
            </label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role to experience..." />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    <div className="flex items-center space-x-2">
                      <role.icon className="h-4 w-4" />
                      <span>{role.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleRoleSwitch}
            disabled={!selectedRole}
            className="flex items-center space-x-2"
          >
            <ArrowRight className="h-4 w-4" />
            <span>Switch View</span>
          </Button>
        </div>

        {/* Current Role Indicator */}
        {currentRole && (
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <currentRole.icon className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Currently viewing as:</span>
              </div>
              <Badge className={currentRole.color}>
                {currentRole.name}
              </Badge>
            </div>
            {currentRole.id !== 'admin' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Back to Admin</span>
              </Button>
            )}
          </div>
        )}

        {/* Role Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {roles.map((role) => (
            <div 
              key={role.id}
              className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(role.path)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${role.color.replace('text-', 'bg-').replace('100', '200')}`}>
                  <role.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{role.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{role.description}</p>
                  <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-xs">
                    Preview Experience →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleSwitcher;
