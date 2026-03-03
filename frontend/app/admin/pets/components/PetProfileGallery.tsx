'use client';

import React, { useRef, useState } from 'react';
import { Plus, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { getPetImageUrl } from '@/lib/imageUtils';

interface PetProfileGalleryProps {
  pet: any;
  refreshData: () => void;
}

export default function PetProfileGallery({ pet, refreshData }: PetProfileGalleryProps) {
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetchAPI(`/admin/pets/${pet.id}/gallery`, {
        method: 'POST',
        body: formData
      });

      if (res.success) {
        toast.success('Đã thêm ảnh vào bộ sưu tập');
        refreshData();
      } else {
        toast.error(res.message || 'Lỗi khi tải ảnh lên');
      }
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      toast.error('Có lỗi xảy ra khi tải ảnh');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteGalleryImage = async (imageId: number) => {
    if (!confirm('Bạn có chắc muốn xóa ảnh này khỏi bộ sưu tập?')) return;

    setDeletingId(imageId);
    try {
      const res = await fetchAPI(`/admin/pets/gallery/${imageId}`, {
        method: 'DELETE'
      });

      if (res.success) {
        toast.success('Đã xóa ảnh');
        refreshData();
      } else {
        toast.error(res.message || 'Lỗi khi xóa ảnh');
      }
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      toast.error('Có lỗi xảy ra khi xóa ảnh');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-[10px] border border-gray-100 p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-menu">Bộ sưu tập</h3>
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*"
          onChange={handleGalleryUpload}
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
          title="Thêm ảnh"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Main Image */}
        <div className="aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50 relative group">
          <img 
            src={getPetImageUrl(pet.image_url)} 
            alt={pet.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-[10px] text-white font-bold uppercase tracking-wider bg-black/50 px-2 py-1 rounded-full">Ảnh chính</span>
          </div>
        </div>

        {/* Gallery Images */}
        {pet.gallery?.map((img: any) => (
          <div key={img.id} className="aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50 relative group">
            <img 
              src={getPetImageUrl(img.image_url)} 
              alt="Gallery"
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => handleDeleteGalleryImage(img.id)}
                disabled={deletingId === img.id}
                className="p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all scale-90 group-hover:scale-100 disabled:opacity-50"
              >
                {deletingId === img.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}

        {/* Upload Placeholder */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-2 bg-gray-50 text-gray-400 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group"
        >
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
            <ImageIcon className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Tải lên</span>
        </div>
      </div>
    </div>
  );
}
