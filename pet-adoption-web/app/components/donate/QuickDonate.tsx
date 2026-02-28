"use client";

import { useState } from 'react';

const presets = [55000, 100000, 300000];

function formatVND(n: number) {
  return n.toLocaleString('vi-VN') + ' VND';
}

export default function QuickDonate() {
  const [selected, setSelected] = useState(100000);
  const [custom, setCustom] = useState('');

  return (
    <section className="w-full bg-orange-50/60 border-y border-orange-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          
          {/* Left */}
          <div className="flex-shrink-0">
            <p className="font-heading font-black text-gray-900 text-[20px] mb-1">Quick Donate</p>
            <p className="font-menu text-gray-400 text-[13px]">Choose an amount to get started</p>
          </div>

          {/* Amounts */}
          <div className="flex flex-wrap gap-3 flex-1 justify-center">
            {presets.map((amt) => (
              <button
                key={amt}
                onClick={() => { setSelected(amt); setCustom(''); }}
                className={`px-5 py-2.5 rounded-xl font-heading font-bold text-[14px] border-2 transition-all duration-150
                  ${selected === amt && !custom
                    ? 'bg-[#F07C3D] border-[#F07C3D] text-white shadow-md'
                    : 'border-gray-200 text-gray-700 hover:border-orange-300 hover:text-[#F07C3D] bg-white'
                  }`}
              >
                {formatVND(amt)}
              </button>
            ))}
            <input
              type="number"
              placeholder="Custom amount"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
              className="border-2 border-gray-200 focus:border-orange-400 rounded-xl px-4 py-2.5 font-menu text-[14px] text-gray-700 outline-none w-36 transition"
            />
          </div>

          {/* CTA */}
          <a
            href="#donation-form"
            className="font-heading bg-[#F07C3D] hover:bg-[#F07C3D] transition-all text-white px-8 py-3 rounded-xl font-bold text-[14px] shadow hover:shadow-md whitespace-nowrap flex-shrink-0"
          >
            Continue to Donate →
          </a>
        </div>
      </div>
    </section>
  );
}
