export default function ServicesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-gray-100">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Text & CTA */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left pt-2">
          <h2 className="font-heading font-black text-[#1a1a1a] text-[28px] md:text-[36px] mb-6">
            Our Services
          </h2>
          <p className="font-menu text-gray-500 text-[15px] leading-relaxed mb-8 max-w-sm font-medium">
            Our Support Team will get answers for you in a matter of hours. Working a launcher that is to handle support requests.
          </p>
          <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-8 py-3.5 rounded-md font-bold text-[15px] transition shadow w-[180px] md:w-auto">
            Explore More
          </button>
        </div>

        {/* Right Column: Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#0489a9] p-8 pb-12 rounded-xl text-white shadow-md flex flex-col gap-4">
             <div className="w-12 h-12 rounded-full border border-[#f08c50]/40 flex justify-center items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f08c50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>
             </div>
             <h3 className="font-heading font-bold text-[18px]">Adoption Services</h3>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0489a9] p-8 pb-12 rounded-xl text-white shadow-md flex flex-col gap-4 relative">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[100px] pointer-events-none"></div>
             <div className="w-12 h-12 rounded-full border border-[#f08c50]/40 flex justify-center items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f08c50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
             </div>
             <h3 className="font-heading font-bold text-[18px]">Pet Hostel Services</h3>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0489a9] p-8 pb-12 rounded-xl text-white shadow-md flex flex-col gap-4 relative">
             <div className="w-12 h-12 rounded-full border border-[#f08c50]/40 flex justify-center items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f08c50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
             </div>
             <h3 className="font-heading font-bold text-[18px]">Training Services</h3>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0489a9] p-8 pb-12 rounded-xl text-white shadow-md flex flex-col gap-4 relative">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[100px] pointer-events-none"></div>
             <div className="w-12 h-12 rounded-full border border-[#f08c50]/40 flex justify-center items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f08c50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
             </div>
             <h3 className="font-heading font-bold text-[18px]">Information Services</h3>
          </div>

        </div>

      </div>
    </section>
  );
}
