'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DonationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          type,
          amount: parseFloat(amount),
          method: paymentMethod,
          donor_name: type === 'income' ? donorName : null,
          note: type === 'income' ? donorMessage + (notes ? ' - ' + notes : '') : notes,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Lỗi khi lưu giao dịch');

      toast.success(type === 'income' ? 'Đã ghi nhận khoản thu mới!' : 'Đã ghi nhận khoản chi mới!');
      router.push('/admin/donations');
      router.refresh();

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6 max-w-2xl">
      
      {/* Type Toggle */}
      <div>
        <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-2">Loại Giao Dịch <span className="text-red-500">*</span></label>
        <div className="flex gap-2 bg-gray-50 p-1.5 rounded-xl">
          <button type="button" onClick={() => setType('income')}
             className={`flex-1 py-2.5 rounded-lg font-bold text-[13px] transition ${type === 'income' ? 'bg-green-100 text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
             + Khoản Thu (Quyên Góp)
          </button>
          <button type="button" onClick={() => setType('expense')}
             className={`flex-1 py-2.5 rounded-lg font-bold text-[13px] transition ${type === 'expense' ? 'bg-red-100 text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
             - Khoản Chi (Nuôi Dưỡng/Chữa Bệnh)
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Số Tiền (VNĐ) <span className="text-red-500">*</span></label>
          <div className="relative">
             <input required type="number" min="1000" step="1000" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="50000"
               className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-[16px] font-bold font-menu focus:ring-2 focus:bg-white transition ${type === 'income' ? 'text-green-600 focus:ring-green-500/20 focus:border-green-500' : 'text-red-500 focus:ring-red-500/20 focus:border-red-500'}`} />
             <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 font-menu text-[14px]">₫</span>
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Hình Thức <span className="text-red-500">*</span></label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition">
            <option value="bank_transfer">Chuyển Khoản Ngân Hàng</option>
            <option value="cash">Tiền Mặt</option>
            <option value="momo">Ví MoMo</option>
            <option value="other">Khác</option>
          </select>
        </div>
      </div>

      {type === 'income' && (
        <div className="p-5 bg-green-50/50 border border-green-100 rounded-xl flex flex-col gap-4">
           <div>
             <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Tên Người Gửi (Bỏ trống = Ẩn danh)</label>
             <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Nhà Hảo Tâm Ẩn Danh"
               className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" />
           </div>
           <div>
             <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Lời Nhắn Của Khách</label>
             <input type="text" value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} placeholder="Ví dụ: Chúc các bé mau khoẻ..."
               className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] font-menu focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition text-gray-600 italic" />
           </div>
        </div>
      )}

      <div>
        <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">Lý Do / Ghi Chú Nội Bộ</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
          placeholder={type === 'income' ? 'Ví dụ: Quyên góp qua chuyển khoản BIDV...' : 'Ví dụ: Chi phí phẫu thuật cho bé cún tại phòng khám ABC...'}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition resize-none" />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl font-menu text-[14px] font-semibold text-gray-600 hover:bg-gray-100 transition">
          Hủy
        </button>
        <button type="submit" disabled={loading}
          className={`px-8 py-2.5 rounded-xl font-menu text-[14px] font-semibold text-white transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${type === 'income' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}>
          {loading ? 'Đang lưu...' : (type === 'income' ? 'Lưu Khoản Thu Mới' : 'Lưu Khoản Chi Mới')}
        </button>
      </div>

    </form>
  );
}
