'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { LayoutDashboard, Dog, ClipboardList, Users, HandHeart, FileText, User, LogOut, PawPrint } from 'lucide-react';

const navItems = [
  { href: '/admin',           label: 'Dashboard',       icon: <LayoutDashboard strokeWidth={2.5} className="w-4 h-4" /> },
  { href: '/admin/pets',      label: 'Thú Cưng',        icon: <Dog strokeWidth={2.5} className="w-4 h-4" /> },
  { href: '/admin/adoptions', label: 'Đơn Nhận Nuôi',   icon: <ClipboardList strokeWidth={2.5} className="w-4 h-4" /> },
  { href: '/admin/volunteers',label: 'Tình Nguyện Viên', icon: <Users strokeWidth={2.5} className="w-4 h-4" /> },
  { href: '/admin/donations', label: 'Quyên Góp',        icon: <HandHeart strokeWidth={2.5} className="w-4 h-4" /> },
  { href: '/admin/posts',     label: 'Bài Viết',         icon: <FileText strokeWidth={2.5} className="w-4 h-4" /> },
  { href: '/admin/users',     label: 'Người Dùng',       icon: <User strokeWidth={2.5} className="w-4 h-4" /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <aside
      className={`flex flex-col h-full bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-[240px]'}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-[#f08c50] rounded-xl flex items-center justify-center text-white flex-shrink-0">
          <PawPrint className="w-5 h-5 fill-current" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-none">
            <span className="font-black text-[14px] text-[#1a1a1a]">PetAdoption</span>
            <span className="text-[11px] text-[#f08c50] font-semibold">Admin Panel</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          className={`ml-auto text-gray-400 hover:text-gray-700 transition ${collapsed ? 'rotate-180' : ''}`}
          title="Thu gọn sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-menu text-[13.5px] font-medium transition-all duration-150 group
              ${isActive(item.href)
                ? 'bg-[#f08c50] text-white shadow-sm'
                : 'text-gray-500 hover:bg-orange-50 hover:text-[#f08c50]'}`}
          >
            <span className="flex items-center justify-center w-[18px] flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && isActive(item.href) && (
              <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-100">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-menu text-[13px] text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
        >
          <span className="flex flex-shrink-0 items-center justify-center"><LogOut className="w-4 h-4" strokeWidth={2.5} /></span>
          {!collapsed && <span>Về trang web</span>}
        </Link>
      </div>
    </aside>
  );
}
