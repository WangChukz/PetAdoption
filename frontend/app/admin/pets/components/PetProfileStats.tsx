'use client';

import React from 'react';
import { 
  Syringe, 
  Heart, 
  Scale, 
  CheckCircle2, 
  XCircle,
  Activity
} from 'lucide-react';
import CustomDropdown from '@/app/admin/components/CustomDropdown';

interface PetProfileStatsProps {
  pet: any;
  isEditing: boolean;
  editData: any;
  setEditData: (data: any) => void;
  refreshData: () => void;
}

export default function PetProfileStats({ 
  pet, 
  isEditing, 
  editData, 
  setEditData, 
  refreshData 
}: PetProfileStatsProps) {
  const profile = pet.pet_profile || {};

  const activityLevelMap: Record<string, { label: string; color: string; percentage: number }> = {
    'High': { label: 'Cao', color: 'bg-orange-500', percentage: 100 },
    'Medium': { label: 'Trung bình', color: 'bg-blue-500', percentage: 65 },
    'Low': { label: 'Thấp', color: 'bg-gray-400', percentage: 33 },
  };

  const currentActivityKey = isEditing ? editData.activity_level : (profile.activity_level || 'Medium');
  const activity = activityLevelMap[currentActivityKey] || activityLevelMap['Medium'];

  return (
    <div className="bg-white rounded-[10px] border border-gray-100 p-5 shadow-sm space-y-5">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-menu">Số liệu nhanh</h3>
      
      <div className="space-y-4">
        {/* Vaccinated */}
        <div className="flex items-center justify-between text-[14px]">
          <div className="flex items-center gap-2">
            <Syringe className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400 font-menu font-medium">Tiêm chủng</span>
          </div>
          <div 
            onClick={() => isEditing && setEditData({...editData, is_vaccinated: !editData.is_vaccinated})}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
              (isEditing ? editData.is_vaccinated : profile.is_vaccinated)
                ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                : 'bg-orange-50 border-orange-100 text-orange-600'
            } ${isEditing ? 'cursor-pointer hover:scale-105' : ''}`}
          >
            {(isEditing ? editData.is_vaccinated : profile.is_vaccinated) ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[12px] font-bold">Xong</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" />
                <span className="text-[12px] font-bold">Chưa</span>
              </>
            )}
          </div>
        </div>

        {/* Neutered */}
        <div className="flex items-center justify-between text-[14px]">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-gray-400 font-menu font-medium">Triệt sản</span>
          </div>
          <div 
            onClick={() => isEditing && setEditData({...editData, is_neutered: !editData.is_neutered})}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
              (isEditing ? editData.is_neutered : profile.is_neutered)
                ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                : 'bg-gray-50 border-gray-100 text-gray-400'
            } ${isEditing ? 'cursor-pointer hover:scale-105' : ''}`}
          >
            {(isEditing ? editData.is_neutered : profile.is_neutered) ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[12px] font-bold">Xong</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" />
                <span className="text-[12px] font-bold">Chưa</span>
              </>
            )}
          </div>
        </div>

        {/* Weight */}
        <div className="flex items-center justify-between text-[14px]">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#f08c50]" />
            <span className="text-gray-400 font-menu font-medium">Cân nặng</span>
          </div>
          {isEditing ? (
            <div className="flex items-center gap-1">
              <input 
                type="number"
                step="0.1"
                value={editData.weight_kg || ''}
                onChange={(e) => setEditData({...editData, weight_kg: e.target.value})}
                className="bg-gray-50 border border-gray-100 rounded-[10px] px-3 py-1 text-right outline-none focus:border-orange-200 font-bold font-menu w-20"
              />
              <span className="text-gray-400 text-xs font-bold">kg</span>
            </div>
          ) : (
            <span className="text-[#101828] font-bold font-menu">{profile.weight_kg || '0.0'} kg</span>
          )}
        </div>
      </div>

      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between text-[14px]">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-gray-400 font-menu font-medium">Vận động</span>
          </div>
          {isEditing ? (
            <CustomDropdown
              options={Object.entries(activityLevelMap).map(([id, info]) => ({
                id,
                label: info.label,
                color: info.color
              }))}
              value={editData.activity_level}
              onChange={(val) => setEditData({...editData, activity_level: val})}
              className="min-w-[120px]"
            />
          ) : (
            <span className={`font-bold font-menu ${activity.color.replace('bg-', 'text-')}`}>{activity.label}</span>
          )}
        </div>
        <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
          <div 
            className={`h-full ${activity.color} transition-all duration-1000`} 
            style={{ width: `${activity.percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
