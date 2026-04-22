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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full font-vietnam">
      {/* Foster Contact */}
      <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm space-y-6 flex flex-col h-full">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-gray-400/80" />
          <div>
            <h3 className="text-[15px] font-bold text-slate-800">Người chăm sóc</h3>
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Tình nguyện viên/Foster</p>
          </div>
        </div>
        
        {profile.foster_name ? (
          <div className="flex-1 flex flex-col justify-between space-y-5">
            <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">
                {profile.foster_name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-[15px]">{profile.foster_name}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-[12px] text-gray-400 font-medium italic">Đang phụ trách</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 pt-1">
              <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl text-[13px] text-gray-600 hover:border-blue-200 transition-all cursor-pointer group">
                <Mail className="w-4.5 h-4.5 text-gray-400 group-hover:text-blue-500 transition-all" />
                <span className="truncate">{profile.foster_email || 'Email...'}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl text-[13px] text-gray-600 hover:border-blue-200 transition-all cursor-pointer group">
                <Phone className="w-4.5 h-4.5 text-gray-400 group-hover:text-emerald-500 transition-all" />
                <span>{profile.foster_phone || 'SĐT...'}</span>
              </div>
            </div>
            
            <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-[13px] font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-[0.98]">
              Gửi tin xắn cho TNV
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-center bg-gray-50/30 rounded-2xl border border-dashed border-gray-100">
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-200 shadow-sm mb-3">
                <Plus className="w-5 h-5" />
             </div>
             <p className="text-[13.5px] text-gray-400 italic">Chưa phân bổ người chăm sóc</p>
             <button className="text-[12px] font-bold text-blue-500 mt-3 hover:text-blue-700 underline-offset-4 hover:underline">Phân bổ ngay</button>
          </div>
        )}
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-[16px] border border-gray-100 p-6 shadow-sm space-y-6 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-400/80" />
            <div>
              <h3 className="text-[15px] font-bold text-slate-800">Công việc sắp tới</h3>
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Lịch trình trong tuần</p>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-gray-50 text-[11px] font-bold text-gray-500 hover:bg-orange-50 hover:text-orange-500 rounded-lg border border-gray-100 transition-all">
            Thêm mới
          </button>
        </div>

        <div className="flex-1 space-y-4 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar pb-2">
          {tasks.length > 0 ? (
            tasks.map((task: any, index: number) => (
              <div key={index} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:border-orange-100 hover:shadow-sm transition-all group">
                <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center transition-colors ${
                  task.status === 'completed' ? 'text-emerald-400' : 'text-gray-300 group-hover:text-blue-400'
                }`}>
                  {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <h4 className={`text-[13.5px] font-bold ${task.status === 'completed' ? 'text-gray-300 line-through' : 'text-slate-800'}`}>
                    {task.task_name}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                    {format(new Date(task.due_date), 'HH:mm - d MMM', { locale: vi })}
                  </p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-50 rounded-lg transition-all text-gray-300 hover:text-red-400 self-center">
                  <Plus className="w-4 h-4 rotate-45" />
                </button>
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10 opacity-40">
               <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5 text-gray-300" />
               </div>
               <p className="text-[13.5px] font-medium italic">Không có lịch trình sắp tới</p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
