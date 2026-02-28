import React from 'react';

export default function BlogCategoryNav() {
  const categories = [
    { name: 'Pet Adoption', active: false },
    { name: 'Pet care', active: true },
    { name: 'Resources', active: false },
    { name: 'Videos', active: false },
    { name: 'Podcast', active: false }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-10">
      <div className="w-full flex flex-wrap justify-center items-center gap-6 md:gap-14 font-heading font-bold text-[14px] md:text-[16px]">
        {categories.map((cat, idx) => (
          <button 
            key={idx} 
            className={`transition pb-2 px-1 border-b-[3px] 
              ${cat.active 
                ? 'text-[#f08c50] border-[#f08c50]' 
                : 'text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-200'
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}
