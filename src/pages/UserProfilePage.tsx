
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, Save, User, MapPin, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

const UserProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    display_name: '',
    email: '',
    company: '',
    bio: '',
    territory_name: '',
    territory_region: '',
    commission_rate: 0,
    status: 'active'
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      // Get user profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }

      // Set initial data from user auth and profile
      setProfileData({
        display_name: profile?.display_name || user.user_metadata?.full_name || '',
        email: user.email || '',
        company: profile?.company || '',
        bio: profile?.bio || '',
        territory_name: 'California Central Valley',
        territory_region: 'West Coast',
        commission_rate: 15,
        status: 'active'
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfile = async () => {
    if (!user) return;

    setSaving(true);

    try {
      // Update or insert profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          display_name: profileData.display_name,
          company: profileData.company,
          bio: profileData.bio,
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Profile update error:', profileError);
        toast.error('Failed to update profile');
        return;
      }

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          <span className="ml-2 text-amber-700">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-8">
          User Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  name="display_name"
                  value={profileData.display_name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  className="border-amber-200 bg-gray-50"
                />
                <p className="text-xs text-amber-600 mt-1">Email cannot be changed here</p>
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={profileData.company}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  className="w-full p-3 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Distributor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <MapPin className="mr-2 h-5 w-5" />
                Distributor Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Territory Name</Label>
                <Input
                  value={profileData.territory_name}
                  disabled
                  className="border-amber-200 bg-gray-50"
                />
              </div>

              <div>
                <Label>Territory Region</Label>
                <Input
                  value={profileData.territory_region}
                  disabled
                  className="border-amber-200 bg-gray-50"
                />
              </div>

              <div>
                <Label>Commission Rate</Label>
                <Input
                  value={`${profileData.commission_rate}%`}
                  disabled
                  className="border-amber-200 bg-gray-50"
                />
              </div>

              <div>
                <Label>Status</Label>
                <Input
                  value={profileData.status}
                  disabled
                  className="border-amber-200 bg-gray-50"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-amber-800">Contact Support</h4>
                <div className="flex items-center text-sm text-amber-600">
                  <Mail className="mr-2 h-4 w-4" />
                  support@sacredmead.com
                </div>
                <div className="flex items-center text-sm text-amber-600">
                  <Phone className="mr-2 h-4 w-4" />
                  (555) 123-MEAD
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={saveProfile}
            disabled={saving}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            size="lg"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
