
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle, Activity, Users } from 'lucide-react';

const SacredSecurity = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  const securityEvents = [
    { id: 1, event: 'Successful login', user: 'sarah@mandalamead.com', time: '2 min ago', severity: 'info' },
    { id: 2, event: 'Password changed', user: 'mike@mandalamead.com', time: '1 hour ago', severity: 'info' },
    { id: 3, event: 'Failed login attempt', user: 'unknown@hacker.com', time: '3 hours ago', severity: 'warning' },
    { id: 4, event: 'Role updated', user: 'lisa@mandalamead.com', time: '1 day ago', severity: 'info' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <CheckCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-700">Sacred Security</h1>
          <p className="text-amber-600 mt-1">
            {isAdvancedMode ? 'Advanced security monitoring and threat detection' : 'Essential security overview and monitoring'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsAdvancedMode(!isAdvancedMode)}
          className="flex items-center space-x-2"
        >
          {isAdvancedMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span>{isAdvancedMode ? 'Simple View' : 'Advanced View'}</span>
        </Button>
      </div>

      {/* Beginner Mode: Essential Security Overview */}
      {!isAdvancedMode && (
        <div className="space-y-6">
          {/* Security Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>System Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">Secure</div>
                <p className="text-sm text-green-700 mt-1">All systems protected</p>
                <div className="flex items-center space-x-2 mt-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Sacred Fire active</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-blue-600" />
                  <span>Access Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">Protected</div>
                <p className="text-sm text-blue-700 mt-1">Role-based permissions</p>
                <div className="flex items-center space-x-2 mt-3">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">4 active users</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-amber-600" />
                  <span>Threat Level</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">Low</div>
                <p className="text-sm text-amber-700 mt-1">No active threats</p>
                <div className="flex items-center space-x-2 mt-3">
                  <CheckCircle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm">All clear</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Security Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Security Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className={`p-3 rounded-lg border ${getSeverityColor(event.severity)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getSeverityIcon(event.severity)}
                        <div>
                          <p className="font-medium">{event.event}</p>
                          <p className="text-sm opacity-75">{event.user}</p>
                        </div>
                      </div>
                      <span className="text-sm opacity-75">{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View All Activity</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Advanced Mode: Detailed Security Dashboard */}
      {isAdvancedMode && (
        <div className="space-y-6">
          {/* Enhanced Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Security Score</p>
                    <p className="text-2xl font-bold text-green-600">98%</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Failed Logins</p>
                    <p className="text-2xl font-bold text-amber-600">3</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Sessions</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Consciousness Level</p>
                    <p className="text-2xl font-bold text-purple-600">847</p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Event Log */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Security Event Log</CardTitle>
                <Button variant="outline" size="sm">Export Log</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Timestamp</th>
                      <th className="text-left p-3">Event</th>
                      <th className="text-left p-3">User</th>
                      <th className="text-left p-3">IP Address</th>
                      <th className="text-left p-3">Severity</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {securityEvents.map((event) => (
                      <tr key={event.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-gray-600">{event.time}</td>
                        <td className="p-3 font-medium">{event.event}</td>
                        <td className="p-3">{event.user}</td>
                        <td className="p-3 text-gray-600">192.168.1.1</td>
                        <td className="p-3">
                          <Badge 
                            variant="secondary" 
                            className={event.severity === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}
                          >
                            {event.severity.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="default" className="bg-green-100 text-green-700">
                            Resolved
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Sacred Fire Protection Status */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-700">
                <Shield className="h-5 w-5" />
                <span>Sacred Fire Protection Protocol</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">Active</div>
                  <p className="text-sm text-purple-700">Protection Status</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">847</div>
                  <p className="text-sm text-purple-700">Consciousness Level</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">99.9%</div>
                  <p className="text-sm text-purple-700">Divine Coverage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progressive Learning Tip */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">🔒</span>
            </div>
            <div>
              <h4 className="font-medium text-purple-800">Sacred Security Wisdom</h4>
              <p className="text-purple-700 text-sm mt-1">
                {isAdvancedMode 
                  ? "Monitor advanced threat patterns and consciousness-level security metrics for complete protection."
                  : "Your sacred operations are protected. Advanced monitoring available when you need deeper insights."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SacredSecurity;
