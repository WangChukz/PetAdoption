'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown, ListFilter, Check } from 'lucide-react';

const positions = [
  { label: 'Tất cả vị trí', value: '' },
  { label: 'Dog Walker', value: 'Dog Walker' },
  { label: 'Shelter Care', value: 'Shelter Care' },
  { label: 'Event Staff', value: 'Event Staff' },
  { label: 'Cat Sitter', value: 'Cat Sitter' },
  { label: 'Nhiếp ảnh & quay phim', value: 'Nhiếp ảnh & quay phim' },
  { label: 'Chăm sóc thú cưng', value: 'Chăm sóc thú cưng' },
];

const statuses = [
  { label: 'Tất cả trạng thái', value: '' },
  { label: 'Hồ sơ mới', value: 'pending' },
  { label: 'Chờ phỏng vấn', value: 'interview_scheduled' },
  { label: 'Đã nhận', value: 'passed' },
];

export default function VolunteerFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [statusOpen, setStatusOpen] = useState(false);
  const [posOpen, setPosOpen] = useState(false);
  
  const statusRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<HTMLDivElement>(null);

  const currentStatus = searchParams.get('status') || '';
  const currentPosition = searchParams.get('position') || '';

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) setStatusOpen(false);
      if (posRef.current && !posRef.current.contains(event.target as Node)) setPosOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) params.set('q', search);
      else params.delete('q');
      params.set('page', '1');
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
    setStatusOpen(false);
    setPosOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4 font-vietnam relative z-20">
      {/* Left: Custom Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        
        {/* Status Dropdown */}
        <div className="relative min-w-[180px]" ref={statusRef}>
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-[10px] px-4 py-2 text-[13px] font-medium text-gray-500 transition-all outline-none border border-transparent focus:border-gray-200"
          >
            <span>{statuses.find(s => s.value === currentStatus)?.label || 'Tất cả trạng thái'}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${statusOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {statusOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              {statuses.map((s) => (
                <button
                  key={s.value}
                  onClick={() => updateParam('status', s.value)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-[14px] text-gray-600 hover:bg-gray-50 hover:text-[#0489A0] transition-colors"
                >
                  <span className={currentStatus === s.value ? 'font-bold text-[#0489A0]' : ''}>{s.label}</span>
                  {currentStatus === s.value && <Check className="w-4 h-4 text-[#0489A0]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Position Dropdown */}
        <div className="relative min-w-[200px]" ref={posRef}>
          <button
            onClick={() => setPosOpen(!posOpen)}
            className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-[10px] px-4 py-2 text-[13px] font-medium text-gray-500 transition-all outline-none border border-transparent focus:border-gray-200"
          >
            <span className="truncate">{positions.find(p => p.value === currentPosition)?.label || 'Tất cả vị trí'}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${posOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {posOpen && (
            <div className="absolute top-full left-0 w-full min-w-[220px] mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              {positions.map((p) => (
                <button
                  key={p.value}
                  onClick={() => updateParam('position', p.value)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-[14px] text-gray-600 hover:bg-gray-50 hover:text-[#0489A0] transition-colors text-left"
                >
                  <span className={currentPosition === p.value ? 'font-bold text-[#0489A0]' : ''}>{p.label}</span>
                  {currentPosition === p.value && <Check className="w-4 h-4 text-[#0489A0]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Search & Advanced Filter */}
      <div className="flex items-center gap-3 w-full lg:w-auto lg:max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm ứng viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 hover:bg-gray-100 border-none rounded-[10px] pl-10 pr-4 py-2 text-[13px] font-normal text-[#101828] placeholder-gray-400 outline-none transition-all"
          />
        </div>
        
        <button className="p-2.5 bg-white border border-gray-100 rounded-[10px] text-gray-400 hover:text-[#0489A0] hover:bg-gray-50 transition-all shadow-sm active:scale-95">
          <ListFilter className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
}
