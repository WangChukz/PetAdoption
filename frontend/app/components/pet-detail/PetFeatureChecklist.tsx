import React from 'react';

const traits = [
  "Good with kids",
  "Shots Current",
  "Spayed/Neutered",
  "Good with Dogs",
  "Housebroken"
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 mr-2 opacity-80 mt-0.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

export default function PetFeatureChecklist() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="w-full max-w-[950px] mx-auto border-b border-dashed border-gray-300 pb-10">
        <h2 className="font-heading font-bold text-[20px] md:text-[22px] text-[#1a1a1a] mb-6">
          My Info
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 font-menu text-[14px]">
           {traits.map((trait, index) => (
             <div key={index} className="flex items-start italic text-gray-600">
               <CheckIcon />
               {trait}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
