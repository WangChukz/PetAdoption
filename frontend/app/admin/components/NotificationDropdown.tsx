'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Loader2, Info } from 'lucide-react';
import Link from 'next/link';

type Notification = {
  id: string;
  data: {
    title: string;
    message: string;
    link: string;
    type: string;
  };
  read_at: string | null;
  created_at: string;
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/admin/notifications');
      if (res.ok) {
        const result = await res.json();
        setNotifications(result.data.notifications);
        setUnreadCount(result.data.unread_count);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // every 60s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/notifications/mark-all-read', { method: 'PATCH' });
      if (res.ok) {
        setUnreadCount(0);
        setNotifications(notifications.map(n => ({ ...n, read_at: new Date().toISOString() })));
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/notifications/${id}/read`, { method: 'PATCH' });
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-[#f08c50] transition rounded-xl hover:bg-orange-50"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest text-left">Thông báo</p>
            {unreadCount > 0 && (
              <button 
                onClick={markAllRead}
                disabled={isLoading}
                className="text-[11px] text-[#f08c50] hover:underline flex items-center gap-1"
              >
                {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                Đánh dấu đã đọc hết
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Info className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-[13px] text-gray-400 font-menu">Không có thông báo nào.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 transition cursor-pointer relative ${!n.read_at ? 'bg-orange-50/30' : ''}`}>
                  <Link 
                    href={n.data.link} 
                    onClick={() => {
                        setIsOpen(false);
                        if (!n.read_at) markAsRead(n.id);
                    }}
                    className="block text-left"
                  >
                    <p className={`text-[13px] font-menu ${!n.read_at ? 'font-bold text-[#1a1a1a]' : 'text-gray-600'}`}>
                      {n.data.title}
                    </p>
                    <p className="text-[12px] text-gray-500 font-menu mt-0.5 line-clamp-2">
                      {n.data.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {n.created_at}
                    </p>
                  </Link>
                  {!n.read_at && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#f08c50] rounded-full" />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="px-4 py-2 border-t border-gray-50 text-center">
            <Link href="/admin/notifications" className="text-[12px] text-gray-500 hover:text-[#f08c50] font-menu">
              Xem tất cả
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
