"use client";

import React from 'react';export default function NewsletterSubscription() {
  return (
    <section className="w-full bg-[#0489a9] py-10 md:py-16 flex justify-center mt-12 relative">
      <div className="bg-[#0a0a0a] px-6 py-8 md:px-12 md:py-10 max-w-4xl w-[90%] md:w-full flex flex-col md:flex-row items-center md:items-start justify-between absolute -top-16 z-20 shadow-2xl">
        <div className="flex flex-col mb-6 md:mb-0 md:mr-6 w-full md:w-1/2">
          <h3 className="font-heading font-extrabold tracking-tight text-white text-[20px] md:text-[24px] mb-1 text-center md:text-left">
            Stay Upto date with our mails
          </h3>
          <p className="font-menu text-gray-400 text-[13px] md:text-[14px] text-center md:text-left">
            Subscribe to our mails list
          </p>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end mt-2 md:mt-0">
           <form className="flex w-full h-[45px]" onSubmit={(e) => e.preventDefault()}>
             <input 
               type="email" 
               placeholder="Enter your email address" 
               className="flex-1 bg-white px-4 h-full outline-none text-[#1a1a1a] font-menu text-sm min-w-0" 
             />
             <button 
               type="submit" 
               className="bg-[#f08c50] hover:bg-[#d16830] transition text-white px-6 md:px-8 h-full font-heading font-semibold text-sm tracking-wide"
             >
               Subscribe
             </button>
           </form>
        </div>
      </div>
      {/* We add a spacer to prevent the footer from overlapping the deeply floated absolute block */}
      <div className="h-16"></div>
    </section>
  );
}
