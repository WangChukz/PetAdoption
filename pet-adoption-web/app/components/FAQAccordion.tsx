"use client";

import { useState } from 'react';

const faqs = [
  {
    question: "What are the requirements for adopting a pet?",
    answer: "You must be at least 18 years old, provide a valid photo ID, and have proof of your current address. We also ask that all household members meet the pet before finalizing adoption."
  },
  {
    question: "How can I adopt a pet I see on the site?",
    answer: "You can start the process by filling out the online application available on each pet's profile. Once reviewed, our team will contact you to schedule a meet-and-greet."
  },
  {
    question: "How long does the adoption process take?",
    answer: "The process typically takes 24 to 72 hours. This includes submitting your application, our staff review, reference checks, and the final interview."
  },
  {
    question: "Will I be able to take my pet home immediately?",
    answer: "Usually yes, if your application is approved and we have completed all necessary checks. In some cases, such as pets needing specific medical clearance, there might be a short delay."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Keep first one open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="border-b border-gray-200 pb-4 overflow-hidden"
          >
            <button 
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between text-left focus:outline-none py-2 gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Custom list style icon mimicking the design */}
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#f08c50]/20 flex items-center justify-center">
                   <div className="w-4 h-4 md:w-5 md:h-5 bg-[#f08c50] shadow-sm flex items-center justify-center rounded-full">
                     <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                   </div>
                </div>
                <h4 className={`font-menu font-bold text-[15px] md:text-[17px] transition-colors duration-200 ${isOpen ? 'text-[#f08c50]' : 'text-gray-700'}`}>
                  {faq.question}
                </h4>
              </div>
              <div className={`transform transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180 text-[#f08c50]' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out font-menu text-gray-500 text-[14px] md:text-[15px] leading-relaxed pl-[3rem] md:pl-[3.5rem] ${isOpen ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
