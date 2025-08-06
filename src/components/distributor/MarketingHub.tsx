
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Share, Star, Trophy, Target, Sparkles, Crown, FileText, Image, Video, Mail } from "lucide-react";

const MarketingHub = () => {
  const [activeCategory, setActiveCategory] = useState('brand-assets');

  const categories = [
    { id: 'brand-assets', name: 'Brand Assets', icon: Image },
    { id: 'print-materials', name: 'Print Materials', icon: FileText },
    { id: 'digital-templates', name: 'Digital Templates', icon: Video },
    { id: 'press-releases', name: 'Press & Media', icon: Mail },
    { id: 'gamification', name: 'Gamification', icon: Trophy }
  ];

  const brandAssets = [
    { name: 'Sacred Fire Logo Suite', type: 'PNG/SVG/AI', size: '12.4 MB', downloads: 234 },
    { name: 'Product Photography Collection', type: 'High-res JPG', size: '45.2 MB', downloads: 189 },
    { name: 'Kashmir Valley Backgrounds', type: 'JPG/PNG', size: '28.7 MB', downloads: 156 },
    { name: 'Sacred Symbols & Icons', type: 'SVG/PNG', size: '8.9 MB', downloads: 198 },
    { name: 'Brand Color Palette', type: 'ASE/ACO', size: '2.1 MB', downloads: 167 },
    { name: 'Typography Guidelines', type: 'PDF', size: '5.3 MB', downloads: 145 }
  ];

  const printMaterials = [
    { name: 'Premium Shelf Talkers', type: 'PDF', size: '15.2 MB', description: 'Elegant point-of-sale displays' },
    { name: 'Sacred Story Brochures', type: 'PDF', size: '22.8 MB', description: 'Kashmir heritage storytelling' },
    { name: 'Tasting Notes Cards', type: 'PDF', size: '8.4 MB', description: 'Professional tasting guides' },
    { name: 'Window Clings Collection', type: 'PDF', size: '18.7 MB', description: 'Eye-catching window displays' },
    { name: 'Sacred Ceremony Posters', type: 'PDF', size: '31.2 MB', description: 'A1/A2 poster series' },
    { name: 'Consciousness Level Guides', type: 'PDF', size: '12.9 MB', description: 'Educational materials' }
  ];

  const digitalTemplates = [
    { name: 'Instagram Story Templates', type: 'PSD/AI', posts: 24, engagement: '8.2%' },
    { name: 'Facebook Ad Campaign Kit', type: 'PSD/AI', posts: 12, engagement: '12.4%' },
    { name: 'Email Newsletter Templates', type: 'HTML/PSD', posts: 8, engagement: '18.7%' },
    { name: 'YouTube Thumbnail Collection', type: 'PSD', posts: 16, engagement: '15.3%' },
    { name: 'Sacred Calendar Content', type: 'AI/PSD', posts: 48, engagement: '22.1%' },
    { name: 'Product Showcase Videos', type: 'MP4/MOV', posts: 6, engagement: '28.9%' }
  ];

  const pressReleases = [
    { title: 'Sacred Fire Expands to Premium Markets', date: '2024-12-01', type: 'Business Expansion' },
    { title: 'Ancient Kashmir Mead Traditions Revived', date: '2024-11-15', type: 'Cultural Heritage' },
    { title: 'Consciousness-Driven Beverages Gain Momentum', date: '2024-10-28', type: 'Industry Trends' },
    { title: 'Sacred Fire Wins Artisan Beverage Award', date: '2024-10-10', type: 'Recognition' },
    { title: 'Sustainable Honey Sourcing Initiative', date: '2024-09-22', type: 'Sustainability' }
  ];

  const gamificationElements = [
    { 
      name: 'Sacred Partner Badges', 
      description: 'Unlock achievements for sales milestones',
      levels: ['Bronze Seeker', 'Silver Guardian', 'Gold Master', 'Diamond Sage'],
      current: 'Silver Guardian'
    },
    {
      name: 'Territory Leaderboard',
      description: 'Monthly rankings with divine rewards',
      position: 3,
      total: 47,
      prize: 'Kashmir Valley Retreat'
    },
    {
      name: 'Consciousness Challenges',
      description: 'Special product focus campaigns',
      active: 'Level 9+ Product Push',
      reward: '15% Bonus Commission',
      progress: 67
    }
  ];

  const currentAchievements = [
    { name: 'Sacred Sales Sage', icon: Crown, description: 'Exceeded quarterly target by 25%', earned: '2024-12-01' },
    { name: 'Divine Distribution', icon: Star, description: '50+ successful deliveries', earned: '2024-11-28' },
    { name: 'Consciousness Champion', icon: Sparkles, description: 'Specialized in Level 9+ products', earned: '2024-11-15' }
  ];

  const renderContent = () => {
    switch (activeCategory) {
      case 'brand-assets':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandAssets.map((asset, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Image className="h-8 w-8 text-amber-600" />
                  <Badge className="bg-amber-100 text-amber-800">{asset.type}</Badge>
                </div>
                <h3 className="font-bold text-amber-900 mb-2">{asset.name}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{asset.size}</span>
                  <span>{asset.downloads} downloads</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'print-materials':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {printMaterials.map((material, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-800">{material.type}</Badge>
                </div>
                <h3 className="font-bold text-blue-900 mb-2">{material.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{material.size}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'digital-templates':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalTemplates.map((template, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Video className="h-8 w-8 text-purple-600" />
                  <Badge className="bg-purple-100 text-purple-800">{template.type}</Badge>
                </div>
                <h3 className="font-bold text-purple-900 mb-2">{template.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="text-gray-600">Templates: </span>
                    <span className="font-medium">{template.posts}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg. Engagement: </span>
                    <span className="font-medium text-emerald-600">{template.engagement}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'press-releases':
        return (
          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-gray-900">{release.title}</h3>
                      <Badge className="bg-emerald-100 text-emerald-800">{release.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Published: {new Date(release.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Read
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'gamification':
        return (
          <div className="space-y-8">
            {/* Current Achievements */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                <Crown className="h-6 w-6 mr-2" />
                Your Sacred Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentAchievements.map((achievement, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-purple-200 text-center">
                    <achievement.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-bold text-purple-800 mb-1">{achievement.name}</h4>
                    <p className="text-xs text-purple-600 mb-2">{achievement.description}</p>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      Earned {new Date(achievement.earned).toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Gamification Elements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {gamificationElements.map((element, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-bold text-amber-800 mb-3">{element.name}</h3>
                  <p className="text-gray-600 mb-4">{element.description}</p>
                  
                  {element.levels && (
                    <div className="space-y-2">
                      {element.levels.map((level, levelIndex) => (
                        <div key={levelIndex} className={`p-2 rounded ${level === element.current ? 'bg-amber-100 border border-amber-300' : 'bg-gray-50'}`}>
                          <span className={`text-sm ${level === element.current ? 'font-bold text-amber-800' : 'text-gray-600'}`}>
                            {level} {level === element.current && '(Current)'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {element.position && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-600">Current Position:</span>
                        <span className="font-bold text-blue-800">#{element.position} of {element.total}</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">Prize: {element.prize}</p>
                    </div>
                  )}

                  {element.progress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium">{element.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" 
                          style={{ width: `${element.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-emerald-600">Reward: {element.reward}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Sacred Marketing Hub
        </h1>
        <p className="text-xl text-amber-700">Professional marketing materials and growth gamification</p>
      </div>

      {/* Category Navigation */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 ${
                activeCategory === category.id 
                  ? 'bg-amber-600 hover:bg-amber-700' 
                  : 'hover:bg-amber-50'
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Content Area */}
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default MarketingHub;
