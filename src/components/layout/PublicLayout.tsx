
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
