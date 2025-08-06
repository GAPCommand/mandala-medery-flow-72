
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { SupportTicket } from './types';
import { getTicketStatusClass, getPriorityClass } from './utils';

interface SupportTicketsProps {
  tickets: SupportTicket[];
}

const SupportTickets = ({ tickets }: SupportTicketsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
        <FileText className="h-6 w-6 mr-2" />
        Recent Support Tickets
      </h2>
      <div className="space-y-3">
        {tickets.map((ticket, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <p className="font-medium text-amber-800 text-sm">{ticket.id}</p>
                <Badge className={getTicketStatusClass(ticket.status)}>
                  {ticket.status}
                </Badge>
                <Badge className={getPriorityClass(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-700">{ticket.title}</p>
              <p className="text-xs text-gray-500">Updated: {new Date(ticket.updated).toLocaleDateString()}</p>
            </div>
            <Button size="sm" variant="outline">
              View
            </Button>
          </div>
        ))}
      </div>
      <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
        Create New Ticket
      </Button>
    </Card>
  );
};

export default SupportTickets;
