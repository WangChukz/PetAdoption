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
    <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm space-y-6 h-full flex flex-col font-vietnam">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-gray-400/80" />
        <div>
          <h3 className="text-[16px] font-bold text-[#101828]">Câu chuyện về {pet.name}</h3>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Giới thiệu ngắn gọn</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-2">
        {isEditing ? (
          <div className="relative flex-1 flex flex-col">
            <textarea 
              value={editData.description || ''}
              onChange={(e) => {
                if (e.target.value.length <= 1000) {
                  setEditData({...editData, description: e.target.value});
                }
              }}
              placeholder="Chia sẻ một chút về tính cách hoặc hoàn cảnh của thú cưng (tối đa 1000 ký tự)..."
              className="w-full flex-1 min-h-[120px] p-4 bg-gray-50/50 border border-gray-100 rounded-xl outline-none focus:border-orange-200 transition-all resize-none text-[14px] leading-relaxed text-gray-600 font-normal"
            />
            <div className={`absolute bottom-3 right-3 text-[10px] font-bold px-2 py-1 rounded-md ${
              (editData.description?.length || 0) > 900 ? 'bg-red-50 text-red-400' : 'bg-white/80 text-gray-400'
            }`}>
              {editData.description?.length || 0}/1000
            </div>
          </div>
        ) : (
          <div className="text-[14px] text-gray-500 leading-loose font-normal italic bg-gray-50/30 p-4 rounded-xl border border-dashed border-gray-100 max-h-[220px] overflow-y-auto custom-scrollbar">
            {pet.description || "Chưa có câu chuyện nào được chia sẻ. Hãy bổ sung để giúp mọi người dễ dàng kết nối với bé hơn nhé!"}
          </div>
        )}
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <Smile className="w-4.5 h-4.5 text-gray-400/80" />
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Đặc điểm nổi bật</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {personalityTags.length > 0 ? (
            personalityTags.map((tag: string, index: number) => (
              <span 
                key={index}
                className={`px-3 py-1.5 flex items-center gap-2 text-[#101828] text-[12.5px] font-medium rounded-xl border border-gray-100 transition-all whitespace-nowrap ${
                  isEditing ? 'bg-orange-50 border-orange-100 hover:bg-orange-100' : 'bg-white hover:border-orange-200 hover:bg-orange-50/30'
                }`}
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full" />
                {tag}
                {isEditing && (
                  <button 
                    onClick={() => removeTag(tag)}
                    className="text-orange-400 hover:text-orange-600 p-0.5 hover:bg-orange-100 rounded-md transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
            ))
          ) : !isEditing && (
            <span className="text-sm text-gray-400 italic font-normal">Chưa xác định đặc điểm</span>
          )}

          {isEditing && (
            <div className="flex items-center gap-1.5 bg-gray-50/50 p-1 rounded-xl border border-gray-100 focus-within:border-orange-200 transition-colors">
              <input 
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                placeholder="Thêm đặc điểm..."
                className="bg-transparent px-2 py-1 text-[12.5px] outline-none w-28 font-normal"
              />
              <button 
                onClick={addTag}
                className="p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors active:scale-90"
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
