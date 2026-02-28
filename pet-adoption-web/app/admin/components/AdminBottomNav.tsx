'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { LayoutDashboard, Dog, ClipboardList, Users, Menu, X, HandHeart, FileText, User, LogOut } from 'lucide-react';

const mainNavItems = [
  { href: '/admin',           label: 'Tổng quan',    icon: LayoutDashboard },
  { href: '/admin/pets',      label: 'Thú cưng',     icon: Dog },
  { href: '/admin/adoptions', label: 'Nhận nuôi',    icon: ClipboardList },
  { href: '/admin/volunteers',label: 'Tình nguyện',  icon: Users },
];

const moreNavItems = [
  { href: '/admin/donations', label: 'Quyên góp',    icon: HandHeart },
  { href: '/admin/posts',     label: 'Bài viết',     icon: FileText },
  { href: '/admin/users',     label: 'Người dùng',   icon: User },
];

export default function AdminBottomNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <>
      {/* Overlay for More Menu */}
      {showMore && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in"
          onClick={() => setShowMore(false)}
        />
      )}

      {/* More Menu Drawer */}
      <div 
        className={`fixed bottom-[65px] left-0 right-0 bg-white border-t border-gray-100 rounded-t-3xl p-4 z-50 transition-transform duration-300 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] ${showMore ? 'translate-y-0' : 'translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="font-menu font-bold text-[16px] text-gray-800">Chức Năng Khác</h3>
          <button onClick={() => setShowMore(false)} className="p-2 bg-gray-50 rounded-full text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {moreNavItems.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowMore(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-menu text-[14px] font-semibold transition-colors
                  ${isActive(item.href) ? 'bg-orange-50 text-[#f08c50]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Icon className="w-5 h-5" strokeWidth={2.5} />
                {item.label}
              </Link>
            );
          })}
          
          <div className="h-px bg-gray-100 my-2" />
          
          <Link
            href="/"
            onClick={() => setShowMore(false)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-menu text-[14px] font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" strokeWidth={2.5} />
            Về trang web
          </Link>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-[65px] bg-white border-t border-gray-100 flex items-center justify-around z-50 md:hidden px-2 pb-safe">
        {mainNavItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors
                ${active ? 'text-[#f08c50]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${active ? 'bg-orange-50' : ''}`}>
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={`font-menu text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
        
        {/* Menu Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors
            ${showMore ? 'text-[#f08c50]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${showMore ? 'bg-orange-50' : ''}`}>
            <Menu className="w-5 h-5" strokeWidth={showMore ? 2.5 : 2} />
          </div>
          <span className={`font-menu text-[10px] ${showMore ? 'font-bold' : 'font-medium'}`}>
            Menu
          </span>
        </button>
      </nav>
    </>
  );
}
