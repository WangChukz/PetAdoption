import Image from 'next/image';
import React from 'react';

const recentPosts = [
  {
    id: 1,
    title: 'How to keep your pets cold in summer?',
    excerpt: 'The last few weeks have seen high temps and your beloved pooch needs special care. It’s hard to tell how a dog is doing on a hot day.',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Parrot breeding Season.',
    excerpt: 'The last few weeks have seen high temps and your beloved parrot needs special care. It’s hard to tell how a parrot is doing on a hot day.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400&auto=format&fit=crop'
  }
];

export default function BlogRecentPosts() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
      
      <h2 className="font-heading font-black text-[#1a1a1a] text-[24px] md:text-[28px] mb-10 text-center">
        Recent Post
      </h2>

      {/* Horizontal Post Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
         {recentPosts.map((post) => (
           <div key={post.id} className="w-full flex flex-col sm:flex-row rounded-md overflow-hidden bg-[#000000] shadow cursor-pointer group hover:shadow-lg transition-all duration-300">
             {/* Left Image */}
             <div className="relative w-full sm:w-[40%] h-[200px] sm:h-auto">
               <Image 
                 src={post.image} 
                 alt={post.title} 
                 fill 
                 className="object-cover group-hover:scale-105 transition duration-500 ease-out" 
               />
             </div>
             
             {/* Right Content */}
             <div className="flex-1 p-6 md:p-8 flex flex-col justify-center border-l-2 border-[#f08c50]/20">
               <h3 className="font-heading font-bold text-white text-[17px] md:text-[19px] mb-3 leading-snug">
                 {post.title}
               </h3>
               <p className="font-menu text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-6 line-clamp-4">
                 {post.excerpt}
               </p>
               <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] transition text-white px-6 py-2 rounded text-[14px] font-semibold text-center max-w-fit shadow-sm">
                 Read More
               </button>
             </div>
           </div>
         ))}
      </div>

      {/* Pagination slider dots */}
      <div className="flex items-center gap-3 mt-10">
         <button className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]"></button>
         <button className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></button>
         <button className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></button>
      </div>

    </section>
  );
}
