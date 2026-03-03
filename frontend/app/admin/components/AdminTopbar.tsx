'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  Bell, 
  Search, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react';
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

  const pageTitle = Object.entries(routeLabels).findLast(([key]) => pathname.startsWith(key))?.[1] ?? 'Admin';

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
      }
    } catch (error) {
      toast.error('Lỗi kết nối');
    }
  };

  return (
    <header className="h-[72px] bg-white border-b border-gray-100 flex items-center px-4 md:px-6 gap-4 flex-shrink-0 relative z-30">
      

      {/* Global Search Pill */}
      <div className="flex-1 max-w-[340px]">
        <div className="relative group">
          <input
            type="text"
            placeholder="Tìm kiếm (Cmd+K)"
            className="w-full bg-gray-50/80 border border-gray-100 rounded-[10px] pl-10 pr-4 py-2 text-[13.5px] font-menu focus:outline-none focus:border-[#3A8D9D] focus:ring-4 focus:ring-[#3A8D9D]/5 transition-all text-gray-900 placeholder:text-gray-400 placeholder:font-medium"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#3A8D9D] transition-colors" />
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Notifications & Profile */}
      <div className="flex items-center gap-4">
        <NotificationDropdown />
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3A8D9D] to-[#2c6d7a] flex items-center justify-center text-white font-black text-[14px] shadow-md hover:scale-105 transition-transform border-2 border-white"
          >
            A
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-50 mb-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Cấu hình hệ thống</p>
                <p className="text-[13px] font-black text-gray-800">Admin Account</p>
              </div>
              
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-menu text-gray-600 hover:bg-gray-50 transition-colors text-left font-semibold">
                <User className="w-4 h-4" />
                <span>Hồ sơ cá nhân</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-menu text-gray-600 hover:bg-gray-50 transition-colors text-left font-semibold">
                <Settings className="w-4 h-4" />
                <span>Cài đặt bảo mật</span>
              </button>
              
              <div className="my-1 border-t border-gray-50" />
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-menu text-red-500 hover:bg-red-50 transition-colors text-left font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
