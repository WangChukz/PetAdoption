'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import RichTextEditor from './RichTextEditor';

type Post = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  image_url?: string | null;
};

type Props = {
  initialData?: Post;
  isEdit?: boolean;
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function PostForm({ initialData, isEdit }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image_url ? `http://localhost:8000/storage/${initialData.image_url}` : null
  );

  const [formData, setFormData] = useState<Post>({
    title: initialData?.title ?? '',
    slug: initialData?.slug ?? '',
    excerpt: initialData?.excerpt ?? '',
    content: initialData?.content ?? '',
    published: initialData?.published ?? false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: finalValue };
      if (name === 'title' && !isEdit) {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return toast.error('Ảnh không được vượt quá 5MB');
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
         if (value !== null && value !== undefined) data.append(key, value.toString());
      });
      if (imageFile) data.append('image', imageFile);
      if (isEdit) data.append('_method', 'PUT');

      const url = isEdit ? `/api/admin/posts/${initialData?.id}` : `/api/admin/posts`;
      
      const res = await fetch(url, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || json.error || 'Có lỗi xảy ra khi lưu.');

      toast.success(isEdit ? 'Đã cập nhật bài viết!' : 'Đã đăng bài viết mới!');
      router.push('/admin/posts');
      router.refresh();
      
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-5xl">
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[320px] flex-shrink-0">
          <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-2">Ảnh bìa bài viết</label>
          <div className="relative w-full h-[200px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:border-[#f08c50] hover:bg-orange-50/30 transition cursor-pointer overflow-hidden group">
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
            {imagePreview ? (
              <>
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center z-0">
                  <span className="text-white font-menu font-medium text-[13px]">Thay đổi ảnh</span>
                </div>
              </>
            ) : (
              <>
                <span className="text-[24px] mb-2 text-gray-400 group-hover:text-[#f08c50] transition">📸</span>
                <p className="font-menu text-[13px] text-gray-500 font-medium">Nhấn để tải ảnh lên</p>
                <p className="font-menu text-[11px] text-gray-400 mt-1">16:9 JPEG, PNG (Max 5MB)</p>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[16px] font-bold font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition" />
          </div>

          <div>
             <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Đường dẫn (Slug)</label>
             <input required type="text" name="slug" value={formData.slug} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-[13px] font-mono focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition text-gray-600" />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Đoạn tóm tắt (Excerpt / SEO)</label>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} maxLength={500}
              className="w-full flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition resize-none min-h-[80px]" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="px-6 pt-5 pb-3">
             <h2 className="font-menu font-bold text-[#1a1a1a] text-[16px]">Nội Dung Bài Viết</h2>
          </div>
          <div className="px-6 pb-6 w-full">
            <div className="w-full">
              <RichTextEditor 
                content={formData.content} 
                onChange={(html) => setFormData(p => ({ ...p, content: html }))} 
              />
            </div>
          </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
         <label className="flex items-center gap-3 cursor-pointer group">
           <div className="relative">
             <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="sr-only" />
             <div className={`block w-12 h-7 rounded-full transition-colors ${formData.published ? 'bg-green-500' : 'bg-gray-300'}`}></div>
             <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${formData.published ? 'translate-x-5' : 'translate-x-0'}`}></div>
           </div>
           <div className="font-menu">
             <p className={`font-semibold text-[14px] ${formData.published ? 'text-green-600' : 'text-gray-500'}`}>
                {formData.published ? 'Trạng thái: Đã Xuất Bản' : 'Trạng thái: Bản Nháp'}
             </p>
             <p className="text-[12px] text-gray-400">Bài viết {formData.published ? 'sẽ hiển thị' : 'đang ẩn'} trên trang chủ</p>
           </div>
         </label>

         <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()}
            className="px-6 py-2.5 rounded-xl font-menu text-[14px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
            Hủy Bỏ
          </button>
          <button type="submit" disabled={loading}
            className="px-8 py-2.5 rounded-xl font-menu text-[14px] font-semibold text-white bg-black hover:bg-gray-800 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Đang lưu...' : isEdit ? 'Cập Nhật Bài Viết' : 'Lưu Bài Viết'}
          </button>
        </div>
      </div>
    </form>
  );
}
