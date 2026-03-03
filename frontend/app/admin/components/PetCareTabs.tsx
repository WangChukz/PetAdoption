'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

type Prop = {
  pet: any;
};

export default function PetCareTabs({ pet }: Prop) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'logs' | 'tasks' | 'timeline'>('logs');
  const [logContent, setLogContent] = useState('');
  const [logType, setLogType] = useState('general');
  const [submitting, setSubmitting] = useState(false);

  const profile = pet.pet_profile;

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logContent.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/pets/${pet.id}/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ content: logContent, type: logType }),
      });

      if (!res.ok) throw new Error('Failed to add log');

      toast.success('Đã thêm nhật ký chăm sóc');
      setLogContent('');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTask = async (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      const res = await fetch(`/api/admin/pets/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update task');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (!profile) return null;

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        {(['logs', 'tasks', 'timeline'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-menu text-[13px] font-bold transition-all relative ${
              activeTab === tab ? 'text-[#f08c50]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab === 'logs' && 'Nhật Ký Chăm Sóc'}
            {tab === 'tasks' && 'Nhiệm Vụ Cần Làm'}
            {tab === 'timeline' && 'Lịch Sử Trạng Thái'}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f08c50]" />}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <form onSubmit={handleAddLog} className="bg-orange-50/30 p-4 rounded-xl border border-orange-100 flex flex-col gap-3">
              <textarea
                value={logContent}
                onChange={(e) => setLogContent(e.target.value)}
                placeholder="Nhập ghi chú chăm sóc hoặc diễn biến sức khỏe..."
                className="w-full bg-white border border-orange-200 rounded-lg p-3 text-[13px] font-menu focus:outline-none focus:ring-1 focus:ring-[#f08c50]"
                rows={2}
              />
              <div className="flex items-center justify-between">
                <div className="relative">
                  <select 
                    value={logType} 
                    onChange={(e) => setLogType(e.target.value)}
                    className="w-full bg-white border border-orange-200 rounded-lg pl-3 pr-8 py-1.5 text-[12px] font-menu appearance-none cursor-pointer"
                  >
                    <option value="general">Thường ngày</option>
                    <option value="medical">Y tế</option>
                    <option value="behavior">Hành vi</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-orange-400 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#f08c50] text-white px-4 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#d16830] transition disabled:opacity-50"
                >
                  {submitting ? 'Đang gửi...' : 'Gửi Nhật Ký'}
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {profile.care_logs?.length === 0 ? (
                <p className="text-center text-gray-400 font-menu text-[13px] py-10">Chưa có nhật ký nào.</p>
              ) : (
                profile.care_logs.map((log: any) => (
                  <div key={log.id} className="flex gap-4 p-4 border border-gray-50 rounded-xl hover:bg-gray-50/30 transition">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[14px]">👤</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[13px]">{log.user?.name || 'Tình nguyện viên'}</span>
                        <span className="text-[11px] text-gray-400">{new Date(log.created_at).toLocaleString('vi-VN')}</span>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{log.content}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        log.type === 'medical' ? 'bg-red-100 text-red-600' : 
                        log.type === 'behavior' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                  </div>
                )).reverse()
              )}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {profile.care_tasks?.length === 0 ? (
              <p className="text-center text-gray-400 font-menu text-[13px] py-10">Hiện không có nhiệm vụ nào cho trạng thái này.</p>
            ) : (
              profile.care_tasks.map((task: any) => (
                <div 
                  key={task.id} 
                  onClick={() => handleToggleTask(task.id, task.status)}
                  className="flex items-center gap-4 p-4 border border-gray-50 rounded-xl hover:bg-gray-50/30 transition cursor-pointer group"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                    task.status === 'completed' ? 'bg-[#f08c50] border-[#f08c50] text-white' : 'border-gray-200 group-hover:border-[#f08c50]'
                  }`}>
                    {task.status === 'completed' && <span className="text-[12px]">✓</span>}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-[13px] ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.task_name}
                    </p>
                    <p className="text-[11px] text-gray-400">{task.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            {profile.audit_trails?.map((trail: any) => (
              <div key={trail.id} className="relative">
                <div className="absolute left-[-21px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#f08c50]" />
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold">
                    <span className="text-gray-400 line-through">{trail.old_status}</span> 
                    <span className="text-[#f08c50] mx-2">→</span> 
                    <span>{trail.new_status}</span>
                  </p>
                  <p className="text-[12px] text-gray-500 italic">"{trail.reason || 'Không có lý do được ghi.'}"</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-gray-400">Thực hiện bởi: {trail.user?.name || 'Hệ thống'}</span>
                    <span className="text-[11px] text-gray-300">•</span>
                    <span className="text-[11px] text-gray-400">{new Date(trail.created_at).toLocaleString('vi-VN')}</span>
                  </div>
                </div>
              </div>
            )).reverse()}
          </div>
        )}
      </div>
    </div>
  );
}
