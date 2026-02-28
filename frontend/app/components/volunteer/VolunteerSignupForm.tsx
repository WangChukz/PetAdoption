"use client";

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const POSITIONS = [
  { value: 'Nhiếp ảnh & quay phim', label: '📷 Nhiếp ảnh & Quay phim' },
  { value: 'Chăm sóc thú cưng', label: '🐾 Chăm sóc thú cưng trực tiếp' },
  { value: 'Nuôi giữ tạm (Foster)', label: '🏠 Nuôi giữ tạm (Foster)' },
  { value: 'Sáng tạo nội dung', label: '✍️ Sáng tạo nội dung & MXH' },
  { value: 'Vệ sinh & chăm sóc cơ sở', label: '🧹 Vệ sinh & Chăm sóc cơ sở' },
  { value: 'Tổ chức sự kiện', label: '🎪 Tổ chức sự kiện' },
  { value: 'Khác', label: '💡 Khác' },
];

export default function VolunteerSignupForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Custom dropdown states
  const [position, setPosition] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Chỉ chấp nhận file PDF.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File không được vượt quá 10MB.');
      return;
    }
    setFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/volunteer-apply', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        toast.success('Đơn ứng tuyển đã được gửi thành công!');
        form.reset();
        setFileName(null);
      } else {
        const errMsg = data.errors
          ? Object.values(data.errors as Record<string, string[]>).flat().join(', ')
          : data.message || 'Gửi đơn thất bại. Vui lòng thử lại.';
        toast.error(errMsg);
      }
    } catch {
      toast.error('Lỗi kết nối. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-8 pb-14 md:pb-24">
      <div className="w-full max-w-[1100px] mx-auto">
        
        {/* Top divider to separate sections cleanly */}
        <div className="border-t border-gray-200 pt-14 md:pt-20"></div>

        <div className="flex flex-col items-center justify-center">
          
          {/* Main Form or Success State Centered */}
          <div className="w-full relative z-30 flex flex-col items-center">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-12 px-6 bg-white w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
                <span className="text-[52px] mb-4">🎉</span>
                <h2 className="font-menu font-black text-[#1a1a1a] text-[24px] mb-3">Đã Nhận Đơn Ứng Tuyển!</h2>
                <p className="font-menu text-gray-500 text-[15px] leading-relaxed max-w-sm">
                  Cảm ơn bạn đã đăng ký! Chúng tôi sẽ xem xét hồ sơ và liên hệ qua email trong vòng <strong>1–3 ngày làm việc</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-menu text-[14px] text-[#f08c50] font-semibold hover:text-[#d16830] transition underline underline-offset-4"
                >
                  Gửi thêm đơn khác
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <div className="flex flex-col gap-5 w-full max-w-[800px]">
                  
                  {/* Header/Title Block Centered */}
                  <div className="mb-4 text-center">
                    <span className="font-menu text-[#f08c50] font-bold text-[12px] uppercase tracking-[0.2em] mb-3 block">
                      Ứng Tuyển Ngay
                    </span>
                    <h2 className="font-menu font-black text-[#1a1a1a] text-[28px] md:text-[36px] mb-4 leading-tight tracking-tight">
                      Đăng Ký Làm Tình Nguyện Viên
                    </h2>
                    <p className="font-menu text-gray-500 text-[15px] mb-2 leading-relaxed max-w-2xl mx-auto">
                      Điền thông tin bên dưới để gia nhập đội ngũ. Chúng tôi sẽ liên hệ lại với bạn trong vòng 1–3 ngày làm việc.
                    </p>
                  </div>

                  {/* Form Block */}
                  <form className="flex flex-col gap-5 w-full text-left bg-[#0489a9] p-8 md:p-12 rounded-3xl md:shadow-xl" onSubmit={handleSubmit}>
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                    <label htmlFor="v-name" className="font-menu font-bold text-white text-[11px] tracking-wide">
                      Họ và Tên <span className="text-[#f08c50]">*</span>
                    </label>
                    <input
                      type="text" id="v-name" name="name" placeholder="Nguyễn Văn A" required
                      className="w-full bg-white/10 border border-white/20 hover:border-white/40 px-3.5 py-2.5 rounded-lg font-menu text-[13px] text-white placeholder-white/60 focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/40 transition-all shadow-sm"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="v-email" className="font-menu font-bold text-white text-[11px] tracking-wide">
                        Email <span className="text-[#f08c50]">*</span>
                      </label>
                      <input
                        type="email" id="v-email" name="email" placeholder="example@email.com" required
                        className="w-full bg-white/10 border border-white/20 hover:border-white/40 px-3.5 py-2.5 rounded-lg font-menu text-[13px] text-white placeholder-white/60 focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/40 transition-all shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="v-phone" className="font-menu font-bold text-white text-[11px] tracking-wide">
                        Số Điện Thoại <span className="text-[#f08c50]">*</span>
                      </label>
                      <input
                        type="tel" id="v-phone" name="phone" placeholder="0912 xxx xxx" required
                        className="w-full bg-white/10 border border-white/20 hover:border-white/40 px-3.5 py-2.5 rounded-lg font-menu text-[13px] text-white placeholder-white/60 focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/40 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Position (Custom Dropdown) */}
                  <div className="flex flex-col gap-1">
                    <label className="font-menu font-bold text-white text-[11px] tracking-wide">
                      Vị Trí Ứng Tuyển <span className="text-[#f08c50]">*</span>
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <input type="hidden" name="position" value={position} required />
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full bg-white/10 px-3.5 py-2.5 rounded-lg font-menu text-[13px] focus:outline-none focus:ring-4 focus:ring-[#f08c50]/40 transition-all shadow-sm flex items-center justify-between border
                          ${isDropdownOpen ? 'border-[#f08c50]' : 'border-white/20 hover:border-white/40'}
                          ${position ? 'text-white' : 'text-white/60'}`}
                      >
                        <span className="truncate">
                          {position ? POSITIONS.find(p => p.value === position)?.label : '-- Chọn vị trí --'}
                        </span>
                        <svg className={`w-3.5 h-3.5 text-white/60 transition-transform duration-200 ${isDropdownOpen ? '-rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                          {POSITIONS.map(p => (
                            <button
                              type="button"
                              key={p.value}
                              onClick={() => {
                                setPosition(p.value);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 font-menu text-[13px] transition flex items-center gap-2 
                                ${position === p.value ? 'bg-orange-50/70 text-[#d16830] font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-[#f08c50] font-medium'}`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="v-message" className="font-menu font-bold text-white text-[11px] tracking-wide">
                      Lý Do Bạn Muốn Tham Gia
                    </label>
                    <textarea
                      id="v-message" name="message" rows={2}
                      placeholder="Tôi yêu động vật và muốn đóng góp..."
                      className="w-full bg-white/10 border border-white/20 hover:border-white/40 px-3.5 py-2.5 rounded-lg font-menu text-[13px] text-white placeholder-white/60 focus:outline-none focus:border-[#f08c50] focus:ring-4 focus:ring-[#f08c50]/40 transition-all resize-none shadow-sm"
                    ></textarea>
                  </div>

                  {/* CV Upload */}
                  <div className="flex flex-col gap-1">
                    <label className="font-menu font-bold text-white text-[11px] tracking-wide">
                      CV (PDF, max 10MB)
                    </label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => {
                        e.preventDefault();
                        setDragOver(false);
                        handleFile(e.dataTransfer.files[0] ?? null);
                        if (fileRef.current && e.dataTransfer.files[0]) {
                          const dt = new DataTransfer();
                          dt.items.add(e.dataTransfer.files[0]);
                          fileRef.current.files = dt.files;
                        }
                      }}
                      className={`relative flex flex-col items-center justify-center gap-1 w-full border border-dashed rounded-lg px-3 py-4 cursor-pointer transition-all
                        ${dragOver
                          ? 'border-[#f08c50] bg-white/20'
                          : fileName
                            ? 'border-green-400 bg-white/10'
                            : 'border-white/40 bg-white/5 hover:border-white/80 hover:bg-white/10 shadow-sm'
                        }`}
                    >
                      {fileName ? (
                        <>
                          <svg className="w-5 h-5 text-green-400 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="font-menu text-green-300 font-semibold text-[12px] text-center truncate max-w-[200px]">{fileName}</p>
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); setFileName(null); if (fileRef.current) fileRef.current.value = ''; }}
                            className="font-menu text-[10px] text-white/50 hover:text-red-400 transition underline mt-0.5"
                          >
                            Xoá file
                          </button>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-white/60 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <p className="font-menu text-white/80 text-[12px] text-center">
                            <span className="font-semibold text-[#f08c50]">Nhấn chọn file</span> hoặc kéo thả
                          </p>
                        </>
                      )}
                      <input ref={fileRef} type="file" name="cv" accept="application/pdf" className="hidden" onChange={e => handleFile(e.target.files?.[0] ?? null)} />
                    </div>
                  </div>

                  {/* Submit Area */}
                  <div className="mt-1 text-center">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full font-menu bg-[#f08c50] hover:bg-[#d16830] active:scale-[0.99] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg font-black text-[13px] uppercase tracking-wide transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Đang gửi...
                        </>
                      ) : 'Gửi Đơn Ứng Tuyển'}
                    </button>
                    <p className="font-menu text-white/60 text-[10px] mt-2">
                      Thông tin của bạn được bảo mật tuyệt đối.
                    </p>
                  </div>

                </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
