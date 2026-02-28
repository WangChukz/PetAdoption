import React from 'react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api';

import { fetchAPI, AuthError } from '@/lib/api';

// Types
type Stats = {
  pets: { total: number; available: number; adopted: number; in_treatment: number };
  adoptions: { total: number; pending: number; approved: number; rejected: number };
  volunteers: { total: number; pending: number; approved: number };
  donations: { total_income: number; total_expense: number; count: number };
  users: { total: number; active: number };
};

async function getStats(): Promise<Stats> {
  const res = await fetchAPI('/admin/stats', { cache: 'no-store' });
  return res.data;
}

function StatCard({ label, value, sub, color, icon, href }: {
  label: string; value: number | string; sub?: string;
  color: string; icon: string; href: string;
}) {
  return (
    <Link href={href} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-menu text-[13px] text-gray-500 font-medium">{label}</span>
        <span className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-[20px]`}>{icon}</span>
      </div>
      <div>
        <p className="font-black text-[28px] text-[#1a1a1a] leading-none">{value}</p>
        {sub && <p className="font-menu text-[12px] text-gray-400 mt-1">{sub}</p>}
      </div>
      <span className="font-menu text-[12px] text-[#f08c50] opacity-0 group-hover:opacity-100 transition">
        Xem chi tiết →
      </span>
    </Link>
  );
}

function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = stats ? [
    {
      label: 'Tổng Thú Cưng',
      value: stats.pets.total,
      sub: `${stats.pets.available} đang tìm chủ • ${stats.pets.adopted} đã được nhận nuôi`,
      color: 'bg-orange-50',
      icon: '🐾',
      href: '/admin/pets',
    },
    {
      label: 'Đơn Nhận Nuôi',
      value: stats.adoptions.total,
      sub: `${stats.adoptions.pending} đang chờ duyệt`,
      color: 'bg-blue-50',
      icon: '📋',
      href: '/admin/adoptions',
    },
    {
      label: 'Tình Nguyện Viên',
      value: stats.volunteers.total,
      sub: `${stats.volunteers.pending} hồ sơ mới`,
      color: 'bg-green-50',
      icon: '🙋',
      href: '/admin/volunteers',
    },
    {
      label: 'Tổng Quyên Góp',
      value: formatVND(stats.donations.total_income),
      sub: `${stats.donations.count} giao dịch`,
      color: 'bg-yellow-50',
      icon: '💰',
      href: '/admin/donations',
    },
    {
      label: 'Người Dùng',
      value: stats.users.total,
      sub: `${stats.users.active} đang hoạt động`,
      color: 'bg-purple-50',
      icon: '👤',
      href: '/admin/users',
    },
  ] : [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-menu font-black text-[#1a1a1a] text-[26px] mb-1">Tổng Quan Hệ Thống</h1>
        <p className="font-menu text-gray-400 text-[14px]">
          Chào mừng trở lại, Admin · {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {stats ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {cards.map(card => <StatCard key={card.href} {...card} />)}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-menu font-bold text-[#1a1a1a] text-[16px] mb-4">Thao Tác Nhanh</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: '+ Thêm Thú Cưng', href: '/admin/pets/new', color: 'bg-[#f08c50] text-white hover:bg-[#d16830]' },
                { label: 'Duyệt Đơn Mới', href: '/admin/adoptions?status=pending', color: 'bg-blue-500 text-white hover:bg-blue-600' },
                { label: 'Hồ Sơ TNV Mới', href: '/admin/volunteers?status=pending', color: 'bg-green-500 text-white hover:bg-green-600' },
                { label: '+ Thêm Bài Viết', href: '/admin/posts/new', color: 'bg-gray-800 text-white hover:bg-gray-900' },
              ].map(btn => (
                <Link key={btn.href} href={btn.href}
                  className={`font-menu font-semibold text-[13px] px-5 py-2.5 rounded-xl transition ${btn.color}`}>
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
