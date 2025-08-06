
export interface SupportChannel {
  name: string;
  description: string;
  icon: any;
  availability: string;
  responseTime: string;
  status: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  status: string;
  priority: string;
  created: string;
  updated: string;
  category: string;
}

export interface KnowledgeArticle {
  title: string;
  category: string;
  views: number;
  helpful: number;
}

export interface ForumPost {
  title: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  category: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  description: string;
}
