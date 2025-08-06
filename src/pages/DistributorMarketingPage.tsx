
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Download, Share2, Image, FileText, Video } from 'lucide-react';

const DistributorMarketingPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Sacred Marketing Hub
        </h1>
        <p className="text-xl text-amber-700">Divine materials to grow your distribution</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <Image className="mr-2 h-5 w-5" />
              Product Images
            </CardTitle>
            <CardDescription>High-quality product photography</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <Download className="mr-2 h-4 w-4" />
              Download All Images
            </Button>
            <p className="text-xs text-amber-600">15 high-res product images</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Brochures & Flyers
            </CardTitle>
            <CardDescription>Print-ready marketing materials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <Download className="mr-2 h-4 w-4" />
              Download PDFs
            </Button>
            <p className="text-xs text-amber-600">8 customizable templates</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center">
              <Video className="mr-2 h-5 w-5" />
              Video Content
            </CardTitle>
            <CardDescription>Promotional and educational videos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <Share2 className="mr-2 h-4 w-4" />
              View Videos
            </Button>
            <p className="text-xs text-amber-600">12 marketing videos</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-800">Marketing Calendar</CardTitle>
          <CardDescription>Planned campaigns and seasonal promotions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Spring Awakening', date: 'March 20-31', status: 'Active' },
              { title: 'Summer Solstice', date: 'June 15-30', status: 'Upcoming' },
              { title: 'Harvest Festival', date: 'September 1-15', status: 'Planning' }
            ].map((campaign) => (
              <div key={campaign.title} className="p-4 bg-white rounded-lg border border-amber-200">
                <h3 className="font-semibold text-amber-800">{campaign.title}</h3>
                <p className="text-sm text-amber-600">{campaign.date}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                  campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistributorMarketingPage;
