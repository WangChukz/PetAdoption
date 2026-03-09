import React from 'react';
import Link from 'next/link';

import { Download, ClipboardList, Clock, MessageSquare, CheckCircle2, Eye, MoreVertical, Filter, Calendar, TrendingUp } from 'lucide-react';

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
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#101828] text-[20px] tracking-tight leading-none mb-1">Danh Sách Đơn Nhận Nuôi</h1>
          <p className="font-menu text-gray-400 text-[13px] font-medium transition-colors hover:text-gray-500">Quản lý <span className="text-[#3A8D9D] font-black">{adoptionsPage.total}</span> hồ sơ xét duyệt trong hệ thống</p>
        </div>
        <button className="inline-flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-5 py-2.5 rounded-[10px] font-menu text-[13.5px] transition-all shadow-sm active:scale-95 text-center">
           <Download className="w-4 h-4" /> Tải báo cáo
        </button>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
         {/* Card 1 */}
         <div className="bg-white p-5 rounded-[12px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[120px]">
            <div className="relative z-10">
              <p className="font-menu text-[12px] font-bold text-[#64748b] uppercase tracking-wide mb-3">TỔNG ĐƠN ĐĂNG KÝ</p>
              <div className="flex items-center gap-2">
                 <h3 className="font-menu text-[42px] font-bold text-[#111827] leading-none tracking-tight">1,248</h3>
                 <span className="text-emerald-500 bg-emerald-50 ring-1 ring-emerald-500/10 py-1 px-2.5 rounded-[8px] flex items-center gap-1 mt-1">
                    <TrendingUp size={14} className="stroke-[3]" />
                    <span className="text-[14px] font-bold">+12%</span>
                 </span>
              </div>
            </div>
            <ClipboardList className="absolute -right-2 top-1/2 -translate-y-1/2 w-24 h-24 text-[#3A8D9D] opacity-[0.05] group-hover:opacity-[0.1] transition-all duration-700 pointer-events-none" />
         </div>
         {/* Card 2 */}
         <div className="bg-white p-5 rounded-[12px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[120px]">
            <div className="relative z-10">
              <p className="font-menu text-[12px] font-bold text-[#64748b] uppercase tracking-wide mb-3">ĐANG CHỜ DUYỆT</p>
              <div className="flex items-center gap-2">
                 <h3 className="font-menu text-[42px] font-bold text-[#111827] leading-none tracking-tight">156</h3>
                 <span className="text-orange-500 bg-orange-50 ring-1 ring-orange-500/10 py-1 px-2.5 rounded-[8px] flex items-center gap-1 mt-1">
                    <TrendingUp size={14} className="stroke-[3]" />
                    <span className="text-[14px] font-bold">+5%</span>
                 </span>
              </div>
            </div>
            <Clock className="absolute -right-2 top-1/2 -translate-y-1/2 w-24 h-24 text-[#3A8D9D] opacity-[0.05] group-hover:opacity-[0.1] transition-all duration-700 pointer-events-none" />
         </div>
         {/* Card 3 */}
         <div className="bg-white p-5 rounded-[12px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[120px]">
            <div className="relative z-10">
              <p className="font-menu text-[12px] font-bold text-[#64748b] uppercase tracking-wide mb-3">ĐANG PHỎNG VẤN</p>
              <div className="flex items-center gap-2">
                 <h3 className="font-menu text-[42px] font-bold text-[#111827] leading-none tracking-tight">42</h3>
                 <span className="text-emerald-500 bg-emerald-50 ring-1 ring-emerald-500/10 py-1 px-2.5 rounded-[8px] flex items-center gap-1 mt-1">
                    <TrendingUp size={14} className="stroke-[3]" />
                    <span className="text-[14px] font-bold">-2%</span>
                 </span>
              </div>
            </div>
            <MessageSquare className="absolute -right-2 top-1/2 -translate-y-1/2 w-24 h-24 text-[#3A8D9D] opacity-[0.05] group-hover:opacity-[0.1] transition-all duration-700 pointer-events-none" />
         </div>
         {/* Card 4 */}
         <div className="bg-white p-5 rounded-[12px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[120px]">
            <div className="relative z-10">
              <p className="font-menu text-[12px] font-bold text-[#64748b] uppercase tracking-wide mb-3">ĐÃ HOÀN TẤT</p>
              <div className="flex items-center gap-2">
                 <h3 className="font-menu text-[42px] font-bold text-[#111827] leading-none tracking-tight">850</h3>
                 <span className="text-[#3A8D9D] bg-teal-50 ring-1 ring-[#3A8D9D]/10 py-1 px-2.5 rounded-[8px] flex items-center gap-1 mt-1">
                    <TrendingUp size={14} className="stroke-[3]" />
                    <span className="text-[14px] font-bold">+18%</span>
                 </span>
              </div>
            </div>
            <CheckCircle2 className="absolute -right-2 top-1/2 -translate-y-1/2 w-24 h-24 text-[#3A8D9D] opacity-[0.05] group-hover:opacity-[0.1] transition-all duration-700 pointer-events-none" />
         </div>
      </div>

      <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 flex flex-col mb-8 overflow-visible">
        
        {/* Filters */}
        <div className="px-5 py-3.5 border-b border-gray-50 bg-white relative z-[60] flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
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
        <div className="relative z-0 overflow-x-auto overflow-y-auto custom-scrollbar max-h-[450px]">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[#3A8D9D] text-white font-menu text-[11px] font-black uppercase tracking-[0.15em] border-b border-white/10">
                <th className="px-5 py-4 w-[60px] text-center">
                  <input type="checkbox" className="rounded-[10px] border-none bg-white/20 text-white focus:ring-0 w-4 h-4 cursor-pointer shadow-inner transition-all hover:bg-white/30" />
                </th>
                <th className="px-4 py-4 border-r border-white/10">NgƯỜi ĐĂNG KÝ</th>
                <th className="px-4 py-4 border-r border-white/10">THÚ CƯNG</th>
                <th className="px-4 py-4 border-r border-white/10">NGÀY ĐĂNG KÝ</th>
                <th className="px-6 py-4 border-r border-white/10 text-center">TRẠNG THÁI</th>
                <th className="px-6 py-4 text-center">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-menu text-[13.5px]">
              {adoptionsPage.data.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-20 text-gray-400 italic font-medium">Không có dữ liệu hiển thị.</td></tr>
              ) : (
                adoptionsPage.data.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-all group duration-300">
                    <td className="px-5 py-4 text-center border-r border-gray-50/50">
                      <input type="checkbox" className="rounded-[10px] border-gray-300 text-[#f08c50] focus:ring-[#f08c50]/20 w-4 h-4 cursor-pointer transition-all" />
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50/50 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm flex items-center justify-center font-bold text-gray-500">
                           {req.user?.name ? req.user.name.charAt(0).toUpperCase() : 'U'}
                         </div>
                         <div className="flex flex-col">
                            <button className="text-[14px] font-bold text-[#101828] hover:text-[#f08c50] transition-colors text-left">{req.user?.name || 'Vô danh'}</button>
                            <span className="text-[11px] text-gray-400 font-medium">{req.user?.email}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50/50 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                          {req.pet?.image_url ? (
                             <img src={`http://127.0.0.1:8000/storage/${req.pet.image_url}`} alt={req.pet.name} className="w-full h-full object-cover" />
                          ) : <div className="w-full h-full bg-gray-100"></div>}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-[#101828]">{req.pet?.name}</span>
                          <span className="text-[11px] text-gray-400 font-medium">{req.pet?.species}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50/50 text-gray-600 text-[13.5px] font-normal tracking-tight whitespace-nowrap">
                       {new Date(req.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-center border-r border-gray-50/50 whitespace-nowrap">
                      <div className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusMap[req.status].color} shadow-sm border border-current/10 transition-transform`}>
                        {statusMap[req.status].label}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                         <Link href={`/admin/adoptions/${req.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-[10px] transition-all" title="Xét duyệt">
                           <Eye className="w-4 h-4 stroke-[2.5]" />
                         </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Navigation (Integrated) */}
        <div className="px-6 py-5 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 font-menu bg-white">
          <p className="text-[13px] text-slate-500 font-normal tracking-tight">
            Đang xem <span className="text-blue-500 font-normal">{(adoptionsPage.current_page - 1) * 15 + 1}-{Math.min(adoptionsPage.current_page * 15, adoptionsPage.total)}</span> trong tổng số <span className="text-blue-500 font-normal">{adoptionsPage.total}</span>
          </p>
          <div className="flex items-center gap-2">
             <Link href={`/admin/adoptions?page=${Math.max(1, adoptionsPage.current_page - 1)}${statusFilter ? `&status=${statusFilter}` : ''}`} className="px-3 py-1.5 text-[13px] font-normal text-slate-600 border border-gray-200 rounded-[6px] hover:text-[#101828] hover:border-gray-300 transition-all">Trước</Link>
             <div className="flex items-center gap-1.5">
                {Array.from({ length: Math.min(adoptionsPage.last_page, 5) }, (_, i) => i + 1).map((num) => (
                  <Link key={num} href={`/admin/adoptions?page=${num}${statusFilter ? `&status=${statusFilter}` : ''}`} className={`w-8 h-8 rounded-[6px] font-normal text-[13px] transition-all duration-300 flex items-center justify-center ${num === adoptionsPage.current_page ? 'bg-[#f08c50] text-white' : 'bg-white border border-gray-200 text-slate-600 hover:bg-gray-50'}`}>
                    {num}
                  </Link>
                ))}
             </div>
             <Link href={`/admin/adoptions?page=${Math.min(adoptionsPage.last_page, adoptionsPage.current_page + 1)}${statusFilter ? `&status=${statusFilter}` : ''}`} className="px-3 py-1.5 text-[13px] font-normal text-slate-600 border border-gray-200 rounded-[6px] hover:text-[#101828] hover:border-gray-300 transition-all">Sau</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
