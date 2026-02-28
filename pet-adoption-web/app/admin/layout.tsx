import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminBottomNav from './components/AdminBottomNav';
import AdminTopbar from './components/AdminTopbar';

import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Admin Panel — Pet Adoption',
  description: 'Trang quản trị hệ thống Hanoi Pet Adoption',
  robots: 'noindex, nofollow', // don't index admin pages
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      {/* Sidebar (Desktop only) */}
      <div className="hidden md:flex flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative pb-[65px] md:pb-0">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 relative">
          <Toaster position="top-right" />
          {children}
        </main>
        
        {/* Bottom Nav (Mobile only) */}
        <AdminBottomNav />
      </div>
    </div>
  );
}
