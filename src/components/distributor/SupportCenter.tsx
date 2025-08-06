
import React, { useState } from 'react';
import SupportChannels from './support/SupportChannels';
import SupportTickets from './support/SupportTickets';
import PremiumBenefits from './support/PremiumBenefits';
import KnowledgeBase from './support/KnowledgeBase';
import CommunityForum from './support/CommunityForum';
import EmergencyContacts from './support/EmergencyContacts';
import { supportChannels, supportTickets, knowledgeBase, communityForum, emergencyContacts } from './support/data';

const SupportCenter = () => {
  const [activeTicket, setActiveTicket] = useState(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Sacred Support Center
        </h1>
        <p className="text-xl text-amber-700">Divine assistance for your distribution journey</p>
      </div>

      <SupportChannels channels={supportChannels} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SupportTickets tickets={supportTickets} />
        <PremiumBenefits />
      </div>

      <KnowledgeBase articles={knowledgeBase} />

      <CommunityForum posts={communityForum} />

      <EmergencyContacts contacts={emergencyContacts} />
    </div>
  );
};

export default SupportCenter;
