'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Scale, 
  HeartPulse,
  Syringe,
  Heart,
  XCircle,
  PlusCircle,
  Dna,
  Palette,
  Mars,
  Venus,
  HelpCircle,
  Hash
} from 'lucide-react';
import CustomDropdown from '@/app/admin/components/CustomDropdown';

interface PetProfileMedicalProps {
  pet: any;
  isEditing: boolean;
  editData: any;
  setEditData: (data: any) => void;
  refreshData: () => void;
}

export default function PetProfileMedical({ 
  pet, 
  isEditing, 
  editData, 
  setEditData, 
  refreshData 
}: PetProfileMedicalProps) {
  const profile = pet.pet_profile || {};

  return (
    <div className="bg-white rounded-[10px] border border-gray-100 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#101828] font-menu">Sức khỏe tổng quan</h3>
        </div>
        {!isEditing && (
          <button className="text-[13px] font-bold text-blue-500 hover:text-blue-600 transition-colors font-menu group flex items-center gap-1.5">
            <span>Xem hồ sơ bệnh án</span>
            <PlusCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>
      
      
      <div className="bg-gray-50/50 rounded-[10px] border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm">
          <HeartPulse className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-[15px] font-bold text-[#101828] font-menu">Hồ sơ bệnh án chi tiết</h4>
          <p className="text-[13px] text-gray-400 font-menu max-w-[280px]">
            Lịch sử tiêm ngừa và các ghi chú y tế chuyên sâu của thú cưng sẽ sớm được cập nhật tại đây.
          </p>
        </div>
      </div>
    </div>
  );
}
