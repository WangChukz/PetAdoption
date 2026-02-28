import Image from 'next/image';
import React from 'react';

export default function VolunteerHero() {
  return (
    <section className="w-full relative h-[480px] md:h-[580px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1601758003122-53c40e686a19?q=80&w=1600&auto=format&fit=crop"
        alt="Tình nguyện viên với thú cưng"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        {/* Badge */}
        <span className="inline-block bg-[#f08c50] text-white font-menu font-bold text-[12px] px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 shadow">
          Hanoi Pet Adoption
        </span>

        {/* Heading */}
        <h1 className="font-menu font-black text-white text-[36px] md:text-[52px] leading-tight mb-4 max-w-3xl drop-shadow-lg">
          Tình Nguyện Viên
        </h1>

        {/* Subtitle */}
        <p className="font-menu text-white/80 text-[15px] md:text-[17px] max-w-xl mb-8 leading-relaxed">
          Tham gia cùng chúng tôi để mang lại cuộc sống tốt đẹp hơn cho những chú chó mèo đang cần được giúp đỡ.
        </p>

        {/* CTA Button */}
        <a
          href="#volunteer-positions"
          className="font-menu bg-[#f08c50] hover:bg-[#d16830] transition-all text-white px-10 py-3.5 rounded font-bold text-[16px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
        >
          Ứng Tuyển Ngay
        </a>
      </div>
    </section>
  );
}
