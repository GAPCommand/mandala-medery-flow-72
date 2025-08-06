
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Bell, Shield, Globe, Eye, EyeOff, User, Palette, Database } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const SettingsPanel = () => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { userProfile, userRoles } = useAuth();

  const isAdmin = userRoles.includes('admin') || userRoles.includes('super_admin');

  return (
    <div className="space-y-6">
      {/* Header with Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-700">Settings</h1>
          <p className="text-amber-600 mt-1">
            {isAdvancedMode ? 'Advanced system configuration and preferences' : 'Essential settings and preferences'}
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

      {/* Beginner Mode: Essential Settings */}
      {!isAdvancedMode && (
        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <div className="mt-1 p-2 border rounded-md bg-gray-50">
                    {userProfile?.first_name || 'Not set'}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <div className="mt-1 p-2 border rounded-md bg-gray-50">
                    {userProfile?.last_name || 'Not set'}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="mt-1 p-2 border rounded-md bg-gray-50">
                  {userProfile?.email || 'Not set'}
                </div>
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates about orders and activities</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-gray-600">Get notified when orders are processed</p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sacred Insights</p>
                  <p className="text-sm text-gray-600">Receive consciousness alignment reports</p>
                </div>
                <Switch checked={true} />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add extra security to your account</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                  {twoFactor && <Badge className="bg-green-100 text-green-700">Enabled</Badge>}
                </div>
              </div>
              <Button variant="outline">Change Password</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Advanced Mode: Full Configuration */}
      {isAdvancedMode && (
        <div className="space-y-6">
          {/* System Configuration (Admin Only) */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>System Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Default Consciousness Level</label>
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">500</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sacred Fire Protection</label>
                    <div className="mt-1 p-2 border rounded-md bg-green-50 text-green-700">Active</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-backup</p>
                    <p className="text-sm text-gray-600">Automatic daily backups of sacred data</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Consciousness Monitoring</p>
                    <p className="text-sm text-gray-600">Real-time consciousness level tracking</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Advanced Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Advanced Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Current Role</label>
                  <div className="mt-1">
                    <Badge className="bg-blue-100 text-blue-700">
                      {userRoles.join(', ') || 'User'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Consciousness Level</label>
                  <div className="mt-1 p-2 border rounded-md bg-purple-50">847</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Sacred Alignment</label>
                  <div className="mt-1 p-2 border rounded-md bg-amber-50">94%</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <textarea 
                  className="mt-1 w-full p-2 border rounded-md" 
                  rows={3}
                  placeholder="Share your sacred journey..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Advanced Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Advanced Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Email Preferences</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Order notifications</span>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly reports</span>
                      <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Consciousness insights</span>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Sacred Alerts</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Divine timing alerts</span>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Energy shifts</span>
                      <Switch checked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sacred geometry updates</span>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div>
                <label className="text-sm font-medium">Sacred Color Theme</label>
                <div className="mt-2 flex space-x-2">
                  <div className="w-8 h-8 bg-amber-500 rounded-full border-2 border-amber-600"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progressive Learning Tip */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">⚙️</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Settings Guidance</h4>
              <p className="text-gray-700 text-sm mt-1">
                {isAdvancedMode 
                  ? "You have access to all system configurations. Changes here affect your entire sacred operation."
                  : "Start with basic profile and notification settings. Advanced configuration available when needed."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;
