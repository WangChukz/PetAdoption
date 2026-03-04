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
  Hash,
  Calendar,
  AlertCircle,
  Stethoscope,
  Trash2,
  Activity
} from 'lucide-react';
import CustomDropdown from '@/app/admin/components/CustomDropdown';
import ModernDatePicker from '@/app/components/ModernDatePicker';

interface PetProfileMedicalProps {
  pet: any;
  isEditing: boolean;
  editData: any;
  setEditData: (data: any) => void;
  refreshData: () => void;
}

const MedicalTypeDropdown = () => {
  const [type, setType] = React.useState('vaccination');
  return (
    <>
      <CustomDropdown
        options={[
          { id: 'vaccination', label: 'Tiêm chủng' },
          { id: 'surgery', label: 'Phẫu thuật' },
          { id: 'checkup', label: 'Khám định kỳ' },
          { id: 'other', label: 'Khác' }
        ]}
        value={type}
        onChange={setType}
        placeholder="Chọn loại..."
      />
      <input type="hidden" id="selected-medical-type" value={type} />
    </>
  );
};

export default function PetProfileMedical({ 
  pet, 
  isEditing, 
  editData, 
  setEditData, 
  refreshData 
}: PetProfileMedicalProps) {
  const profile = pet.pet_profile || {};
  const [newTitle, setNewTitle] = React.useState('');
  const [newDate, setNewDate] = React.useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm space-y-6 h-full font-vietnam">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HeartPulse className="w-6 h-6 text-gray-400/80" />
          <div>
            <h3 className="text-[16px] font-bold text-[#101828]">Sức khỏe tổng quan</h3>
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Hồ sơ y tế gần đây</p>
          </div>
        </div>
        {!isEditing && (
          <button className="px-4 py-2 bg-gray-50 text-[12px] font-bold text-gray-500 hover:bg-gray-100 hover:text-blue-500 rounded-xl transition-all flex items-center gap-2 border border-gray-100">
            <span>Chi tiết bệnh án</span>
            <PlusCircle className="w-4 h-4" />
          </button>
        )}
      </div>
      
      
      {isEditing ? (
        <div className="space-y-4">
          {/* Add New Record Form */}
          <div className="bg-gray-50/50 rounded-xl border border-gray-100 p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Tiêu đề bản ghi</label>
                <input 
                  type="text"
                  placeholder="Ví dụ: Tiêm dại định kỳ..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-red-200 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Ngày thực hiện</label>
                <ModernDatePicker 
                  value={newDate}
                  onChange={setNewDate}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5" id="medical-type-container">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Loại hình</label>
                <MedicalTypeDropdown />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Ghi chú chi tiết</label>
                <input 
                  type="text"
                  placeholder="Hướng dẫn theo dõi hoặc kết quả..."
                  id="new-medical-notes"
                  className="w-full h-10 px-3 bg-white border border-gray-100 rounded-lg text-[13px] focus:outline-none focus:border-red-200 transition-colors"
                />
              </div>
            </div>

            <button 
              type="button"
              onClick={() => {
                const title = newTitle;
                const date = newDate;
                const notes = (document.getElementById('new-medical-notes') as HTMLInputElement)?.value;
                const type = (document.getElementById('selected-medical-type') as HTMLInputElement)?.value || 'vaccination';
                
                if (!title || !date) return;

                const newRecord = {
                  id: Date.now().toString(),
                  date,
                  type,
                  title,
                  notes
                };

                const currentHistory = Array.isArray(editData.medical_history) ? editData.medical_history : [];
                setEditData({
                  ...editData,
                  medical_history: [...currentHistory, newRecord]
                });

                // Clear fields
                setNewTitle('');
                setNewDate(new Date().toISOString().split('T')[0]);
                (document.getElementById('new-medical-notes') as HTMLInputElement).value = '';
              }}
              className="w-full h-10 bg-red-50 text-red-500 rounded-lg text-[13px] font-bold hover:bg-red-100 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Thêm bản ghi vào hồ sơ</span>
            </button>
          </div>

          {/* List of records */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            {Array.isArray(editData.medical_history) && editData.medical_history.length > 0 ? (
              editData.medical_history.map((record: any) => (
                <div key={record.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 group relative">
                  <div className="w-10 h-10 flex items-center justify-center text-gray-400/80 flex-shrink-0 bg-gray-50/50 rounded-xl">
                    {record.type === 'vaccination' ? <Syringe className="w-5.5 h-5.5" /> : 
                     record.type === 'surgery' ? <Activity className="w-5.5 h-5.5" /> : 
                     <Stethoscope className="w-5.5 h-5.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[14px] font-bold text-[#101828] truncate">{record.title}</h5>
                        {record.notes && <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-1">{record.notes}</p>}
                      </div>
                      <div className="flex items-center gap-4 ml-4">
                        <span className="text-[12px] font-bold text-gray-400 flex items-center gap-1.5 bg-gray-50/80 px-2.5 py-1 rounded-lg border border-gray-100/50">
                          <Calendar className="w-3.5 h-3.5" />
                          {record.date}
                        </span>
                        <button 
                          type="button"
                          onClick={() => {
                            setEditData({
                              ...editData,
                              medical_history: editData.medical_history.filter((r: any) => r.id !== record.id)
                            });
                          }}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-50 rounded-xl transition-all"
                          title="Xóa bản ghi"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-2 opacity-40">
                <AlertCircle className="w-8 h-8 text-gray-300" />
                <p className="text-[12px] font-medium tracking-tight">Chưa có bản ghi y tế nào được thêm.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {Array.isArray(profile.medical_history) && profile.medical_history.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {profile.medical_history.map((record: any, index: number) => (
                <div key={record.id || index} className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 flex items-start gap-4 hover:border-red-100 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center text-gray-400/80 flex-shrink-0">
                    {record.type === 'vaccination' ? <Syringe className="w-5.5 h-5.5" /> : 
                     record.type === 'surgery' ? <Activity className="w-5.5 h-5.5" /> : 
                     <Stethoscope className="w-5.5 h-5.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-[14px] font-bold text-[#101828] uppercase tracking-tight">{record.title}</h5>
                      <span className="text-[12px] font-bold text-gray-400 font-menu bg-white px-2 py-0.5 rounded-full border border-gray-100 italic">
                        {record.date}
                      </span>
                    </div>
                    {record.notes ? (
                      <p className="text-[13px] text-gray-500 font-menu leading-relaxed">{record.notes}</p>
                    ) : (
                      <p className="text-[12px] italic text-gray-400">Không có ghi chú thêm</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50/50 rounded-[10px] border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#101828] font-menu">Chưa có hồ sơ bệnh án</h4>
                <p className="text-[13px] text-gray-400 font-menu max-w-[280px]">
                  Ấn nút chỉnh sửa để thêm lịch sử tiêm ngừa và các ghi chú y tế cho thú cưng.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
