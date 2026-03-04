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
  Loader2
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

  const fetchPetData = useCallback(async () => {
    try {
      const res = await fetchAPI(`/admin/pets/${id}`);
      if (res.success) {
        setPet(res.data);
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
  }, [id, router]);

  useEffect(() => {
    fetchPetData();
  }, [fetchPetData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let body: any;
      let headers: any = {};

      if (editData.newImageFile) {
        // Use FormData if image is changing
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
        formData.append('_method', 'PUT');
        body = formData;
      } else {
        // Standard JSON if no image
        body = JSON.stringify(editData);
        headers['Content-Type'] = 'application/json';
      }

      const isFormData = !!editData.newImageFile;
      
      const res = await fetchAPI(`/admin/pets/${id}`, {
        method: isFormData ? 'POST' : 'PUT',
        body,
        headers
      });

      if (res.success) {
        toast.success('Cập nhật hồ sơ thành công');
        setIsEditing(false);
        fetchPetData();
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
    // Reset editData to current pet values
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

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#f08c50]" />
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
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
          <PetProfileGallery pet={pet} refreshData={fetchPetData} isEditing={isEditing} />
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
