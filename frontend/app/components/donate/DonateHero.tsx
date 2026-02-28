"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function DonateHero() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-orange-50 text-[#F07C3D] font-semibold text-xs px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
              Hanoi Pet Adoption
            </span>
            <h1 className="font-heading font-black text-[36px] md:text-[52px] leading-tight text-gray-900 mb-5">
              Every Paw{' '}
              <span className="text-[#F07C3D]">Deserves</span>{' '}
              <br className="hidden md:block" />a Loving Home
            </h1>
            <p className="font-menu text-gray-500 text-[15px] md:text-[16px] leading-relaxed max-w-md mx-auto md:mx-0 mb-8">
              Your donation provides medical care, shelter, and a second chance to abandoned pets. Join our mission to give them the loving homes they deserve.
            </p>
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 justify-center md:justify-start">
              <a
                href="#donation-form"
                className="font-heading bg-[#F07C3D] hover:bg-[#F07C3D] transition-all text-white px-8 py-3.5 rounded-xl font-bold text-[15px] shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200 w-full sm:w-auto text-center"
              >
                Donate Now
              </a>
              <button className="font-heading border-2 border-gray-200 hover:border-orange-300 transition text-gray-700 px-8 py-3.5 rounded-xl font-bold text-[15px] flex items-center gap-2.5 hover:text-[#F07C3D] w-full sm:w-auto justify-center">
                <span className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-[#F07C3D] flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </span>
                Watch Our Story
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-[480px] lg:w-[520px] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-xl">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=900&auto=format&fit=crop"
                alt="Rescued pet"
                fill
                className="object-cover"
                priority
              />
              {/* Bottom gradient with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-heading font-bold text-[15px]">Rescued: Bella</p>
                <p className="font-menu text-white/70 text-[12px]">Waiting for her forever home</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Mobile sticky donate bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 shadow-2xl px-5 py-3 transition-transform duration-300 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <a
          href="#donation-form"
          className="block w-full bg-[#F07C3D] hover:bg-[#F07C3D] text-white text-center font-heading font-bold py-3.5 rounded-xl text-[15px] shadow-md transition"
        >
          🐾 Donate from 55,000 VND
        </a>
      </div>
    </>
  );
}
