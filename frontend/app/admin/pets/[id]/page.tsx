'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Plus, 
  ArrowLeft,
  Edit2,
  Printer,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X
} from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { getPetImageUrl } from '@/lib/imageUtils';

// Sub-components
import PetProfileHeader from '@/app/admin/pets/components/PetProfileHeader';
import PetProfileAbout from '@/app/admin/pets/components/PetProfileAbout';
import PetProfileStats from '@/app/admin/pets/components/PetProfileStats';
import PetProfileTasks from '@/app/admin/pets/components/PetProfileTasks';
import PetProfileMedical from '@/app/admin/pets/components/PetProfileMedical';
import PetProfileGallery from '@/app/admin/pets/components/PetProfileGallery';

export default function PetDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [galleryItems, setGalleryItems] = useState<{id?: number, preview: string, file?: File, isExisting?: boolean}[]>([]);
  const [deletedGalleryIds, setDeletedGalleryIds] = useState<number[]>([]);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean, currentIndex: number }>({
    isOpen: false,
    currentIndex: 0
  });

  const fetchPetData = useCallback(async () => {
    try {
      const res = await fetchAPI(`/admin/pets/${id}`);
      if (res.success) {
        setPet(res.data);
        // Initialize gallery state
        if (res.data.gallery) {
           setGalleryItems(res.data.gallery.map((img: any) => ({
             id: img.id,
             preview: getPetImageUrl(img.image_url),
             isExisting: true
           })));
           setDeletedGalleryIds([]);
        }

        // Initialize editData with fresh pet data
        setEditData({
          name: res.data.name,
          species: res.data.species,
          breed: res.data.breed,
          description: res.data.description,
          age_months: res.data.age_months,
          gender: res.data.gender,
          personality_tags: Array.isArray(res.data.personality_tags) ? res.data.personality_tags : (typeof res.data.personality_tags === 'string' ? JSON.parse(res.data.personality_tags) : []),
          image_url: res.data.image_url,
          status: res.data.pet_profile?.status,
          location: res.data.pet_profile?.location,
          intake_date: res.data.pet_profile?.intake_date,
          microchip: res.data.pet_profile?.microchip,
          color: res.data.pet_profile?.color,
          activity_level: res.data.pet_profile?.activity_level,
          weight_kg: res.data.pet_profile?.weight_kg,
          is_vaccinated: res.data.pet_profile?.is_vaccinated,
          is_neutered: res.data.pet_profile?.is_neutered,
          medical_history: res.data.pet_profile?.medical_history,
        });
      } else {
        toast.error('Không tìm thấy thông tin thú cưng');
        router.push('/admin/pets');
      }
    } catch (error) {
       console.error('Error fetching pet:', error);
       toast.error('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchPetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      Object.entries(editData).forEach(([key, value]) => {
        if (key === 'personality_tags' || key === 'medical_history') {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'newImageFile') {
          formData.append('image', value as File);
        } else if (key !== 'imagePreview' && value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // Gallery fields (new images only)
      const newImages = galleryItems.filter(item => !item.isExisting && item.file);
      newImages.forEach((img, index) => {
        formData.append(`gallery[${index}]`, img.file!);
      });

      // Deleted images IDs
      if (deletedGalleryIds.length > 0) {
        formData.append('deleted_gallery_ids', JSON.stringify(deletedGalleryIds));
      }

      formData.append('_method', 'PUT');
      
      const res = await fetchAPI(`/admin/pets/${id}`, {
        method: 'POST',
        body: formData
      });

      if (res.success) {
        toast.success('Cập nhật hồ sơ thành công');
        setIsEditing(false);
        setPet(res.data);
        
        // Ensure imagePreview is cleared and new gallery is synced
        setEditData((prev: any) => ({
          ...prev,
          imagePreview: undefined,
          newImageFile: undefined,
          image_url: res.data.image_url
        }));
        
        if (res.data.gallery) {
          setGalleryItems(res.data.gallery.map((img: any) => ({
             id: img.id,
             preview: getPetImageUrl(img.image_url),
             isExisting: true
          })));
          setDeletedGalleryIds([]);
        }
      } else {
        toast.error(res.message || 'Lỗi khi cập nhật hồ sơ');
      }
    } catch (error: any) {
      console.error('Error saving pet data:', error);
      toast.error(error.message || 'Có lỗi xảy ra khi lưu dữ liệu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Re-initialize from saved data
    if (pet.gallery) {
      setGalleryItems(pet.gallery.map((img: any) => ({
        id: img.id,
        preview: getPetImageUrl(img.image_url),
        isExisting: true
      })));
    }
    setDeletedGalleryIds([]);

    setEditData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      description: pet.description,
      age_months: pet.age_months,
      gender: pet.gender,
      personality_tags: Array.isArray(pet.personality_tags) ? pet.personality_tags : (typeof pet.personality_tags === 'string' ? JSON.parse(pet.personality_tags) : []),
      image_url: pet.image_url,
      status: pet.pet_profile?.status,
      location: pet.pet_profile?.location,
      intake_date: pet.pet_profile?.intake_date,
      microchip: pet.pet_profile?.microchip,
      color: pet.pet_profile?.color,
      activity_level: pet.pet_profile?.activity_level,
      weight_kg: pet.pet_profile?.weight_kg,
      is_vaccinated: pet.pet_profile?.is_vaccinated,
      is_neutered: pet.pet_profile?.is_neutered,
      medical_history: pet.pet_profile?.medical_history,
    });
    setIsEditing(false);
  };

  const handleGalleryAdd = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files as FileList);
      if (galleryItems.length + files.length > 4) {
        toast.error('Bộ sưu tập chỉ cho phép tối đa 4 ảnh');
        return;
      }
      const newItems = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        isExisting: false
      }));
      setGalleryItems(prev => [...prev, ...newItems]);
    };
    input.click();
  };

  const handleGalleryRemove = (index: number) => {
    const item = galleryItems[index];
    if (item.isExisting && item.id) {
      setDeletedGalleryIds(prev => [...prev, item.id!]);
    } else if (item.file) {
      URL.revokeObjectURL(item.preview);
    }
    setGalleryItems(prev => prev.filter((_, i) => i !== index));
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
      if (e.key === 'Escape') setLightbox(prev => ({ ...prev, isOpen: false }));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, nextImage, prevImage]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#f08c50]" />
      </div>
    );
  }

  if (!pet) return null;

  const currentLightboxImage = galleryItems[lightbox.currentIndex]?.preview;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      {/* Lightbox Modal */}
      {lightbox.isOpen && currentLightboxImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl flex items-center justify-center transition-all duration-500 animate-in fade-in"
          onClick={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
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
              onClick={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
            >
              <X className="w-6 h-6" />
            </button>
          </div>



          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Arrows */}
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

      {/* Navigation Bar */}
      <div className="flex items-center justify-between py-1 gap-4">
        <div className="flex items-center gap-2 text-[13px] font-menu whitespace-nowrap overflow-hidden">
          <button 
            onClick={() => router.push('/admin/pets')}
            className="text-gray-400 hover:text-[#101828] transition-colors hidden sm:inline"
          >
            Hồ sơ thú cưng
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 hidden sm:inline" />
          <span className="text-[#101828] font-bold truncate">{pet.name}</span>
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-2 pr-2 border-r border-gray-100">
             <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-menu">Đang xem trực tiếp</span>
          </div>

          <button 
            onClick={() => router.push('/admin/pets')}
            className="group flex items-center gap-2 text-gray-500 hover:text-[#101828] transition-all bg-white border border-gray-100 px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-bold font-menu">Quay lại danh sách</span>
          </button>
        </div>
      </div>


      {/* Main Profile Header */}
      <PetProfileHeader 
        pet={pet} 
        refreshData={fetchPetData} 
        isEditing={isEditing}
        editData={editData}
        setEditData={setEditData}
        isSaving={isSaving}
        onEdit={() => setIsEditing(true)} 
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Row 1: About & Gallery */}
        <div className="lg:col-span-2">
          <PetProfileAbout 
            pet={pet} 
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
            refreshData={fetchPetData} 
          />
        </div>

        <div className="lg:col-span-1">
          <PetProfileGallery 
             pet={pet} 
             refreshData={fetchPetData} 
             isEditing={isEditing} 
             galleryItems={galleryItems}
             onAdd={handleGalleryAdd}
             onRemove={handleGalleryRemove}
             onImageClick={(index: number) => setLightbox({ isOpen: true, currentIndex: index })}
          />
        </div>

        {/* Row 2: Medical & Stats - Same Height */}
        <div className="lg:col-span-2">
          <PetProfileMedical 
            pet={pet} 
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
            refreshData={fetchPetData} 
          />
        </div>

        <div className="lg:col-span-1">
          <PetProfileStats 
            pet={pet} 
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
            refreshData={fetchPetData} 
          />
        </div>

        {/* Row 3: Caretaker & Tasks - Full Width */}
        {!isEditing && (
          <div className="lg:col-span-3">
            <PetProfileTasks pet={pet} refreshData={fetchPetData} />
          </div>
        )}
      </div>

    </div>
  );
}
