'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Tooltip from './Tooltip';

import { 
  LayoutDashboard, 
  Dog, 
  ClipboardList, 
  Users, 
  HandHeart, 
  FileText, 
  User, 
  Home, 
  PawPrint,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

const totalOverview = [
  { href: '/admin',           label: 'Dashboard',       icon: <LayoutDashboard strokeWidth={2.5} className="w-4 h-4" /> },
  { href: '/admin/pets',      label: 'Thú Cưng',        icon: <Dog strokeWidth={2.5} className="w-4 h-4" /> },
  { href: '/admin/adoptions', label: 'Đơn Nhận Nuôi',   icon: <ClipboardList strokeWidth={2.5} className="w-4 h-4" /> },
];

const managementItems = [
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

  const NavItem = ({ item, collapsed }: { item: any, collapsed: boolean }) => {
    const active = isActive(item.href);
    
    const content = (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] font-menu text-[13.5px] font-semibold transition-all duration-300 group relative w-full
          ${active
            ? 'bg-white/15 text-white shadow-sm'
            : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
      >
        <div className={`flex items-center justify-center w-5 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
          {React.cloneElement(item.icon, {
            className: `${item.icon.props.className} transition-colors duration-300 ${active ? 'text-[#f08c50]' : ''}`,
          })}
        </div>
        {!collapsed && <span className="truncate whitespace-nowrap">{item.label}</span>}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip content={item.label} position="right">
          {content}
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <aside
      className={`relative flex flex-col h-full bg-[#3A8D9D] border-r border-[#ffffff]/10 shadow-2xl transition-all duration-500 ease-in-out ${collapsed ? 'w-[70px]' : 'w-[260px]'} z-40`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#f08c50] rounded-full flex items-center justify-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:bg-[#d16830] transition-all z-50 hover:scale-110 active:scale-95 border-2 border-white"
        title={collapsed ? "Mở rộng" : "Thu gọn"}
      >
        {collapsed ? <ChevronRight size={12} strokeWidth={4} /> : <ChevronLeft size={12} strokeWidth={4} />}
      </button>

      {/* Logo Section */}
      <div className={`flex items-center gap-3 px-4 py-6 overflow-hidden ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 bg-white rounded-[12px] flex items-center justify-center text-[#3A8D9D] flex-shrink-0 shadow-lg border border-white/10 group-hover:rotate-6 transition-transform">
          <PawPrint className="w-6 h-6 fill-current" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight animate-in fade-in slide-in-from-left-4 duration-500">
            <span className="font-black text-[17px] text-white tracking-tight">PetAdoption</span>
            <span className="text-[10px] text-white/60 font-medium uppercase tracking-[0.15em]">Admin Panel</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-1 overflow-y-auto no-scrollbar">
        {/* TỔNG QUAN Section */}
        {!collapsed && (
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 px-3 mt-4 animate-in fade-in duration-700">
            Tổng quan
          </p>
        )}
        <div className="flex flex-col gap-1">
          {totalOverview.map((item) => (
            <NavItem key={item.href} item={item} collapsed={collapsed} />
          ))}
        </div>

        {/* QUẢN LÝ Section */}
        {!collapsed && (
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 px-3 mt-6 animate-in fade-in duration-700">
            Quản lý
          </p>
        )}
        <div className="flex flex-col gap-1">
          {managementItems.map((item) => (
            <NavItem key={item.href} item={item} collapsed={collapsed} />
          ))}
        </div>
      </nav>

      {/* Bottom Link Section */}
      <div className={`px-3 mb-6 flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}>
        {collapsed ? (
          <Tooltip content="Quay về trang web" position="right">
            <Link
              href="/"
              className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 shadow-md group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </Tooltip>
        ) : (
          <Link
            href="/"
            className="flex items-center justify-center gap-3 py-3 rounded-[12px] bg-white/10 hover:bg-white/20 text-white font-bold text-[13px] transition-all border border-white/10 group shadow-md animate-in slide-in-from-bottom-4 duration-500"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Quay về trang web</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
