'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

type Pet = {
  id?: number;
  name: string;
  species: string;
  breed: string;
  description: string;
  age_months: number | '';
  gender: 'male' | 'female' | 'unknown';
  status: 'available' | 'adopted' | 'in_treatment' | 'hidden';
  image_url?: string | null;
  personality_tags: string[];
};

type Props = {
  initialData?: Pet;
  isEdit?: boolean;
};

export default function PetForm({ initialData, isEdit }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image_url ? `http://localhost:8000/storage/${initialData.image_url}` : null
  );

  const [formData, setFormData] = useState<Pet>({
    name: initialData?.name ?? '',
    species: initialData?.species ?? 'Chó',
    breed: initialData?.breed ?? '',
    description: initialData?.description ?? '',
    age_months: initialData?.age_months ?? '',
    gender: initialData?.gender ?? 'unknown',
    status: initialData?.status ?? 'available',
    personality_tags: initialData?.personality_tags ?? [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ảnh không được vượt quá 5MB');
        return;
      }
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
        if (key === 'personality_tags') {
           // For now, simplify arrays. Real app might JSON.stringify
        } else if (value !== null && value !== undefined) {
          data.append(key, value.toString());
        }
      });
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      const method = isEdit ? 'POST' : 'POST'; // Laravel forms with files use POST with _method=PUT
      if (isEdit) data.append('_method', 'PUT');

      const url = isEdit ? `/api/admin/pets/${initialData?.id}` : `/api/admin/pets`;
      
      const res = await fetch(url, {
        method: 'POST', // always POST for multipart/form-data with Laravel, override via _method
        body: data,
        headers: {
          'Accept': 'application/json',
          // Note: Add Authorization header here if needed for Sanctum token
        }
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || json.error || 'Có lỗi xảy ra khi lưu.');
      }

      toast.success(isEdit ? 'Đã cập nhật thú cưng!' : 'Đã thêm thú cưng mới!');
      router.push('/admin/pets');
      router.refresh();
      
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
        
        {/* Left Col: Info */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">
              Tên thú cưng <span className="text-red-500">*</span>
            </label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition" />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Loài <span className="text-red-500">*</span></label>
              <select name="species" value={formData.species} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition">
                <option value="Chó">Chó</option>
                <option value="Mèo">Mèo</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Giống</label>
              <input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="Vd: Poodle, Ta..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Tháng tuổi</label>
              <input type="number" min="0" name="age_months" value={formData.age_months} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition" />
            </div>
            <div className="flex-1">
              <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Giới tính</label>
              <select name="gender" value={formData.gender} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition">
                <option value="male">Đực</option>
                <option value="female">Cái</option>
                <option value="unknown">Chưa rõ</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Trạng thái <span className="text-red-500">*</span></label>
            <select name="status" value={formData.status} onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition">
              <option value="available">Đang tìm chủ</option>
              <option value="adopted">Đã được nhận nuôi</option>
              <option value="in_treatment">Đang điều trị</option>
              <option value="hidden">Đã ẩn</option>
            </select>
          </div>
        </div>

        {/* Right Col: Image & Desc */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Ảnh đại diện</label>
            <div className="relative w-full h-[180px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:border-[#f08c50] hover:bg-orange-50/30 transition cursor-pointer overflow-hidden group">
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
                  <p className="font-menu text-[11px] text-gray-400 mt-1">JPEG, PNG, WEBP (Max 5MB)</p>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Mô tả / Câu chuyện</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              className="w-full flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition resize-none min-h-[120px]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl font-menu text-[14px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
          Hủy Bỏ
        </button>
        <button type="submit" disabled={loading}
          className="px-8 py-2.5 rounded-xl font-menu text-[14px] font-semibold text-white bg-[#f08c50] hover:bg-[#d16830] transition disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Đang lưu...' : isEdit ? 'Cập Nhật' : 'Tạo Mới'}
        </button>
      </div>
    </form>
  );
}
