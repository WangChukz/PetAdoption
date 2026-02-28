import Image from 'next/image';
import React from 'react';

export default function BlogTipsHero() {
  return (
    <section className="w-full flex flex-col md:flex-row shadow-sm my-10 max-w-[1600px] mx-auto overflow-hidden">
      
      {/* Left Full Width Image Area */}
      <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-[500px]">
        <Image 
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop" 
          alt="Dog taking bites" 
          fill 
          className="object-cover"
        />
      </div>

      {/* Right Teal Text Area */}
      <div className="w-full md:w-1/2 bg-[#0489a9] p-8 md:p-14 lg:p-20 flex flex-col justify-center text-white">
        <h2 className="font-heading font-black text-[#f08c50] text-[24px] md:text-[32px] mb-6 leading-tight">
          Tips to anti smell your feline
        </h2>
        
        <p className="font-menu text-[14px] md:text-[15px] leading-relaxed text-blue-50/90 font-medium">
          Last test event fixing things on the dogs is like to those them music paying any of them up someone of them is you dog don't agree up or something finding its part to your final snap in your object so that all is then your pet those items are likely to help your friends growing as long check its medication is properly stored is space as small pieces to stop sniffing anything its eat, so put them to.
        </p>

        <button className="font-menu text-white border-b-2 border-white max-w-fit pb-1 mt-6 text-[14px] font-bold hover:text-gray-200 hover:border-gray-200 transition-colors">
           Read More
        </button>
      </div>
      
    </section>
  );
}
