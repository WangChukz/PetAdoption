import React from 'react';
import PostForm from '../../components/PostForm';

export const metadata = { title: 'Viết Bài Mới — Admin' };

export default function NewPostPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Viết Bài Mới</h1>
        <p className="font-menu text-gray-400 text-[14px]">
          Sử dụng công cụ soạn thảo để chia sẻ tin tức, báo cáo và kiến thức về thú cưng.
        </p>
      </div>
      
      <PostForm />
    </div>
  );
}
