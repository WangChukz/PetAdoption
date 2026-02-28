'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CheckCircle2, XCircle, CalendarCheck2, Mic2, PartyPopper, Clock3 } from 'lucide-react';

const POSITIONS = [
  { value: 'Nhiếp ảnh & quay phim', label: '📷 Nhiếp ảnh & Quay phim' },
  { value: 'Chăm sóc thú cưng', label: '🐾 Chăm sóc thú cưng trực tiếp' },
  { value: 'Nuôi giữ tạm (Foster)', label: '🏠 Nuôi giữ tạm (Foster)' },
  { value: 'Sáng tạo nội dung', label: '✍️ Sáng tạo nội dung & MXH' },
  { value: 'Vệ sinh & chăm sóc cơ sở', label: '🧹 Vệ sinh & Chăm sóc cơ sở' },
  { value: 'Tổ chức sự kiện', label: '🎪 Tổ chức sự kiện' },
  { value: 'Khác', label: '💡 Khác' },
];

const STATUSES = [
  { value: 'pending', label: <span className="flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />Chờ Duyệt</span> },
  { value: 'cv_passed', label: <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />CV Đạt</span> },
  { value: 'cv_rejected', label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />CV Không Đạt</span> },
  { value: 'interview_scheduled', label: <span className="flex items-center gap-1.5"><CalendarCheck2 className="w-3.5 h-3.5" />Lịch PV Xác Nhận</span> },
  { value: 'interviewing', label: <span className="flex items-center gap-1.5"><Mic2 className="w-3.5 h-3.5" />Đang PV</span> },
  { value: 'passed', label: <span className="flex items-center gap-1.5"><PartyPopper className="w-3.5 h-3.5" />Đã Nhận</span> },
  { value: 'rejected', label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />Từ Chối</span> },
];

export default function NewVolunteerPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('pending');
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (file.type !== 'application/pdf') { toast.error('Chỉ chấp nhận file PDF.'); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error('File không được vượt quá 10MB.'); return; }
    setFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('position', position);
    formData.set('status', status);

    try {
      const res = await fetch('/api/admin-volunteer-create', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Hồ sơ mới đã được tạo!');
        router.push('/admin/volunteers');
        router.refresh();
      } else {
        if (data.errors) setErrors(data.errors);
        toast.error(data.message || 'Tạo hồ sơ thất bại.');
      }
    } catch (err: any) {
      toast.error('Lỗi kết nối máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputCls = (field: string) =>
    `w-full bg-white border ${errors[field] ? 'border-red-400' : 'border-gray-200 hover:border-gray-300'} px-3.5 py-2.5 rounded-xl font-menu text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/10 transition-all`;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/volunteers"
          className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
          title="Quay lại danh sách"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Thêm Hồ Sơ TNV Mới</h1>
          <p className="font-menu text-gray-400 text-[14px] mt-0.5">Nhập hồ sơ cho ứng viên đăng ký trực tiếp hoặc nộp offline.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">

        {/* Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-menu font-bold text-gray-700 text-[12px] tracking-wide">
              Họ và Tên <span className="text-red-500">*</span>
            </label>
            <input id="name" name="name" type="text" placeholder="Nguyễn Văn A" required className={inputCls('name')} />
            {errors.name && <p className="text-red-500 text-[12px]">{errors.name[0]}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="font-menu font-bold text-gray-700 text-[12px] tracking-wide">
              Số Điện Thoại <span className="text-red-500">*</span>
            </label>
            <input id="phone" name="phone" type="tel" placeholder="0912 xxx xxx" required className={inputCls('phone')} />
            {errors.phone && <p className="text-red-500 text-[12px]">{errors.phone[0]}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-menu font-bold text-gray-700 text-[12px] tracking-wide">
            Email <span className="text-red-500">*</span>
          </label>
          <input id="email" name="email" type="email" placeholder="example@email.com" required className={inputCls('email')} />
          {errors.email && <p className="text-red-500 text-[12px]">{errors.email[0]}</p>}
        </div>

        {/* Position + Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-menu font-bold text-gray-700 text-[12px] tracking-wide">
              Vị Trí Ứng Tuyển <span className="text-red-500">*</span>
            </label>
            <div className="rounded-xl overflow-hidden">
              <select
                value={position}
                onChange={e => setPosition(e.target.value)}
                required
                className={`${inputCls('position')} cursor-pointer`}
              >
                <option value="" disabled>-- Chọn vị trí --</option>
                {POSITIONS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            {errors.position && <p className="text-red-500 text-[12px]">{errors.position[0]}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-menu font-bold text-gray-700 text-[12px] tracking-wide">
              Trạng Thái Ban Đầu
            </label>
            <div className="rounded-xl overflow-hidden">
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className={`${inputCls('status')} cursor-pointer`}
              >
                {STATUSES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="font-menu font-bold text-gray-700 text-[12px] tracking-wide">
            Lý Do / Ghi Chú Ứng Viên
          </label>
          <textarea
            id="message" name="message" rows={3}
            placeholder="Ứng viên muốn đóng góp cho các hoạt động..."
            className={`${inputCls('message')} resize-none`}
          ></textarea>
        </div>

        {/* Admin Notes */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="admin_notes" className="font-menu font-bold text-gray-700 text-[12px] tracking-wide">
            Ghi Chú Nội Bộ (Admin)
          </label>
          <textarea
            id="admin_notes" name="admin_notes" rows={2}
            placeholder="Ứng viên đến đăng ký trực tiếp lúc 14h ngày 28/02..."
            className={`${inputCls('admin_notes')} resize-none`}
          ></textarea>
        </div>

        {/* CV Upload */}
        <div className="flex flex-col gap-1.5">
          <label className="font-menu font-bold text-gray-700 text-[12px] tracking-wide">
            CV (PDF, tối đa 10MB) — Tuỳ Chọn
          </label>
          <div
            onClick={() => fileRef.current?.click()}
            className={`flex items-center gap-3 w-full border border-dashed rounded-xl px-4 py-3.5 cursor-pointer transition-all ${
              fileName ? 'border-green-400 bg-green-50/40' : 'border-gray-300 bg-gray-50/50 hover:border-[#f08c50] hover:bg-orange-50/30'
            }`}
          >
            {fileName ? (
              <>
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-menu text-green-700 font-semibold text-[13px] truncate flex-1">{fileName}</p>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setFileName(null); if (fileRef.current) fileRef.current.value = ''; }}
                  className="font-menu text-[12px] text-gray-400 hover:text-red-500 transition shrink-0"
                >
                  Xoá
                </button>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="font-menu text-gray-500 text-[13px]">
                  <span className="font-semibold text-[#f08c50]">Nhấn để chọn file</span> hoặc kéo thả CV vào đây
                </p>
              </>
            )}
            <input
              ref={fileRef} type="file" name="cv" accept="application/pdf" className="hidden"
              onChange={e => handleFile(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/admin/volunteers"
            className="font-menu text-[14px] text-gray-500 hover:text-gray-800 transition font-semibold"
          >
            Huỷ Bỏ
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-[#f08c50] hover:bg-[#d16830] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-menu font-black text-[14px] tracking-wide uppercase transition-all shadow-sm active:scale-95"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Đang lưu...
              </>
            ) : 'Lưu Hồ Sơ'}
          </button>
        </div>
      </form>
    </div>
  );
}
