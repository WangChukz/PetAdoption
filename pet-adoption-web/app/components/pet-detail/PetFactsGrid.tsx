import React from 'react';

export default function PetFactsGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="border-t border-gray-200 pt-10 pb-10 w-full max-w-[950px] mx-auto border-b border-dashed border-gray-300">
        <h2 className="font-heading font-bold text-[20px] md:text-[22px] text-[#1a1a1a] mb-8">
          Facts about me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 font-menu text-[14px] md:text-[15px]">
          {/* Column 1 items */}
          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic">
            <span className="font-bold text-gray-800 w-[80px] not-italic">Breed</span>
            <span className="text-gray-600 flex-1 md:ml-10">Husky</span>
          </div>
          {/* Column 2 items */}
          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic md:border-none md:pb-0">
             <span className="font-bold text-gray-800 w-[80px] not-italic">Weight</span>
             <span className="text-gray-600 flex-1 md:ml-10">30 lbs (13.6 KG)</span>
          </div>
          
          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic">
            <span className="font-bold text-gray-800 w-[80px] not-italic">Color</span>
            <span className="text-gray-600 flex-1 md:ml-10">Brown with White</span>
          </div>
          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic md:border-none md:pb-0">
             <span className="font-bold text-gray-800 w-[80px] not-italic">Sex</span>
             <span className="text-gray-600 flex-1 md:ml-10">Male</span>
          </div>

          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic">
            <span className="font-bold text-gray-800 w-[80px] not-italic">Age</span>
            <span className="text-gray-600 flex-1 md:ml-10">Adult</span>
          </div>
          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic md:border-none md:pb-0">
             <span className="font-bold text-gray-800 w-[80px] not-italic">Pet id</span>
             <span className="text-gray-600 flex-1 md:ml-10">P0021</span>
          </div>

          <div className="flex flex-row justify-between md:justify-start pb-4 italic lg:col-span-1">
            <span className="font-bold text-gray-800 w-[80px] not-italic">Size</span>
            <span className="text-gray-600 flex-1 md:ml-10">LBS Not Showed (Max LBS: 60-80 LBS)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
