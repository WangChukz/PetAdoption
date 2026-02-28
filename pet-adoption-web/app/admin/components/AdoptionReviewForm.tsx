'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
          <select value={status} onChange={(e: any) => setStatus(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition">
            <option value="pending">Chờ Duyệt Mới</option>
            <option value="interviewing">Đang Phỏng Vấn</option>
            <option value="approved">Đã Phê Duyệt</option>
            <option value="rejected">Từ Chối</option>
          </select>
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
    </form>
  );
}
