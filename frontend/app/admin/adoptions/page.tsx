import React from 'react';
import Link from 'next/link';

import { fetchAPI } from '@/lib/api';
type AdoptionApplication = {
  id: number;
  user: { name: string; email: string };
  pet: { name: string; species: string; image_url: string | null };
  status: 'pending' | 'auto_rejected' | 'manual_check' | 'interviewing' | 'approved' | 'rejected' | 'complete';
  applicant_message: string | null;
  admin_notes: string | null;
  created_at: string;
};

type PaginatedAdoptions = {
  data: AdoptionApplication[];
  current_page: number;
  last_page: number;
  total: number;
};

const statusMap = {
  pending:       { label: 'Chờ Duyệt Mới',   color: 'bg-yellow-100 text-yellow-700' },
  auto_rejected: { label: 'Từ Chối Tự Động', color: 'bg-gray-100 text-gray-700' },
  manual_check:  { label: 'Sàng Lọc Thủ Công', color: 'bg-purple-100 text-purple-700' },
  interviewing:  { label: 'Đang Phỏng Vấn',  color: 'bg-blue-100 text-blue-700' },
  approved:      { label: 'Đã Duyệt',        color: 'bg-green-100 text-green-700' },
  rejected:      { label: 'Từ Chối',         color: 'bg-red-100 text-red-700' },
  complete:      { label: 'Hoàn Thành',      color: 'bg-[#3A8D9D]/10 text-[#3A8D9D]' },
};

async function getAdoptions(page = 1, status = ''): Promise<PaginatedAdoptions> {
  const query = new URLSearchParams({ page: page.toString() });
  if (status) query.set('status', status);

  const res = await fetchAPI(`/admin/adoptions?${query.toString()}`, { cache: 'no-store' });
  return res.data;
}

export default async function AdminAdoptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const statusFilter = params.status ?? '';
  
  const adoptionsPage = await getAdoptions(page, statusFilter);

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Đơn Nhận Nuôi</h1>
          <p className="font-menu text-gray-400 text-[14px]">Quản lý quy trình tìm chủ cho các bé. Tổng: {adoptionsPage.total} đơn</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/admin/adoptions" className={`px-4 py-2 rounded-xl text-[13px] font-menu font-semibold transition ${!statusFilter ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Tất Cả</Link>
            <Link href="/admin/adoptions?status=pending" className={`px-4 py-2 rounded-xl text-[13px] font-menu font-semibold transition ${statusFilter === 'pending' ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Chờ Duyệt Mới</Link>
            <Link href="/admin/adoptions?status=manual_check" className={`px-4 py-2 rounded-xl text-[13px] font-menu font-semibold transition ${statusFilter === 'manual_check' ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Sàng Lọc Thủ Công</Link>
            <Link href="/admin/adoptions?status=interviewing" className={`px-4 py-2 rounded-xl text-[13px] font-menu font-semibold transition ${statusFilter === 'interviewing' ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Đang Phỏng Vấn</Link>
            <Link href="/admin/adoptions?status=approved" className={`px-4 py-2 rounded-xl text-[13px] font-menu font-semibold transition ${statusFilter === 'approved' ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Đã Duyệt</Link>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-menu text-[13px] text-gray-500">
                <th className="font-medium px-6 py-3 w-16">Mã</th>
                <th className="font-medium px-6 py-3">Người Nhận Nuôi</th>
                <th className="font-medium px-6 py-3">Thú Cưng</th>
                <th className="font-medium px-6 py-3">Ngày Gửi</th>
                <th className="font-medium px-6 py-3">Trạng Thái</th>
                <th className="font-medium px-6 py-3 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-menu text-[14px]">
              {adoptionsPage.data.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Không có đơn nào phù hợp.</td></tr>
              ) : (
                adoptionsPage.data.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-gray-400 font-mono">#{req.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#1a1a1a]">{req.user?.name || 'Vô danh'}</p>
                      <p className="text-[12px] text-gray-500">{req.user?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                          {req.pet?.image_url ? (
                             <img src={`http://127.0.0.1:8000/storage/${req.pet.image_url}`} alt={req.pet.name} className="w-full h-full object-cover" />
                          ) : '🐾'}
                        </div>
                        <div>
                          <p className="font-bold text-[#1a1a1a]">{req.pet?.name}</p>
                          <p className="text-[12px] text-gray-500">{req.pet?.species}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-[13px]">
                       {new Date(req.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1.5 rounded-full text-[12px] font-semibold ${statusMap[req.status].color}`}>
                        {statusMap[req.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/adoptions/${req.id}`} className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-[13px] transition">
                        Xét Duyệt
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {adoptionsPage.last_page > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between font-menu text-[13px] text-gray-500">
            <span>Trang {adoptionsPage.current_page} / {adoptionsPage.last_page}</span>
            <div className="flex gap-2">
              {adoptionsPage.current_page > 1 && (
                <Link href={`/admin/adoptions?page=${adoptionsPage.current_page - 1}${statusFilter ? `&status=${statusFilter}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Trước</Link>
              )}
              {adoptionsPage.current_page < adoptionsPage.last_page && (
                <Link href={`/admin/adoptions?page=${adoptionsPage.current_page + 1}${statusFilter ? `&status=${statusFilter}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Sau</Link>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
