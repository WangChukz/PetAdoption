import React from 'react';
import Link from 'next/link';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import VolunteerStats from './components/VolunteerStats';
import VolunteerFilters from './components/VolunteerFilters';
import VolunteerTable from './components/VolunteerTable';

type VolunteerApplication = {
  id: number;
  name: string;
  email: string;
  position: string;
  cv_path: string | null;
  status: 'pending' | 'cv_passed' | 'cv_rejected' | 'interview_scheduled' | 'interviewing' | 'passed' | 'rejected';
  admin_notes: string | null;
  created_at: string;
};

type PaginatedVolunteers = {
  data: VolunteerApplication[];
  current_page: number;
  last_page: number;
  total: number;
};

async function getVolunteers(page = 1, status = '', search = '', position = ''): Promise<PaginatedVolunteers> {
  const query = new URLSearchParams({ page: page.toString() });
  if (status) query.set('status', status);
  if (search) query.set('q', search);
  if (position) query.set('position', position);

  const res = await fetchAPI(`/admin/volunteers?${query.toString()}`, { cache: 'no-store' });
  return res.data;
}

async function getVolunteerStats() {
  const res = await fetchAPI('/admin/volunteers/stats', { cache: 'no-store' });
  return res.data;
}

export default async function AdminVolunteersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; q?: string; position?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const statusFilter = params.status ?? '';
  const searchQuery = params.q ?? '';
  const positionFilter = params.position ?? '';
  
  const [vPage, stats] = await Promise.all([
    getVolunteers(page, statusFilter, searchQuery, positionFilter),
    getVolunteerStats()
  ]);
  const perPage = 10; // Giả định per_page là 10

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-2 font-vietnam">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#101828] text-[20px] tracking-tight leading-none mb-1">Quản Lý Tình Nguyện Viên</h1>
          <p className="font-menu text-gray-400 text-[13px] font-medium">
            Quản lý <span className="text-[#3A8D9D] font-black">{vPage.total}</span> hồ sơ ứng viên trong hệ thống
          </p>
        </div>
        <Link 
          href="/admin/volunteers/new" 
          className="inline-flex items-center justify-center gap-1.5 bg-[#f08c50] hover:bg-[#e07b40] text-white px-5 py-2.5 rounded-[10px] font-menu text-[13.5px] transition-all shadow-md active:scale-95 hover:scale-105 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 stroke-[4]" />
          Tạo Tuyển Dụng Mới
        </Link>
      </div>

      {/* ── Statistics ── */}
      <VolunteerStats data={stats} />

      {/* ── Main Content Card ── */}
      <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 flex flex-col mb-8 relative z-10">
        
        {/* Filters Area */}
        <div className="px-5">
          <VolunteerFilters />
        </div>

        {/* Table Area */}
        <div className="flex-1 bg-white border-t border-gray-50">
          <VolunteerTable volunteers={vPage.data} />
        </div>

        {/* Pagination */}
        <div className="px-6 py-5 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 font-menu bg-white">
          <p className="text-[13px] text-slate-500 font-normal tracking-tight">
            Đang xem <span className="text-[#3A8D9D] font-black">
              {vPage.total === 0 ? 0 : ((vPage.current_page - 1) * perPage) + 1}-{Math.min(vPage.current_page * perPage, vPage.total)}
            </span> trong tổng số <span className="text-[#3A8D9D] font-black">{vPage.total}</span>
          </p>
          
          <div className="flex items-center gap-2">
            <Link 
               href={`?${new URLSearchParams({...params, page: (vPage.current_page - 1).toString()})}`}
               className={`px-3 py-1.5 text-[13px] font-normal text-slate-600 border border-gray-200 rounded-[6px] hover:text-[#101828] hover:border-gray-300 transition-all ${vPage.current_page <= 1 ? 'opacity-30 pointer-events-none' : ''}`}
            >
              Trước
            </Link>
            
            <div className="flex items-center gap-1.5">
              {[...Array(vPage.last_page)].map((_, i) => (
                <Link 
                  key={i}
                  href={`?${new URLSearchParams({...params, page: (i + 1).toString()})}`}
                  className={`w-8 h-8 rounded-[6px] font-normal text-[13px] flex items-center justify-center transition-all duration-300
                    ${vPage.current_page === i + 1 
                      ? 'bg-[#f08c50] text-white' 
                      : 'bg-white border border-gray-200 text-slate-600 hover:bg-gray-50'}`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>

            <Link 
               href={`?${new URLSearchParams({...params, page: (vPage.current_page + 1).toString()})}`}
               className={`px-3 py-1.5 text-[13px] font-normal text-slate-600 border border-gray-200 rounded-[6px] hover:text-[#101828] hover:border-gray-300 transition-all ${vPage.current_page >= vPage.last_page ? 'opacity-30 pointer-events-none' : ''}`}
            >
              Sau
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
