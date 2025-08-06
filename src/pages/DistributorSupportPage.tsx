
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, BookOpen, Users, Clock } from 'lucide-react';

const DistributorSupportPage = () => {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Sacred Support Center
        </h1>
        <p className="text-xl text-amber-700">We're here to help you succeed</p>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Live Chat
              </CardTitle>
              <CardDescription>Get instant help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                Start Chat
              </Button>
              <p className="text-xs text-amber-600 mt-2">Average response: 2 minutes</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Phone Support
              </CardTitle>
              <CardDescription>Speak directly with our experts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                Call (555) 123-4567
              </Button>
              <p className="text-xs text-amber-600 mt-2">Mon-Fri 8AM-6PM PST</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Support
              </CardTitle>
              <CardDescription>Send us your questions anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                Send Email
              </Button>
              <p className="text-xs text-amber-600 mt-2">Response within 4 hours</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Knowledge Base
              </CardTitle>
              <CardDescription>Self-service resources and guides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-800">Popular Articles</h4>
                <ul className="space-y-1 text-sm text-amber-700">
                  <li>• How to place your first order</li>
                  <li>• Understanding territory boundaries</li>
                  <li>• Setting up customer accounts</li>
                  <li>• Marketing materials usage guidelines</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full border-amber-300 text-amber-600 hover:bg-amber-50">
                Browse All Articles
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Community Forum
              </CardTitle>
              <CardDescription>Connect with other distributors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-800">Recent Discussions</h4>
                <ul className="space-y-1 text-sm text-amber-700">
                  <li>• Best practices for customer retention</li>
                  <li>• Seasonal promotion strategies</li>
                  <li>• Territory expansion tips</li>
                  <li>• Product training resources</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full border-amber-300 text-amber-600 hover:bg-amber-50">
                Join Discussion
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Support Hours
            </CardTitle>
            <CardDescription>When you can reach us</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800">Live Chat</h4>
                <p className="text-sm text-amber-600">24/7 Available</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800">Phone Support</h4>
                <p className="text-sm text-amber-600">Mon-Fri 8AM-6PM PST</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800">Email Support</h4>
                <p className="text-sm text-amber-600">24/7 Response within 4hrs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DistributorSupportPage;
