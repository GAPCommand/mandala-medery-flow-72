
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, Download, Award, Users, Clock } from 'lucide-react';

const DistributorKnowledgePage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Sacred Knowledge Center
        </h1>
        <p className="text-xl text-amber-700">Divine wisdom for distribution mastery</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <Play className="mr-2 h-5 w-5" />
              Training Videos
            </CardTitle>
            <CardDescription>Essential knowledge for success</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-amber-800">Getting Started (12 min)</p>
              <p className="text-sm font-medium text-amber-800">Product Knowledge (18 min)</p>
              <p className="text-sm font-medium text-amber-800">Sales Techniques (25 min)</p>
            </div>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              Start Training
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Documentation
            </CardTitle>
            <CardDescription>Complete distributor handbook</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm text-amber-700">• Product Specifications</p>
              <p className="text-sm text-amber-700">• Ordering Guidelines</p>
              <p className="text-sm text-amber-700">• Marketing Best Practices</p>
              <p className="text-sm text-amber-700">• Customer Service Tips</p>
            </div>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <Download className="mr-2 h-4 w-4" />
              Download Handbook
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Certifications
            </CardTitle>
            <CardDescription>Earn your sacred credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-700">Basic Certification</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-700">Advanced Sales</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-700">Master Distributor</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Locked</span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">FAQ - Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { q: 'How do I place bulk orders?', a: 'Use the Quick Order portal or contact your rep directly.' },
                { q: 'What are the minimum order quantities?', a: 'Minimum orders vary by product, typically 12-24 units.' },
                { q: 'How long does shipping take?', a: 'Standard shipping is 3-5 business days within your territory.' },
                { q: 'What is the return policy?', a: 'We accept returns within 30 days for unopened products.' }
              ].map((faq, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-amber-200">
                  <p className="font-medium text-amber-800 mb-1">{faq.q}</p>
                  <p className="text-sm text-amber-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">Training Progress</CardTitle>
            <CardDescription>Your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-amber-800">Modules Completed</span>
                </div>
                <span className="font-bold text-amber-700">8/12</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-amber-800">Hours Trained</span>
                </div>
                <span className="font-bold text-amber-700">24.5</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-amber-800">Certifications</span>
                </div>
                <span className="font-bold text-amber-700">2/5</span>
              </div>

              <div className="w-full bg-amber-200 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full w-2/3"></div>
              </div>
              <p className="text-xs text-amber-600 text-center">67% Complete</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DistributorKnowledgePage;
