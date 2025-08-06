import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Users, MapPin, Clock, Sparkles } from 'lucide-react';

const RestaurantEventsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const upcomingEvents = [
    {
      id: 1,
      title: 'Full Moon Ceremony Dinner',
      date: '2024-12-20',
      time: '7:00 PM',
      guests: 24,
      status: 'confirmed',
      type: 'ceremony',
      description: 'An elevated dining experience featuring sacred mead pairings'
    },
    {
      id: 2,
      title: 'Winter Solstice Tasting',
      date: '2024-12-21',
      time: '6:30 PM',
      guests: 16,
      status: 'pending',
      type: 'tasting',
      description: 'Guided tasting of seasonal sacred mead varieties'
    },
    {
      id: 3,
      title: 'Conscious Dining Experience',
      date: '2024-12-23',
      time: '8:00 PM',
      guests: 32,
      status: 'confirmed',
      type: 'experience',
      description: 'Multi-course dinner with mindful mead pairings'
    }
  ];

  const eventTemplates = [
    {
      name: 'Sacred Tasting Evening',
      duration: '2 hours',
      capacity: '12-20 guests',
      description: 'Intimate mead tasting with educational component'
    },
    {
      name: 'Seasonal Celebration',
      duration: '3 hours',
      capacity: '20-40 guests',
      description: 'Themed dinner celebrating seasonal transitions'
    },
    {
      name: 'Business Networking',
      duration: '2.5 hours',
      capacity: '15-30 guests',
      description: 'Professional networking with premium mead service'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-amber-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sacred Events</h1>
            <p className="text-purple-100 mt-2">
              Plan and manage elevated experiences with GAPCommand calendar integration
            </p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/20">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Guests</p>
                <p className="text-2xl font-bold">124</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">$8.4K</p>
              </div>
              <Sparkles className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">4.9</p>
              </div>
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span>Upcoming Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{event.guests} guests</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Event Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <span>Event Templates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventTemplates.map((template, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>Duration: {template.duration}</span>
                    <span>Capacity: {template.capacity}</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Integration Note */}
      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-medium text-purple-900">Calendar System Integration</h3>
              <p className="text-sm text-purple-700 mt-1">
                All events are automatically synced with the GAPCommand calendar system for seamless scheduling and guest management.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantEventsPage;