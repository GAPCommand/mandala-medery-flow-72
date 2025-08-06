
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Quote, Users, TrendingUp, Award, Sparkles, Crown } from "lucide-react";

const CustomerSuccess = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const successStories = [
    {
      category: 'distributor',
      name: 'Golden Gate Wine Distributors',
      title: 'From Skeptical to Sacred: Our Transformation',
      story: 'Initially hesitant about mead, we took a chance on Sacred Fire. Within 6 months, our Kashmir mead sales exceeded our premium wine segment. The consciousness-driven narrative resonates deeply with our Bay Area clientele.',
      results: ['300% revenue increase', '85% customer retention', '12 new retail partnerships'],
      image: 'photo-1507003211169-0a1dd7228f2d',
      testimonial: '"Sacred Fire has revolutionized our approach to artisanal beverages. The consciousness levels create a unique selling proposition that our customers absolutely love."',
      person: 'Michael Chen, Distribution Director',
      date: '2024-11-15'
    },
    {
      category: 'ritual',
      name: 'Sacred Union Ceremonies',
      title: 'Divine Mead Enhances Wedding Celebrations',
      story: 'Luxury wedding planners in Napa Valley have embraced Sacred Fire mead for consciousness-raising ceremonies. The sacred blessing levels add profound meaning to union celebrations.',
      results: ['Featured in 47 weddings', 'Average order: 24 bottles', '100% rebooking rate'],
      image: 'photo-1519225421980-715cb0215aed',
      testimonial: '"The consciousness blessing levels create an ethereal atmosphere that elevates the entire wedding experience. Couples specifically request Sacred Fire now."',
      person: 'Isabella Rodriguez, Sacred Ceremonies Planner',
      date: '2024-10-28'
    },
    {
      category: 'customer',
      name: 'Mindfulness Retreat Centers',
      title: 'Sacred Fire Enhances Spiritual Journeys',
      story: 'Retreat centers across California integrate Sacred Fire mead into their consciousness expansion programs. The Kashmir heritage and blessing levels align perfectly with mindfulness practices.',
      results: ['23 retreat centers', 'Monthly order growth: 45%', '4.9/5 participant rating'],
      image: 'photo-1506905925346-21bda4d32df4',
      testimonial: '"Our guests experience profound states of awareness during Sacred Fire mead ceremonies. The consciousness levels are not just marketing - they\'re experientially real."',
      person: 'Dr. Sarah Moonlight, Enlightenment Retreat',
      date: '2024-12-05'
    },
    {
      category: 'business',
      name: 'Premium Restaurant Chain',
      title: 'Michelin-Star Restaurants Embrace Sacred Mead',
      story: 'High-end restaurants discovered Sacred Fire mead creates unique pairing opportunities. The consciousness-driven narrative adds storytelling depth to their beverage programs.',
      results: ['18 restaurant locations', '$85 average bottle price', '67% profit margin'],
      image: 'photo-1414235077428-338989a2e8c0',
      testimonial: '"Sacred Fire mead elevates our beverage program beyond traditional wine pairings. The consciousness levels create conversation and enhance the dining experience."',
      person: 'Chef Antoine Dubois, Lumiere Restaurant Group',
      date: '2024-11-22'
    },
    {
      category: 'distributor',
      name: 'Bay Area Specialty Beverages',
      title: 'Small Distributor, Sacred Success',
      story: 'A boutique distributor focused on artisanal products found Sacred Fire mead opened doors to premium accounts. The consciousness angle differentiated them from larger competitors.',
      results: ['Doubled territory size', '156% profit increase', 'Won "Distributor of Year"'],
      image: 'photo-1556742049-0cfed4f6a45d',
      testimonial: '"Sacred Fire gave us a competitive edge we never had. The consciousness levels and Kashmir story create instant customer connection and premium pricing power."',
      person: 'Jessica Portland, Owner & CEO',
      date: '2024-09-18'
    },
    {
      category: 'customer',
      name: 'Corporate Wellness Programs',
      title: 'Fortune 500 Companies Embrace Sacred Experiences',
      story: 'Tech companies in Silicon Valley integrate Sacred Fire mead into their wellness and team-building programs. The consciousness elements align with mindful leadership initiatives.',
      results: ['12 corporate clients', '$2,400 average event', 'Quarterly subscriptions'],
      image: 'photo-1507003211169-0a1dd7228f2d',
      testimonial: '"Our executives appreciate the mindful approach to team bonding. Sacred Fire mead ceremonies have become a cornerstone of our leadership development."',
      person: 'Amanda Foster, Chief Wellness Officer, TechFlow Inc',
      date: '2024-10-15'
    }
  ];

  const impactMetrics = [
    { label: 'Distributor Partners Transformed', value: '47', growth: '+285%' },
    { label: 'End Customer Success Stories', value: '1,247', growth: '+445%' },
    { label: 'Sacred Ceremonies Facilitated', value: '892', growth: '+678%' },
    { label: 'Consciousness Experiences Created', value: '15,600', growth: '+823%' }
  ];

  const categories = [
    { id: 'all', name: 'All Stories', count: successStories.length },
    { id: 'distributor', name: 'Distributor Success', count: successStories.filter(s => s.category === 'distributor').length },
    { id: 'customer', name: 'End Customer Joy', count: successStories.filter(s => s.category === 'customer').length },
    { id: 'ritual', name: 'Sacred Ceremonies', count: successStories.filter(s => s.category === 'ritual').length },
    { id: 'business', name: 'Business Growth', count: successStories.filter(s => s.category === 'business').length }
  ];

  const filteredStories = activeFilter === 'all' 
    ? successStories 
    : successStories.filter(story => story.category === activeFilter);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Sacred Success Stories
        </h1>
        <p className="text-xl text-amber-700">Inspiring transformations through consciousness-driven distribution</p>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => (
          <Card key={index} className="p-6 text-center bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <h3 className="text-3xl font-bold text-emerald-800 mb-2">{metric.value}</h3>
            <p className="text-sm text-emerald-600 mb-2">{metric.label}</p>
            <Badge className="bg-emerald-100 text-emerald-800">{metric.growth}</Badge>
          </Card>
        ))}
      </div>

      {/* Category Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? 'default' : 'outline'}
              onClick={() => setActiveFilter(category.id)}
              className={`${
                activeFilter === category.id 
                  ? 'bg-amber-600 hover:bg-amber-700' 
                  : 'hover:bg-amber-50'
              }`}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </Card>

      {/* Success Stories */}
      <div className="space-y-8">
        {filteredStories.map((story, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Story Image */}
              <div className="lg:col-span-1">
                <div className="h-64 lg:h-full bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${story.image}?w=400&h=600&fit=crop`}
                    alt={story.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={`${
                      story.category === 'distributor' ? 'bg-blue-100 text-blue-800' :
                      story.category === 'customer' ? 'bg-emerald-100 text-emerald-800' :
                      story.category === 'ritual' ? 'bg-purple-100 text-purple-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {story.category === 'distributor' ? <Users className="h-3 w-3 mr-1" /> :
                       story.category === 'customer' ? <Heart className="h-3 w-3 mr-1" /> :
                       story.category === 'ritual' ? <Sparkles className="h-3 w-3 mr-1" /> :
                       <TrendingUp className="h-3 w-3 mr-1" />}
                      {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="lg:col-span-2 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-amber-900 mb-1">{story.title}</h2>
                    <p className="text-amber-700 font-medium">{story.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{new Date(story.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{story.story}</p>

                {/* Results */}
                <div className="mb-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Sacred Results:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {story.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                        <p className="text-sm font-medium text-emerald-800">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-400">
                  <div className="flex items-start space-x-3">
                    <Quote className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-amber-800 italic mb-2">{story.testimonial}</p>
                      <p className="text-sm font-medium text-amber-700">— {story.person}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
        <Crown className="h-12 w-12 mx-auto mb-4 text-purple-600" />
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Share Your Sacred Success Story</h2>
        <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
          Have you experienced transformation through Sacred Fire distribution? We'd love to feature your story and inspire other partners on their consciousness journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Award className="h-4 w-4 mr-2" />
            Submit Success Story
          </Button>
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            <Heart className="h-4 w-4 mr-2" />
            Nominate a Customer
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CustomerSuccess;
