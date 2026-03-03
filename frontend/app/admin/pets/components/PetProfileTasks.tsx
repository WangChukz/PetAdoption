'use client';

import React from 'react';
import { 
  Bell, 
  Plus, 
  Mail, 
  Phone, 
  Clock,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface PetProfileTasksProps {
  pet: any;
  refreshData: () => void;
}

export default function PetProfileTasks({ pet, refreshData }: PetProfileTasksProps) {
  const profile = pet.pet_profile || {};
  const tasks = profile.care_tasks || [];

  return (
    <div className="space-y-6">
      {/* Foster Contact */}
      <div className="bg-white rounded-[10px] border border-gray-100 p-6 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-menu">Người chăm sóc</h3>
        
        {profile.foster_name ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {profile.foster_name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-sm font-menu">{profile.foster_name}</h4>
                <p className="text-[12px] text-gray-400 font-menu italic">Tình nguyện viên lẻ</p>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
                <Mail className="w-4 h-4" />
                <span>{profile.foster_email || 'Chưa cập nhật email'}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
                <Phone className="w-4 h-4" />
                <span>{profile.foster_phone || 'Chưa cập nhật SĐT'}</span>
              </div>
            </div>
            
            <button className="w-full py-2.5 mt-2 bg-blue-50 text-blue-600 rounded-xl text-[13px] font-bold hover:bg-blue-100 transition-all border border-blue-100/50 whitespace-nowrap">
              Nhắn tin trao đổi
            </button>
          </div>
        ) : (
          <div className="py-4 text-center">
             <p className="text-[13px] text-gray-400 italic font-menu">Chưa có người chăm sóc</p>
             <button className="text-[12px] font-bold text-blue-500 mt-2 hover:underline">Phân bổ ngay →</button>
          </div>
        )}
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-[10px] border border-gray-100 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-menu">Công việc sắp tới</h3>
          <button className="text-[12px] font-bold text-blue-500 hover:text-blue-700 font-menu">Thêm mới</button>
        </div>

        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task: any, index: number) => (
              <div key={index} className="flex gap-3 group">
                <div className={`mt-0.5 w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  task.status === 'completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-orange-50 text-orange-500'
                }`}>
                  {task.status === 'completed' ? <CheckCircle2 className="w-4.5 h-4.5" /> : <Clock className="w-4.5 h-4.5" />}
                </div>
                <div>
                  <h4 className={`text-[13px] font-bold font-menu ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-[#101828]'}`}>
                    {task.task_name}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-menu">
                    {format(new Date(task.due_date), 'MMM d, p', { locale: vi })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 space-y-2">
               <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <Calendar className="w-5 h-5" />
               </div>
               <p className="text-[13px] text-gray-400 italic">Hôm nay không có lịch trình</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
