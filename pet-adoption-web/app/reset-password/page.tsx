"use client";

import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter the email address associated with your account and we'll send you a link to reset your password."
      imageSrc="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop"
      imageAlt="Dog running towards the camera"
    >
      <form className="flex flex-col gap-6 w-full max-w-[420px]" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-heading font-bold text-gray-700 text-[12px] tracking-widest uppercase">
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            placeholder="john@example.com" 
            autoComplete="email"
            required
            className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-md font-menu text-[15px] focus:outline-none focus:border-[#f08c50] focus:ring-1 focus:ring-[#f08c50] transition shadow-sm placeholder:text-gray-400 font-medium" 
          />
        </div>

        <button 
          type="submit" 
          className="mt-4 font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-8 py-4 rounded-md font-extrabold text-[15px] uppercase tracking-wider transition w-full shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#f08c50]/20"
        >
          Send Reset Link
        </button>

        <div className="flex justify-center items-center gap-2 mt-8 text-center text-gray-500 font-menu text-[14px] font-medium transition group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0489a9] group-hover:text-[#f08c50] transition">
             <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <Link href="/login" className="text-[#0489a9] group-hover:text-[#f08c50] font-bold transition">
            Wait, I remember my password
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
