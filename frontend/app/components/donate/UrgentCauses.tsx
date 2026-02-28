import Image from 'next/image';
import React from 'react';

const causes = [
  {
    id: 1,
    badge: 'Medical Emergency',
    badgeColor: 'bg-red-500',
    title: 'Surgery for Luna',
    description: 'Luna was found with a broken leg. She needs urgent surgery to walk again and find her forever home.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500&auto=format&fit=crop',
    raised: 2500000,
    goal: 8000000,
    cta: 'Donate to this Cause',
  },
  {
    id: 2,
    badge: 'Daily Care',
    badgeColor: 'bg-orange-400',
    title: 'Winter Food Supply',
    description: 'Help us stock up food and blankets for 120+ shelter animals before the cold season hits hard.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=500&auto=format&fit=crop',
    raised: 4800000,
    goal: 10000000,
    cta: 'Donate to this Cause',
  },
  {
    id: 3,
    badge: 'Sponsor',
    badgeColor: 'bg-teal-500',
    title: 'Sponsor Max',
    description: 'Max has been with us for 2 years. Become his sponsor and support his monthly medical and food care.',
    image: 'https://images.unsplash.com/photo-1537151608804-ea2f1faeb69c?q=80&w=500&auto=format&fit=crop',
    raised: 1200000,
    goal: 5000000,
    cta: 'Donate to this Cause',
  },
];

function formatVND(n: number) {
  return (n / 1000).toFixed(0) + 'k VND';
}

export default function UrgentCauses() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-heading font-black text-[24px] md:text-[30px] text-gray-900">Urgent Causes</h2>
            <p className="font-menu text-gray-400 text-[14px] mt-1">Help the pets who need it most, right now.</p>
          </div>
          <a href="#" className="font-menu text-[#F07C3D] hover:text-[#F07C3D] text-[14px] font-semibold flex items-center gap-1 transition">
            View All Campaigns <span>→</span>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {causes.map((cause) => {
            const pct = Math.round((cause.raised / cause.goal) * 100);
            return (
              <div
                key={cause.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image src={cause.image} alt={cause.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                  <span className={`absolute top-3 left-3 ${cause.badgeColor} text-white text-[11px] font-heading font-bold px-2.5 py-1 rounded-full`}>
                    {cause.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-gray-900 text-[17px] mb-2">{cause.title}</h3>
                  <p className="font-menu text-gray-500 text-[13px] leading-relaxed mb-4 line-clamp-2 flex-1">{cause.description}</p>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F07C3D] rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-2 font-menu text-[12px] text-gray-400">
                      <span>Raised: <strong className="text-gray-700">{formatVND(cause.raised)}</strong></span>
                      <span>Goal: <strong className="text-gray-700">{formatVND(cause.goal)}</strong></span>
                    </div>
                  </div>

                  <a
                    href="#donation-form"
                    className="w-full text-center bg-orange-50 hover:bg-[#F07C3D] border-2 border-orange-200 hover:border-[#F07C3D] text-[#F07C3D] hover:text-white font-heading font-bold text-[13px] py-2.5 rounded-xl transition-all duration-200"
                  >
                    {cause.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
