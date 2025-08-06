
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, TrendingUp, Target, Crown, Shield, Globe, Calendar } from "lucide-react";

const MyTerritory = () => {
  // Mock territory data - in real app this would come from the user's profile/territory assignment
  const territoryData = {
    name: "Northern California Bay Area",
    status: "Active",
    tier: "Premium Partner",
    exclusiveZones: ["San Francisco", "Oakland", "Berkeley", "Marin County"],
    population: "2.3M",
    demographicMatch: "92%",
    competitorPresence: "Low",
    marketPotential: "High",
    assignedDate: "2024-01-15",
    performanceScore: 87,
    monthlyTarget: 500,
    currentProgress: 342,
    quarterlyGoal: 1500,
    customers: {
      active: 23,
      prospects: 47,
      total: 70
    }
  };

  const expansionRequests = [
    { zone: "South Bay Peninsula", status: "Under Review", submittedDate: "2024-12-01" },
    { zone: "Napa Valley", status: "Approved", submittedDate: "2024-11-15" }
  ];

  const recentActivity = [
    { type: "New Customer", description: "Whole Foods Market - Berkeley", date: "2024-12-10" },
    { type: "Territory Performance", description: "Achieved 85% monthly target", date: "2024-12-08" },
    { type: "Market Expansion", description: "Napa Valley territory approved", date: "2024-12-05" },
    { type: "Customer Success", description: "Rainbow Grocery increased order 200%", date: "2024-12-03" }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          My Sacred Territory
        </h1>
        <p className="text-xl text-amber-700">Your exclusive distribution domain and market insights</p>
      </div>

      {/* Territory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="h-8 w-8 text-emerald-600" />
            <div>
              <h3 className="font-bold text-emerald-800">Territory Status</h3>
              <Badge className="bg-emerald-100 text-emerald-800">{territoryData.status}</Badge>
            </div>
          </div>
          <p className="text-sm text-emerald-700">Exclusive rights protected</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <div className="flex items-center space-x-3 mb-3">
            <Crown className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="font-bold text-purple-800">Partner Tier</h3>
              <Badge className="bg-purple-100 text-purple-800">{territoryData.tier}</Badge>
            </div>
          </div>
          <p className="text-sm text-purple-700">Premium benefits active</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-bold text-blue-800">Market Reach</h3>
              <p className="text-xl font-bold text-blue-700">{territoryData.population}</p>
            </div>
          </div>
          <p className="text-sm text-blue-700">Total population served</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="h-8 w-8 text-amber-600" />
            <div>
              <h3 className="font-bold text-amber-800">Performance</h3>
              <p className="text-xl font-bold text-amber-700">{territoryData.performanceScore}%</p>
            </div>
          </div>
          <p className="text-sm text-amber-700">Overall territory score</p>
        </Card>
      </div>

      {/* Territory Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
            <MapPin className="h-6 w-6 mr-2" />
            Territory Boundaries
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-amber-700 mb-2">Exclusive Zones</h3>
              <div className="grid grid-cols-2 gap-2">
                {territoryData.exclusiveZones.map((zone, index) => (
                  <Badge key={index} className="bg-emerald-100 text-emerald-800 justify-center">
                    {zone}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Demographic Match:</span>
                <p className="text-emerald-600 font-bold">{territoryData.demographicMatch}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Competition:</span>
                <p className="text-blue-600 font-bold">{territoryData.competitorPresence}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Market Potential:</span>
                <p className="text-purple-600 font-bold">{territoryData.marketPotential}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Assigned Date:</span>
                <p className="text-gray-600">{new Date(territoryData.assignedDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
            <Target className="h-6 w-6 mr-2" />
            Performance Metrics
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Monthly Progress</span>
                <span className="text-sm text-gray-500">{territoryData.currentProgress}/{territoryData.monthlyTarget}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" 
                  style={{ width: `${(territoryData.currentProgress / territoryData.monthlyTarget) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <p className="text-xl font-bold text-emerald-700">{territoryData.customers.active}</p>
                <p className="text-xs text-emerald-600">Active Customers</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xl font-bold text-blue-700">{territoryData.customers.prospects}</p>
                <p className="text-xs text-blue-600">Prospects</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <p className="text-xl font-bold text-purple-700">{territoryData.customers.total}</p>
                <p className="text-xs text-purple-600">Total Pipeline</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Expansion Requests & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
            <Globe className="h-6 w-6 mr-2" />
            Territory Expansion
          </h2>
          <div className="space-y-3">
            {expansionRequests.map((request, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div>
                  <p className="font-medium text-amber-800">{request.zone}</p>
                  <p className="text-xs text-gray-600">Submitted: {new Date(request.submittedDate).toLocaleDateString()}</p>
                </div>
                <Badge className={request.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}>
                  {request.status}
                </Badge>
              </div>
            ))}
            <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
              Request Territory Expansion
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
            <Calendar className="h-6 w-6 mr-2" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{activity.type}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyTerritory;
