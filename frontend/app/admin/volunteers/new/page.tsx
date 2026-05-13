'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  CheckCircle2, XCircle, CalendarCheck2, Mic2, PartyPopper, Clock3, 
  User, Phone, Mail, Briefcase, FileText, ArrowLeft, UploadCloud, Sparkles
} from 'lucide-react';

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
  { value: 'pending', label: 'Chờ Duyệt' },
  { value: 'cv_passed', label: 'CV Đạt' },
  { value: 'cv_rejected', label: 'CV Không Đạt' },
  { value: 'interview_scheduled', label: 'Lịch PV Xác Nhận' },
  { value: 'interviewing', label: 'Đang PV' },
  { value: 'passed', label: 'Đã Nhận' },
  { value: 'rejected', label: 'Từ Chối' },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return <Clock3 className="w-4 h-4 text-orange-500" />;
    case 'cv_passed': return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
    case 'cv_rejected': return <XCircle className="w-4 h-4 text-red-500" />;
    case 'interview_scheduled': return <CalendarCheck2 className="w-4 h-4 text-purple-500" />;
    case 'interviewing': return <Mic2 className="w-4 h-4 text-indigo-500" />;
    case 'passed': return <PartyPopper className="w-4 h-4 text-green-500" />;
    case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
    default: return <Clock3 className="w-4 h-4" />;
  }
};

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
        toast.success('Hồ sơ mới đã được tạo thành công!', { icon: '🎉' });
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

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-8 relative">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/volunteers"
            className="group flex items-center justify-center w-10 h-10 bg-white border border-gray-200 hover:border-[#f08c50] shadow-sm hover:shadow-md rounded-full transition-all"
            title="Quay lại danh sách"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-[#f08c50] transition-colors" />
          </Link>
          <div>
            <h1 className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-[#f08c50] text-[28px] tracking-tight">
              Tạo Hồ Sơ TNV Mới
            </h1>
            <p className="font-menu text-gray-500 text-[14px] mt-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-400" /> Nhập thông tin chi tiết ứng viên để quản lý hệ thống.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-8 sm:p-10 flex flex-col gap-8">
          
          {/* Section 1: Thông tin cá nhân */}
          <div>
            <h2 className="font-heading font-bold text-gray-800 text-[16px] mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#f08c50]">1</span>
              Thông Tin Định Danh
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-50">
              
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="name" className="font-menu font-bold text-gray-700 text-[13px] ml-1">
                  Họ và Tên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </span>
                  <input 
                    id="name" name="name" type="text" placeholder="Vd: Nguyễn Văn A" required 
                    className={`w-full pl-11 pr-4 py-3 bg-white border ${errors.name ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200 hover:border-gray-300'} rounded-xl font-menu text-[14px] text-gray-800 shadow-sm focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/15 transition-all`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-[12px] font-medium ml-1">{errors.name[0]}</p>}
              </div>

              <div className="flex flex-col gap-2 relative">
                <label htmlFor="phone" className="font-menu font-bold text-gray-700 text-[13px] ml-1">
                  Số Điện Thoại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-5 h-5" />
                  </span>
                  <input 
                    id="phone" name="phone" type="tel" placeholder="0912 345 678" required 
                    className={`w-full pl-11 pr-4 py-3 bg-white border ${errors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200 hover:border-gray-300'} rounded-xl font-menu text-[14px] text-gray-800 shadow-sm focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/15 transition-all`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[12px] font-medium ml-1">{errors.phone[0]}</p>}
              </div>

              <div className="flex flex-col gap-2 relative md:col-span-2">
                <label htmlFor="email" className="font-menu font-bold text-gray-700 text-[13px] ml-1">
                  Địa Chỉ Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input 
                    id="email" name="email" type="email" placeholder="email@example.com" required 
                    className={`w-full pl-11 pr-4 py-3 bg-white border ${errors.email ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200 hover:border-gray-300'} rounded-xl font-menu text-[14px] text-gray-800 shadow-sm focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/15 transition-all`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[12px] font-medium ml-1">{errors.email[0]}</p>}
              </div>

            </div>
          </div>

          {/* Section 2: Vị trí & Trạng thái */}
          <div>
            <h2 className="font-heading font-bold text-gray-800 text-[16px] mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">2</span>
              Chuẩn Loại & Trạng Thái
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-[inset_0_2px_10px_rgb(0,0,0,0.02)]">
              
              <div className="flex flex-col gap-2 relative">
                <label className="font-menu font-bold text-gray-700 text-[13px] ml-1">
                  Vị Trí Ứng Tuyển <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Briefcase className="w-5 h-5" />
                  </span>
                  <select
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                    required
                    className={`appearance-none w-full pl-11 pr-10 py-3 bg-white border ${errors.position ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-200 hover:border-gray-300'} rounded-xl font-menu text-[14px] text-gray-800 font-medium shadow-sm focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/15 transition-all cursor-pointer`}
                  >
                    <option value="" disabled>-- Lựa chọn vị trí --</option>
                    {POSITIONS.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.position && <p className="text-red-500 text-[12px] font-medium ml-1">{errors.position[0]}</p>}
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="font-menu font-bold text-gray-700 text-[13px] ml-1">
                  Trạng Thái Ban Đầu
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 z-10 pointer-events-none flex items-center justify-center">
                    {getStatusIcon(status)}
                  </div>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="appearance-none w-full pl-11 pr-10 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl font-menu text-[14px] text-gray-800 font-semibold shadow-sm focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/15 transition-all cursor-pointer"
                  >
                    {STATUSES.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Section 3: Nội dung */}
          <div>
            <h2 className="font-heading font-bold text-gray-800 text-[16px] mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">3</span>
              Ghi Chú & Tài Liệu
            </h2>
            <div className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-menu font-bold text-gray-700 text-[13px] ml-1 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-gray-400" /> Lý Do / Lời Nhắn Từ Ứng Viên
                  </label>
                  <textarea
                    id="message" name="message" rows={4}
                    placeholder="Những yếu tố, kinh nghiệm mà ứng viên muốn đóng góp..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-2xl font-menu text-[14px] text-gray-800 shadow-sm focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/15 transition-all resize-none"
                  ></textarea>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="admin_notes" className="font-menu font-bold text-gray-700 text-[13px] ml-1 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-orange-400" /> Ghi Chú Nội Bộ (Admin)
                  </label>
                  <textarea
                    id="admin_notes" name="admin_notes" rows={4}
                    placeholder="Chỉ Admin thấy: Ứng viên rất hăng hái, đăng ký trực tiếp lúc 14h..."
                    className="w-full px-4 py-3 bg-orange-50/50 border border-orange-200 hover:border-orange-300 rounded-2xl font-menu text-[14px] text-gray-800 shadow-sm focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/15 transition-all resize-none placeholder-orange-300/80"
                  ></textarea>
                </div>
              </div>

              {/* Upload */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="font-menu font-bold text-gray-700 text-[13px] ml-1">
                  Hồ Sơ Năng Lực / CV (Tuỳ Chọn)
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className={`group relative flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
                    fileName 
                      ? 'border-green-400 bg-green-50 shadow-[0_0_20px_rgb(74,222,128,0.1)]' 
                      : 'border-gray-300 bg-gray-50/50 hover:border-[#f08c50] hover:bg-orange-50/30'
                  }`}
                >
                  {fileName ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center -mt-2">
                         <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="font-menu text-gray-800 font-bold text-[15px] px-4 truncate max-w-[300px]">{fileName}</p>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); setFileName(null); if (fileRef.current) fileRef.current.value = ''; }}
                        className="font-menu text-[13px] font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-1.5 rounded-full transition-colors mt-1"
                      >
                        Bỏ Chọn File
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-[#f08c50] transition-colors" />
                      </div>
                      <p className="font-menu text-gray-500 text-[14px] text-center px-4">
                        <span className="font-bold text-[#f08c50] group-hover:text-orange-600 transition-colors">Tải lên file PDF</span>
                        <br />hoặc kéo thả tài liệu vào khu vực này (Tối đa 10MB)
                      </p>
                    </>
                  )}
                  <input
                    ref={fileRef} type="file" name="cv" accept="application/pdf" className="hidden"
                    onChange={e => handleFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 border-t border-gray-100 px-8 py-5 flex items-center justify-end gap-4 rounded-b-3xl">
          <Link
            href="/admin/volunteers"
            className="font-menu text-[14px] text-gray-500 hover:text-gray-800 transition font-bold px-4 py-2"
          >
            Huỷ Bỏ
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative overflow-hidden inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-10 py-3.5 rounded-xl font-menu font-bold tracking-wide transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgb(0,0,0,0.23)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Đang Thiết Lập...
              </>
            ) : (
              <>Lưu Hồ Sơ Khởi Tạo</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
