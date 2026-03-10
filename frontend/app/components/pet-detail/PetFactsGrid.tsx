import React from 'react';

export default function PetFactsGrid({ pet }: { pet: any }) {
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
            <span className="text-gray-600 flex-1 md:ml-10">{pet?.breed || 'Husky'}</span>
          </div>
          {/* Column 2 items */}
          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic md:border-none md:pb-0">
             <span className="font-bold text-gray-800 w-[80px] not-italic">Weight</span>
             <span className="text-gray-600 flex-1 md:ml-10">{pet?.weight ? `${pet.weight} ${pet.weight_unit || 'lbs'}` : 'N/A'}</span>
          </div>
          
          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic">
            <span className="font-bold text-gray-800 w-[80px] not-italic">Color</span>
            <span className="text-gray-600 flex-1 md:ml-10">{pet?.color || 'N/A'}</span>
          </div>
          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic md:border-none md:pb-0">
             <span className="font-bold text-gray-800 w-[80px] not-italic">Sex</span>
             <span className="text-gray-600 flex-1 md:ml-10 capitalize">{pet?.gender || 'N/A'}</span>
          </div>

          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic">
            <span className="font-bold text-gray-800 w-[80px] not-italic">Age</span>
            <span className="text-gray-600 flex-1 md:ml-10">{pet?.age ? `${pet.age} ${pet.age_unit || 'years'}` : 'N/A'}</span>
          </div>
          <div className="flex flex-row justify-between md:justify-start pb-4 border-b border-gray-100 italic md:border-none md:pb-0">
             <span className="font-bold text-gray-800 w-[80px] not-italic">Pet id</span>
             <span className="text-gray-600 flex-1 md:ml-10">{pet?.id ? `P${String(pet.id).padStart(4, '0')}` : 'P0000'}</span>
          </div>

          <div className="flex flex-row justify-between md:justify-start pb-4 italic lg:col-span-1 border-b border-gray-100 md:border-none md:pb-0">
            <span className="font-bold text-gray-800 w-[80px] not-italic">Size</span>
            <span className="text-gray-600 flex-1 md:ml-10 capitalize">{pet?.size || 'Medium'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
