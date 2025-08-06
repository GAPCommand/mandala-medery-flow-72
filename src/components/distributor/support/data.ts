
import { MessageCircle, Phone, Mail, Video } from "lucide-react";
import { SupportChannel, SupportTicket, KnowledgeArticle, ForumPost, EmergencyContact } from './types';

export const supportChannels: SupportChannel[] = [
  {
    name: 'Live Sacred Chat',
    description: 'Instant connection to Sacred Fire support masters',
    icon: MessageCircle,
    availability: 'Mon-Fri 6AM-8PM PST',
    responseTime: '< 2 minutes',
    status: 'online'
  },
  {
    name: 'Sacred Hotline',
    description: 'Direct voice connection for urgent distributor needs',
    icon: Phone,
    availability: '24/7 for Premium Partners',
    responseTime: 'Immediate',
    status: 'available'
  },
  {
    name: 'Sacred Email Portal',
    description: 'Detailed support requests and documentation',
    icon: Mail,
    availability: '24/7 submission',
    responseTime: '< 4 hours',
    status: 'online'
  },
  {
    name: 'Video Consultation',
    description: 'Face-to-face guidance for complex challenges',
    icon: Video,
    availability: 'By appointment',
    responseTime: 'Within 24 hours',
    status: 'available'
  }
];

export const supportTickets: SupportTicket[] = [
  {
    id: 'SCR-2024-001247',
    title: 'Kashmir honey batch availability inquiry',
    status: 'resolved',
    priority: 'medium',
    created: '2024-12-10',
    updated: '2024-12-10',
    category: 'Inventory'
  },
  {
    id: 'SCR-2024-001248',
    title: 'Consciousness level 9 certification process',
    status: 'in-progress',
    priority: 'high',
    created: '2024-12-09',
    updated: '2024-12-11',
    category: 'Training'
  },
  {
    id: 'SCR-2024-001249',
    title: 'Territory expansion approval timeline',
    status: 'pending',
    priority: 'low',
    created: '2024-12-08',
    updated: '2024-12-08',
    category: 'Territory'
  }
];

export const knowledgeBase: KnowledgeArticle[] = [
  {
    title: 'Quick Start Guide for New Partners',
    category: 'Getting Started',
    views: 1247,
    helpful: 94
  },
  {
    title: 'Consciousness Level Certification Process',
    category: 'Training',
    views: 892,
    helpful: 97
  },
  {
    title: 'Sacred Ceremony Integration Guidelines',
    category: 'Product Usage',
    views: 734,
    helpful: 91
  },
  {
    title: 'Territory Expansion Request Process',
    category: 'Business Growth',
    views: 567,
    helpful: 89
  },
  {
    title: 'Premium Partner Benefits Overview',
    category: 'Benefits',
    views: 445,
    helpful: 96
  },
  {
    title: 'Sacred Fire Storage & Transport Best Practices',
    category: 'Operations',
    views: 623,
    helpful: 93
  }
];

export const communityForum: ForumPost[] = [
  {
    title: 'Sacred Fire Level 10 experiences - Share your stories!',
    author: 'SacredSeeker_SF',
    replies: 23,
    views: 156,
    lastActivity: '2 hours ago',
    category: 'Consciousness Sharing'
  },
  {
    title: 'Best practices for Kashmir mead ceremonies',
    author: 'MeadMaster_LA',
    replies: 18,
    views: 134,
    lastActivity: '4 hours ago',
    category: 'Ceremonial Use'
  },
  {
    title: 'Q4 sales strategies that worked for me',
    author: 'DivineDist_NYC',
    replies: 31,
    views: 287,
    lastActivity: '1 day ago',
    category: 'Sales Strategy'
  },
  {
    title: 'Sacred honey sourcing questions',
    author: 'HoneyWisdom_SEA',
    replies: 12,
    views: 98,
    lastActivity: '2 days ago',
    category: 'Product Knowledge'
  }
];

export const emergencyContacts: EmergencyContact[] = [
  {
    name: 'Sacred Fire Emergency Line',
    phone: '1-800-SACRED-911',
    description: 'Critical inventory or customer issues'
  },
  {
    name: 'Master Distribution Advisor',
    phone: '1-800-SACRED-PRO',
    description: 'Premium partner exclusive hotline'
  },
  {
    name: 'Consciousness Crisis Support',
    phone: '1-800-SACRED-ZEN',
    description: 'Spiritual or consciousness-related concerns'
  }
];
