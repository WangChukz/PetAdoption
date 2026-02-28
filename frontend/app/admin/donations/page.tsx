import React from 'react';
import Link from 'next/link';

import { fetchAPI } from '@/lib/api';
type Donation = {
  id: number;
  type: 'income' | 'expense';
  amount: string;
  payment_method: string;
  transaction_id: string | null;
  donor_name: string | null;
  donor_message: string | null;
  notes: string | null;
  created_at: string;
};

type PaginatedDonations = {
  data: Donation[];
  current_page: number;
  last_page: number;
  total: number;
};

const typeMap = {
  income: { label: '+ Thu Vào', color: 'bg-green-100 text-green-700', textAmt: 'text-green-600' },
  expense: { label: '- Chi Ra', color: 'bg-red-100 text-red-700', textAmt: 'text-red-500' },
};

function formatVND(amount: string | number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount));
}

async function getDonations(page = 1, type = ''): Promise<PaginatedDonations> {
  const query = new URLSearchParams({ page: page.toString() });
  if (type) query.set('type', type);

  const res = await fetchAPI(`/admin/donations?${query.toString()}`, { cache: 'no-store' });
  return res.data;
}

export default async function AdminDonationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const typeFilter = params.type ?? '';
  
  const dPage = await getDonations(page, typeFilter);

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Quỹ Quyên Góp</h1>
          <p className="font-menu text-gray-400 text-[14px]">Minh bạch tài chính, có {dPage.total} giao dịch</p>
        </div>
        <Link href="/admin/donations/new"
          className="font-menu bg-[#f08c50] hover:bg-[#d16830] text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition flex items-center gap-2">
          <span>+</span> Thêm Thu/Chi Thủ Công
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/admin/donations" className={`px-4 py-2 rounded-xl text-[13px] font-menu font-semibold transition ${!typeFilter ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Tất Cả</Link>
            <Link href="/admin/donations?type=income" className={`px-4 py-2 rounded-xl text-[13px] font-menu font-semibold transition ${typeFilter === 'income' ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Chỉ Thu</Link>
            <Link href="/admin/donations?type=expense" className={`px-4 py-2 rounded-xl text-[13px] font-menu font-semibold transition ${typeFilter === 'expense' ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Chỉ Chi</Link>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-menu text-[13px] text-gray-500">
                <th className="font-medium px-6 py-3 w-16">Mã</th>
                <th className="font-medium px-6 py-3">Loại Giao Dịch</th>
                <th className="font-medium px-6 py-3">Người Gửi / Nhận</th>
                <th className="font-medium px-6 py-3">Số Tiền</th>
                <th className="font-medium px-6 py-3">Hình Thức</th>
                <th className="font-medium px-6 py-3 w-40">Ngày Ghi Nhận</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-menu text-[14px]">
              {dPage.data.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Không có giao dịch nào phù hợp.</td></tr>
              ) : (
                dPage.data.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-gray-400 font-mono text-[12px]">{tx.transaction_id || `#${tx.id}`}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1.5 rounded-full text-[12px] font-bold ${typeMap[tx.type].color}`}>
                        {typeMap[tx.type].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#1a1a1a]">{tx.donor_name || (tx.type === 'income' ? 'Nhà Hảo Tâm Ẩn Danh' : 'Hệ Thống')}</p>
                      {tx.donor_message && <p className="text-[12px] text-gray-500 italic max-w-xs truncate">"{tx.donor_message}"</p>}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`font-black text-[15px] ${typeMap[tx.type].textAmt}`}>
                         {tx.type === 'expense' ? '-' : '+'}{formatVND(tx.amount)}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-[12px] font-bold font-menu capitalize">
                         {tx.payment_method.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-[13px]">
                       {new Date(tx.created_at).toLocaleString('vi-VN')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {dPage.last_page > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between font-menu text-[13px] text-gray-500">
            <span>Trang {dPage.current_page} / {dPage.last_page}</span>
            <div className="flex gap-2">
              {dPage.current_page > 1 && (
                <Link href={`/admin/donations?page=${dPage.current_page - 1}${typeFilter ? `&type=${typeFilter}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Trước</Link>
              )}
              {dPage.current_page < dPage.last_page && (
                <Link href={`/admin/donations?page=${dPage.current_page + 1}${typeFilter ? `&type=${typeFilter}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Sau</Link>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
