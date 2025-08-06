
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  TrendingUp,
  Target,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  Award,
  Filter,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminCrmDashboard = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  // Mock CRM data - in real app this would come from your CRM integration
  const crmMetrics = {
    totalLeads: 156,
    qualifiedLeads: 89,
    conversions: 23,
    revenue: 342000,
    conversionRate: 14.7,
    avgDealSize: 14800,
    pipelineValue: 890000
  };

  const recentLeads = [
    {
      id: 1,
      name: 'Sacred Spirits Co.',
      contact: 'Jennifer Chen',
      email: 'j.chen@sacredspirits.com',
      phone: '(415) 555-0123',
      source: 'Website Inquiry',
      status: 'qualified',
      value: 45000,
      lastContact: '2024-12-16',
      probability: 75
    },
    {
      id: 2,
      name: 'Divine Beverages LLC',
      contact: 'Michael Rodriguez',
      email: 'm.rodriguez@divinebev.com',
      phone: '(510) 555-0456',
      source: 'Trade Show',
      status: 'proposal',
      value: 28000,
      lastContact: '2024-12-15',
      probability: 60
    },
    {
      id: 3,
      name: 'Consciousness Collective',
      contact: 'Sarah Thompson',
      email: 's.thompson@conscollective.org',
      phone: '(650) 555-0789',
      source: 'Referral',
      status: 'negotiation',
      value: 67000,
      lastContact: '2024-12-14',
      probability: 85
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-amber-100 text-amber-800';
      case 'negotiation': return 'bg-purple-100 text-purple-800';
      case 'closed-won': return 'bg-green-100 text-green-800';
      case 'closed-lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">CRM & Sales Dashboard</h1>
          <p className="text-blue-600 mt-1">
            {isAdvancedMode ? 'Advanced sales analytics and pipeline management' : 'Essential CRM metrics and lead overview'}
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
            <span>Add Lead</span>
          </Button>
        </div>
      </div>

      {/* Key CRM Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{crmMetrics.totalLeads}</p>
                <p className="text-sm text-gray-600">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{crmMetrics.qualifiedLeads}</p>
                <p className="text-sm text-gray-600">Qualified Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{crmMetrics.conversions}</p>
                <p className="text-sm text-gray-600">Conversions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold">${crmMetrics.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Revenue Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Sales Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Conversion Rate</span>
                <span>{crmMetrics.conversionRate}%</span>
              </div>
              <Progress value={crmMetrics.conversionRate} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pipeline Health</span>
                <span>87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Lead Quality</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Follow-up Rate</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pipeline Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Qualified Leads</p>
                  <p className="text-sm text-blue-700">{crmMetrics.qualifiedLeads} opportunities</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">$485K</p>
                  <p className="text-xs text-blue-500">potential value</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium text-amber-900">In Proposal</p>
                  <p className="text-sm text-amber-700">12 active proposals</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-600">$245K</p>
                  <p className="text-xs text-amber-500">weighted value</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">Negotiation</p>
                  <p className="text-sm text-purple-700">8 closing deals</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">$160K</p>
                  <p className="text-xs text-purple-500">high probability</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Leads & Opportunities</CardTitle>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{lead.name}</h3>
                    <p className="text-sm text-gray-600">{lead.contact} • {lead.source}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                    <p className="text-lg font-bold text-green-600 mt-1">
                      ${lead.value.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Last contact: {lead.lastContact}</span>
                  </div>
                </div>
                
                {isAdvancedMode && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Probability: {lead.probability}%</span>
                      <span>Weighted Value: ${Math.round(lead.value * (lead.probability / 100)).toLocaleString()}</span>
                    </div>
                    <Progress value={lead.probability} className="h-2" />
                  </div>
                )}
                
                <div className="flex space-x-2 mt-3">
                  <Button variant="outline" size="sm">Contact</Button>
                  <Button variant="outline" size="sm">Schedule Meeting</Button>
                  <Button variant="outline" size="sm">Update Status</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCrmDashboard;
