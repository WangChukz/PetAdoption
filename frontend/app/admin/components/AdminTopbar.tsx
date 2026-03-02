'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { PawPrint, User, Settings, LogOut, ChevronDown, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import NotificationDropdown from './NotificationDropdown';

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
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // resolve breadcrumb label
  const pageTitle = Object.entries(routeLabels).findLast(([key]) => pathname.startsWith(key))?.[1] ?? 'Admin';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/login', { method: 'DELETE' });
      if (res.ok) {
        toast.success('Đã đăng xuất');
        router.push('/login');
        router.refresh();
      } else {
        toast.error('Lỗi khi đăng xuất');
      }
    } catch (error) {
      toast.error('Lỗi kết nối');
    }
  };

  return (
    <header className="h-[60px] bg-white border-b border-gray-100 shadow-sm flex items-center px-4 md:px-6 gap-3 md:gap-4 flex-shrink-0 relative z-30">
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
      <NotificationDropdown />

      {/* Avatar & Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 cursor-pointer group hover:bg-gray-50 p-1 rounded-xl transition"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f08c50] to-[#d16830] flex items-center justify-center text-white font-bold text-[13px] shadow-sm">
            A
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <span className="font-menu text-[13px] text-gray-700 font-semibold group-hover:text-[#f08c50] transition whitespace-nowrap">
              Admin
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 border-b border-gray-50 mb-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Tài khoản</p>
            </div>
            
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-menu text-gray-600 hover:bg-orange-50 hover:text-[#f08c50] transition-colors text-left">
              <User className="w-4 h-4" />
              <span>Thông tin cá nhân</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-menu text-gray-600 hover:bg-orange-50 hover:text-[#f08c50] transition-colors text-left">
              <Settings className="w-4 h-4" />
              <span>Cài đặt tài khoản</span>
            </button>
            
            <div className="my-1 border-t border-gray-50" />
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-menu text-red-500 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-bold">Đăng xuất</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
