"use client";

import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Tạo tài khoản"
      subtitle="Tham gia PetJam ngay hôm nay và kết nối với hàng ngàn thú cưng đang tìm mái ấm."
      imageSrc="https://thuythithi.com/wp-content/uploads/2021/09/nuoi-cho-mang-lai-loi-ich-gi-3.jpeg"
      imageAlt="A person with a pet dog"
    >
      <form className="flex flex-col gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
        
        {/* Full Name Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="font-heading font-extrabold text-white text-[12px] tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Họ và tên
          </label>
          <input 
            type="text" 
            id="fullName" 
            placeholder="Nguyễn Văn A" 
            autoComplete="name"
            required
            className="w-full bg-white/90 border border-white px-3.5 py-2.5 rounded-lg font-menu text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f08c50]/40 focus:bg-white transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.05),inset_0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white placeholder:text-gray-500 font-bold text-gray-900" 
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-heading font-extrabold text-white text-[12px] tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Địa chỉ Email
          </label>
          <input 
            type="email" 
            id="email" 
            placeholder="nguyenvana@example.com" 
            autoComplete="email"
            required
            className="w-full bg-white/90 border border-white px-3.5 py-2.5 rounded-lg font-menu text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f08c50]/40 focus:bg-white transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.05),inset_0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white placeholder:text-gray-500 font-bold text-gray-900" 
          />
        </div>

        {/* Password Inputs Grid for Desktop / Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-heading font-extrabold text-white text-[12px] tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Mật khẩu
            </label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              autoComplete="new-password"
              required
              className="w-full bg-white/90 border border-white px-3.5 py-2.5 rounded-lg font-menu text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f08c50]/40 focus:bg-white transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.05),inset_0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white placeholder:text-gray-500 font-bold text-gray-900 tracking-widest" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="font-heading font-extrabold text-white text-[12px] tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Xác nhận mật khẩu
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="••••••••" 
              autoComplete="new-password"
              required
              className="w-full bg-white/90 border border-white px-3.5 py-2.5 rounded-lg font-menu text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f08c50]/40 focus:bg-white transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.05),inset_0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white placeholder:text-gray-500 font-bold text-gray-900 tracking-widest" 
            />
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-start gap-3 mt-2">
          <input 
            type="checkbox" 
            id="terms" 
            required 
            className="mt-1 w-4 h-4 rounded border-gray-300 text-[#f08c50] shadow-sm focus:ring-[#f08c50]"
          />
          <label htmlFor="terms" className="font-menu text-white/90 font-bold text-[13px] leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
            Tôi đồng ý với <Link href="#" className="font-extrabold text-[#f08c50] hover:text-white hover:underline">Điều khoản dịch vụ</Link> và <Link href="#" className="font-extrabold text-[#f08c50] hover:text-white hover:underline">Chính sách bảo mật</Link>.
          </label>
        </div>

        <button 
          type="submit" 
          className="mt-2 font-heading bg-[#f08c50] hover:bg-[#e07b40] active:scale-[0.98] text-white px-8 py-3 rounded-lg font-bold text-[14px] uppercase tracking-wider transition-all duration-200 w-full shadow-[0_4px_14px_0_rgba(240,140,80,0.39)] hover:shadow-[0_6px_20px_rgba(240,140,80,0.23)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f08c50]"
        >
          Đăng ký
        </button>

        <p className="mt-4 text-center text-white/90 font-menu text-[13px] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          Bạn đã có tài khoản?{' '}
          <Link href="/login" className="text-[#f08c50] hover:text-white font-extrabold transition hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
