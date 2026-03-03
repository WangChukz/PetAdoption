'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Layout,
  Plus,
  Loader2,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';

// Sub-components
import PetProfileHeader from '@/app/admin/pets/components/PetProfileHeader';
import PetProfileAbout from '@/app/admin/pets/components/PetProfileAbout';
import PetProfileStats from '@/app/admin/pets/components/PetProfileStats';
import PetProfileMedical from '@/app/admin/pets/components/PetProfileMedical';

type Props = {
  initialData?: any;
  isEdit?: boolean;
};

export default function PetForm({ initialData, isEdit }: Props) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  // Initialize state based on isEdit or creation defaults
  const [editData, setEditData] = useState<any>(() => {
    const profile = initialData?.pet_profile || {};
    return {
      name: initialData?.name ?? '',
      species: initialData?.species ?? '',
      breed: initialData?.breed ?? '',
      description: initialData?.description ?? '',
      age_months: initialData?.age_months ?? '',
      gender: initialData?.gender ?? '',
      personality_tags: initialData?.personality_tags ?? [],
      image_url: initialData?.image_url ?? null,
      status: profile.status ?? '',
      location: profile.location ?? '',
      microchip: profile.microchip ?? '',
      color: profile.color ?? '',
      activity_level: profile.activity_level ?? 'Medium',
      weight_kg: profile.weight_kg ?? '',
      is_vaccinated: !!profile.is_vaccinated,
      is_neutered: !!profile.is_neutered,
      medical_history: profile.medical_history || {},
      intake_date: profile.intake_date ?? new Date().toISOString(),
    };
  });

  const [galleryImages, setGalleryImages] = useState<{file: File, preview: string}[]>([]);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);

  // A "mock" pet object used by sub-components for layout/labels
  const [mockPet, setMockPet] = useState<any>(() => ({
    ...initialData,
    id: initialData?.id ?? 0, // Mock ID for creation mode
    name: editData.name || (isEdit ? initialData?.name : 'Tên thú cưng mới'),
    pet_profile: initialData?.pet_profile || { 
      status: 'AVAILABLE',
      intake_date: editData.intake_date
    }
  }));

  // Sync mockPet for header display
  useEffect(() => {
    setMockPet((prev: any) => ({
      ...prev,
      name: editData.name || (isEdit ? initialData?.name : 'Tên thú cưng mới'),
      pet_profile: {
        ...prev.pet_profile,
        intake_date: editData.intake_date
      }
    }));
  }, [editData.name, editData.intake_date, isEdit, initialData]);

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setGalleryImages(prev => [...prev, ...newImages]);
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSave = async () => {
    if (!editData.name) {
      toast.error('Vui lòng nhập tên thú cưng');
      return;
    }

    setIsSaving(true);
    try {
      const data = new FormData();
      // Basic Pet fields
      data.append('name', editData.name);
      data.append('species', editData.species);
      data.append('breed', editData.breed || '');
      data.append('description', editData.description || '');
      data.append('gender', editData.gender);
      if (editData.age_months !== '') data.append('age_months', editData.age_months.toString());
      data.append('personality_tags', JSON.stringify(editData.personality_tags));
      
      // Profile fields (handled by backend separation logic)
      data.append('status', editData.status);
      data.append('location', editData.location || '');
      data.append('intake_date', editData.intake_date);
      data.append('microchip', editData.microchip || '');
      data.append('color', editData.color || '');
      data.append('activity_level', editData.activity_level);
      if (editData.weight_kg) data.append('weight_kg', editData.weight_kg);
      data.append('is_vaccinated', editData.is_vaccinated ? '1' : '0');
      data.append('is_neutered', editData.is_neutered ? '1' : '0');
      data.append('medical_history', JSON.stringify(editData.medical_history));

      // Image handling
      if (editData.newImageFile) {
        data.append('image', editData.newImageFile);
      }

      // Gallery fields
      galleryImages.forEach((img, index) => {
        data.append(`gallery[${index}]`, img.file);
      });

      if (isEdit) data.append('_method', 'PUT');

      const url = isEdit ? `/admin/pets/${initialData?.id}` : `/admin/pets`;
      
      const res = await fetchAPI(url, {
        method: 'POST',
        body: data
      });

      // res is already the json from fetchAPI
      const json = res;

      toast.success(isEdit ? 'Đã cập nhật hồ sơ thành công' : 'Đã tạo hồ sơ thú cưng mới');
      router.push('/admin/pets');
      router.refresh();
    } catch (error: any) {
      console.error('Error saving pet:', error);
      toast.error(error.message || 'Có lỗi xảy ra khi lưu dữ liệu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* breadcrumbs mirroring detail page */}
      <div className="flex items-center justify-between py-1 gap-4">
        <div className="flex items-center gap-2 text-[13px] font-menu whitespace-nowrap overflow-hidden">
          <button 
            onClick={() => router.push('/admin/pets')}
            className="text-gray-400 hover:text-[#101828] transition-colors"
          >
            Hồ sơ thú cưng
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[#101828] font-bold truncate">
            {isEdit ? `Chỉnh sửa: ${initialData?.name}` : 'Thêm hồ sơ mới'}
          </span>
        </div>
        
        <button 
          onClick={handleCancel}
          className="group flex items-center gap-2 text-gray-500 hover:text-[#101828] transition-all bg-white border border-gray-100 px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-bold font-menu">Quay lại</span>
        </button>
      </div>

      {/* Reusing Components with isEditing forced to true */}
      <PetProfileHeader 
        pet={mockPet} 
        refreshData={() => {}} 
        isEditing={true}
        editData={editData}
        setEditData={setEditData}
        isSaving={isSaving}
        onEdit={() => {}} 
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PetProfileAbout 
            pet={mockPet} 
            isEditing={true}
            editData={editData}
            setEditData={setEditData}
            refreshData={() => {}} 
          />
          <PetProfileMedical 
            pet={mockPet} 
            isEditing={true}
            editData={editData}
            setEditData={setEditData}
            refreshData={() => {}} 
          />
        </div>

        <div className="space-y-6">
          {!isEdit && (
            <div className="bg-white rounded-[10px] border border-gray-100 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-bold text-gray-400 uppercase tracking-widest font-menu">Bộ sưu tập</h4>
                <input 
                  type="file" 
                  ref={galleryInputRef}
                  className="hidden" 
                  multiple
                  accept="image/*"
                  onChange={handleGalleryChange}
                />
                <button 
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {galleryImages.map((img, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50 relative group">
                    <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <button 
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-2 bg-gray-50 text-gray-400 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Thêm ảnh</span>
                </button>
              </div>
            </div>
          )}

          <PetProfileStats 
            pet={mockPet} 
            isEditing={true}
            editData={editData}
            setEditData={setEditData}
            refreshData={() => {}} 
          />
        </div>
      </div>
    </div>
  );
}
