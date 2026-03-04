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
      medical_history: Array.isArray(profile.medical_history) ? profile.medical_history : [],
      intake_date: profile.intake_date ?? new Date().toISOString(),
    };
  });

  const [galleryImages, setGalleryImages] = useState<{file: File, preview: string}[]>([]);
  const [nextId, setNextId] = useState<number>(0);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);
  const scrollGalleryRef = React.useRef<HTMLDivElement>(null);

  // Fetch next ID for new pets
  useEffect(() => {
    if (!isEdit) {
      const fetchNextId = async () => {
        try {
          const res = await fetchAPI('/admin/pets');
          const pets = Array.isArray(res) ? res : (res.data || []);
          if (pets.length > 0) {
            const maxId = Math.max(...pets.map((p: any) => p.id));
            setNextId(maxId + 1);
          } else {
            setNextId(1);
          }
        } catch (error) {
          console.error("Failed to fetch pets for next ID", error);
        }
      };
      fetchNextId();
    }
  }, [isEdit]);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!scrollGalleryRef.current) return;
    const scrollAmount = 150;
    scrollGalleryRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // A "mock" pet object used by sub-components for layout/labels
  const [mockPet, setMockPet] = useState<any>(() => ({
    ...initialData,
    id: initialData?.id || 0, 
    name: editData.name || (isEdit ? initialData?.name : 'Tên thú cưng mới'),
    pet_profile: initialData?.pet_profile || { 
      status: 'AVAILABLE',
      intake_date: editData.intake_date
    }
  }));

  // Sync nextId into mockPet
  useEffect(() => {
    if (!isEdit && nextId > 0) {
      setMockPet(prev => ({ ...prev, id: nextId }));
    }
  }, [nextId, isEdit]);

  // Sync mockPet for header display
  useEffect(() => {
    setMockPet((prev: any) => ({
      ...prev,
      name: editData.name || (isEdit ? initialData?.name : 'Tên thú cưng mới'),
      age_months: editData.age_months,
      pet_profile: {
        ...prev.pet_profile,
        intake_date: editData.intake_date,
        medical_history: editData.medical_history
      }
    }));
  }, [editData.name, editData.age_months, editData.intake_date, editData.medical_history, isEdit, initialData]);

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    if (galleryImages.length + files.length > 4) {
      toast.error('Bạn chỉ có thể chọn tối đa 4 ảnh cho bộ sưu tập');
      // Only take what fits
      const remainingSlots = 4 - galleryImages.length;
      if (remainingSlots <= 0) {
        if (galleryInputRef.current) galleryInputRef.current.value = '';
        return;
      }
      files.splice(remainingSlots);
    }
    
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
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-vietnam">
      {/* breadcrumbs mirroring detail page */}
      <div className="flex items-center justify-between py-1 gap-4">
        <div className="flex items-center gap-2 text-[13px] whitespace-nowrap overflow-hidden">
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
          className="group flex items-center gap-2 text-gray-500 hover:text-[#101828] transition-all bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm hover:shadow-md"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-bold">Quay lại</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Row 1: About & Gallery */}
        <div className="lg:col-span-2">
          <PetProfileAbout 
            pet={mockPet} 
            isEditing={true}
            editData={editData}
            setEditData={setEditData}
            refreshData={() => {}} 
          />
        </div>

        <div className="lg:col-span-1">
          {/* If creation mode, use the internal gallery preview. If edit mode, the gallery is often managed separately or we can use the Gallery component if supported */}
          {!isEdit ? (
            <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-[16px] font-bold text-[#101828]">Bộ sưu tập</h4>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Chọn tối đa 4 ảnh</p>
                </div>
                
                {galleryImages.length < 4 && (
                  <button 
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all active:scale-90"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex-1 flex flex-col min-h-0">
                <input 
                  type="file" 
                  ref={galleryInputRef}
                  className="hidden" 
                  multiple
                  accept="image/*"
                  onChange={handleGalleryChange}
                />
                
                <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 custom-scrollbar pb-2">
                  {galleryImages.map((img, index) => (
                    <div 
                      key={index} 
                      className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative group"
                    >
                      <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {galleryImages.length < 4 && (
                    <button 
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="aspect-square rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                    >
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-300 group-hover:scale-110 group-hover:text-blue-400 transition-all">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center truncate px-1">Tải ảnh</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // In edit mode, we can show the existing gallery manager component
            <div className="h-full">
               <PetProfileGallery pet={initialData} refreshData={() => router.refresh()} isEditing={true} />
            </div>
          )}
        </div>

        {/* Row 2: Medical & Stats - Balanced Height */}
        <div className="lg:col-span-2">
          <PetProfileMedical 
            pet={mockPet} 
            isEditing={true}
            editData={editData}
            setEditData={setEditData}
            refreshData={() => {}} 
          />
        </div>

        <div className="lg:col-span-1">
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
