import React from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, CalendarCheck2, Mic2, PartyPopper, Clock3 } from 'lucide-react';

import { fetchAPI } from '@/lib/api';
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

const statusMap: Record<string, { label: React.ReactNode; color: string }> = {
  pending:              { label: <span className="flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />Chờ Duyệt</span>,           color: 'bg-yellow-100 text-yellow-700' },
  cv_passed:            { label: <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />CV Đạt</span>,             color: 'bg-blue-100 text-blue-700' },
  cv_rejected:          { label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />CV Không Đạt</span>,       color: 'bg-red-100 text-red-700' },
  interview_scheduled:  { label: <span className="flex items-center gap-1.5"><CalendarCheck2 className="w-3.5 h-3.5" />Lịch PV Xác Nhận</span>, color: 'bg-purple-100 text-purple-700' },
  interviewing:         { label: <span className="flex items-center gap-1.5"><Mic2 className="w-3.5 h-3.5" />Đang PV</span>,              color: 'bg-indigo-100 text-indigo-700' },
  passed:               { label: <span className="flex items-center gap-1.5"><PartyPopper className="w-3.5 h-3.5" />Đã Nhận</span>,           color: 'bg-green-100 text-green-700' },
  rejected:             { label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />Từ Chối</span>,             color: 'bg-red-100 text-red-700' },
};

async function getVolunteers(page = 1, status = ''): Promise<PaginatedVolunteers> {
  const query = new URLSearchParams({ page: page.toString() });
  if (status) query.set('status', status);

  const res = await fetchAPI(`/admin/volunteers?${query.toString()}`, { cache: 'no-store' });
  return res.data;
}

export default async function AdminVolunteersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const statusFilter = params.status ?? '';
  
  const vPage = await getVolunteers(page, statusFilter);

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Tình Nguyện Viên</h1>
          <p className="font-menu text-gray-400 text-[14px] mt-1">Tổng cộng: {vPage.total} hồ sơ ứng tuyển</p>
        </div>
        <Link 
          href="/admin/volunteers/new" 
          className="inline-flex items-center justify-center gap-2 bg-[#f08c50] hover:bg-[#d16830] text-white px-5 py-2.5 rounded-xl font-menu font-bold text-[14px] transition-all shadow-sm active:scale-95"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Thêm Hồ Sơ Mới
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        
        {/* Filters */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/volunteers" className={`px-5 py-2.5 rounded-xl text-[13px] font-menu font-bold transition hover:shadow-sm ${!statusFilter ? 'bg-[#1a1a1a] text-white shadow' : 'bg-gray-100/80 text-gray-500 hover:bg-gray-200/80 hover:text-gray-700'}`}>Tất Cả</Link>
            <Link href="/admin/volunteers?status=pending" className={`px-5 py-2.5 rounded-xl text-[13px] font-menu font-bold transition hover:shadow-sm ${statusFilter === 'pending' ? 'bg-[#1a1a1a] text-white shadow' : 'bg-gray-100/80 text-gray-500 hover:bg-gray-200/80 hover:text-gray-700'}`}>Hồ Sơ Mới</Link>
            <Link href="/admin/volunteers?status=approved" className={`px-5 py-2.5 rounded-xl text-[13px] font-menu font-bold transition hover:shadow-sm ${statusFilter === 'approved' ? 'bg-[#1a1a1a] text-white shadow' : 'bg-gray-100/80 text-gray-500 hover:bg-gray-200/80 hover:text-gray-700'}`}>Đã Nhận</Link>
          </div>
        </div>

        {/* Mobile Cards (Visible only on small screens) */}
        <div className="md:hidden flex flex-col p-4 gap-4 pb-8">
          {vPage.data.length === 0 ? (
            <div className="text-center py-10 text-gray-400 font-menu text-[14px]">Không có hồ sơ nào.</div>
          ) : (
            vPage.data.map((req) => (
              <div key={req.id} className="bg-white border border-gray-100 rounded-3xl p-4.5 flex flex-col gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-menu">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <p className="font-black text-[#1a1a1a] text-[16px] leading-tight mb-0.5">{req.name || 'Vô danh'}</p>
                    <p className="text-[13px] text-gray-500 font-medium truncate">{req.email}</p>
                  </div>
                  <span className="text-[13px] font-bold text-gray-300">#{req.id}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-0.5">
                  <span className="bg-purple-100/50 text-purple-700 px-3.5 py-1.5 rounded-xl text-[12.5px] font-bold">
                    {req.position}
                  </span>
                  <div className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl text-[12.5px] font-bold ${statusMap[req.status].color} bg-opacity-50`}>
                    {statusMap[req.status].label}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-50">
                  <span className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {new Date(req.created_at).toLocaleDateString('vi-VN')}
                  </span>
                  <Link href={`/admin/volunteers/${req.id}`} className="inline-block px-4 py-2 bg-gray-100 text-[#1a1a1a] rounded-xl font-bold text-[13px] transition active:bg-gray-200">
                    Chi Tiết
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table (Hidden on small screens) */}
        <div className="hidden md:block flex-1 overflow-auto bg-white">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 font-menu text-[13px] text-gray-500">
                <th className="font-semibold px-8 py-4 whitespace-nowrap w-[60px]">ID</th>
                <th className="font-semibold px-6 py-4 whitespace-nowrap">Ứng Viên</th>
                <th className="font-semibold px-6 py-4 whitespace-nowrap">Vị Trí Ứng Tuyển</th>
                <th className="font-semibold px-6 py-4 whitespace-nowrap w-44">Ngày Gửi</th>
                <th className="font-semibold px-6 py-4 whitespace-nowrap w-40">Trạng Thái</th>
                <th className="font-semibold px-8 py-4 whitespace-nowrap w-44 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-menu text-[14px]">
              {vPage.data.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Không có hồ sơ nào.</td></tr>
              ) : (
                vPage.data.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-8 py-5 text-gray-400 font-medium whitespace-nowrap">#{req.id}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="font-black text-[#1a1a1a] text-[15px] mb-0.5">{req.name || 'Vô danh'}</p>
                      <p className="text-[13px] text-gray-500 font-medium">{req.email}</p>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="bg-purple-100/50 text-purple-700 px-4 py-2 rounded-xl text-[13px] font-bold inline-block whitespace-nowrap">
                         {req.position}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-600 font-semibold text-[13px] whitespace-nowrap">
                       {new Date(req.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-1.5 rounded-xl text-[12px] font-bold ${statusMap[req.status].color} bg-opacity-50`}>
                        {statusMap[req.status].label}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right whitespace-nowrap">
                      <Link href={`/admin/volunteers/${req.id}`} className="inline-block px-5 py-2.5 bg-gray-100 group-hover:bg-gray-200 text-[#1a1a1a] rounded-xl font-bold text-[13px] transition whitespace-nowrap">
                        Xét Duyệt CV
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {vPage.last_page > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between font-menu text-[13px] text-gray-500">
            <span>Trang {vPage.current_page} / {vPage.last_page}</span>
            <div className="flex gap-2">
              {vPage.current_page > 1 && (
                <Link href={`/admin/volunteers?page=${vPage.current_page - 1}${statusFilter ? `&status=${statusFilter}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Trước</Link>
              )}
              {vPage.current_page < vPage.last_page && (
                <Link href={`/admin/volunteers?page=${vPage.current_page + 1}${statusFilter ? `&status=${statusFilter}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Sau</Link>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
