
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { KnowledgeArticle } from './types';

interface KnowledgeBaseProps {
  articles: KnowledgeArticle[];
}

const KnowledgeBase = ({ articles }: KnowledgeBaseProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
        <BookOpen className="h-6 w-6 mr-2" />
        Sacred Knowledge Base
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:shadow-md transition-all">
            <h3 className="font-medium text-amber-900 mb-2">{article.title}</h3>
            <Badge className="bg-amber-100 text-amber-800 text-xs mb-2">{article.category}</Badge>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{article.views} views</span>
              <span>{article.helpful}% helpful</span>
            </div>
          </div>
        ))}
      </div>
      <Button className="w-full mt-4" variant="outline">
        Browse All Articles
      </Button>
    </Card>
  );
};

export default KnowledgeBase;
