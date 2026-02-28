import React from 'react';

export default function PetAdoptionBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 mb-20 md:mb-12">
      <div className="w-full max-w-[950px] mx-auto bg-[#0489a9] relative">
        {/* Top Orange Border */}
        <div className="w-full h-[15px] md:h-[20px] bg-[#f08c50]"></div>
        
        {/* Banner Content */}
        <div className="px-6 py-12 md:px-16 md:py-16">
          <h2 className="font-heading font-bold text-white text-[22px] md:text-[26px] mb-8">
            PetJam (Chennai,India)
          </h2>
          
          <div className="bg-white rounded-md p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-md">
            <div className="flex-1 md:max-w-lg">
              <h3 className="font-heading font-bold text-[#1a1a1a] text-[18px] md:text-[20px] mb-3">
                About Private adoptions
              </h3>
              <p className="font-menu text-[14px] text-[#f08c50] mb-4">
                Adoption Fee: $250
              </p>
              <p className="font-menu text-[13px] md:text-[14px] text-gray-500 leading-relaxed italic">
                The pet is available for adoption by a private owner. All outside files will be sent to the adopter and up to email help/tag fees when applicable.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end w-full md:w-auto">
              <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] transition text-white px-8 py-3 rounded-md font-semibold text-[15px] shadow-sm mb-3 w-full md:w-[220px]">
                Apply to adopt
              </button>
              <a href="#" className="font-menu text-[13px] text-gray-400 hover:text-gray-600 underline">
                Learn more about Private adoption procedures &#8594;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
