import React from 'react';
import Link from 'next/link';

import { Download, ClipboardList, Clock, MessageSquare, CheckCircle2, Eye, MoreVertical, Filter, Calendar } from 'lucide-react';

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
  pending:       { label: 'Mới',           color: 'bg-blue-50 text-blue-600' },
  auto_rejected: { label: 'Từ chối (HT)',  color: 'bg-gray-100 text-gray-600' },
  manual_check:  { label: 'Chờ duyệt',     color: 'bg-yellow-50 text-yellow-600' },
  interviewing:  { label: 'Phỏng vấn',     color: 'bg-purple-50 text-purple-600' },
  approved:      { label: 'Đã duyệt',      color: 'bg-green-50 text-green-600' },
  rejected:      { label: 'Từ chối',       color: 'bg-red-50 text-red-500' },
  complete:      { label: 'Hoàn tất',      color: 'bg-emerald-50 text-emerald-600' },
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
    <div className="max-w-7xl mx-auto flex flex-col h-full bg-slate-50 p-6 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-menu font-black text-[#1a1a1a] text-[28px]">Quản Lý Hồ Sơ Nhận Nuôi</h1>
            <span className="px-3 py-1 bg-gray-200/60 text-gray-600 rounded-full text-[13px] font-bold">{adoptionsPage.total} tổng cộng</span>
          </div>
          <p className="font-menu text-gray-500 text-[14px] mt-1">Theo dõi và xét duyệt các đơn đăng ký nhận nuôi thú cưng từ cộng đồng.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#f08c50] text-white font-menu font-semibold rounded-xl text-[14px] hover:bg-[#e07a40] transition shadow-sm">
           <Download className="w-4 h-4" /> Tải báo cáo
        </button>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
         {/* Card 1 */}
         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-[130px]">
            <div className="flex items-start justify-between">
               <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5" />
               </div>
               <span className="px-2 py-1 bg-green-50 text-green-600 text-[12px] font-bold rounded-lg">+12%</span>
            </div>
            <div>
               <p className="text-gray-400 font-menu text-[13px] font-bold">Tổng đơn đăng ký</p>
               <p className="font-black text-[28px] text-[#1a1a1a] leading-none mt-1">1,248</p>
            </div>
         </div>
         {/* Card 2 */}
         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-[130px]">
            <div className="flex items-start justify-between">
               <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#f08c50] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
               </div>
               <span className="px-2 py-1 bg-green-50 text-green-600 text-[12px] font-bold rounded-lg">+5%</span>
            </div>
            <div>
               <p className="text-gray-400 font-menu text-[13px] font-bold">Đang chờ duyệt</p>
               <p className="font-black text-[28px] text-[#1a1a1a] leading-none mt-1">156</p>
            </div>
         </div>
         {/* Card 3 */}
         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-[130px]">
            <div className="flex items-start justify-between">
               <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
               </div>
               <span className="px-2 py-1 bg-red-50 text-red-500 text-[12px] font-bold rounded-lg">-2%</span>
            </div>
            <div>
               <p className="text-gray-400 font-menu text-[13px] font-bold">Đang phỏng vấn</p>
               <p className="font-black text-[28px] text-[#1a1a1a] leading-none mt-1">42</p>
            </div>
         </div>
         {/* Card 4 */}
         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-[130px]">
            <div className="flex items-start justify-between">
               <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
               </div>
               <span className="px-2 py-1 bg-green-50 text-green-600 text-[12px] font-bold rounded-lg">+18%</span>
            </div>
            <div>
               <p className="text-gray-400 font-menu text-[13px] font-bold">Đã hoàn tất</p>
               <p className="font-black text-[28px] text-[#1a1a1a] leading-none mt-1">850</p>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden p-2">
        
        {/* Filters */}
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="relative">
                <Filter className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="pl-10 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl font-menu text-[13px] font-semibold text-gray-600 appearance-none outline-none focus:ring-2 focus:ring-[#f08c50]/20 cursor-pointer">
                   <option value="">Tất cả trạng thái</option>
                   <option value="pending">Mới</option>
                   <option value="manual_check">Chờ duyệt</option>
                   <option value="interviewing">Phỏng vấn</option>
                   <option value="approved">Đã duyệt</option>
                   <option value="rejected">Từ chối</option>
                </select>
             </div>
             <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="pl-10 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl font-menu text-[13px] font-semibold text-gray-600 appearance-none outline-none focus:ring-2 focus:ring-[#f08c50]/20 cursor-pointer">
                   <option>Khoảng thời gian</option>
                   <option>Tuần này</option>
                   <option>Tháng này</option>
                </select>
             </div>
          </div>
          <div className="font-menu text-[13px] text-gray-500">
             Hiển thị <span className="font-bold text-[#1a1a1a]">1 - 10</span> trong số <span className="font-bold text-[#1a1a1a]">{adoptionsPage.total}</span> kết quả
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto mt-2">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 font-menu text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded text-[#f08c50] focus:ring-[#f08c50] border-gray-300 cursor-pointer" />
                </th>
                <th className="px-6 py-4">NgƯỜi ĐĂNG KÝ</th>
                <th className="px-6 py-4">THÚ CƯNG</th>
                <th className="px-6 py-4">NGÀY ĐĂNG KÝ</th>
                <th className="px-6 py-4">TRẠNG THÁI</th>
                <th className="px-6 py-4 text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-menu text-[14px]">
              {adoptionsPage.data.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Không có đơn nào phù hợp.</td></tr>
              ) : (
                adoptionsPage.data.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition bg-white">
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="rounded text-[#f08c50] focus:ring-[#f08c50] border-gray-300 w-4 h-4 cursor-pointer" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 rounded-full bg-[#3A8D9D] text-white flex flex-col items-center justify-center font-bold text-[13px] flex-shrink-0">
                           {req.user?.name ? req.user.name.charAt(0).toUpperCase() : 'U'}
                         </div>
                         <div>
                            <p className="font-extrabold text-[#1a1a1a]">{req.user?.name || 'Vô danh'}</p>
                            <p className="text-[12px] text-gray-400 mt-0.5">{req.user?.email}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-100">
                          {req.pet?.image_url ? (
                             <img src={`http://127.0.0.1:8000/storage/${req.pet.image_url}`} alt={req.pet.name} className="w-full h-full object-cover" />
                          ) : '🐾'}
                        </div>
                        <div>
                          <p className="font-extrabold text-[#1a1a1a]">{req.pet?.name} <span className="font-normal text-gray-500">({req.pet?.species})</span></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-[13px] font-medium">
                       {new Date(req.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[12px] font-extrabold ${statusMap[req.status].color}`}>
                        {statusMap[req.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                         <Link href={`/admin/adoptions/${req.id}`} className="text-gray-400 hover:text-[#1a1a1a] transition">
                           <Eye className="w-5 h-5" />
                         </Link>
                         <Link href={`/admin/adoptions/${req.id}`} className="inline-block px-4 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-bold text-[13px] transition">
                           Duyệt
                         </Link>
                         <button className="text-gray-400 hover:text-gray-600 transition">
                            <MoreVertical className="w-5 h-5" />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Container */}
        <div className="mt-auto px-6 py-4 flex items-center justify-between border-t border-gray-50">
           <button className="px-4 py-2 border border-gray-200 rounded-xl font-menu text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition">
              &lt; Trước
           </button>
           <div className="flex gap-2 font-menu text-[13px] font-bold text-gray-600 items-center">
              <span className="w-8 h-8 flex flex-col items-center justify-center bg-[#f08c50] text-white rounded-lg shadow-sm">1</span>
              <span className="w-8 h-8 flex flex-col items-center justify-center hover:bg-gray-50 rounded-lg cursor-pointer transition">2</span>
              <span className="w-8 h-8 flex flex-col items-center justify-center hover:bg-gray-50 rounded-lg cursor-pointer transition">3</span>
              <span className="px-1 tracking-widest text-gray-400">...</span>
              <span className="w-8 h-8 flex flex-col items-center justify-center hover:bg-gray-50 rounded-lg cursor-pointer transition">{adoptionsPage.last_page || 12}</span>
           </div>
           <button className="px-4 py-2 border border-gray-200 rounded-xl font-menu text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition">
              Sau &gt;
           </button>
        </div>

      </div>
    </div>
  );
}
