import React from 'react';
import Link from 'next/link';

import { fetchAPI } from '@/lib/api';
type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  published_at: string | null;
  image_url: string | null;
  created_at: string;
};

type PaginatedPosts = {
  data: Post[];
  current_page: number;
  last_page: number;
  total: number;
};

async function getPosts(page = 1, search = ''): Promise<PaginatedPosts> {
  const query = new URLSearchParams({ page: page.toString() });
  if (search) query.set('search', search);

  const res = await fetchAPI(`/admin/posts?${query.toString()}`, { cache: 'no-store' });
  return res.data;
}

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const search = params.search ?? '';
  
  const postsPage = await getPosts(page, search);

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Quản Lý Bài Viết</h1>
          <p className="font-menu text-gray-400 text-[14px]">Tổng cộng: {postsPage.total} bài viết</p>
        </div>
        <Link href="/admin/posts/new"
          className="font-menu bg-[#1a1a1a] hover:bg-black text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition flex items-center gap-2">
          <span>+</span> Viết Bài Mới
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <form className="relative flex-1 max-w-sm" action="/admin/posts">
            <input type="text" name="search" defaultValue={search} placeholder="Tìm bài viết..."
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
                <th className="font-medium px-6 py-3 w-16">ID</th>
                <th className="font-medium px-6 py-3 w-48">Ảnh Bìa</th>
                <th className="font-medium px-6 py-3">Tiêu Đề & Tóm Tắt</th>
                <th className="font-medium px-6 py-3 w-36">Trạng Thái</th>
                <th className="font-medium px-6 py-3 w-36 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-menu text-[14px]">
              {postsPage.data.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400">Không có bài viết nào.</td></tr>
              ) : (
                postsPage.data.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-gray-400">#{post.id}</td>
                    <td className="px-6 py-4">
                      {post.image_url ? (
                        <div className="w-full h-20 relative rounded-xl overflow-hidden bg-gray-100">
                           <img src={`http://localhost:8000/storage/${post.image_url}`} alt={post.title} className="object-cover w-full h-full" />
                        </div>
                      ) : (
                        <div className="w-full h-20 rounded-xl bg-gray-100 flex items-center justify-center text-[24px]">📝</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#1a1a1a] text-[15px] mb-1 leading-snug">{post.title}</p>
                      <p className="text-[12px] text-gray-500 line-clamp-2">{post.excerpt || 'Chưa có tóm tắt.'}</p>
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                         <span className="px-2.5 py-1 rounded-full text-[12px] font-semibold bg-green-100 text-green-700">Đã Xuất Bản</span>
                      ) : (
                         <span className="px-2.5 py-1 rounded-full text-[12px] font-semibold bg-gray-100 text-gray-600">Bản Nháp</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/posts/${post.id}`} className="text-[#0489a9] hover:text-[#036a83] font-semibold text-[13px]">
                        Sửa Bài
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (reusable logic) */}
        {postsPage.last_page > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between font-menu text-[13px] text-gray-500">
            <span>Trang {postsPage.current_page} / {postsPage.last_page}</span>
            <div className="flex gap-2">
              {postsPage.current_page > 1 && (
                <Link href={`/admin/posts?page=${postsPage.current_page - 1}${search ? `&search=${search}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Trước</Link>
              )}
              {postsPage.current_page < postsPage.last_page && (
                <Link href={`/admin/posts?page=${postsPage.current_page + 1}${search ? `&search=${search}` : ''}`} className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Sau</Link>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
