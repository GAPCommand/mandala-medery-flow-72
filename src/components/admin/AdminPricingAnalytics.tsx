import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Sparkles,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { usePANDABPricing } from '@/components/integrations/PANDABPricingEngine';

interface PricingMetrics {
  totalProducts: number;
  avgMarginImprovement: number;
  consciousnessOptimizedProducts: number;
  revenueProjection: number;
  topPerformingStrategy: string;
}

const AdminPricingAnalytics: React.FC = () => {
  const { recommendations, refreshRecommendations, loading } = usePANDABPricing();
  const [metrics, setMetrics] = useState<PricingMetrics>({
    totalProducts: 0,
    avgMarginImprovement: 0,
    consciousnessOptimizedProducts: 0,
    revenueProjection: 0,
    topPerformingStrategy: 'premium'
  });

  useEffect(() => {
    calculateMetrics();
  }, [recommendations]);

  const calculateMetrics = () => {
    const totalProducts = recommendations.length;
    const avgMargin = recommendations.reduce((sum, rec) => sum + rec.margin_percentage, 0) / totalProducts || 0;
    const consciousnessOptimized = recommendations.filter(rec => 
      rec.market_factors.consciousness_factor > 1.0
    ).length;
    
    const projectedRevenue = recommendations.reduce((sum, rec) => 
      sum + (rec.recommended_price * 100), 0 // Assuming 100 units per product
    );

    setMetrics({
      totalProducts,
      avgMarginImprovement: avgMargin,
      consciousnessOptimizedProducts: consciousnessOptimized,
      revenueProjection: projectedRevenue,
      topPerformingStrategy: 'consciousness-optimized'
    });
  };

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'value': return 'bg-green-100 text-green-800';
      case 'penetration': return 'bg-blue-100 text-blue-800';
      case 'dynamic': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">PANDAB Pricing Analytics</h2>
        <Button 
          onClick={refreshRecommendations}
          disabled={loading}
          variant="outline"
          className="text-purple-600 border-purple-200 hover:bg-purple-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Sacred Insights
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Products Analyzed</p>
                <p className="text-2xl font-bold text-primary">{metrics.totalProducts}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Margin Improvement</p>
                <p className="text-2xl font-bold text-green-600">
                  {metrics.avgMarginImprovement.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consciousness Optimized</p>
                <p className="text-2xl font-bold text-purple-600">
                  {metrics.consciousnessOptimizedProducts}
                </p>
              </div>
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Projection</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${metrics.revenueProjection.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Recommendations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-amber-700">
            <Target className="h-5 w-5 mr-2" />
            Active Pricing Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.product_id} className="border border-amber-100 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-amber-800">Product ID: {rec.product_id}</h3>
                    <Badge className={getStrategyColor(rec.pricing_strategy)}>
                      {rec.pricing_strategy}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={rec.confidence_score * 100} 
                        className="w-20 h-2"
                      />
                      <span className="text-sm font-medium">
                        {(rec.confidence_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Base Price</p>
                    <p className="font-semibold">${rec.base_price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Recommended</p>
                    <p className="font-semibold text-green-600">${rec.recommended_price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Margin</p>
                    <p className="font-semibold">{rec.margin_percentage.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sacred Multiplier</p>
                    <p className="font-semibold text-purple-600">{rec.sacred_value_multiplier}x</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Consciousness Factor</p>
                    <p className="font-semibold text-blue-600">
                      {rec.market_factors.consciousness_factor}x
                    </p>
                  </div>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Market Demand: {rec.market_factors.demand_level} • 
                  Competition: {(rec.market_factors.competition_density * 100).toFixed(0)}% • 
                  Seasonal: +{((rec.market_factors.seasonal_adjustment - 1) * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPricingAnalytics;