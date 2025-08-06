
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SupportChannel } from './types';
import { getStatusBadgeClass } from './utils';

interface SupportChannelsProps {
  channels: SupportChannel[];
}

const SupportChannels = ({ channels }: SupportChannelsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {channels.map((channel, index) => {
        const IconComponent = channel.icon;
        return (
          <Card key={index} className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <IconComponent className="h-8 w-8 text-amber-600" />
              <Badge className={getStatusBadgeClass(channel.status)}>
                {channel.status}
              </Badge>
            </div>
            <h3 className="font-bold text-amber-900 mb-2">{channel.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
            <div className="space-y-1 text-xs text-gray-500 mb-4">
              <div className="flex justify-between">
                <span>Available:</span>
                <span>{channel.availability}</span>
              </div>
              <div className="flex justify-between">
                <span>Response:</span>
                <span>{channel.responseTime}</span>
              </div>
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700">
              Contact Now
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default SupportChannels;
