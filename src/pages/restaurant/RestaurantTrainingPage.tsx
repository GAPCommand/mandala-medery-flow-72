import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Award,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react';

const RestaurantTrainingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const trainingModules = [
    {
      id: 1,
      title: 'Sacred Origins & Brand Story',
      category: 'foundation',
      duration: '25 minutes',
      progress: 100,
      status: 'completed',
      consciousness_level: 200,
      description: 'Understanding the sacred mead tradition and brand values',
      modules: 4,
      certificate: true
    },
    {
      id: 2,
      title: 'Product Knowledge Essentials',
      category: 'product',
      duration: '35 minutes',
      progress: 75,
      status: 'in-progress',
      consciousness_level: 250,
      description: 'Complete guide to sacred mead varieties and characteristics',
      modules: 6,
      certificate: true
    },
    {
      id: 3,
      title: 'Customer Service Excellence',
      category: 'service',
      duration: '40 minutes',
      progress: 0,
      status: 'not-started',
      consciousness_level: 300,
      description: 'Elevating customer experiences through conscious service',
      modules: 5,
      certificate: true
    },
    {
      id: 4,
      title: 'Pairing & Presentation Mastery',
      category: 'advanced',
      duration: '45 minutes',
      progress: 0,
      status: 'locked',
      consciousness_level: 400,
      description: 'Advanced techniques for food and mead pairing',
      modules: 7,
      certificate: true
    }
  ];

  const teamProgress = [
    { name: 'Sarah Manager', role: 'Manager', completed: 4, total: 4, level: 'Advanced' },
    { name: 'Mike Server', role: 'Server', completed: 3, total: 4, level: 'Intermediate' },
    { name: 'Lisa Bartender', role: 'Bartender', completed: 2, total: 4, level: 'Beginner' },
    { name: 'John Host', role: 'Host', completed: 1, total: 4, level: 'Beginner' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'locked': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Play className="h-4 w-4" />;
      case 'not-started': return <Clock className="h-4 w-4" />;
      case 'locked': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-amber-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Staff Training</h1>
            <p className="text-purple-100 mt-2">
              GAPCommand-powered progressive training with consciousness elevation modules
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">75%</div>
            <div className="text-purple-100 text-sm">Team Progress</div>
          </div>
        </div>
      </div>

      {/* Training Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Modules</p>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-green-600">Available</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Team Members</p>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-blue-600">In Training</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Certificates</p>
                <p className="text-2xl font-bold">7</p>
                <p className="text-xs text-amber-600">Earned</p>
              </div>
              <Award className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Modules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span>Training Modules</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingModules.map((module) => (
                <div key={module.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{module.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{module.duration}</span>
                        <span>{module.modules} lessons</span>
                        {module.certificate && (
                          <div className="flex items-center space-x-1">
                            <Award className="h-3 w-3" />
                            <span>Certificate</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusColor(module.status)}>
                      {getStatusIcon(module.status)}
                      <span className="ml-1">{module.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                  
                  {module.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Target className="h-3 w-3 text-purple-600" />
                      <span className="text-xs text-gray-600">
                        Consciousness Level: {module.consciousness_level}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={module.status === 'locked'}
                      className={module.status === 'completed' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      {module.status === 'completed' ? 'Review' : 
                       module.status === 'in-progress' ? 'Continue' : 
                       module.status === 'locked' ? 'Locked' : 'Start'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Team Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamProgress.map((member, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <Badge variant="outline">{member.level}</Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Modules Completed</span>
                      <span>{member.completed}/{member.total}</span>
                    </div>
                    <Progress value={(member.completed / member.total) * 100} className="h-2" />
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full">
                    View Progress
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GAPCommand Integration Note */}
      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-medium text-purple-900">GAPCommand Training Platform</h3>
              <p className="text-sm text-purple-700 mt-1">
                All training modules are powered by the GAPCommand training platform with progressive consciousness elevation, 
                certification tracking, and performance analytics integration.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantTrainingPage;