export default function FeaturedLogos() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center border-t border-gray-100">
      <h3 className="font-heading font-black text-[#1a1a1a] text-[20px] md:text-[24px] mb-8 md:mb-12">
        As featured in
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-60 transition duration-300">
         {/* Simulated Partner Logos imitating the design */}
         <div className="font-heading font-black text-[28px] tracking-tighter text-[#0489a9]">ASPCA</div>
         <div className="font-heading font-extrabold text-[28px] tracking-tight text-gray-800">pet<span className="font-light">finder</span></div>
         <div className="font-heading font-black text-[28px] tracking-tighter flex items-center gap-1">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="#f08c50"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
           <span className="text-gray-500">Adopt a Pet</span>
         </div>
         <div className="font-menu font-bold tracking-widest text-[24px] text-gray-400">SMARTPET</div>
      </div>
    </section>
  );
}
