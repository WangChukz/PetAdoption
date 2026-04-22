'use client';

import React from 'react';
import { 
  Syringe, 
  Heart, 
  Scale, 
  CheckCircle2, 
  XCircle,
  Activity,
  Palette
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
    <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm space-y-6 h-full font-vietnam">
      <h3 className="text-[12px] font-semibold text-slate-500 tracking-wide tracking-[0.1em] font-menu">Số liệu nhanh</h3>
      
      <div className="space-y-4">
        {/* Vaccinated */}
        <div className="flex items-center justify-between text-[13.5px]">
          <div className="flex items-center gap-3">
            <Syringe className="w-5 h-5 text-gray-400/80" />
            <span className="text-gray-500 font-medium tracking-tight">Tiêm chủng</span>
          </div>
          <button 
            type="button"
            disabled={!isEditing}
            onClick={() => isEditing && setEditData({...editData, is_vaccinated: !editData.is_vaccinated})}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-200 ${
              (isEditing ? editData.is_vaccinated : profile.is_vaccinated)
                ? 'bg-emerald-50/50 border-emerald-100 text-emerald-500'
                : 'bg-gray-50 border-gray-100 text-gray-400'
            } ${isEditing ? 'cursor-pointer hover:border-emerald-200 active:scale-95' : 'cursor-default'}`}
          >
            {(isEditing ? editData.is_vaccinated : profile.is_vaccinated) ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[12px] font-bold">Đã xong</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" />
                <span className="text-[12px] font-medium">Chưa tiêm</span>
              </>
            )}
          </button>
        </div>

        {/* Neutered */}
        <div className="flex items-center justify-between text-[13.5px]">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-gray-400/80" />
            <span className="text-gray-500 font-medium tracking-tight">Triệt sản</span>
          </div>
          <button 
            type="button"
            disabled={!isEditing}
            onClick={() => isEditing && setEditData({...editData, is_neutered: !editData.is_neutered})}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-200 ${
              (isEditing ? editData.is_neutered : profile.is_neutered)
                ? 'bg-emerald-50/50 border-emerald-100 text-emerald-500'
                : 'bg-gray-50 border-gray-100 text-gray-400'
            } ${isEditing ? 'cursor-pointer hover:border-emerald-200 active:scale-95' : 'cursor-default'}`}
          >
            {(isEditing ? editData.is_neutered : profile.is_neutered) ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[12px] font-bold">Đã xong</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" />
                <span className="text-[12px] font-medium">Chưa làm</span>
              </>
            )}
          </button>
        </div>

        {/* Weight */}
        <div className="flex items-center justify-between text-[13.5px]">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-gray-400/80" />
            <span className="text-gray-500 font-medium tracking-tight">Cân nặng</span>
          </div>
          {isEditing ? (
            <div className="flex items-center gap-2 bg-gray-50/50 p-1 px-3 rounded-xl border border-gray-100 focus-within:border-blue-200 transition-colors">
              <input 
                type="number"
                step="0.1"
                value={editData.weight_kg || ''}
                onChange={(e) => setEditData({...editData, weight_kg: e.target.value})}
                className="bg-transparent text-right outline-none font-bold w-12 text-[13px]"
                placeholder="0.0"
              />
              <span className="text-gray-400 text-[10px] font-bold">KG</span>
            </div>
          ) : (
            <span className="text-slate-800 font-bold text-[13px] bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100/50">{profile.weight_kg || '0.0'} kg</span>
          )}
        </div>

        {/* Age */}
        <div className="flex items-center justify-between text-[13.5px]">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-gray-400/80" />
            <span className="text-gray-500 font-medium tracking-tight">Độ tuổi</span>
          </div>
          {isEditing ? (
            <div className="flex items-center gap-1 bg-gray-50/50 p-1 px-2 rounded-xl border border-gray-100 focus-within:border-orange-200 transition-colors">
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
                className="bg-transparent text-right outline-none font-medium font-menu w-12 text-[13px]"
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
                className="bg-transparent text-[11px] font-bold text-gray-500 outline-none cursor-pointer hover:text-orange-500 transition-colors"
              >
                <option value="month">tháng</option>
                <option value="year">tuổi</option>
              </select>
            </div>
          ) : (
            <span className="text-slate-800 font-medium font-menu bg-gray-50/50 px-3 py-1 rounded-lg border border-gray-100/50">
              {pet.age_months >= 12 
                ? `${Math.floor(pet.age_months / 12)} tuổi` 
                : `${pet.age_months || 0} tháng`}
            </span>
          )}
        </div>

        {/* Color */}
        <div className="flex items-center justify-between text-[13.5px]">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-gray-400/80" />
            <span className="text-gray-500 font-medium tracking-tight">Màu sắc</span>
          </div>
          {isEditing ? (
            <input 
              type="text"
              value={editData.color || ''}
              onChange={(e) => setEditData({...editData, color: e.target.value})}
              placeholder="VD: Vàng trắng..."
              className="bg-gray-50/50 border border-gray-100 rounded-xl px-3 py-2 text-right outline-none focus:border-orange-200 font-medium font-menu w-32 text-[13px] placeholder:text-gray-300"
            />
          ) : (
            <span className="text-slate-800 font-medium font-menu bg-gray-50/50 px-3 py-1 rounded-lg border border-gray-100/50">{profile.color || 'Chưa rõ'}</span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-gray-400/80" />
            <span className="text-[13.5px] text-gray-500 font-medium tracking-tight">Mức vận động</span>
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
            <span className={`font-medium font-menu ${activity.color.replace('bg-', 'text-')}`}>{activity.label}</span>
          )}
        </div>
        <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
          <div 
            className={`h-full ${activity.color} transition-all duration-1000 shadow-[0_0_8px_rgba(0,0,0,0.05)]`} 
            style={{ width: `${activity.percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
