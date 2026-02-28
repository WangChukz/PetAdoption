import Image from 'next/image';
import React from 'react';

export default function BlogHeroFeatured() {
  return (
    <section className="w-full relative h-[350px] md:h-[450px] lg:h-[550px] max-w-[1600px] mx-auto overflow-hidden">
      {/* Background Image */}
      <Image 
        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1600&auto=format&fit=crop" 
        alt="Featured Pets" 
        fill 
        className="object-cover object-top"
        priority
      />
      
      {/* Dark Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      {/* Featured Content Box */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 lg:left-24 bg-[#1a1a1a]/90 backdrop-blur-sm px-6 py-6 md:px-10 md:py-8 max-w-[320px] md:max-w-[450px] rounded-md border-l-4 border-[#f08c50]">
        <h2 className="font-heading font-black text-[#f08c50] text-[20px] md:text-[26px] leading-tight mb-3">
          Basic to brilliant tips: Training your pet tricks
        </h2>
        <p className="font-menu text-gray-300 text-[13px] md:text-[14px] leading-relaxed line-clamp-3">
          The best aspect of teaching tricks to an older dog is that if a specific technique doesn't work, you can always try something simply different to make learning fun and engaging.
        </p>
      </div>
    </section>
  );
}
