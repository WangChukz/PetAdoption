import React from 'react';

const breakdown = [
  { label: 'Medical Care', pct: 47, color: 'bg-[#F07C3D]', icon: '🏥' },
  { label: 'Food & Nutrition', pct: 21, color: 'bg-teal-500', icon: '🥣' },
  { label: 'Shelter Maintenance', pct: 32, color: 'bg-amber-400', icon: '🏠' },
];

export default function MoneyBreakdown() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading font-black text-[24px] md:text-[30px] text-gray-900 mb-2">Where Your Money Goes</h2>
          <p className="font-menu text-gray-400 text-[14px]">We are committed to full transparency of every donation received.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left: breakdown list */}
          <div className="flex-1 w-full space-y-6">
            {breakdown.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-heading font-bold text-gray-800 text-[15px]">{item.label}</span>
                  </div>
                  <span className="font-heading font-black text-[15px] text-gray-500">{item.pct}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <p className="font-menu text-gray-400 text-[12px] italic pt-2">
              *Based on Q4 2024 financial reports. Updated quarterly.
            </p>
          </div>

          {/* Right: CSS ring chart */}
          <div className="flex-shrink-0 flex flex-col items-center gap-5">
            {/* Simple CSS conic-gradient ring */}
            <div
              className="w-44 h-44 rounded-full shadow-inner"
              style={{
                background: `conic-gradient(
                  #F97316 0% 47%,
                  #14b8a6 47% 68%,
                  #fbbf24 68% 100%
                )`,
              }}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center bg-white m-0" style={{ margin: '12px', width: 'calc(100% - 24px)', height: 'calc(100% - 24px)' }}>
                <div className="w-[77%] h-[77%] rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
                  <span className="font-heading font-black text-[28px] text-gray-900 leading-none">100%</span>
                  <span className="font-menu text-gray-400 text-[11px] mt-0.5">Allocated</span>
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="flex flex-col gap-2">
              {breakdown.map((item) => (
                <div key={item.label} className="flex items-center gap-2 font-menu text-[13px] text-gray-600">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${item.color}`}></div>
                  {item.label} <span className="text-gray-400 ml-auto pl-4">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
