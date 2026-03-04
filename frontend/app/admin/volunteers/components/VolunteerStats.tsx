'use client';

import React from 'react';
import { Users, Clock, MessageSquare, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
  { 
    label: 'TỔNG ỨNG VIÊN', 
    value: '1,284', 
    grow: '+12% tháng này', 
    icon: Users,
    type: 'up'
  },
  { 
    label: 'ĐANG CHỜ DUYỆT', 
    value: '45', 
    grow: '+5% tuần này', 
    icon: Clock,
    type: 'up'
  },
  { 
    label: 'ĐANG PHỎNG VẤN', 
    value: '12', 
    grow: '-2% hôm nay', 
    icon: MessageSquare,
    type: 'down'
  },
  { 
    label: 'ĐÃ TIẾP NHẬN', 
    value: '856', 
    grow: '+10% tháng này', 
    icon: CheckCircle,
    type: 'up'
  },
];

export type VolunteerStatItem = {
  label: string;
  value: string;
  grow: string;
  type: 'up' | 'down';
  icon?: any;
};

export default function VolunteerStats({ data }: { data?: Record<string, VolunteerStatItem> }) {
  const iconMap: Record<string, any> = {
    total: Users,
    pending: Clock,
    interviewing: MessageSquare,
    passed: CheckCircle,
  };

  const displayData = data ? Object.entries(data).map(([key, item]) => ({
    ...item,
    icon: iconMap[key] || Users
  })) : [];

  if (displayData.length === 0) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white p-5 rounded-[12px] border border-gray-100 shadow-sm h-[120px] animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {displayData.map((s, i) => (
        <div 
          key={i} 
          className="bg-white p-5 rounded-[12px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[120px]"
        >
          <div className="relative z-10">
            <p className="font-menu text-[12px] font-bold text-[#64748b] uppercase tracking-wide mb-3">
              {s.label}
            </p>
            <div className="flex items-center gap-2">
              <h3 className="font-menu text-[42px] font-bold text-[#111827] leading-none tracking-tight">
                {s.value}
              </h3>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-[12px] font-bold mt-1
                ${s.type === 'up' 
                  ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/10' 
                  : 'bg-rose-50 text-rose-600 ring-1 ring-rose-500/10'}`}
              >
                {s.type === 'up' ? <TrendingUp size={14} className="stroke-[3]" /> : <TrendingDown size={14} className="stroke-[3]" />}
                {s.grow}
              </div>
            </div>
          </div>

          {/* Ghost Icon */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-24 h-24 text-[#3A8D9D] opacity-[0.05] group-hover:opacity-[0.1] transition-all duration-700 pointer-events-none transform rotate-6">
            <s.icon size={96} strokeWidth={1.5} />
          </div>
        </div>
      ))}
    </div>
  );
}
