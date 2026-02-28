import Link from 'next/link';
import React from 'react';

export default function VolunteerSupportBanner() {
  return (
    <section className="w-full bg-[#0489a9] relative mt-16">
      {/* Top Orange stripe */}
      <div className="w-full h-[18px] bg-[#f08c50]"></div>

      {/* Content */}
      <div className="max-w-[950px] mx-auto px-6 py-14 md:py-20 text-center text-white">
        <span className="font-menu font-bold text-[13px] uppercase tracking-widest text-white/70 mb-3 block">
          Cùng Chung Tay
        </span>
        <h2 className="font-menu font-black text-[28px] md:text-[38px] leading-tight mb-4">
          Bạn Đã Sẵn Sàng Ủng Hộ?
        </h2>
        <p className="font-menu text-white/80 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed">
          Ngoài thời gian, bạn cũng có thể đóng góp bằng cách quyên góp tài chính hoặc thức ăn cho thú cưng. Mọi đóng góp dù nhỏ đều rất có ý nghĩa!
        </p>
        <Link
          href="/support"
          className="font-menu bg-[#f08c50] hover:bg-[#d16830] transition-all text-white px-10 py-3.5 rounded font-bold text-[16px] shadow-lg hover:shadow-xl inline-block hover:-translate-y-0.5 transform duration-200"
        >
          Ủng Hộ Ngay
        </Link>
      </div>

      {/* Bottom Orange stripe */}
      <div className="w-full h-[18px] bg-[#f08c50]"></div>
    </section>
  );
}
