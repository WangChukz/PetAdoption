'use client';

import React from 'react';
import { 
  Edit2, 
  Printer, 
  Dna,
  Layers,
  Calendar,
  MoreHorizontal,
  AtSign,
  Mars,
  Venus,
  HelpCircle,
  Save,
  Loader2,
  Camera,
  ChevronDown
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getPetImageUrl } from '@/lib/imageUtils';
import CustomDropdown from '@/app/admin/components/CustomDropdown';
import ModernDatePicker from '@/app/components/ModernDatePicker';

interface PetProfileHeaderProps {
  pet: any;
  refreshData: () => void;
  isEditing: boolean;
  editData: any;
  setEditData: (data: any) => void;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const statusMap: Record<string, { label: string; color: string }> = {
  READY_FOR_ADOPTION: { label: 'CHỜ NHẬN NUÔI', color: 'bg-emerald-50 text-emerald-500' },
  AVAILABLE: { label: 'ĐANG TÌM CHỦ', color: 'bg-emerald-50 text-emerald-500' },
  ADOPTED: { label: 'ĐÃ CÓ CHỦ', color: 'bg-blue-50 text-blue-500' },
  TREATMENT: { label: 'ĐANG ĐIỀU TRỊ', color: 'bg-orange-50 text-orange-500' },
  FOSTERED: { label: 'CHĂM SÓC TẠM THỜI', color: 'bg-purple-50 text-purple-500' },
  INTAKE: { label: 'MỚI TIẾP NHẬN', color: 'bg-gray-50 text-gray-500' },
};

const statusOptions = Object.entries(statusMap).map(([value, info]) => ({
  value,
  label: info.label
}));

export default function PetProfileHeader({ 
  pet, 
  refreshData, 
  isEditing, 
  editData, 
  setEditData, 
  isSaving,
  onEdit,
  onSave,
  onCancel
}: PetProfileHeaderProps) {
  const status = editData?.status || pet.pet_profile?.status || 'INTAKE';
  const statusInfo = statusMap[status] || statusMap.AVAILABLE;

  return (
    <div className="bg-white rounded-[10px] border border-gray-100 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        {/* Profile Image */}
        <div className="group relative w-24 h-24 md:w-32 md:h-32 rounded-[10px] overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-gray-50 flex items-center justify-center">
          { (editData?.imagePreview || pet.image_url) ? (
            <img 
              src={editData?.imagePreview || getPetImageUrl(pet.image_url)} 
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300">
              <Camera className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110" />
            </div>
          )}
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <input 
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setEditData({
                        ...editData,
                        newImageFile: file,
                        imagePreview: event.target?.result
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                <Edit2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] text-white font-bold mt-2 uppercase tracking-widest">Thay đổi</span>
            </div>
          )}
        </div>

        {/* Info Content */}
        <div className="flex-grow space-y-4 pt-2 w-full flex flex-col items-center md:items-start text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">
            {isEditing ? (
              <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                <input 
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  placeholder="Nhập tên thú cưng..."
                  className="text-xl font-bold tracking-tight text-slate-800 font-menu bg-gray-50 border border-gray-100 rounded-[10px] px-4 py-1 outline-none focus:border-orange-200 w-full md:w-auto min-w-[200px]"
                />
                <div className="relative w-full md:w-auto">
                  <CustomDropdown
                    options={Object.entries(statusMap).map(([id, info]) => ({
                      id,
                      label: info.label,
                      color: info.color.split(' ')[0] // Uses bg class for dot color
                    }))}
                    value={editData.status}
                    onChange={(val) => setEditData({...editData, status: val as any})}
                    placeholder="Trạng thái"
                    className="w-full md:w-auto min-w-[200px]"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                <h1 className="text-xl font-bold tracking-tight text-slate-800 font-menu">{pet.name}</h1>
                <div className="relative group">
                  <span className={`px-4 py-1.5 text-[11px] font-normal rounded-[10px] tracking-wider ${statusInfo.color} whitespace-nowrap shadow-sm border border-current/10 flex items-center gap-1.5`}>
                    {statusInfo.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-y-3 gap-x-6 text-[13px] text-gray-500 w-full max-w-[500px] md:max-w-none">
            <div className="flex items-center justify-start gap-2 whitespace-nowrap min-w-0">
              <AtSign className="w-4.5 h-4.5 text-gray-400" />
              <span className="truncate font-bold uppercase tracking-tight">
                ID: {(!pet.id || pet.id === 0) ? (
                  <span className="text-emerald-500 bg-emerald-50/50 px-2 py-0.5 rounded-lg text-[11px] animate-pulse">HỒ SƠ MỚI</span>
                ) : (
                  `#${pet.id.toString().padStart(4, '0')}`
                )}
              </span>
            </div>
            
            <div className="flex items-center justify-start gap-2 whitespace-nowrap min-w-0">
               {(isEditing ? editData.gender : pet.gender) === 'male' ? (
                 <Mars className="w-4.5 h-4.5 text-blue-400" />
               ) : (isEditing ? editData.gender : pet.gender) === 'female' ? (
                 <Venus className="w-4.5 h-4.5 text-rose-400" />
               ) : (
                 <HelpCircle className="w-4.5 h-4.5 text-gray-300" />
               )}
               {isEditing ? (
                 <CustomDropdown
                   options={[
                     { id: 'male', label: 'Đực' },
                     { id: 'female', label: 'Cái' },
                     { id: 'other', label: 'Chưa rõ' }
                   ]}
                   value={editData.gender}
                   onChange={(val) => setEditData({...editData, gender: val})}
                   placeholder="Giới tính"
                   className="min-w-[100px]"
                 />
               ) : (
                 <span className="truncate">{(isEditing ? editData.gender : pet.gender) === 'male' ? 'Đực' : (isEditing ? editData.gender : pet.gender) === 'female' ? 'Cái' : 'Chưa rõ'}</span>
               )}
            </div>
 
            <div className="flex items-center justify-start gap-2 whitespace-nowrap min-w-0">
                <Dna className="w-4.5 h-4.5 text-gray-400" />
                {isEditing ? (
                <input 
                  type="text"
                  value={editData.species}
                  onChange={(e) => setEditData({...editData, species: e.target.value})}
                  placeholder="Loài..."
                  className="bg-gray-50 border border-gray-100 rounded-[10px] px-3 py-1 outline-none focus:border-orange-200 w-24 text-[13px] font-medium"
                />
              ) : (
                <span className="truncate">{(isEditing ? editData.species : pet.species)}</span>
              )}
            </div>

            <div className="flex items-center justify-start gap-2 whitespace-nowrap min-w-0">
              <Layers className="w-4.5 h-4.5 text-gray-400" />
              {isEditing ? (
                <input 
                  type="text"
                  value={editData.breed || ''}
                  onChange={(e) => setEditData({...editData, breed: e.target.value})}
                  placeholder="Giống loài..."
                  className="bg-gray-50 border border-gray-100 rounded-[10px] px-3 py-1 outline-none focus:border-orange-200 w-32 text-[13px] font-medium"
                />
              ) : (
                <span className="truncate">{(isEditing ? editData.breed : pet.breed) || 'Chưa rõ'}</span>
              )}
            </div>

            <div className="flex items-center justify-start gap-2 whitespace-nowrap min-w-0">
              <Calendar className="w-4.5 h-4.5 text-gray-400" />
              {isEditing ? (
                <div className="flex items-center gap-1.5">
                  <input 
                    type="number"
                    value={(() => {
                      const unit = editData.age_unit || (editData.age_months >= 12 ? 'year' : 'month');
                      return unit === 'year' 
                        ? Math.floor(editData.age_months / 12) 
                        : editData.age_months || '';
                    })()}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      const unit = editData.age_unit || (editData.age_months >= 12 ? 'year' : 'month');
                      setEditData({
                        ...editData, 
                        age_months: unit === 'year' ? val * 12 : val,
                        age_unit: unit
                      });
                    }}
                    placeholder="Tuổi..."
                    className="bg-gray-50 border border-gray-100 rounded-[10px] px-2 py-1 outline-none focus:border-orange-200 w-16 text-[13px] font-bold"
                  />
                  <select 
                    value={editData.age_unit || (editData.age_months >= 12 ? 'year' : 'month')}
                    onChange={(e) => {
                      const newUnit = e.target.value;
                      const currentUnit = editData.age_unit || (editData.age_months >= 12 ? 'year' : 'month');
                      const currentVal = currentUnit === 'year' 
                        ? Math.floor(editData.age_months / 12) 
                        : editData.age_months;
                      
                      setEditData({ 
                        ...editData, 
                        age_unit: newUnit,
                        age_months: newUnit === 'year' ? currentVal * 12 : currentVal
                      });
                    }}
                    className="bg-transparent border-none text-[12px] font-medium text-slate-500 outline-none cursor-pointer"
                  >
                    <option value="month">th</option>
                    <option value="year">tuổi</option>
                  </select>
                </div>
              ) : (
                <span className="truncate">
                  {pet.age_months >= 12 
                    ? `${Math.floor(pet.age_months / 12)} tuổi` 
                    : `${pet.age_months || 0} tháng`}
                </span>
              )}
            </div>

            <div className="flex items-center justify-start gap-2 whitespace-nowrap min-w-0">
              {isEditing ? (
                <ModernDatePicker 
                  value={editData.intake_date || ''}
                  onChange={(val) => setEditData({...editData, intake_date: val})}
                  className="w-40"
                />
              ) : (
                <>
                  <Calendar className="w-4.5 h-4.5 text-gray-400" />
                  <span className="truncate">Tiếp nhận: {pet.pet_profile?.intake_date ? format(new Date(pet.pet_profile.intake_date), 'dd/MM/yyyy') : 'N/A'}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center md:justify-start gap-2 w-full md:w-auto pt-2 md:flex-shrink-0">
          {isEditing ? (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button 
                onClick={onSave}
                disabled={isSaving}
                className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-2.5 bg-[#f08c50] text-white rounded-[10px] text-[13px] font-bold hover:bg-[#e07b40] transition-all shadow-lg shadow-orange-100 whitespace-nowrap disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} 
                Lưu thay đổi
              </button>
              <button 
                onClick={onCancel}
                disabled={isSaving}
                className="px-4 py-2.5 bg-gray-50 text-gray-500 rounded-[10px] text-[13px] font-bold hover:bg-gray-100 transition-all border border-gray-100"
              >
                Hủy
              </button>
            </div>
          ) : (
            <button 
              onClick={onEdit}
              className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f08c50] text-white rounded-[10px] text-[13px] font-bold hover:bg-[#e07b40] transition-all shadow-lg shadow-orange-100 whitespace-nowrap"
            >
              <Edit2 className="w-3.5 h-3.5" /> Chỉnh sửa hồ sơ
            </button>
          )}
          
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <button className="p-2.5 bg-gray-50 text-gray-500 rounded-[10px] hover:bg-gray-100 transition-colors border border-gray-100 flex-shrink-0" title="In thẻ ID">
                   <Printer className="w-4.5 h-4.5" />
                </button>
                <button className="p-2.5 bg-gray-50 text-gray-500 rounded-[10px] hover:bg-gray-100 transition-colors border border-gray-100 flex-shrink-0">
                   <MoreHorizontal className="w-4.5 h-4.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
