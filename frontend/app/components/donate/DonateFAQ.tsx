"use client";

import { useState } from 'react';

const faqs = [
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes! Hanoi Pet Adoption is a registered non-profit organization. All donations above 500,000 VND are eligible for a tax deduction certificate, which will be emailed to you within 5 business days.',
  },
  {
    q: 'Can I donate supplies instead of money?',
    a: 'Absolutely. We accept food, blankets, toys, and medical supplies. Please contact us via our Support page or email to coordinate a drop-off or delivery. We will provide you with our current priority wishlist.',
  },
  {
    q: 'How do I set up a recurring donation?',
    a: 'Simply select the "Monthly" tab in the donation form above and complete your information. We will automatically process your donation each month on the same date. You can cancel anytime by emailing us.',
  },
];

export default function DonateFAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="w-full bg-gray-50 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
        <div className="text-center mb-10">
          <h2 className="font-heading font-black text-[24px] md:text-[30px] text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="font-menu text-gray-400 text-[14px]">Have more questions? Contact us anytime.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === idx ? -1 : idx)}
                className="w-full flex items-center justify-between px-6 py-4 text-left group"
                aria-expanded={open === idx}
              >
                <span className={`font-heading font-bold text-[15px] transition-colors ${open === idx ? 'text-[#F07C3D]' : 'text-gray-800 group-hover:text-[#F07C3D]'}`}>
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 ml-4 transition-transform duration-300 ${open === idx ? 'rotate-180 text-[#F07C3D]' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="font-menu text-gray-500 text-[14px] leading-relaxed px-6 pb-5">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
