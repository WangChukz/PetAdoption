import Image from 'next/image';
import React from 'react';

export default function PetProfileHero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <div className="w-full max-w-[950px] mx-auto">
        <div className="font-menu text-gray-500 font-bold text-[14px] flex items-center gap-1 mb-8 uppercase tracking-wider">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#f08c50]">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span className="text-[#f08c50] ml-1">Back to Pets</span>
        </div>

        <h1 className="font-heading font-black text-[32px] md:text-[40px] text-[#1a1a1a] mb-12">
          My name is Emily
        </h1>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20 items-center md:items-start justify-between pt-4">
          
          {/* Left Visual Area */}
          <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
            {/* Teal box (rotated right) */}
            <div className="absolute inset-0 bg-[#0489a9] transform rotate-[10deg] scale-105 z-0"></div>
            {/* Orange box (rotated left) */}
            <div className="absolute inset-0 bg-[#f08c50] transform -rotate-[5deg] scale-105 z-10"></div>
            {/* Image */}
            <div className="absolute inset-0 z-20 overflow-hidden bg-white">
              <Image 
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=600&auto=format&fit=crop" 
                alt="Emily the Husky" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Info Area */}
          <div className="mt-6 md:mt-0 w-full md:w-[400px] lg:w-[450px] flex flex-col justify-start">
            <h3 className="font-heading font-bold text-[18px] text-[#1a1a1a] mb-2">
              I'm being cared for by:
            </h3>
            <p className="font-menu text-[15px] text-gray-600 mb-8 border-b border-gray-100 pb-8">
              PetJam - Chennai, India
            </p>

            <h3 className="font-heading font-bold text-[18px] text-[#1a1a1a] mb-4">
              Adoption Process:
            </h3>
            <ul className="font-menu text-[14px] text-gray-500 flex flex-col gap-2 mb-8 leading-relaxed list-none">
              <li>1. Submit application</li>
              <li>2. Interview</li>
              <li>3. Meet the pet etc.</li>
              <li>4. Pay Fee</li>
              <li>5. Sign adoption contract</li>
            </ul>

            <div className="bg-white border border-gray-200 rounded px-6 py-4 flex flex-col shadow-sm max-w-[320px]">
               <p className="font-menu text-gray-600 text-[15px] font-medium mb-4 flex items-center justify-between">
                 Adoption Fee: <strong className="text-[18px] text-gray-800 ml-2 font-black">$250</strong>
               </p>
               <button className="w-full font-heading bg-[#f08c50] hover:bg-[#d16830] transition text-white py-3 rounded text-[15px] font-semibold text-center hover:shadow">
                 Apply for adoption
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
