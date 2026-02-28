import React from 'react';

const tips = [
  "Lorem ipsum dolor sit amet, consectetur",
  "Lorem ipsum dolor sit amet, consectetur",
  "Lorem ipsum dolor sit amet, consectetur",
  "Lorem ipsum dolor sit amet, consectetur",
  "Lorem ipsum dolor sit amet, consectetur",
  "Lorem ipsum dolor sit amet, consectetur",
  "Lorem ipsum dolor sit amet, consectetur",
  "Lorem ipsum dolor sit amet, consectetur",
  "Lorem ipsum dolor sit amet, consectetur",
  "Lorem ipsum dolor sit amet, consectetur"
];

export default function AdoptionTips() {
  const leftTips = tips.slice(0, 5);
  const rightTips = tips.slice(5, 10);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center w-full">
      <h2 className="font-heading font-bold text-[22px] md:text-[28px] text-[#1a1a1a] mb-12 md:mb-16 tracking-wide">
        Tips for successful pet adoption
      </h2>
      
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8 md:gap-16">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-8 relative">
          <div className="absolute left-[19px] top-5 bottom-5 w-[2px] bg-gray-100 z-0"></div>
          {leftTips.map((tip, idx) => (
            <div key={idx} className="flex items-center gap-5 relative z-10 w-full group cursor-default">
              <div className="w-10 h-10 min-w-[40px] rounded-full bg-[#0489a9] text-white flex items-center justify-center font-heading font-bold shadow-md group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              <p className="font-menu text-gray-600 font-medium text-[14px] md:text-[15px] flex-1 leading-snug">
                {tip}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-8 relative">
          <div className="absolute left-[19px] top-5 bottom-5 w-[2px] bg-gray-100 z-0"></div>
          {rightTips.map((tip, idx) => (
            <div key={idx + 5} className="flex items-center gap-5 relative z-10 w-full group cursor-default">
              <div className="w-10 h-10 min-w-[40px] rounded-full bg-[#0489a9] text-white flex items-center justify-center font-heading font-bold shadow-md group-hover:scale-110 transition-transform">
                {idx + 6}
              </div>
              <p className="font-menu text-gray-600 font-medium text-[14px] md:text-[15px] flex-1 leading-snug">
                {tip}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
