'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { PawPrint } from 'lucide-react';

const routeLabels: Record<string, string> = {
  '/admin':            'Dashboard',
  '/admin/pets':       'Quản Lý Thú Cưng',
  '/admin/adoptions':  'Đơn Nhận Nuôi',
  '/admin/volunteers': 'Tình Nguyện Viên',
  '/admin/donations':  'Quyên Góp',
  '/admin/posts':      'Bài Viết',
  '/admin/users':      'Người Dùng',
};

export default function AdminTopbar() {
  const pathname = usePathname();

  // resolve breadcrumb label
  const pageTitle = Object.entries(routeLabels).findLast(([key]) => pathname.startsWith(key))?.[1] ?? 'Admin';

  return (
    <header className="h-[60px] bg-white border-b border-gray-100 shadow-sm flex items-center px-4 md:px-6 gap-3 md:gap-4 flex-shrink-0">
      {/* Mobile Logo */}
      <div className="md:hidden w-8 h-8 bg-[#f08c50] rounded-xl flex items-center justify-center text-white flex-shrink-0">
        <PawPrint className="w-4 h-4 fill-current" />
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-[13.5px] font-menu">
        <span className="text-gray-400">Admin</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#1a1a1a] font-semibold">{pageTitle}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Global Search */}
      <div className="relative hidden md:block">
        <input
          type="search"
          placeholder="Tìm kiếm..."
          className="bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-[13px] font-menu w-[220px] focus:outline-none focus:border-[#f08c50] focus:ring-1 focus:ring-[#f08c50]/30 transition"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
      </div>

      {/* Notifications */}
      <button className="relative p-2 text-gray-400 hover:text-[#f08c50] transition rounded-xl hover:bg-orange-50">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f08c50] rounded-full" />
      </button>

      {/* Avatar */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f08c50] to-[#d16830] flex items-center justify-center text-white font-bold text-[13px]">
          A
        </div>
        <span className="font-menu text-[13px] text-gray-600 hidden md:block group-hover:text-[#f08c50] transition">
          Admin
        </span>
      </div>
    </header>
  );
}
