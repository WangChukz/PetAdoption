"use client";

import Image from 'next/image';
import Link from 'next/link';
import { navLinks } from './header/navLinks';
import { useNavIndicator } from './header/useNavIndicator';

export default function Header() {
  const { navRef, linkRefs, indicatorStyle, activeIndex } = useNavIndicator();

  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer z-50">
        <div className="relative w-14 h-14 flex items-center justify-center">
           <Image 
              src="/logo.png"
              alt="PETJAM Logo"
              fill
              className="object-contain"
           />
        </div>
        <div className="flex flex-col justify-center -mt-1 -ml-1">
          <span className="font-heading font-black text-[26px] tracking-tight leading-none text-[#3E1622] uppercase">
            PET<span className="text-[#0489A9]">JAM</span>
          </span>
          <span className="text-[6.5px] text-gray-400 font-semibold tracking-widest mt-1 uppercase opacity-80">
            Animal Adoption & Rescue
          </span>
        </div>
      </Link>
      
      {/* Desktop Nav */}
      <div
        ref={navRef}
        className="hidden lg:flex items-center gap-8 font-menu font-bold text-[14px] text-gray-600 relative"
      >
        {/* Sliding background pill indicator */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 my-auto h-[32px] bg-[#F07C3D] rounded-lg pointer-events-none"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
            transition: 'left 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94), width 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 200ms ease-out',
          }}
        />

        {navLinks.map((link, idx) => {
          const isActive = idx === activeIndex;
          return (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => { linkRefs.current[idx] = el; }}
              className={`relative z-10 px-3 py-1 rounded-lg transition-colors duration-200 ease-out ${
                isActive
                  ? 'text-white'
                  : 'text-gray-600 hover:text-[#F07C3D]'
              }`}
            >
              {link.label}
            </Link>
          );
        })}

      </div>
      
      {/* Auth buttons */}
      <div className="hidden md:flex items-center gap-2">
        <Link href="/login" className="font-menu font-semibold text-[14px] text-gray-600 hover:text-[#f08c50] transition border-[1.5px] border-[#fbceb1] px-6 py-2 rounded-md bg-white text-center">
          Đăng Nhập
        </Link>
        <Link href="/register" className="font-menu bg-[#f08c50] hover:bg-[#d16830] text-white px-6 py-2 rounded-md font-semibold text-[14px] transition shadow-sm hover:shadow">
          Đăng ký
        </Link>
      </div>

      {/* Mobile menu button */}
      <button className="lg:hidden text-[#f08c50] p-1 -mr-2">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}
