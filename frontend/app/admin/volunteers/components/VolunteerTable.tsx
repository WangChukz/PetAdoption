'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { CheckCircle2, PartyPopper, Clock3, XCircle, CalendarCheck2, Mic2, Trash2, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

type Volunteer = {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
  created_at: string;
};

const statusMap: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: 'MỚI GỬI', color: 'bg-blue-50 text-blue-500 border-blue-100', icon: Clock3 },
  cv_passed: { label: 'CV ĐẠT', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
  cv_rejected: { label: 'CV LOẠI', color: 'bg-rose-50 text-rose-500 border-rose-100', icon: XCircle },
  passed: { label: 'ĐÃ NHẬN', color: 'bg-teal-50 text-[#3A8D9D] border-[#3A8D9D]/20', icon: PartyPopper },
  rejected: { label: 'TỪ CHỐI', color: 'bg-gray-50 text-gray-400 border-gray-100', icon: XCircle },
  interview_scheduled: { label: 'LỊCH PV', color: 'bg-purple-50 text-purple-600 border-purple-100', icon: CalendarCheck2 },
  interviewing: { label: 'ĐANG PV', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: Mic2 },
};

export default function VolunteerTable({ volunteers }: { volunteers: Volunteer[] }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === volunteers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(volunteers.map(v => v.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDeleteBulk = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} hồ sơ đã chọn?`)) {
      toast.success(`Đã xóa thành công ${selectedIds.length} hồ sơ!`, {
        className: 'admin-toast',
        duration: 4000
      });
      setSelectedIds([]);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Bulk Actions Toolbar */}
      {selectedIds.length > 0 && (
        <div className="px-6 py-2.5 bg-[#f8fafc] border-y border-gray-100 flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-[12px] font-black text-[#3A8D9D]">{selectedIds.length}</span>
            </div>
            <p className="text-[13px] font-bold text-slate-600">
              Hồ sơ đang được chọn để thao tác hàng loạt
            </p>
          </div>
          <button 
            onClick={handleDeleteBulk}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-[10px] text-[13px] font-black transition-all active:scale-95 border border-rose-100/50"
          >
            <Trash2 className="w-4 h-4 stroke-[2.5]" />
            Xóa Mục Đã Chọn
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[1024px] border-separate border-spacing-y-0">
          <thead>
            <tr className="bg-[#3A8D9D] text-white font-vietnam text-[11px] font-black uppercase tracking-[0.15em] border-b border-white/10">
              <th className="px-5 py-4 w-[60px] text-center border-r border-white/10">
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === volunteers.length && volunteers.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded-[6px] border-none bg-white/20 text-white focus:ring-0 w-4.5 h-4.5 cursor-pointer shadow-inner transition-all hover:bg-white/30"
                />
              </th>
              <th className="px-6 py-4 w-[100px] border-r border-white/10">ID</th>
              <th className="px-6 py-4 border-r border-white/10">ỨNG VIÊN</th>
              <th className="px-6 py-4 text-center border-r border-white/10">VỊ TRÍ ỨNG TUYỂN</th>
              <th className="px-6 py-4 text-center border-r border-white/10">NGÀY GỬI</th>
              <th className="px-6 py-4 text-center border-r border-white/10">TRẠNG THÁI</th>
              <th className="px-6 py-4 text-center">CHI TIẾT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-vietnam text-[13.5px]">
            {volunteers.map((v) => {
              const isSelected = selectedIds.includes(v.id);
              const status = statusMap[v.status] || statusMap.pending;
              const StatusIcon = status.icon;

              return (
                <tr key={v.id} className={`group hover:bg-gray-50 transition-all duration-300 ${isSelected ? 'bg-blue-50/50' : ''}`}>
                  <td className="px-5 py-4 text-center border-r border-gray-50/50">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => toggleSelect(v.id)}
                      className="rounded-[6px] border-gray-300 text-[#f08c50] focus:ring-[#f08c50]/20 w-4.5 h-4.5 cursor-pointer transition-all"
                    />
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-[13px] text-gray-410 font-medium border-r border-gray-50/50">
                    <span className="bg-gray-50 px-2 py-1 rounded text-gray-400">#{v.id.toString().padStart(4, '0')}</span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap border-r border-gray-50/50">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const firstLetter = v.name.trim().charAt(0).toUpperCase();
                        const colors = [
                          'bg-blue-50 text-blue-500 border-blue-100',
                          'bg-emerald-50 text-emerald-500 border-emerald-100',
                          'bg-purple-50 text-purple-500 border-purple-100',
                          'bg-rose-50 text-rose-500 border-rose-100',
                          'bg-orange-50 text-orange-500 border-orange-100',
                          'bg-teal-50 text-teal-500 border-teal-100'
                        ];
                        // Select color based on ID to keep it consistent
                        const colorClass = colors[v.id % colors.length];
                        
                        return (
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[15px] border shadow-sm group-hover:shadow-md transition-all ${colorClass}`}>
                            {firstLetter}
                          </div>
                        );
                      })()}
                      <div>
                        <p className="text-[14px] font-bold text-[#101828] mb-0.5">{v.name}</p>
                        <p className="text-[12px] text-gray-400 font-medium">{v.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-center border-r border-gray-50/50">
                    <span className="inline-flex px-3 py-1 rounded-full bg-purple-50 text-[#8b5cf6] text-[12px] font-bold border border-purple-100/50">
                      {v.position}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-center border-r border-gray-50/50 text-gray-600 text-[13.5px] font-normal tracking-tight">
                    {format(new Date(v.created_at), 'dd / MM / yyyy')}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-center border-r border-gray-50/50">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${status.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-center">
                    <Link 
                      href={`/admin/volunteers/${v.id}`}
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-[#101828] text-[13px] font-black rounded-[10px] transition-all active:scale-95 border border-transparent hover:border-gray-200"
                    >
                      Xét Duyệt CV
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
