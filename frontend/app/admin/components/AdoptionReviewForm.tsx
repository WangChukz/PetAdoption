'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';

type Application = {
  id: number;
  status: 'pending' | 'interviewing' | 'approved' | 'rejected';
  admin_notes: string | null;
  applicant_message: string | null;
  interviewed_at: string | null;
  reviewed_by: { name: string } | null;
};

export default function AdoptionReviewForm({ data }: { data: Application }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [status, setStatus] = useState(data.status);
  const [adminNotes, setAdminNotes] = useState(data.admin_notes || '');

  // Confirm Modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{ title: string; message: string; type: 'warning' | 'danger' }>({
    title: '',
    message: '',
    type: 'warning'
  });

  const handleUpdate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // --- Confirmation Modal Trigger ---
    if (!showConfirm && (status === 'approved' || status === 'rejected')) {
        const label = status === 'approved' ? 'Đã Phê Duyệt' : 'Từ Chối';
        
        setConfirmConfig({
            title: status === 'approved' ? 'Xác nhận phê duyệt đơn?' : 'Xác nhận từ chối đơn?',
            message: status === 'approved' 
                ? `Bạn đang chuyển đơn nhận nuôi này sang trạng thái "Đã Phê Duyệt". Bạn có chắc chắn muốn tiếp tục?`
                : `Bạn đang chọn "Từ Chối" đơn nhận nuôi này. Bạn có chắc chắn muốn tiếp tục?`,
            type: status === 'approved' ? 'warning' : 'danger'
        });
        setShowConfirm(true);
        return;
    }
    // ----------------------------------

    setLoading(true);
    setShowConfirm(false);

    try {
      const res = await fetch(`/api/admin/adoptions/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          status,
          admin_notes: adminNotes,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Cập nhật thất bại');

      toast.success('Đã cập nhật trạng thái đơn!');
      router.refresh();
      
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-5 mt-6 border-t border-gray-100 pt-6">
      <h3 className="font-menu font-bold text-[#1a1a1a] text-[16px]">Cập Nhật Tiến Độ Của Đơn</h3>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">
            Trạng Thái Đơn Nhận Nuôi <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select value={status} onChange={(e: any) => setStatus(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 pr-10 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition appearance-none cursor-pointer">
              <option value="pending">Chờ Duyệt Mới</option>
              <option value="interviewing">Đang Phỏng Vấn</option>
              <option value="approved">Đã Phê Duyệt</option>
              <option value="rejected">Từ Chối</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">
          Ghi Chú Nội Bộ (Chỉ Admin xem)
        </label>
        <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={4}
          placeholder="Ví dụ: Đã gọi điện ngày X, người nhận nuôi rất tiềm năng..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition resize-none" />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading}
          className="px-8 py-2.5 rounded-xl font-menu text-[14px] font-semibold text-white bg-[#1a1a1a] hover:bg-black transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
        </button>
      </div>

      <ConfirmModal 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleUpdate()}
        isLoading={loading}
        title={confirmConfig.title}
        message={confirmConfig.message}
        type={confirmConfig.type}
        confirmText="Tôi chắc chắn"
        cancelText="Để mình xem lại"
      />
    </form>
  );
}
