"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AuthLayout from '../components/AuthLayout';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Đăng nhập thành công!');
        router.push('/admin');
        router.refresh();
      } else {
        toast.error(data.error || 'Đăng nhập thất bại');
        setIsLoading(false);
      }
    } catch (error: any) {
       toast.error('Lỗi kết nối đến máy chủ');
       setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Chào mừng trở lại"
      subtitle="Vui lòng nhập thông tin để đăng nhập vào tài khoản PetJam."
      imageSrc="https://thuythithi.com/wp-content/uploads/2021/09/nuoi-cho-mang-lai-loi-ich-gi-3.jpeg"
      imageAlt="A person with a pet dog"
    >
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-heading font-extrabold text-white text-[12px] tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Địa chỉ Email
          </label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="admin@petadoption.local" 
            autoComplete="email"
            required
            className="w-full bg-white/90 border border-white px-3.5 py-2.5 rounded-lg font-menu text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f08c50]/40 focus:bg-white transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.05),inset_0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white placeholder:text-gray-500 font-bold text-gray-900" 
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="font-heading font-extrabold text-white text-[12px] tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Mật khẩu
            </label>
            <Link href="/reset-password" className="text-[#f08c50] hover:text-white text-[13px] font-extrabold transition font-menu drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
              Quên mật khẩu?
            </Link>
          </div>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="••••••••" 
            autoComplete="current-password"
            required
            className="w-full bg-white/90 border border-white px-3.5 py-2.5 rounded-lg font-menu text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f08c50]/40 focus:bg-white transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.05),inset_0_1px_3px_rgba(0,0,0,0.03)] hover:bg-white placeholder:text-gray-500 font-bold text-gray-900 tracking-widest" 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="mt-2 font-heading bg-[#f08c50] hover:bg-[#e07b40] active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold text-[14px] uppercase tracking-wider transition-all duration-200 w-full shadow-[0_4px_14px_0_rgba(240,140,80,0.39)] hover:shadow-[0_6px_20px_rgba(240,140,80,0.23)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f08c50]"
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <p className="mt-6 text-center text-white/90 font-menu text-[13px] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          Bạn chưa có tài khoản?{' '}
          <Link href="/register" className="text-[#f08c50] hover:text-white font-extrabold transition hover:underline">
            Tạo tài khoản
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
