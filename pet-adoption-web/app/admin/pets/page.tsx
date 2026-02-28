import React from 'react';
import Link from 'next/link';

import { fetchAPI } from '@/lib/api';
type Pet = {
  id: number;
  name: string;
  species: string;
  breed: string | null;
  status: 'available' | 'adopted' | 'in_treatment' | 'hidden';
  gender: 'male' | 'female' | 'unknown';
  image_url: string | null;
};

type PaginatedPets = {
  data: Pet[];
  current_page: number;
  last_page: number;
  total: number;
};

const statusMap = {
  available:    { label: 'Tìm Chủ',     color: 'bg-green-100 text-green-700' },
  adopted:      { label: 'Đã Nhận Nuôi',color: 'bg-blue-100 text-blue-700' },
  in_treatment: { label: 'Đang Điều Trị',color: 'bg-yellow-100 text-yellow-700' },
  hidden:       { label: 'Đã Ẩn',       color: 'bg-gray-100 text-gray-700' },
};

async function getPets(page = 1, search = ''): Promise<PaginatedPets> {
  const query = new URLSearchParams({ page: page.toString() });
  if (search) query.set('search', search);

  const res = await fetchAPI(`/admin/pets?${query.toString()}`, { cache: 'no-store' });
  return res.data;
}

export default async function AdminPetsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const search = params.search ?? '';
  
  const petsPage = await getPets(page, search);

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Quản Lý Thú Cưng</h1>
          <p className="font-menu text-gray-400 text-[14px]">Tổng cộng: {petsPage.total} bé</p>
        </div>
        <Link href="/admin/pets/new"
          className="font-menu bg-[#f08c50] hover:bg-[#d16830] text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition flex items-center gap-2">
          <span>+</span> Thêm Thú Cưng
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <form className="relative flex-1 max-w-sm" action="/admin/pets">
            <input type="text" name="search" defaultValue={search} placeholder="Tìm theo tên..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-[13px] font-menu focus:outline-none focus:border-[#f08c50]" />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <button type="submit" className="hidden">Tìm</button>
          </form>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-menu text-[13px] text-gray-500">
                <th className="font-medium px-6 py-3">ID</th>
                <th className="font-medium px-6 py-3">Ảnh</th>
                <th className="font-medium px-6 py-3">Tên & Giống</th>
                <th className="font-medium px-6 py-3">Trạng Thái</th>
                <th className="font-medium px-6 py-3 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-menu text-[14px]">
              {petsPage.data.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400">Không tìm thấy thú cưng nào.</td></tr>
              ) : (
                petsPage.data.map((pet) => (
                  <tr key={pet.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-gray-400">#{pet.id}</td>
                    <td className="px-6 py-4">
                      {pet.image_url ? (
                        <img src={`http://localhost:8000/storage/${pet.image_url}`} alt={pet.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[18px]">🐾</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#1a1a1a]">{pet.name}</p>
                      <p className="text-[12px] text-gray-500">{pet.species} {pet.breed ? `— ${pet.breed}` : ''}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[12px] font-semibold ${statusMap[pet.status].color}`}>
                        {statusMap[pet.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/pets/${pet.id}`} className="text-[#0489a9] hover:text-[#036a83] font-semibold text-[13px]">
                        Sửa
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {petsPage.last_page > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between font-menu text-[13px] text-gray-500">
            <span>Trang {petsPage.current_page} / {petsPage.last_page}</span>
            <div className="flex gap-2">
              {petsPage.current_page > 1 && (
                <Link href={`/admin/pets?page=${petsPage.current_page - 1}${search ? `&search=${search}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Trước</Link>
              )}
              {petsPage.current_page < petsPage.last_page && (
                <Link href={`/admin/pets?page=${petsPage.current_page + 1}${search ? `&search=${search}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Sau</Link>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
