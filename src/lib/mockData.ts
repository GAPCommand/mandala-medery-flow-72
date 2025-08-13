export const MOCK_DATA = {
  products: [
    {
      id: 'mock-prod-1',
      name: 'Sacred Honey Mead - Original',
      description: 'Traditional honey mead blessed with sacred intentions',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      category: 'Traditional Meads',
      stock: 45,
      consciousness_level: 800,
      sacred_ingredients: ['Wildflower Honey', 'Mountain Spring Water', 'Sacred Intention'],
      batch_info: {
        id: 'SM-2024-001',
        brewing_date: '2024-01-15',
        blessing_ceremony: 'Full Moon Blessing'
      }
    },
    {
      id: 'mock-prod-2', 
      name: 'Divine Elixir - Rose Infusion',
      description: 'Premium mead infused with organic rose petals and divine love',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
      category: 'Premium Elixirs',
      stock: 23,
      consciousness_level: 900,
      sacred_ingredients: ['Raw Manuka Honey', 'Organic Rose Petals', 'Sacred Spring Water'],
      batch_info: {
        id: 'DE-2024-003',
        brewing_date: '2024-02-01',
        blessing_ceremony: 'Rose Moon Ceremony'
      }
    },
    {
      id: 'mock-prod-3',
      name: 'Golden Age Blend',
      description: 'Limited edition blend channeling golden age consciousness',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400',
      category: 'Limited Editions',
      stock: 12,
      consciousness_level: 1200,
      sacred_ingredients: ['Ancient Bee Honey', 'Gold-Infused Water', 'Crystal Energy'],
      batch_info: {
        id: 'GA-2024-001',
        brewing_date: '2024-03-21',
        blessing_ceremony: 'Spring Equinox Activation'
      }
    }
  ],

  inventory: [
    {
      batch_id: 'SM-2024-001',
      product_name: 'Sacred Honey Mead - Original',
      current_level: 145,
      optimal_level: 200,
      reorder_point: 50,
      status: 'good',
      last_updated: '2024-01-20T10:30:00Z',
      consciousness_metrics: {
        energy_level: 850,
        blessing_potency: 92,
        sacred_alignment: 'optimal'
      }
    },
    {
      batch_id: 'DE-2024-003',
      product_name: 'Divine Elixir - Rose Infusion',
      current_level: 67,
      optimal_level: 100,
      reorder_point: 25,
      status: 'low',
      last_updated: '2024-01-20T14:15:00Z',
      consciousness_metrics: {
        energy_level: 920,
        blessing_potency: 95,
        sacred_alignment: 'excellent'
      }
    },
    {
      batch_id: 'GA-2024-001',
      product_name: 'Golden Age Blend',
      current_level: 28,
      optimal_level: 50,
      reorder_point: 10,
      status: 'critical',
      last_updated: '2024-01-20T16:45:00Z',
      consciousness_metrics: {
        energy_level: 1150,
        blessing_potency: 98,
        sacred_alignment: 'transcendent'
      }
    }
  ],

  orders: [
    {
      id: 'ORD-2024-001',
      customer_name: 'Sarah Chen',
      customer_email: 'sarah@example.com',
      status: 'processing',
      total: 14998,
      created_at: '2024-01-20T09:15:00Z',
      items: [
        { product_id: 'mock-prod-1', quantity: 2, price: 4999 },
        { product_id: 'mock-prod-2', quantity: 1, price: 7999 }
      ],
      shipping: {
        method: 'sacred_express',
        address: '123 Spiritual Way, Consciousness City, CC 12345',
        tracking: 'SCF-2024-001'
      },
      consciousness_note: 'Customer requested blessing for healing intentions'
    },
    {
      id: 'ORD-2024-002',
      customer_name: 'Michael Rodriguez',
      customer_email: 'michael@example.com',
      status: 'shipped',
      total: 12999,
      created_at: '2024-01-19T14:30:00Z',
      items: [
        { product_id: 'mock-prod-3', quantity: 1, price: 12999 }
      ],
      shipping: {
        method: 'golden_delivery',
        address: '456 Enlightenment Blvd, Sacred Springs, SS 67890',
        tracking: 'SCF-2024-002'
      },
      consciousness_note: 'Premium blessing ceremony requested'
    }
  ],

  distributors: [
    {
      id: 'dist-001',
      name: 'Sacred Valley Distribution',
      contact_name: 'Emma Lightworker',
      email: 'emma@sacredvalley.com',
      territory: 'Northern California',
      status: 'active',
      tier: 'platinum',
      sales_volume: 25670,
      commission_rate: 15,
      consciousness_level: 880,
      specializations: ['Premium Elixirs', 'Ceremony Supplies'],
      territory_data: {
        zip_codes: ['94XXX', '95XXX', '96XXX'],
        coverage_area: 'San Francisco Bay Area & Surrounding'
      }
    },
    {
      id: 'dist-002',
      name: 'Mystic Mountain Merchants',
      contact_name: 'David Starseed',
      email: 'david@mysticsupply.com',
      territory: 'Colorado Rockies',
      status: 'active',
      tier: 'gold',
      sales_volume: 18450,
      commission_rate: 12,
      consciousness_level: 750,
      specializations: ['Traditional Meads', 'Bulk Orders'],
      territory_data: {
        zip_codes: ['80XXX', '81XXX'],
        coverage_area: 'Denver Metro & Mountain Communities'
      }
    }
  ],

  analytics: {
    sales_metrics: {
      daily_revenue: 35670,
      monthly_revenue: 892450,
      yearly_revenue: 8924500,
      growth_rate: 23.5,
      consciousness_impact_score: 8.7
    },
    product_performance: [
      { product_id: 'mock-prod-1', sales_count: 156, revenue: 779844, growth: 18.2 },
      { product_id: 'mock-prod-2', sales_count: 89, revenue: 711911, growth: 31.7 },
      { product_id: 'mock-prod-3', sales_count: 23, revenue: 298977, growth: 45.1 }
    ],
    customer_insights: {
      total_customers: 1247,
      returning_customers: 892,
      average_order_value: 8999,
      customer_consciousness_level: 825,
      satisfaction_score: 9.2
    }
  },

  territories: [
    {
      id: 'terr-001',
      name: 'Pacific Northwest',
      distributor_id: 'dist-001',
      coverage_area: 'Washington, Oregon, Northern California',
      status: 'active',
      performance_metrics: {
        monthly_sales: 45000,
        target_achievement: 112,
        customer_count: 234,
        growth_rate: 28.5
      }
    },
    {
      id: 'terr-002', 
      name: 'Rocky Mountain Region',
      distributor_id: 'dist-002',
      coverage_area: 'Colorado, Utah, Wyoming',
      status: 'expanding',
      performance_metrics: {
        monthly_sales: 32000,
        target_achievement: 95,
        customer_count: 178,
        growth_rate: 19.2
      }
    }
  ]
};

export const getMockData = (dataType: keyof typeof MOCK_DATA, filters?: any) => {
  const data = MOCK_DATA[dataType];
  
  // Apply basic filtering if provided
  if (filters && Array.isArray(data)) {
    return data.filter((item: any) => {
      for (const [key, value] of Object.entries(filters)) {
        if (item[key] !== value) return false;
      }
      return true;
    });
  }
  
  return data;
};

export const simulateApiDelay = (ms: number = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};