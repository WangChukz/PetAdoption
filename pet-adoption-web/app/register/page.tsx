"use client";

import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join PetJam today and connect with thousands of pets waiting for a forever home."
      imageSrc="https://plus.unsplash.com/premium_photo-1664302409741-6e3e5bc87b5a?q=80&w=1200&auto=format&fit=crop"
      imageAlt="Person hugging a happy dog"
    >
      <form className="flex flex-col gap-5 w-full max-w-[420px]" onSubmit={(e) => e.preventDefault()}>
        
        {/* Full Name Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="font-heading font-bold text-gray-700 text-[12px] tracking-widest uppercase">
            Full Name
          </label>
          <input 
            type="text" 
            id="fullName" 
            placeholder="John Doe" 
            autoComplete="name"
            required
            className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-md font-menu text-[15px] focus:outline-none focus:border-[#f08c50] focus:ring-1 focus:ring-[#f08c50] transition shadow-sm placeholder:text-gray-400 font-medium" 
          />
        </div>

        {/* Email Input */}
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

        {/* Password Inputs Grid for Desktop / Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-heading font-bold text-gray-700 text-[12px] tracking-widest uppercase">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              autoComplete="new-password"
              required
              className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-md font-menu text-[15px] focus:outline-none focus:border-[#f08c50] focus:ring-1 focus:ring-[#f08c50] transition shadow-sm placeholder:text-gray-400 font-medium tracking-widest" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="font-heading font-bold text-gray-700 text-[12px] tracking-widest uppercase">
              Confirm
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="••••••••" 
              autoComplete="new-password"
              required
              className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-md font-menu text-[15px] focus:outline-none focus:border-[#f08c50] focus:ring-1 focus:ring-[#f08c50] transition shadow-sm placeholder:text-gray-400 font-medium tracking-widest" 
            />
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-start gap-3 mt-2">
          <input 
            type="checkbox" 
            id="terms" 
            required 
            className="mt-1 w-4 h-4 rounded border-gray-300 text-[#f08c50] focus:ring-[#f08c50]"
          />
          <label htmlFor="terms" className="font-menu text-gray-500 text-[13px] leading-relaxed">
            I agree to the <Link href="#" className="font-bold text-[#f08c50] hover:underline">Terms of Service</Link> and <Link href="#" className="font-bold text-[#f08c50] hover:underline">Privacy Policy</Link>.
          </label>
        </div>

        <button 
          type="submit" 
          className="mt-4 font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-8 py-4 rounded-md font-extrabold text-[15px] uppercase tracking-wider transition w-full shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#f08c50]/20"
        >
          Create Account
        </button>

        <p className="mt-6 text-center text-gray-500 font-menu text-[14px] font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0489a9] hover:text-[#f08c50] font-bold transition hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
