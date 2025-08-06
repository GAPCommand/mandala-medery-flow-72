
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMandalaData } from '@/hooks/useMandalaData';
import {
  FileText,
  Image,
  Video,
  Calendar,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Upload,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';

const AdminContentManagement = () => {
  const { products, loading } = useMandalaData();
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState('all');

  // Mock content data - in real app this would come from your CMS
  const contentItems = [
    {
      id: 1,
      title: 'Sacred Valley Mead - Product Description',
      type: 'product_content',
      status: 'published',
      lastModified: '2024-12-15',
      author: 'Content Team',
      category: 'Product Descriptions'
    },
    {
      id: 2,
      title: 'Kashmir Honey Sourcing Story',
      type: 'blog_post',
      status: 'draft',
      lastModified: '2024-12-14',
      author: 'Marketing Team',
      category: 'Brand Stories'
    },
    {
      id: 3,
      title: 'Distributor Onboarding Video',
      type: 'video',
      status: 'published',
      lastModified: '2024-12-13',
      author: 'Training Team',
      category: 'Training Materials'
    },
    {
      id: 4,
      title: 'Sacred Fire Blessing Process',
      type: 'documentation',
      status: 'review',
      lastModified: '2024-12-12',
      author: 'Sacred Operations',
      category: 'Process Documentation'
    },
    {
      id: 5,
      title: 'Product Photography - Saffron Mead',
      type: 'image',
      status: 'published',
      lastModified: '2024-12-11',
      author: 'Creative Team',
      category: 'Product Images'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog_post':
      case 'product_content':
      case 'documentation':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-indigo-600">Loading content...</p>
      </div>
    );
  }

  const filteredContent = selectedContentType === 'all' 
    ? contentItems 
    : contentItems.filter(item => item.type === selectedContentType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">Content Management</h1>
          <p className="text-indigo-600 mt-1">
            {isAdvancedMode ? 'Advanced content creation and management tools' : 'Essential content overview and editing'}
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
            <span>Create Content</span>
          </Button>
        </div>
      </div>

      {/* Content Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-indigo-600" />
              <div>
                <p className="text-2xl font-bold">{contentItems.length}</p>
                <p className="text-sm text-gray-600">Total Content Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Edit className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {contentItems.filter(c => c.status === 'published').length}
                </p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">
                  {contentItems.filter(c => c.status === 'draft').length}
                </p>
                <p className="text-sm text-gray-600">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {contentItems.filter(c => c.status === 'review').length}
                </p>
                <p className="text-sm text-gray-600">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  className="pl-10 pr-4 py-2 border rounded-md w-64"
                />
              </div>
              <select
                value={selectedContentType}
                onChange={(e) => setSelectedContentType(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Content Types</option>
                <option value="product_content">Product Content</option>
                <option value="blog_post">Blog Posts</option>
                <option value="video">Videos</option>
                <option value="image">Images</option>
                <option value="documentation">Documentation</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContent.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.category} • by {item.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Last modified: {item.lastModified}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>Preview</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </Button>
                    {isAdvancedMode && (
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </Button>
                    )}
                  </div>
                </div>

                {isAdvancedMode && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                      <div>
                        <span className="font-medium">Type:</span> {item.type.replace('_', ' ')}
                      </div>
                      <div>
                        <span className="font-medium">Views:</span> 1,234
                      </div>
                      <div>
                        <span className="font-medium">SEO Score:</span> 85/100
                      </div>
                      <div>
                        <span className="font-medium">Engagement:</span> 67%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Performance (Advanced Mode) */}
      {isAdvancedMode && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-900">Top Performing Content</p>
                    <p className="text-sm text-green-700">Kashmir Honey Sourcing Story</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">2,847 views</p>
                    <p className="text-xs text-green-500">+23% engagement</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">Most Shared</p>
                    <p className="text-sm text-blue-700">Distributor Success Stories</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">156 shares</p>
                    <p className="text-xs text-blue-500">Social media reach</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-purple-900">Best Converting</p>
                    <p className="text-sm text-purple-700">Product Demo Videos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">12.4% CTR</p>
                    <p className="text-xs text-purple-500">Lead generation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-amber-900">Upcoming: Product Launch</p>
                      <p className="text-sm text-amber-700">New sacred mead variety announcement</p>
                    </div>
                    <span className="text-xs text-amber-600">Dec 20</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-blue-900">In Progress: Newsletter</p>
                      <p className="text-sm text-blue-700">Monthly distributor update</p>
                    </div>
                    <span className="text-xs text-blue-600">Dec 22</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-green-900">Scheduled: Holiday Campaign</p>
                      <p className="text-sm text-green-700">Sacred celebration content series</p>
                    </div>
                    <span className="text-xs text-green-600">Dec 25</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-indigo-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex flex-col items-center justify-center space-y-1">
              <Plus className="h-5 w-5" />
              <span>Create Blog Post</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Upload className="h-5 w-5" />
              <span>Upload Media</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Calendar className="h-5 w-5" />
              <span>Schedule Content</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContentManagement;
