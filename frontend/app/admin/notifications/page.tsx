'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Calendar, Layout } from 'lucide-react';
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

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/admin/notifications');
      if (res.ok) {
        const result = await res.json();
        setNotifications(result.data.notifications);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/notifications/${id}/read`, { method: 'PATCH' });
      if (res.ok) {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllRead = async () => {
    try {
      const res = await fetch('/api/admin/notifications/mark-all-read', { method: 'PATCH' });
      if (res.ok) {
        setNotifications(notifications.map(n => ({ ...n, read_at: new Date().toISOString() })));
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Thông Báo</h1>
          <p className="font-menu text-gray-400 text-[14px]">Xem lại tất cả các thông báo hệ thống.</p>
        </div>
        <button 
          onClick={markAllRead}
          className="font-menu bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold text-[13px] transition flex items-center gap-2 hover:bg-gray-50"
        >
          <Check className="w-4 h-4" /> Đánh dấu đã đọc hết
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f08c50]"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-300">
                <Bell className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-menu text-[15px]">Không có thông báo nào.</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {notifications.map((n) => (
                    <div key={n.id} className={`p-4 md:p-6 hover:bg-gray-50/50 transition flex items-start gap-4 ${!n.read_at ? 'bg-orange-50/20' : ''}`}>
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!n.read_at ? 'bg-orange-100 text-[#f08c50]' : 'bg-gray-100 text-gray-400'}`}>
                            <Layout className="w-5 h-5" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                                <h3 className={`text-[15px] font-menu font-bold truncate ${!n.read_at ? 'text-[#1a1a1a]' : 'text-gray-500'}`}>
                                    {n.data.title}
                                </h3>
                                <span className="text-[11px] text-gray-400 whitespace-nowrap flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {n.created_at}
                                </span>
                            </div>
                            <p className={`text-[13.5px] font-menu leading-relaxed mb-4 ${!n.read_at ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                                {n.data.message}
                            </p>
                            <div className="flex items-center gap-3">
                                <Link 
                                    href={n.data.link}
                                    onClick={() => !n.read_at && markAsRead(n.id)}
                                    className="text-[13px] font-bold text-[#f08c50] hover:underline"
                                >
                                    Xem chi tiết
                                </Link>
                                {!n.read_at && (
                                    <button 
                                        onClick={() => markAsRead(n.id)}
                                        className="text-[12px] text-gray-400 hover:text-gray-600"
                                    >
                                        Đánh dấu là đã đọc
                                    </button>
                                )}
                            </div>
                         </div>
                    </div>
                ))}
            </div>
          )}
      </div>
    </div>
  );
}
