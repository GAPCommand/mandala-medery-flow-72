
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { ForumPost } from './types';

interface CommunityForumProps {
  posts: ForumPost[];
}

const CommunityForum = ({ posts }: CommunityForumProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
        <User className="h-6 w-6 mr-2" />
        Sacred Partner Community
      </h2>
      <div className="space-y-3">
        {posts.map((post, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-blue-900">{post.title}</h3>
                <Badge className="bg-blue-100 text-blue-800 text-xs">{post.category}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-xs text-blue-600">
                <span>by {post.author}</span>
                <span>{post.replies} replies</span>
                <span>{post.views} views</span>
                <span>Last: {post.lastActivity}</span>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Join
            </Button>
          </div>
        ))}
      </div>
      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
        Visit Community Forum
      </Button>
    </Card>
  );
};

export default CommunityForum;
