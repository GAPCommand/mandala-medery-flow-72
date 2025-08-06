
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  Wine, 
  Calendar, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Sparkles,
  ChefHat,
  MapPin,
  Bell
} from 'lucide-react';

const RestaurantDashboard = () => {
  const { userProfile } = useAuth();

  const quickStats = [
    { icon: Wine, label: 'Monthly Orders', value: '12', trend: '+15%', color: 'text-purple-600' },
    { icon: Users, label: 'Customers Served', value: '850', trend: '+8%', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'Sacred Experiences', value: '34', trend: '+22%', color: 'text-amber-600' },
    { icon: Calendar, label: 'Events This Month', value: '6', trend: '+2', color: 'text-green-600' }
  ];

  const upcomingEvents = [
    { name: 'Full Moon Ceremony Dinner', date: '2024-12-20', guests: 24, status: 'confirmed' },
    { name: 'Winter Solstice Tasting', date: '2024-12-21', guests: 16, status: 'pending' },
    { name: 'Conscious Dining Experience', date: '2024-12-23', guests: 32, status: 'confirmed' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-amber-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userProfile?.venue_name || 'Sacred Partner'}!</h1>
            <p className="text-purple-100 mt-2">
              Elevating consciousness through sacred mead experiences
            </p>
            <div className="flex items-center space-x-4 mt-3 text-sm">
              <div className="flex items-center space-x-1">
                <ChefHat className="h-4 w-4" />
                <span>{userProfile?.cuisine_type || 'Fine Dining'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{userProfile?.territory_region || 'Bay Area'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{userProfile?.seating_capacity || 80} seats</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-white/20 text-white mb-2">
              {userProfile?.venue_type?.toUpperCase() || 'RESTAURANT'} PARTNER
            </Badge>
            <div className="text-2xl font-bold">Level 3</div>
            <div className="text-purple-100 text-sm">Sacred Commerce Tier</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.trend}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span>Sacred Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700">
              <Wine className="h-4 w-4 mr-2" />
              Order Sacred Mead
            </Button>
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Plan Sacred Event
            </Button>
            <Button variant="outline" className="w-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Access Training Materials
            </Button>
            <Button variant="outline" className="w-full">
              <ChefHat className="h-4 w-4 mr-2" />
              Download Menu Templates
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Sacred Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <span>Upcoming Sacred Events</span>
              </div>
              <Button size="sm" variant="outline">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{event.name}</h4>
                    <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{event.date}</span>
                    <span>{event.guests} guests</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sacred Knowledge & Training */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>Sacred Knowledge Hub</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <h4 className="font-medium text-amber-900 mb-2">New Training Available</h4>
              <p className="text-sm text-amber-700 mb-3">
                "Consciousness Pairing: Sacred Mead & Cuisine Harmony"
              </p>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                Start Training
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Sacred Origins Course</span>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Menu Integration Guide</span>
                <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Customer Experience Design</span>
                <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Sacred Valley Original - 2 Cases</p>
                  <p className="text-sm text-gray-600">Order #RST-789123 • Dec 15, 2024</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Delivered</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Himalayan Reserve - 1 Case</p>
                  <p className="text-sm text-gray-600">Order #RST-789124 • Dec 12, 2024</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Shipped</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Saffron Blessed Mead - 3 Cases</p>
                  <p className="text-sm text-gray-600">Order #RST-789125 • Dec 10, 2024</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Delivered</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-purple-600" />
              <span>Sacred Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="font-medium text-purple-900">New Limited Edition Available</p>
                <p className="text-sm text-purple-700">Winter Solstice Sacred Blend now available for pre-order</p>
                <p className="text-xs text-purple-600 mt-1">2 hours ago</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900">Sacred Event Template Added</p>
                <p className="text-sm text-blue-700">New "Consciousness Dinner" menu template is ready</p>
                <p className="text-xs text-blue-600 mt-1">1 day ago</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-900">Training Module Completed</p>
                <p className="text-sm text-green-700">Your team completed "Sacred Origins" certification</p>
                <p className="text-xs text-green-600 mt-1">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
