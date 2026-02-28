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
      title="Welcome back"
      subtitle="Please enter your details to sign in to your PetJam account."
      imageSrc="https://plus.unsplash.com/premium_photo-1677561434313-05b18aa124cf?q=80&w=1200&auto=format&fit=crop"
      imageAlt="Dog resting peacefully"
    >
      <form className="flex flex-col gap-6" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-heading font-bold text-gray-700 text-[12px] tracking-widest uppercase">
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="admin@petadoption.local" 
            autoComplete="email"
            required
            className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-md font-menu text-[15px] focus:outline-none focus:border-[#f08c50] focus:ring-1 focus:ring-[#f08c50] transition shadow-sm placeholder:text-gray-400 font-medium" 
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="font-heading font-bold text-gray-700 text-[12px] tracking-widest uppercase">
              Password
            </label>
            <Link href="/reset-password" className="text-[#0489a9] hover:text-[#f08c50] text-[13px] font-bold transition font-menu">
              Forgot password?
            </Link>
          </div>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="••••••••" 
            autoComplete="current-password"
            required
            className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-md font-menu text-[15px] focus:outline-none focus:border-[#f08c50] focus:ring-1 focus:ring-[#f08c50] transition shadow-sm placeholder:text-gray-400 font-medium tracking-widest" 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="mt-4 font-heading bg-[#f08c50] hover:bg-[#d16830] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-md font-extrabold text-[15px] uppercase tracking-wider transition w-full shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#f08c50]/20"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="mt-8 text-center text-gray-500 font-menu text-[14px] font-medium">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#0489a9] hover:text-[#f08c50] font-bold transition hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
