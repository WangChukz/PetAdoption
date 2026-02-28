import React from 'react';
import PostForm from '../../components/PostForm';
import { notFound } from 'next/navigation';

import { fetchAPI } from '@/lib/api';

async function getPost(id: string) {
  const res = await fetchAPI(`/admin/posts/${id}`, { cache: 'no-store' });
  return res.data;
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
           <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">
             Sửa Bài: <span className="text-[#f08c50] min-w-0 truncate">{post.title}</span>
           </h1>
           <p className="font-menu text-gray-400 text-[14px]">
             Cập nhật nội dung hoặc đổi trạng thái xuất bản.
           </p>
        </div>
      </div>
      
      <PostForm initialData={post} isEdit={true} />
    </div>
  );
}
