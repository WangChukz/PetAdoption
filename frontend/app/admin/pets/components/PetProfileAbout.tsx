'use client';

import React from 'react';
import { FileText, Plus, X, Smile } from 'lucide-react';

interface PetProfileAboutProps {
  pet: any;
  isEditing: boolean;
  editData: any;
  setEditData: (data: any) => void;
  refreshData: () => void;
}

export default function PetProfileAbout({ 
  pet, 
  isEditing, 
  editData, 
  setEditData, 
  refreshData 
}: PetProfileAboutProps) {
  const personalityTags = isEditing 
    ? (editData.personality_tags || [])
    : (Array.isArray(pet.personality_tags) 
        ? pet.personality_tags 
        : (typeof pet.personality_tags === 'string' ? JSON.parse(pet.personality_tags) : []));

  const [newTag, setNewTag] = React.useState('');

  const addTag = () => {
    if (!newTag.trim()) return;
    if (personalityTags.includes(newTag.trim())) {
      setNewTag('');
      return;
    }
    setEditData({
      ...editData,
      personality_tags: [...personalityTags, newTag.trim()]
    });
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setEditData({
      ...editData,
      personality_tags: personalityTags.filter((tag: string) => tag !== tagToRemove)
    });
  };

  return (
    <div className="bg-white rounded-[10px] border border-gray-100 p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
          <FileText className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-[#101828] font-menu">Thông tin về {pet.name}</h3>
      </div>

      <div className="text-[15px] text-gray-600 leading-relaxed font-menu">
        {isEditing ? (
          <textarea 
            value={editData.description || ''}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            placeholder="Nhập mô tả chi tiết về thú cưng..."
            className="w-full min-h-[80px] p-3 bg-gray-50 border border-gray-100 rounded-[10px] outline-none focus:border-orange-200 transition-all resize-none"
          />
        ) : (
          pet.description || "Chưa có mô tả chi tiết cho thú cưng này. Vui lòng bổ sung để người dùng có cái nhìn rõ hơn về tính cách và thói quen của chúng."
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Smile className="w-4 h-4 text-orange-400" />
          <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider font-menu">Tính cách & Đặc điểm</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {personalityTags.length > 0 ? (
            personalityTags.map((tag: string, index: number) => (
              <span 
                key={index}
                className={`px-3 py-1.5 flex items-center gap-2 text-[#101828] text-[12.5px] font-medium rounded-[10px] border border-gray-100 transition-all whitespace-nowrap ${
                  isEditing ? 'bg-orange-50 border-orange-100 hover:bg-orange-100' : 'bg-gray-50 hover:border-orange-200 hover:bg-orange-50/30'
                }`}
              >
                {tag}
                {isEditing && (
                  <button 
                    onClick={() => removeTag(tag)}
                    className="text-orange-400 hover:text-orange-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
            ))
          ) : !isEditing && (
            <span className="text-sm text-gray-400 italic">Chưa xác định đặc điểm</span>
          )}

          {isEditing && (
            <div className="flex items-center gap-2">
              <input 
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                placeholder="Thêm đặc điểm..."
                className="w-32 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-[10px] text-[12.5px] outline-none focus:border-orange-200"
              />
              <button 
                onClick={addTag}
                className="p-1.5 bg-orange-500 text-white rounded-[10px] hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
