"use client";

import Image from 'next/image';
import React, { useState } from 'react';

export default function DonationSection() {
  const [activeTab, setActiveTab] = useState<'financial' | 'food'>('financial');

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation Submitted');
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 mt-4 w-full justify-center">
        <button
          onClick={() => setActiveTab('financial')}
          className={`font-heading font-semibold text-[15px] md:text-[16px] px-6 py-3 min-w-[220px] transition-colors
            ${activeTab === 'financial' 
              ? 'bg-[#f08c50] text-white shadow-sm' 
              : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}
        >
          Financial Donation
        </button>
        <button
          onClick={() => setActiveTab('food')}
          className={`font-heading font-semibold text-[15px] md:text-[16px] px-6 py-3 min-w-[220px] transition-colors
            ${activeTab === 'food' 
              ? 'bg-[#f08c50] text-white shadow-sm' 
              : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}
        >
          Animal Food Donation
        </button>
      </div>

      <p className="font-menu text-[14px] text-gray-600 mb-12 italic text-center">
        Your donations are highly appreciated!
      </p>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start justify-center">
        
        {/* Left Visual Area */}
        <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
          {/* Teal box (rotated right) */}
          <div className="absolute inset-0 bg-[#0489a9] transform rotate-[10deg] scale-105 z-0"></div>
          {/* Orange box (rotated left) */}
          <div className="absolute inset-0 bg-[#f08c50] transform -rotate-[5deg] scale-105 z-10"></div>
          {/* Image Container (White Background) */}
          <div className="absolute inset-0 z-20 bg-white rounded-md flex items-center justify-center p-8 shadow-sm">
             <Image 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=800&auto=format&fit=crop" 
                alt="Donation Box Representation" 
                fill 
                className="object-cover rounded w-full h-full opacity-90 p-3"
             />
          </div>
        </div>

        {/* Right Form Area */}
        <div className="flex-1 w-full max-w-sm mt-8 md:mt-10">
          <form className="flex flex-col gap-6" onSubmit={handleDonationSubmit}>
            <div className="flex flex-col gap-1">
              <input 
                type="text" 
                placeholder="Name" 
                required
                className="w-full border border-gray-200 border-opacity-70 rounded px-4 py-3 font-menu text-[14px] text-gray-700 outline-none focus:border-[#0489a9] transition"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <input 
                type="email" 
                placeholder="Email id" 
                required
                className="w-full border border-gray-200 border-opacity-70 rounded px-4 py-3 font-menu text-[14px] text-gray-700 outline-none focus:border-[#0489a9] transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <input 
                type="date" 
                placeholder="Date of birth" 
                required
                className="w-full border border-gray-200 border-opacity-70 rounded px-4 py-3 font-menu text-[14px] text-gray-700 outline-none focus:border-[#0489a9] transition text-gray-400 focus:text-gray-700"
              />
            </div>

            <button 
              type="submit" 
              className="mt-2 w-full md:w-auto self-start font-heading bg-[#f08c50] hover:bg-[#d16830] transition text-white px-8 py-3 rounded text-[15px] font-semibold text-center shadow-sm hover:shadow"
            >
              Confirm Donation
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
