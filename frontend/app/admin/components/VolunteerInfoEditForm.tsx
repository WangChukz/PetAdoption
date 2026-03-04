'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const POSITIONS = [
  'Nhiếp ảnh & quay phim',
  'Chăm sóc thú cưng',
  'Nuôi giữ tạm (Foster)',
  'Sáng tạo nội dung',
  'Vệ sinh & chăm sóc cơ sở',
  'Tổ chức sự kiện',
  'Khác',
];

type Props = {
  data: {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    message: string | null;
    admin_notes: string | null;
  };
};

export default function VolunteerInfoEditForm({ data }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(data.name || '');
  const [email, setEmail] = useState(data.email || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [position, setPosition] = useState(data.position || '');
  const [message, setMessage] = useState(data.message || '');
  const [adminNotes, setAdminNotes] = useState(data.admin_notes || '');
  const [isDirty, setIsDirty] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);
  const positionRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (positionRef.current && !positionRef.current.contains(e.target as Node)) {
        setPositionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markDirty = (setter: (v: string) => void) => (val: string) => {
    setter(val);
    setIsDirty(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/volunteers/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, phone, position, message, admin_notes: adminNotes }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Cập nhật thất bại');
      toast.success('✅ Thông tin ứng viên đã được cập nhật!');
      setIsDirty(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'w-full bg-gray-50/50 hover:bg-white border border-gray-100 hover:border-blue-100 focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-100/20 rounded-xl px-4 py-3 font-vietnam text-[14px] text-gray-700 placeholder-gray-400 transition-all outline-none';

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-4">

      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-400 text-[11px] tracking-widest uppercase ml-1">Họ và Tên</label>
          <input value={name} onChange={e => markDirty(setName)(e.target.value)} className={inputCls} placeholder="Nhập họ tên..." />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-400 text-[11px] tracking-widest uppercase ml-1">Số Điện Thoại</label>
          <input value={phone} type="tel" onChange={e => markDirty(setPhone)(e.target.value)} className={inputCls} placeholder="Nhập số điện thoại..." />
        </div>
      </div>

      {/* Email + Position (Custom Dropdown) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-400 text-[11px] tracking-widest uppercase ml-1">Email</label>
          <input value={email} type="email" onChange={e => markDirty(setEmail)(e.target.value)} className={inputCls} placeholder="Nhập email..." />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-400 text-[11px] tracking-widest uppercase ml-1">Vị Trí Ứng Tuyển</label>
          <div className="relative" ref={positionRef}>
            <button
              type="button"
              onClick={() => setPositionOpen(!positionOpen)}
              className={`w-full h-[46px] flex items-center justify-between bg-gray-50/50 hover:bg-white border rounded-xl px-4 font-vietnam text-[14px] transition-all outline-none
                ${positionOpen ? 'border-blue-200 ring-4 ring-blue-100/20 bg-white' : 'border-gray-100 hover:border-blue-100'}
                ${position ? 'text-gray-700 font-bold' : 'text-gray-400 font-medium'}`}
            >
              <span className="truncate">{position || '-- Chọn vị trí --'}</span>
              <svg className={`w-4 h-4 text-gray-400 ml-2 shrink-0 transition-transform duration-300 ${positionOpen ? '-rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

                {positionOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {POSITIONS.map(p => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => {
                          markDirty(setPosition)(p);
                          setPositionOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 font-vietnam text-[13px] transition-all flex items-center gap-2
                          ${position === p
                            ? 'bg-blue-50 text-blue-600 font-bold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500 font-medium'}`}
                      >
                        {position === p && (
                          <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {position !== p && <span className="w-4 shrink-0" />}
                        {p}
                      </button>
                    ))}
                  </div>
                )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-400 text-[11px] tracking-widest uppercase ml-1">Lý Do Ứng Tuyển</label>
        <textarea
          value={message}
          rows={3}
          onChange={e => markDirty(setMessage)(e.target.value)}
          placeholder="Ứng viên chưa điền lý do..."
          className={`${inputCls} resize-none py-4`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-400 text-[11px] tracking-widest uppercase ml-1">
          Ghi Chú Nội Bộ <span className="text-gray-300 font-normal normal-case italic">(Chỉ Admin xem)</span>
        </label>
        <textarea
          value={adminNotes}
          rows={2}
          onChange={e => markDirty(setAdminNotes)(e.target.value)}
          placeholder="Ứng viên đến trực tiếp, thái độ tốt..."
          className={`${inputCls} resize-none py-4`}
        />
      </div>

      {isDirty && (
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#f08c50] hover:bg-[#d16830] disabled:bg-gray-200 text-white px-8 py-3 rounded-xl font-bold text-[14px] transition-all shadow-md shadow-orange-100 active:scale-95"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Đang lưu...
              </>
            ) : '💾 Lưu thay đổi hồ sơ'}
          </button>
        </div>
      )}
    </form>
  );
}
