
export const getStatusBadgeClass = (status: string) => {
  return status === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800';
};

export const getTicketStatusClass = (status: string) => {
  if (status === 'resolved') return 'bg-emerald-100 text-emerald-800';
  if (status === 'in-progress') return 'bg-blue-100 text-blue-800';
  return 'bg-yellow-100 text-yellow-800';
};

export const getPriorityClass = (priority: string) => {
  if (priority === 'high') return 'bg-red-100 text-red-800';
  if (priority === 'medium') return 'bg-amber-100 text-amber-800';
  return 'bg-gray-100 text-gray-800';
};
