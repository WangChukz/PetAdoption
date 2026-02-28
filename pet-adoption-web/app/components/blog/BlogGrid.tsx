import Image from 'next/image';
import React from 'react';

const mockArticles = [
  { id: 1, title: 'How to potty train your pet', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'How to Stop cat biting', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'Pet playing Training', image: 'https://images.unsplash.com/photo-1537151608804-ea2f1faeb69c?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'Top 10 cat Foods', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400&auto=format&fit=crop' },
  { id: 5, title: 'With Cow Smook fix Tech Cow', image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=400&auto=format&fit=crop' },
  { id: 6, title: 'Train a Dog', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400&auto=format&fit=crop' }
];

export default function BlogGrid() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 pb-20 flex flex-col items-center">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full mb-12">
          {mockArticles.map((article) => (
             <div key={article.id} className="w-full flex flex-col rounded-md overflow-hidden bg-[#000000] shadow cursor-pointer group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
               {/* Image Half */}
               <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
                 <Image 
                   src={article.image} 
                   alt={article.title} 
                   fill 
                   className="object-cover group-hover:scale-105 transition duration-500 ease-out" 
                 />
               </div>
               
               {/* Black Card Half */}
               <div className="flex-1 min-h-[140px] flex items-center justify-center p-6 text-center border-t-2 border-[#f08c50]/20">
                 <h3 className="font-heading font-black text-[#f08c50] text-[18px] md:text-[20px] leading-snug tracking-tight">
                   {article.title}
                 </h3>
               </div>
             </div>
          ))}
       </div>

       {/* View All Button */}
       <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] transition text-white px-10 flex items-center justify-center py-2.5 rounded text-[15px] font-semibold text-center shadow-sm">
         View all
       </button>
    </section>
  );
}
