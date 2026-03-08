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
import { getPetImageUrl } from '@/lib/imageUtils';

// Sub-components
import PetProfileHeader from '@/app/admin/pets/components/PetProfileHeader';
import PetProfileAbout from '@/app/admin/pets/components/PetProfileAbout';
import PetProfileStats from '@/app/admin/pets/components/PetProfileStats';
import PetProfileMedical from '@/app/admin/pets/components/PetProfileMedical';
import PetProfileGallery from '@/app/admin/pets/components/PetProfileGallery';

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

  const [galleryItems, setGalleryItems] = useState<{id?: number, preview: string, file?: File, isExisting?: boolean}[]>([]);
  const [deletedGalleryIds, setDeletedGalleryIds] = useState<number[]>([]);
  const [nextId, setNextId] = useState<number>(0);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);
  const scrollGalleryRef = React.useRef<HTMLDivElement>(null);

  // Initialize gallery from existing data
  useEffect(() => {
    if (initialData?.gallery) {
      const items = initialData.gallery.map((img: any) => ({
        id: img.id,
        preview: getPetImageUrl(img.image_url),
        isExisting: true
      }));
      setGalleryItems(items);
    }
  }, [initialData]);

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    // Total count including existing and new ones minus marked for deletion
    // Wait, let's just use the current galleryItems count
    if (galleryItems.length + files.length > 4) {
      toast.error('Bộ sưu tập chỉ cho phép tối đa 4 ảnh');
      const remainingSlots = 4 - galleryItems.length;
      if (remainingSlots <= 0) {
        if (galleryInputRef.current) galleryInputRef.current.value = '';
        return;
      }
      files.splice(remainingSlots);
    }
    
    const newItems = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isExisting: false
    }));
    
    setGalleryItems(prev => [...prev, ...newItems]);
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const removeGalleryItem = (index: number) => {
    const item = galleryItems[index];
    if (item.isExisting && item.id) {
      setDeletedGalleryIds(prev => [...prev, item.id!]);
    } else if (item.file) {
      URL.revokeObjectURL(item.preview);
    }
    setGalleryItems(prev => prev.filter((_, i) => i !== index));
  };

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
      setMockPet((prev: any) => ({ ...prev, id: nextId }));
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

      // Gallery fields (new images only)
      const newImages = galleryItems.filter(item => !item.isExisting && item.file);
      newImages.forEach((img, index) => {
        data.append(`gallery[${index}]`, img.file!);
      });

      // Deleted images IDs
      if (isEdit && deletedGalleryIds.length > 0) {
        data.append('deleted_gallery_ids', JSON.stringify(deletedGalleryIds));
      }

      if (isEdit) data.append('_method', 'PUT');

      const url = isEdit ? `/admin/pets/${initialData?.id}` : `/admin/pets`;
      
      const res = await fetchAPI(url, {
        method: 'POST',
        body: data
      });

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

  // Lightbox State
  const [lightbox, setLightbox] = useState<{ isOpen: boolean, currentIndex: number }>({
    isOpen: false,
    currentIndex: 0
  });

  const openLightbox = (index: number) => {
    setLightbox({ isOpen: true, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  const nextImage = useCallback(() => {
    if (galleryItems.length <= 1) return;
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % galleryItems.length
    }));
  }, [galleryItems.length]);

  const prevImage = useCallback(() => {
    if (galleryItems.length <= 1) return;
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + galleryItems.length) % galleryItems.length
    }));
  }, [galleryItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, nextImage, prevImage]);

  const handleCancel = () => {
    router.back();
  };

  const currentLightboxImage = galleryItems[lightbox.currentIndex]?.preview;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-vietnam relative">
      {/* Lightbox Modal */}
      {lightbox.isOpen && currentLightboxImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex items-center justify-center transition-all duration-500 animate-in fade-in"
          onClick={closeLightbox}
        >
          {/* Controls Overlay */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <span className="text-white/90 text-sm font-bold tracking-wider">
                {lightbox.currentIndex + 1} / {galleryItems.length}
              </span>
            </div>
            
            <button 
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all hover:rotate-90 active:scale-90 border border-white/10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Arrows */}
          {galleryItems.length > 1 && (
            <>
              <button 
                className="absolute left-6 z-20 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-95 border border-white/10 group"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
              >
                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <button 
                className="absolute right-6 z-20 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-95 border border-white/10 group"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
              >
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}
          
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Arrows - Inside the image area for better reach */}
            {galleryItems.length > 1 && (
              <>
                <button 
                  className="absolute left-4 md:left-8 z-20 p-4 md:p-5 bg-black/20 hover:bg-white text-white hover:text-black rounded-full transition-all active:scale-90 border border-white/10 group backdrop-blur-md"
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
                </button>
                
                <button 
                  className="absolute right-4 md:right-8 z-20 p-4 md:p-5 bg-black/20 hover:bg-white text-white hover:text-black rounded-full transition-all active:scale-90 border border-white/10 group backdrop-blur-md"
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center max-w-[95vw] max-h-[90vh]">
              <img 
                key={lightbox.currentIndex}
                src={currentLightboxImage} 
                alt="Zoomed" 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] ring-1 ring-white/20 animate-in zoom-in-95 fade-in duration-500 select-none" 
              />
              
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="px-5 py-2.5 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl">
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">Hồ sơ thú cưng • {lightbox.currentIndex + 1}/{galleryItems.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <div className="h-full">
             <PetProfileGallery 
               pet={mockPet} 
               refreshData={() => {}} 
               isEditing={true} 
               galleryItems={galleryItems}
               onAdd={() => galleryInputRef.current?.click()}
               onRemove={(index: number) => removeGalleryItem(index)}
               onImageClick={(index: number) => openLightbox(index)}
             />
             <input 
               type="file" 
               ref={galleryInputRef}
               className="hidden" 
               multiple
               accept="image/*"
               onChange={handleGalleryChange}
             />
          </div>
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
