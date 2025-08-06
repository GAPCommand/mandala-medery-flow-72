
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Mail, 
  Phone, 
  Building2, 
  Clock, 
  User, 
  MessageSquare,
  Filter,
  Search,
  Eye,
  Edit,
  Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  lead_source: string;
  lead_status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  contacted_at?: string;
  metadata: any;
}

const LeadsManagement = () => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const updateData: any = { lead_status: status };
      if (status === 'contacted') {
        updateData.contacted_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('contact_leads')
        .update(updateData)
        .eq('id', leadId);

      if (error) throw error;
      
      toast.success('Lead status updated');
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead status');
    }
  };

  const updateLeadPriority = async (leadId: string, priority: string) => {
    try {
      const { error } = await supabase
        .from('contact_leads')
        .update({ priority })
        .eq('id', leadId);

      if (error) throw error;
      
      toast.success('Lead priority updated');
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead priority');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || lead.lead_status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Distribution Leads</h1>
          <p className="text-gray-600 mt-1">Manage contact form submissions and distribution inquiries</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>New: {leads.filter(l => l.lead_status === 'new').length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Active: {leads.filter(l => ['contacted', 'qualified'].includes(l.lead_status)).length}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Leads List */}
      <div className="grid gap-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                  <Badge className={getStatusColor(lead.lead_status)}>
                    {lead.lead_status}
                  </Badge>
                  <Badge className={getPriorityColor(lead.priority)}>
                    {lead.priority}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{lead.email}</span>
                  </div>
                  {lead.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{lead.phone}</span>
                    </div>
                  )}
                  {lead.company && (
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{lead.company}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Created {formatDistanceToNow(new Date(lead.created_at))} ago</span>
                  </div>
                  {lead.contacted_at && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Contacted {formatDistanceToNow(new Date(lead.contacted_at))} ago</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 line-clamp-2">{lead.message}</p>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Lead Details: {lead.name}</DialogTitle>
                    </DialogHeader>
                    {selectedLead && (
                      <div className="space-y-6">
                        {/* Contact Information */}
                        <div>
                          <h4 className="font-semibold mb-3">Contact Information</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Name</label>
                              <p className="text-gray-900">{selectedLead.name}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Email</label>
                              <p className="text-gray-900">{selectedLead.email}</p>
                            </div>
                            {selectedLead.phone && (
                              <div>
                                <label className="text-sm font-medium text-gray-500">Phone</label>
                                <p className="text-gray-900">{selectedLead.phone}</p>
                              </div>
                            )}
                            {selectedLead.company && (
                              <div>
                                <label className="text-sm font-medium text-gray-500">Company</label>
                                <p className="text-gray-900">{selectedLead.company}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <h4 className="font-semibold mb-3">Message</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-800 whitespace-pre-wrap">{selectedLead.message}</p>
                          </div>
                        </div>

                        {/* Status Management */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-2 block">Status</label>
                            <Select
                              value={selectedLead.lead_status}
                              onValueChange={(value) => updateLeadStatus(selectedLead.id, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="converted">Converted</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-2 block">Priority</label>
                            <Select
                              value={selectedLead.priority}
                              onValueChange={(value) => updateLeadPriority(selectedLead.id, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex space-x-2 pt-4 border-t">
                          <Button
                            onClick={() => window.open(`mailto:${selectedLead.email}`, '_blank')}
                            className="flex-1"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </Button>
                          {selectedLead.phone && (
                            <Button
                              variant="outline"
                              onClick={() => window.open(`tel:${selectedLead.phone}`, '_blank')}
                              className="flex-1"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Select
                  value={lead.lead_status}
                  onValueChange={(value) => updateLeadStatus(lead.id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        ))}

        {filteredLeads.length === 0 && (
          <Card className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your filters or search term.'
                : 'Contact form submissions will appear here.'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LeadsManagement;
