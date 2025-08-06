
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Video, FileText, Star, Clock, Users, Thermometer, Calendar, Droplets, Crown, Sparkles } from "lucide-react";

const SacredKnowledge = () => {
  const [activeSection, setActiveSection] = useState('mead-basics');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { id: 'mead-basics', name: 'Mead Fundamentals', icon: BookOpen },
    { id: 'production', name: 'Sacred Production', icon: Droplets },
    { id: 'storage', name: 'Storage & Transport', icon: Thermometer },
    { id: 'consciousness', name: 'Consciousness Levels', icon: Sparkles },
    { id: 'sales-training', name: 'Sales Excellence', icon: Users },
    { id: 'faq', name: 'FAQ & Support', icon: Star }
  ];

  const meadBasics = [
    {
      title: 'Ancient History of Mead',
      content: 'Mead, humanity\'s oldest fermented beverage, dates back over 9,000 years. In Kashmir, sacred honey traditions intertwined with Vedic practices, creating consciousness-elevating elixirs used in spiritual ceremonies.',
      type: 'article',
      readTime: '8 min',
      category: 'History'
    },
    {
      title: 'What Makes Sacred Fire Unique',
      content: 'Our mead transcends traditional brewing through consciousness blessing rituals, Kashmir valley honey sourcing, and sacred fire meditation during fermentation. Each batch carries divine energy.',
      type: 'video',
      readTime: '12 min',
      category: 'Sacred Process'
    },
    {
      title: 'Mead vs Wine vs Beer',
      content: 'Unlike wine (grapes) or beer (grains), mead derives from honey - nature\'s most perfect food. This creates naturally pure, easily digestible alcohol with consciousness-expanding properties.',
      type: 'article',
      readTime: '5 min',
      category: 'Education'
    }
  ];

  const productionSecrets = [
    {
      title: 'Sacred Honey Sourcing',
      content: 'Our honey comes exclusively from Kashmir valley wildflowers, collected by traditional beekeepers who maintain sacred relationships with bee colonies. Each harvest is blessed in ancient ceremonies.',
      type: 'video',
      readTime: '15 min',
      category: 'Sourcing'
    },
    {
      title: 'Consciousness Blessing Rituals',
      content: 'Master meditation practitioners infuse each batch with specific consciousness frequencies during fermentation. These rituals, passed down through generations, create the sacred energy levels.',
      type: 'article',
      readTime: '10 min',
      category: 'Sacred Process'
    },
    {
      title: 'Fermentation & Sacred Fire',
      content: 'Traditional clay vessels and sacred fire meditation create unique fermentation conditions. Temperature, timing, and spiritual intention combine to produce consciousness-elevating mead.',
      type: 'video',
      readTime: '18 min',
      category: 'Production'
    }
  ];

  const storageGuidelines = [
    {
      title: 'Optimal Storage Conditions',
      content: 'Store Sacred Fire mead at 55-65°F in dark conditions. Avoid temperature fluctuations. Unlike wine, mead improves with age and consciousness levels actually strengthen over time.',
      type: 'article',
      readTime: '4 min',
      category: 'Storage'
    },
    {
      title: 'Transportation Best Practices',
      content: 'Maintain temperature stability during transport. Use insulated containers for extreme weather. Handle bottles gently to preserve consciousness energy fields. Never store near electromagnetic interference.',
      type: 'article',
      readTime: '6 min',
      category: 'Transport'
    },
    {
      title: 'Aging & Consciousness Development',
      content: 'Sacred Fire mead continues developing consciousness levels for up to 7 years. Older bottles exhibit enhanced sacred properties. Track batch dates for optimal consciousness progression.',
      type: 'video',
      readTime: '12 min',
      category: 'Aging'
    }
  ];

  const consciousnessLevels = [
    {
      title: 'Understanding Consciousness Levels 1-10',
      content: 'Each Sacred Fire batch achieves specific consciousness frequencies through blessing rituals. Levels 1-3 provide relaxation, 4-6 enable clarity, 7-8 inspire creativity, 9-10 facilitate transcendence.',
      type: 'article',
      readTime: '8 min',
      category: 'Consciousness'
    },
    {
      title: 'Customer Guidance for Sacred Experiences',
      content: 'Help customers choose appropriate consciousness levels for their intentions. Beginners start with levels 1-4, experienced seekers enjoy 5-8, spiritual practitioners prefer 9-10.',
      type: 'video',
      readTime: '14 min',
      category: 'Customer Education'
    },
    {
      title: 'Sacred Ceremony Integration',
      content: 'Different consciousness levels enhance specific ceremonies: meditation (7-8), celebration (4-6), spiritual communion (9-10). Guide customers in conscious selection.',
      type: 'article',
      readTime: '7 min',
      category: 'Ceremonial Use'
    }
  ];

  const salesTraining = [
    {
      title: 'Sacred Storytelling Techniques',
      content: 'Connect with customers through Kashmir heritage stories, consciousness journey narratives, and transformation testimonials. Authentic storytelling creates emotional resonance and premium value.',
      type: 'video',
      readTime: '20 min',
      category: 'Sales Technique'
    },
    {
      title: 'Handling Skeptical Customers',
      content: 'Address consciousness skepticism with scientific backing, customer testimonials, and personal experience sharing. Focus on quality, heritage, and taste before discussing consciousness aspects.',
      type: 'article',
      readTime: '9 min',
      category: 'Objection Handling'
    },
    {
      title: 'Premium Pricing Justification',
      content: 'Sacred Fire commands premium prices through exclusivity, artisanal production, consciousness blessing, and transformational value. Position as investment in consciousness development.',
      type: 'video',
      readTime: '16 min',
      category: 'Pricing Strategy'
    }
  ];

  const faqData = [
    {
      question: 'How long does Sacred Fire mead last?',
      answer: 'Properly stored Sacred Fire mead improves with age for up to 7 years. Consciousness levels actually strengthen over time, making older bottles more valuable.',
      category: 'Storage'
    },
    {
      question: 'Can customers feel the consciousness levels?',
      answer: 'Most customers report noticeable consciousness effects, especially with levels 7+. Individual sensitivity varies. We recommend starting with level 4-6 for first-time customers.',
      category: 'Consciousness'
    },
    {
      question: 'What makes Kashmir honey special?',
      answer: 'Kashmir valley honey contains unique wildflower essences from high-altitude blooms. The pristine environment and traditional collection methods preserve sacred properties.',
      category: 'Ingredients'
    },
    {
      question: 'How do I explain consciousness blessing to customers?',
      answer: 'Focus on the meditation and intention during production. Compare to blessed objects in various traditions. Emphasize the positive energy and mindful creation process.',
      category: 'Sales'
    },
    {
      question: 'What temperature should mead be served?',
      answer: 'Serve Sacred Fire mead slightly chilled (50-55°F) for optimal flavor and consciousness reception. Never serve ice cold as it diminishes sacred properties.',
      category: 'Serving'
    },
    {
      question: 'Can Sacred Fire mead be used in cocktails?',
      answer: 'While pure consumption preserves consciousness levels best, mead cocktails work for casual occasions. Recommend consciousness levels 1-4 for mixing.',
      category: 'Usage'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'mead-basics':
        return (
          <div className="space-y-6">
            {meadBasics.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {item.type === 'video' ? <Video className="h-5 w-5 text-purple-600" /> : <FileText className="h-5 w-5 text-blue-600" />}
                    <Badge className={item.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                <h3 className="font-bold text-amber-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.content}</p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  {item.type === 'video' ? 'Watch Video' : 'Read Article'}
                </Button>
              </Card>
            ))}
          </div>
        );

      case 'production':
        return (
          <div className="space-y-6">
            {productionSecrets.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {item.type === 'video' ? <Video className="h-5 w-5 text-purple-600" /> : <FileText className="h-5 w-5 text-blue-600" />}
                    <Badge className={item.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                <h3 className="font-bold text-amber-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.content}</p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  {item.type === 'video' ? 'Watch Video' : 'Read Article'}
                </Button>
              </Card>
            ))}
          </div>
        );

      case 'storage':
        return (
          <div className="space-y-6">
            {storageGuidelines.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {item.type === 'video' ? <Video className="h-5 w-5 text-purple-600" /> : <FileText className="h-5 w-5 text-blue-600" />}
                    <Badge className={item.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                <h3 className="font-bold text-amber-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.content}</p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  {item.type === 'video' ? 'Watch Video' : 'Read Article'}
                </Button>
              </Card>
            ))}
          </div>
        );

      case 'consciousness':
        return (
          <div className="space-y-6">
            {consciousnessLevels.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {item.type === 'video' ? <Video className="h-5 w-5 text-purple-600" /> : <FileText className="h-5 w-5 text-purple-600" />}
                    <Badge className="bg-purple-100 text-purple-800">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-purple-500">
                    <Clock className="h-4 w-4" />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                <h3 className="font-bold text-purple-900 mb-2">{item.title}</h3>
                <p className="text-purple-700 mb-4">{item.content}</p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  {item.type === 'video' ? 'Watch Video' : 'Read Article'}
                </Button>
              </Card>
            ))}
          </div>
        );

      case 'sales-training':
        return (
          <div className="space-y-6">
            {salesTraining.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {item.type === 'video' ? <Video className="h-5 w-5 text-emerald-600" /> : <FileText className="h-5 w-5 text-emerald-600" />}
                    <Badge className="bg-emerald-100 text-emerald-800">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-emerald-500">
                    <Clock className="h-4 w-4" />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                <h3 className="font-bold text-emerald-900 mb-2">{item.title}</h3>
                <p className="text-emerald-700 mb-4">{item.content}</p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  {item.type === 'video' ? 'Watch Video' : 'Read Article'}
                </Button>
              </Card>
            ))}
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
            {faqData
              .filter(faq => 
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((faq, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-amber-900 flex-1">{faq.question}</h3>
                    <Badge className="bg-amber-100 text-amber-800 ml-4">{faq.category}</Badge>
                  </div>
                  <p className="text-gray-700">{faq.answer}</p>
                </Card>
              ))}
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
          Sacred Knowledge & Training
        </h1>
        <p className="text-xl text-amber-700">Master the ancient wisdom of consciousness-driven mead distribution</p>
      </div>

      {/* Section Navigation */}
      <Card className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'outline'}
              onClick={() => setActiveSection(section.id)}
              className={`flex flex-col items-center space-y-2 h-auto py-4 ${
                activeSection === section.id 
                  ? 'bg-amber-600 hover:bg-amber-700' 
                  : 'hover:bg-amber-50'
              }`}
            >
              <section.icon className="h-5 w-5" />
              <span className="text-xs text-center leading-tight">{section.name}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Content Area */}
      <div>
        {renderContent()}
      </div>

      {/* Sacred Wisdom Footer */}
      <Card className="p-8 text-center bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
        <Crown className="h-12 w-12 mx-auto mb-4 text-purple-600" />
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Continue Your Sacred Education</h2>
        <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
          The path of consciousness distribution requires continuous learning. Master these teachings to become a true Sacred Fire ambassador.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Download Complete Guide
          </Button>
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            <Video className="h-4 w-4 mr-2" />
            Watch Video Library
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SacredKnowledge;
