import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Download, Video, FileText, Sparkles } from 'lucide-react';

const RestaurantResourcesPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-amber-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">Sacred Resources</h1>
        <p className="text-purple-100 mt-2">Business-focused content library with consciousness elevation materials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardContent className="p-6 text-center">
          <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="font-medium mb-2">Business Guides</h3>
          <p className="text-sm text-gray-600">Industry insights and best practices</p>
        </CardContent></Card>
        <Card><CardContent className="p-6 text-center">
          <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-medium mb-2">Training Videos</h3>
          <p className="text-sm text-gray-600">Educational content for staff</p>
        </CardContent></Card>
        <Card><CardContent className="p-6 text-center">
          <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-medium mb-2">Marketing Materials</h3>
          <p className="text-sm text-gray-600">Ready-to-use promotional content</p>
        </CardContent></Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-medium text-purple-900">Sacred Business Library</h3>
              <p className="text-sm text-purple-700 mt-1">Curated resources for conscious business practices and elevated customer experiences.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantResourcesPage;