import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-body overflow-x-hidden">
      {/* Global Application Header */}
      <Header />

      {/* Main Content - Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-12 pb-10 grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
        
        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start pt-4 md:pt-12 pl-2 md:pl-8 lg:pl-16 lg:-mt-26 lg:-translate-y-16 text-center md:text-left z-10 relative">
          <h1 className="font-heading font-black text-[2rem] md:text-[2rem] lg:text-[3rem] text-gray-800 leading-tight mb-0 md:mb-1 tracking-tight">
            Looking for a
          </h1>
          <h1 className="font-heading font-black text-[2rem] md:text-[3rem] lg:text-[4.5rem] text-[#f08c50] leading-tight mb-3 tracking-tight">
            Best friend ?
          </h1>
          <p className="text-gray-500 text-[13px] md:text-[14px] lg:text-[15px] max-w-[240px] md:max-w-xs lg:max-w-sm mb-6 leading-relaxed font-semibold">
            Our best beauties are waiting for a home
          </p>
          
          <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-8 md:px-8 py-2 md:py-2 rounded-md font-semibold text-[18px] md:text-xl transition shadow-sm hover:shadow mb-10 w-[180px] md:w-auto">
            Adopt a pet
          </button>

          {/* Stats */}
          <div className="flex gap-2 md:gap-4 lg:gap-8 justify-center md:justify-start items-center w-full max-w-lg pb-4">
            <div className="flex flex-col items-center text-center min-w-[70px] md:min-w-[80px]">
              <p className="font-heading text-gray-800 font-extrabold text-[19px] md:text-[22px] lg:text-2xl mb-1">Pets</p>
              <p className="font-heading font-normal md:font-bold text-[19px] md:text-[22px] lg:text-[28px] text-[#f08c50]">2,300<span className="text-[19px] md:text-[22px] lg:text-[28px] text-[#0489a9]">+</span></p>
            </div>
            <div className="w-px h-10 md:h-12 bg-gray-300"></div> 
            <div className="flex flex-col items-center text-center min-w-[90px] md:min-w-[100px]">
              <p className="font-heading text-gray-800 font-extrabold text-[19px] md:text-[22px] lg:text-2xl mb-1">Adopted pets</p>
              <p className="font-heading font-normal md:font-bold text-[19px] md:text-[22px] lg:text-[28px] text-[#f08c50]">3452<span className="text-[19px] md:text-[22px] lg:text-[28px] text-[#0489a9]">+</span></p>
            </div>
            <div className="w-px h-10 md:h-12 bg-gray-300"></div>
            <div className="flex flex-col items-center text-center min-w-[70px] md:min-w-[80px]">
              <p className="font-heading text-gray-800 font-extrabold text-[19px] md:text-[22px] lg:text-2xl mb-1">Clients</p>
              <p className="font-heading font-normal md:font-bold text-[19px] md:text-[22px] lg:text-[28px] text-[#f08c50]">1980<span className="text-[19px] md:text-[22px] lg:text-[28px] text-[#0489a9]">+</span></p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[650px] flex items-center justify-center -mt-2 md:-mt-4 lg:-mt-10 -translate-x-6 md:-translate-x-4 lg:-translate-x-10">
          {/* Organic blob background tuned specifically to the Case Study image */}
          <div className="absolute w-[80%] h-[80%] md:w-[65%] md:h-[65%] lg:w-[80%] lg:h-[80%] z-0 top-[50%] md:top-[36%] left-[55%] md:left-[50%] lg:left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
             <svg viewBox="0 0 200 200" className="w-full h-full text-[#f08c50]" xmlns="http://www.w3.org/2000/svg">
                {/* Main Orange Blob shape manually traced for identical cuts */}
                <path fill="currentColor" d="M96 24 C 131 16, 175 22, 192 65 C 209 108, 172 165, 130 181 C 88 197, 36 182, 13 138 C -10 94, 2 54, 30 38 C 58 22, 61 32, 96 24 Z" />
             </svg>
          </div>
          
          {/* Teal accents (Splash drops) aligned properly */}
          <div className="absolute top-[1%] left-[10%] w-28 h-20 md:w-28 md:h-28 z-0 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#0489A9]">
              {/* Outer small drop - tilted left */}
              <path fill="currentColor" d="M18,30 Q28,25 25,42 Q23,55 15,50 Q8,45 11,35 Z" transform="rotate(-15 18 40)" />
              {/* Inner long drop - thicker and curving right/down */}
              <path fill="currentColor" d="M48,22 C 60,12 70,35 60,50 C 50,65 35,68 30,55 C 25,42 36,32 48,22 Z" transform="rotate(-10 45 40)" />
            </svg>
          </div>
          <div className="absolute top-[8%] -right-[8%] w-24 h-20 md:w-28 md:h-28 z-0 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#0489A9]">
              {/* Right long drop - pointing down-left */}
              <path fill="currentColor" d="M30,20 C 50,10 70,30 60,55 C 50,80 20,80 15,60 C 10,40 10,30 30,20 Z" transform="rotate(25 40 40)" />
            </svg>
          </div>

          {/* Image container */}
          <div className="relative z-10 w-full h-[70%] md:h-[60%] lg:h-[70%] flex items-center justify-center pointer-events-none pl-0 md:pl-2 -translate-y-8 md:-translate-y-6 lg:-translate-y-10">
             {/* Simulate the thick white stroke cutoff border using multi-drop-shadows */}
             <div className="w-[95%] h-[100%] md:w-[105%] md:h-[105%] relative translate-x-5 md:translate-x-0 lg:translate-x-0 translate-y-20 md:translate-y-0 lg:translate-y-1" style={{ 
                 filter: 'drop-shadow(4px 4px 0px #fff) drop-shadow(-4px -4px 0px #fff) drop-shadow(4px -4px 0px #fff) drop-shadow(-4px 4px 0px #fff) drop-shadow(0px 8px 10px rgba(0,0,0,0.15))' 
                 }}>
               <Image 
                  src="https://png.pngtree.com/png-clipart/20250609/original/pngtree-portrait-of-happy-dogs-and-cat-in-studio-with-pink-background-png-image_21146338.png"
                  alt="Happy Dog"
                  fill
                  className="object-contain object-bottom"
                  priority
               />
             </div>
          </div>
        </div>
      </main>

      {/* As Featured in */}
      <section className="max-w-7xl mx-auto px-6 pt-0 pb-12 flex flex-col items-center">
        <h3 className="text-[25px] md:text-[30px] font-heading font-extrabold mb-6 md:mb-8 text-gray-800 tracking-wide">As Featured in</h3>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-24 opacity-80">
          {/* Mock Logo: ASPCA */}
          <div className="text-[28px] font-body font-medium text-gray-400 uppercase tracking-wide flex items-center">
            AS<span className="text-[#f08c50] font-black">P</span>CA
          </div>

          {/* Mock Logo: petfinder */}
          <div className="text-[26px] font-menu font-extrabold text-[#3a3a3a] lowercase tracking-tighter flex items-center">
            <span className="opacity-90">pet</span><span className="font-semibold">finder</span>
          </div>

          {/* Mock Logo: Rover.com */}
          <div className="text-[32px] font-menu font-bold text-gray-500 flex items-baseline gap-1 opacity-80">
            <span className="opacity-60 text-[18px]">
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z" />
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z" />
              </svg>
            </span>
            <span className="italic pr-1">Rover</span><span className="text-[14px] font-normal not-italic tracking-wider opacity-60">.com</span>
          </div>

          {/* Mock Logo: GoodPup */}
          <div className="text-[25px] font-heading font-medium text-gray-400 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#d7434f]">
              <path d="M19,8 C19,8 19,7 18,6 C17,5 15,5 14,6 C13,7 13,8 14,9 L14,10 L12,12 L9,12 C7,12 6,13 6,15 L6,18 L8,18 L8,15 L10,15 L10,18 L12,18 L12,15 L14,15 L14,18 L16,18 L16,14 L17,13 L19,13 Z" />
            </svg>
            GoodPup
          </div>
        </div>
      </section>
      
      {/* About Us */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Image Stack */}
        <div className="relative w-full max-w-[350px] md:max-w-[420px] aspect-square mx-auto lg:mx-0 pt-8 lg:pt-0">
          
          {/* Bottom Layer (Teal Box) */}
          <div className="absolute inset-0 bg-[#0489a9] rounded-sm transform rotate-[-4deg] scale-[1.02] origin-center z-0"></div>
          
          {/* Middle Layer (Orange Box) */}
          <div className="absolute inset-0 bg-[#f08c50] justify-center items-center flex rounded-sm transform rotate-[4deg] scale-[1.02] origin-center z-10 shadow-lg"></div>

          {/* Top Layer (Image Box) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-[2px] transform rotate-0">
             <div className="relative w-full h-full bg-[#f4f7f6] rounded-sm overflow-hidden flex items-center justify-center shadow-sm">
                {/* Decorative blob under image */}
                <div className="absolute w-[120%] h-[120%] top-[20%] left-[-10%] bg-white rounded-full opacity-60 mix-blend-overlay pointer-events-none"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1587559070757-f72a388edbba?q=80&w=1000&auto=format&fit=crop"
                  alt="Women playing with pet"
                  width={500} 
                  height={500} 
                  className="object-cover w-[90%] h-[90%] rounded-md z-10 relative"
                />
             </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left lg:pl-10 z-10">
          <h2 className="font-heading font-black text-[22px] md:text-[28px] uppercase text-[#1a1a1a] mb-6 tracking-wide">
            About Us
          </h2>
          
          <div className="font-menu text-gray-500 text-[14px] md:text-[15px] leading-relaxed mb-8 max-w-[450px] font-medium flex flex-col gap-3">
             <p>Petjam is an animal adoption & rescue facility in New York.</p>
             <p>We provide the best welfare for the pets in our care here.</p>
             <p>We only let them get adopted by those who care for them.</p>
          </div>
          
          <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-8 py-2 md:py-2.5 rounded-md font-semibold text-[15px] md:text-[16px] transition shadow-sm hover:shadow w-[180px] md:w-auto">
            Read more
          </button>
        </div>
      </section>

      {/* Adoption Process */}
      <section className="w-full bg-[#0489a9] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <h2 className="font-heading font-bold text-white text-[24px] md:text-[28px] lg:text-[32px] tracking-wide mb-12 md:mb-16">
            Adoption Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 w-full max-w-5xl">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-xl bg-[#f08c50]/20 flex items-center justify-center p-2 border-[6px] border-[#0489a9]">
                 <div className="w-full h-full bg-[#f08c50] shadow-sm flex items-center justify-center rounded-lg text-white">
                   <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                     <line x1="8" y1="21" x2="16" y2="21"/>
                     <line x1="12" y1="17" x2="12" y2="21"/>
                     <circle cx="12" cy="10" r="3"/>
                     <line x1="14.5" y1="12.5" x2="16" y2="14"/>
                   </svg>
                 </div>
              </div>
              <h3 className="font-heading font-bold text-white text-[18px] md:text-[20px] mb-3">Browse our pets</h3>
              <p className="text-white/80 font-menu text-[14px] leading-relaxed max-w-[260px] md:max-w-none">
                You will easily find one you will love in the wide range of pets in our gallery.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-xl bg-[#f08c50]/20 flex items-center justify-center p-2 border-[6px] border-[#0489a9]">
                 <div className="w-full h-full bg-[#f08c50] shadow-sm flex items-center justify-center rounded-lg text-white">
                   <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                     <line x1="16" y1="2" x2="16" y2="6"/>
                     <line x1="8" y1="2" x2="8" y2="6"/>
                     <line x1="3" y1="10" x2="21" y2="10"/>
                     <line x1="9" y1="15" x2="15" y2="15"/>
                   </svg>
                 </div>
              </div>
              <h3 className="font-heading font-bold text-white text-[18px] md:text-[20px] mb-3">Meet the pet</h3>
              <p className="text-white/80 font-menu text-[14px] leading-relaxed max-w-[260px] md:max-w-none">
                Reach out for the pet in a quick meeting or in person.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-xl bg-[#f08c50]/20 flex items-center justify-center p-2 border-[6px] border-[#0489a9]">
                 <div className="w-full h-full bg-[#f08c50] shadow-sm flex items-center justify-center rounded-lg text-white">
                   <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <polyline points="4 9 8 13 13 8"></polyline>
                     <line x1="16" y1="9" x2="21" y2="9"></line>
                     <polyline points="4 17 8 21 13 16"></polyline>
                     <line x1="16" y1="17" x2="21" y2="17"></line>
                   </svg>
                 </div>
              </div>
              <h3 className="font-heading font-bold text-white text-[18px] md:text-[20px] mb-3">Finalize the adoption</h3>
              <p className="text-white/80 font-menu text-[14px] leading-relaxed max-w-[260px] md:max-w-none">
                Complete the final stages of adoption and bring a joy to your home.
              </p>
            </div>

          </div>
        </div>
      </section>
      
      {/* Adopt a pet section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center w-full">
        {/* Header & Button */}
        <div className="w-full flex flex-row items-center justify-between mb-8 md:mb-10">
          <h2 className="font-heading font-black text-[28px] md:text-[36px] uppercase text-[#1a1a1a] tracking-wide">
            Adopt a pet
          </h2>
          <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-6 py-2 rounded-md font-semibold text-[14px] md:text-[15px] transition shadow-sm hover:shadow">
            View all
          </button>
        </div>

        {/* Filters */}
        <div className="w-full flex justify-center items-center gap-6 md:gap-12 text-[15px] md:text-[16px] font-heading font-bold mb-10 md:mb-14">
          <button className="text-[#f08c50] border-b-2 border-[#f08c50] pb-1">All</button>
          <button className="text-gray-400 hover:text-gray-600 transition pb-1 border-b-2 border-transparent">Cat</button>
          <button className="text-gray-400 hover:text-gray-600 transition pb-1 border-b-2 border-transparent">Dog</button>
          <button className="text-gray-400 hover:text-gray-600 transition pb-1 border-b-2 border-transparent">Panda</button>
          <button className="text-gray-400 hover:text-gray-600 transition pb-1 border-b-2 border-transparent">Rabbit</button>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
          
          {/* Pet Card 1 */}
          <div className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-black">
             <Image src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=600&auto=format&fit=crop" alt="Koba" fill className="object-cover opacity-90 group-hover:opacity-100 transition duration-300" />
             {/* Bottom Overlay */}
             <div className="absolute bottom-0 w-full h-[35%] bg-[#1a1a1a] p-4 flex flex-col justify-end text-left z-10 transition-transform duration-300">
               <h3 className="font-heading font-black text-[#f08c50] text-[18px] mb-0.5">Koba</h3>
               <p className="text-white font-menu text-[13px] font-medium opacity-90 mb-0.5">Dog / Husky</p>
               <p className="text-gray-400 font-menu text-[12px]">1 Year / Male</p>
             </div>
          </div>

          {/* Pet Card 2 */}
          <div className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-black">
             <Image src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop" alt="Milo" fill className="object-cover opacity-90 group-hover:opacity-100 transition duration-300" />
             <div className="absolute bottom-0 w-full h-[35%] bg-[#1a1a1a] p-4 flex flex-col justify-end text-left z-10 transition-transform duration-300">
               <h3 className="font-heading font-black text-[#f08c50] text-[18px] mb-0.5">Milo</h3>
               <p className="text-white font-menu text-[13px] font-medium opacity-90 mb-0.5">Cat / Persian</p>
               <p className="text-gray-400 font-menu text-[12px]">2 Years / Male</p>
             </div>
          </div>

          {/* Pet Card 3 */}
          <div className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-black">
             <Image src="https://images.unsplash.com/photo-1537151608804-ea2f1faeb69c?q=80&w=600&auto=format&fit=crop" alt="Rex" fill className="object-cover opacity-90 group-hover:opacity-100 transition duration-300" />
             <div className="absolute bottom-0 w-full h-[35%] bg-[#1a1a1a] p-4 flex flex-col justify-end text-left z-10 transition-transform duration-300">
               <h3 className="font-heading font-black text-[#f08c50] text-[18px] mb-0.5">Rex</h3>
               <p className="text-white font-menu text-[13px] font-medium opacity-90 mb-0.5">Dog / Border Collie</p>
               <p className="text-gray-400 font-menu text-[12px]">1 Year / Male</p>
             </div>
          </div>

          {/* Pet Card 4 */}
          <div className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-black">
             <Image src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop" alt="Luna" fill className="object-cover opacity-90 group-hover:opacity-100 transition duration-300" />
             <div className="absolute bottom-0 w-full h-[35%] bg-[#1a1a1a] p-4 flex flex-col justify-end text-left z-10 transition-transform duration-300">
               <h3 className="font-heading font-black text-[#f08c50] text-[18px] mb-0.5">Luna</h3>
               <p className="text-white font-menu text-[13px] font-medium opacity-90 mb-0.5">Dog / Beagle</p>
               <p className="text-gray-400 font-menu text-[12px]">8 Months / Female</p>
             </div>
          </div>

          {/* Pet Card 5 */}
          <div className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-black">
             <Image src="https://images.unsplash.com/photo-1585110396000-c9fd4e4e5088?q=80&w=600&auto=format&fit=crop" alt="Binky" fill className="object-cover opacity-90 group-hover:opacity-100 transition duration-300" />
             <div className="absolute bottom-0 w-full h-[35%] bg-[#1a1a1a] p-4 flex flex-col justify-end text-left z-10 transition-transform duration-300">
               <h3 className="font-heading font-black text-[#f08c50] text-[18px] mb-0.5">Binky</h3>
               <p className="text-white font-menu text-[13px] font-medium opacity-90 mb-0.5">Rabbit / Holland Lop</p>
               <p className="text-gray-400 font-menu text-[12px]">3 Years / Female</p>
             </div>
          </div>

          {/* Pet Card 6 */}
          <div className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-black">
             <Image src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=600&auto=format&fit=crop" alt="Bella" fill className="object-cover opacity-90 group-hover:opacity-100 transition duration-300" />
             <div className="absolute bottom-0 w-full h-[35%] bg-[#1a1a1a] p-4 flex flex-col justify-end text-left z-10 transition-transform duration-300">
               <h3 className="font-heading font-black text-[#f08c50] text-[18px] mb-0.5">Bella</h3>
               <p className="text-white font-menu text-[13px] font-medium opacity-90 mb-0.5">Cat / Siamese</p>
               <p className="text-gray-400 font-menu text-[12px]">1 Year / Female</p>
             </div>
          </div>

        </div>
      </section>

      {/* Testimonial */}
      <section className="w-full bg-[#0489a9] py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="font-heading font-bold text-white text-[24px] md:text-[32px] tracking-wide mb-12">
            Testimonial
          </h2>

          {/* Carousel Mockup Container */}
          <div className="relative w-full max-w-5xl flex items-center justify-center mb-12 h-[200px] md:h-[280px]">
            {/* Left Arrow */}
            <button className="absolute -left-2 md:-left-12 lg:-left-20 z-30 text-[#f08c50] hover:scale-110 transition-transform p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Images */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Outer Left */}
              <div className="absolute left-[25%] md:left-[33%] w-[100px] md:w-[150px] aspect-square rounded-2xl overflow-hidden z-0 opacity-30 scale-75 transform -translate-x-1/2">
                <Image src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400&auto=format&fit=crop" alt="Testimonial 1" fill className="object-cover" />
              </div>

              {/* Inner Left */}
              <div className="absolute left-[38%] md:left-[42%] w-[130px] md:w-[200px] aspect-square rounded-2xl overflow-hidden z-10 opacity-70 scale-90 transform -translate-x-1/2 shadow-lg">
                <Image src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=400&auto=format&fit=crop" alt="Testimonial 2" fill className="object-cover" />
              </div>

              {/* Center */}
              <div className="absolute left-1/2 w-[160px] md:w-[260px] aspect-square rounded-2xl overflow-hidden z-20 transform -translate-x-1/2 shadow-2xl border-4 border-[#0489a9]/20">
                <Image src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400&auto=format&fit=crop" alt="Testimonial Center" fill className="object-cover" />
              </div>

              {/* Inner Right */}
              <div className="absolute left-[62%] md:left-[58%] w-[130px] md:w-[200px] aspect-square rounded-2xl overflow-hidden z-10 opacity-70 scale-90 transform -translate-x-1/2 shadow-lg">
                <Image src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400&auto=format&fit=crop" alt="Testimonial 3" fill className="object-cover" />
              </div>

              {/* Outer Right */}
              <div className="absolute left-[75%] md:left-[67%] w-[100px] md:w-[150px] aspect-square rounded-2xl overflow-hidden z-0 opacity-30 scale-75 transform -translate-x-1/2">
                <Image src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=400&auto=format&fit=crop" alt="Testimonial 4" fill className="object-cover" />
              </div>
            </div>

            {/* Right Arrow */}
            <button className="absolute -right-2 md:-right-12 lg:-right-20 z-30 text-[#f08c50] hover:scale-110 transition-transform p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Text Content */}
          <div className="max-w-2xl relative">
            <span className="absolute -top-3 -left-6 md:-left-10 text-[#f08c50] font-heading font-black text-4xl leading-none">"</span>
            <p className="font-menu text-white text-[15px] md:text-[18px] leading-relaxed mb-6 italic opacity-90">
              I adopted snow in december as my first buddy and it has been a very blissful relationship. 
              The adoption process was very seamless and easy. I would choose PetJam over and over again.
            </p>
            <p className="font-heading font-bold text-[#f08c50] text-[16px] md:text-[18px]">
              Odukala chaqooi
            </p>
          </div>
        </div>
      </section>
      {/* Our Blog Post Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center w-full">
        <h2 className="font-heading font-black text-[24px] md:text-[32px] uppercase text-[#1a1a1a] mb-8 md:mb-12 tracking-wide">
          Our Blog Post
        </h2>

        {/* Blog Grid: 1 Col Mobile (Vertical Cards), 2 Cols Desktop (Horizontal side-by-side cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 w-full max-w-6xl">
          
          {/* Blog Card 1 */}
          <div className="flex flex-col md:flex-row w-full bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-[250px] md:h-[280px] relative overflow-hidden">
               <Image src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop" alt="Dog sniffing" fill className="object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between items-start text-left">
              <div>
                <h3 className="font-heading font-bold text-[#f08c50] text-[18px] md:text-[20px] leading-tight mb-3">
                  How to keep your pets well & well-fed ?
                </h3>
                <p className="font-menu text-gray-300 text-[13px] md:text-[14px] leading-relaxed mb-6 opacity-90 line-clamp-4">
                  All breeds of our pets requires a well & healthy adoption of diet routine. 
                  Have you considered the proper routine diet for them? Let's take a dig at it!
                </p>
              </div>
              <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-6 py-2 rounded-md font-semibold text-[14px] transition">
                Read more
              </button>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="flex flex-col md:flex-row w-full bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-[250px] md:h-[280px] relative overflow-hidden">
               <Image src="https://plus.unsplash.com/premium_photo-1661852467406-81cf31ae13c8?q=80&w=600&auto=format&fit=crop" alt="Pigeon Birds" fill className="object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between items-start text-left">
              <div>
                <h3 className="font-heading font-bold text-[#f08c50] text-[18px] md:text-[20px] leading-tight mb-3">
                  Farm Breeding fluxes
                </h3>
                <p className="font-menu text-gray-300 text-[13px] md:text-[14px] leading-relaxed mb-6 opacity-90 line-clamp-4">
                  Breeding pets on your farm require a totally different array of structures. 
                  From housing, diet & feeding routine to breeding cycle, everything needs to be taken care of. 
                  Here is what you need to know.
                </p>
              </div>
              <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-6 py-2 rounded-md font-semibold text-[14px] transition">
                Read more
              </button>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div className="flex flex-col md:flex-row w-full bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-[250px] md:h-[280px] relative overflow-hidden">
               <Image src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop" alt="Cat playing" fill className="object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between items-start text-left">
              <div>
                <h3 className="font-heading font-bold text-[#f08c50] text-[18px] md:text-[20px] leading-tight mb-3">
                  Play Tournaments for Pets
                </h3>
                <p className="font-menu text-gray-300 text-[13px] md:text-[14px] leading-relaxed mb-6 opacity-90 line-clamp-4">
                  Take a look at right guide to play with and train the new pet, 
                  for both of you to develop the maximum closeness!
                </p>
              </div>
              <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-6 py-2 rounded-md font-semibold text-[14px] transition">
                Read more
              </button>
            </div>
          </div>

          {/* Blog Card 4 */}
          <div className="flex flex-col md:flex-row w-full bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-[250px] md:h-[280px] relative overflow-hidden">
               <Image src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop" alt="Small fox walking" fill className="object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between items-start text-left">
              <div>
                <h3 className="font-heading font-bold text-[#f08c50] text-[18px] md:text-[20px] leading-tight mb-3">
                  Healthy Weights for your dog
                </h3>
                <p className="font-menu text-gray-300 text-[13px] md:text-[14px] leading-relaxed mb-6 opacity-90 line-clamp-4">
                  A common graph chart exists for all breeds. Which weight lies in the safe zone.
                  Could a fluctuation mean a lack of minerals? How do we ensure your dog is on track?
                </p>
              </div>
              <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-6 py-2 rounded-md font-semibold text-[14px] transition">
                Read more
              </button>
            </div>
          </div>

        </div>

        {/* Global View All CTA */}
        <div className="mt-12 flex justify-center">
           <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-10 py-3 rounded-md font-semibold text-[15px] transition shadow w-[200px] md:w-auto">
             View All
           </button>
        </div>
      </section>
      {/* Volunteer CTA Banner */}
      <section className="w-full bg-gradient-to-br from-[#0489a9] to-[#036d8a] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <span className="inline-block bg-white/20 text-white text-[12px] font-menu font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              Tham Gia Cùng Chúng Tôi
            </span>
            <h2 className="font-heading font-black text-white text-[26px] md:text-[36px] leading-tight mb-3">
              Bạn Có Muốn Trở Thành <br className="hidden md:block" />
              Tình Nguyện Viên Không?
            </h2>
            <p className="font-menu text-white/80 text-[15px] leading-relaxed max-w-lg">
              Mỗi giờ bạn tình nguyện là một cơ hội cứu sống một sinh mệnh — hơn 500 tình nguyện viên của Hanoi Pet Adoption đã và đang làm điều đó mỗi ngày.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="/volunteer"
              className="inline-block font-heading bg-[#f08c50] hover:bg-[#d16830] transition-all text-white px-10 py-4 rounded-xl font-bold text-[16px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200 whitespace-nowrap"
            >
              Tìm Hiểu Ngay →
            </a>
          </div>
        </div>
      </section>

      {/* Global Application Footer */}
      <Footer />

    </div>
  )
}
