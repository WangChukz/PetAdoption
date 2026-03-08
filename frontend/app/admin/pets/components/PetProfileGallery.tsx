'use client';

import React, { useRef, useState } from 'react';
import { 
  Plus, 
  Loader2, 
  Image as ImageIcon, 
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { getPetImageUrl } from '@/lib/imageUtils';
import ConfirmModal from '../../components/ConfirmModal';

interface PetProfileGalleryProps {
  pet: any;
  refreshData: () => void;
  isEditing?: boolean;
  // Controlled props
  galleryItems?: {id?: number, preview: string, file?: File, isExisting?: boolean}[];
  onAdd?: () => void;
  onRemove?: (index: number) => void;
  onImageClick?: (index: number) => void;
}

export default function PetProfileGallery({ 
  pet, 
  refreshData, 
  isEditing = false,
  galleryItems,
  onAdd,
  onRemove,
  onImageClick
}: PetProfileGalleryProps) {
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isControlled = !!galleryItems;

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled && onAdd) {
      onAdd();
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    if (pet.gallery?.length >= 4) {
      toast.error('Bộ sưu tập chỉ cho phép tối đa 4 ảnh');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

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

  const handleRemove = (index: number, imageId?: number) => {
    if (isControlled && onRemove) {
      onRemove(index);
      return;
    }
    if (imageId) {
      setSelectedImageId(imageId);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (selectedImageId === null) return;

    setDeletingId(selectedImageId);
    try {
      const res = await fetchAPI(`/admin/pets/gallery/${selectedImageId}`, {
        method: 'DELETE'
      });

      if (res.success) {
        toast.success('Đã xóa ảnh khỏi bộ sưu tập');
        refreshData();
      } else {
        toast.error(res.message || 'Lỗi khi xóa ảnh');
      }
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      toast.error('Có lỗi xảy ra khi xóa ảnh');
    } finally {
      setDeletingId(null);
      setIsDeleteModalOpen(false);
      setSelectedImageId(null);
    }
  };

  const renderGallery = () => {
    if (isControlled) {
      return galleryItems.map((item, index) => (
        <div 
          key={index} 
          className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative group cursor-zoom-in"
          onClick={() => onImageClick?.(index)}
        >
          <img 
            src={item.preview} 
            alt={`Gallery ${index}`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          
          {isEditing && (
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.(index);
              }}
              className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ));
    }

    return pet.gallery?.map((img: any, index: number) => (
      <div 
        key={img.id || index} 
        className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative group cursor-zoom-in"
        onClick={() => onImageClick?.(index)}
      >
        <img 
          src={getPetImageUrl(img.image_url)} 
          alt={`Gallery ${index}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {isEditing && (
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(index, img.id);
            }}
            disabled={deletingId === img.id}
            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 shadow-sm"
          >
            {deletingId === img.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    ));
  };

  const currentCount = isControlled ? galleryItems.length : (pet.gallery?.length || 0);

  return (
    <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm h-full flex flex-col font-vietnam">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ImageIcon className="w-6 h-6 text-gray-400/80" />
          <div>
            <h4 className="text-[16px] font-bold text-[#101828]">Bộ sưu tập</h4>
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Hình ảnh thực tế</p>
          </div>
        </div>
        
        {isEditing && currentCount < 4 && (
          <button 
            type="button"
            onClick={() => isControlled ? onAdd?.() : fileInputRef.current?.click()}
            disabled={uploading}
            className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all active:scale-90 disabled:opacity-50"
            title="Thêm ảnh"
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {!isControlled && (
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleGalleryUpload}
          />
        )}
        
        <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 custom-scrollbar pb-2">
          {currentCount > 0 ? (
            renderGallery()
          ) : (
            !isEditing && (
              <div className="col-span-2 py-12 flex flex-col items-center justify-center text-center space-y-3 opacity-40">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="text-[13px] font-medium">Chưa có ảnh trong bộ sưu tập</p>
              </div>
            )
          )}

          {isEditing && currentCount < 4 && (
            <button 
              type="button"
              onClick={() => isControlled ? onAdd?.() : fileInputRef.current?.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
            >
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-300 group-hover:scale-110 group-hover:text-blue-400 transition-all">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Thêm ảnh</span>
            </button>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa ảnh"
        message="Bạn có chắc chắn muốn xóa ảnh này khỏi bộ sưu tập? Hành động này không thể hoàn tác."
        confirmText="Xác nhận xóa"
        cancelText="Hủy bỏ"
        type="danger"
        isLoading={deletingId !== null}
      />
    </div>
  );
}
