export default function Footer() {
  return (
    <footer className="w-full relative bg-[#0489a9] mt-24 md:mt-32">
      {/* Overlapping Newsletter Box */}
      <div className="max-w-4xl mx-auto px-4 md:px-0 absolute left-0 right-0 -top-16 md:-top-20 z-20">
        <div className="bg-[#1a1a1a] rounded-xl p-8 md:p-12 shadow-2xl flex flex-col items-center md:items-start text-center md:text-left mx-2 md:mx-6">
          <h3 className="font-heading font-black text-white text-[22px] md:text-[28px] mb-2 tracking-wide">
            Stay Upto-date with our mails
          </h3>
          <p className="font-menu text-gray-400 text-[14px] md:text-[16px] mb-6 md:mb-8 font-medium">
            Subscribe to our news letter
          </p>
          <div className="w-full flex flex-col md:flex-row gap-0 rounded-md overflow-hidden shadow-inner">
             <input 
               type="email" 
               placeholder="Enter your email address" 
               className="bg-white w-full md:flex-1 px-6 py-3 md:py-4 text-[#1a1a1a] font-menu text-[14px] md:text-[15px] outline-none font-medium placeholder:text-gray-400 rounded-t-md md:rounded-l-md md:rounded-tr-none" 
             />
             <button className="bg-[#f08c50] hover:bg-[#d16830] text-white px-8 py-3 md:py-4 font-heading font-bold uppercase tracking-wider text-[14px] md:text-[15px] transition rounded-b-md md:rounded-r-md md:rounded-bl-none shrink-0 w-full md:w-auto">
               Subscribe
             </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-[220px] md:pt-[240px] pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Column 1: Logo & Socials */}
        <div className="flex flex-col items-center lg:items-start">
           <div className="bg-white p-4 rounded-xl shadow-md w-32 h-32 flex flex-col items-center justify-center mb-6">
              <span className="text-[#f08c50] font-heading font-black text-[22px] tracking-tight leading-none mt-2">
                <span className="text-gray-800">PET</span>JAM
              </span>
              <span className="text-[10px] text-gray-500 font-menu tracking-widest mt-1">NEW YORK</span>
           </div>
           {/* Social Circles (Mockups) */}
           <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-xs opacity-90 cursor-pointer hover:bg-[#f08c50] transition">in</div>
             <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-xs opacity-90 cursor-pointer hover:bg-[#f08c50] transition">fb</div>
             <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-xs opacity-90 cursor-pointer hover:bg-[#f08c50] transition">tw</div>
             <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-xs opacity-90 cursor-pointer hover:bg-[#f08c50] transition">ig</div>
           </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-start px-4 md:px-0">
          <h4 className="font-heading font-black text-[#f08c50] text-[18px] mb-6 tracking-wide uppercase">Quick Links</h4>
          <ul className="flex flex-col gap-4 font-menu text-white/90 text-[15px]">
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> Blog</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> Services</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> My Account</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> Track ID Dashboard</li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div className="flex flex-col items-start px-4 md:px-0">
          <h4 className="font-heading font-black text-[#f08c50] text-[18px] mb-6 tracking-wide uppercase">Legal</h4>
          <ul className="flex flex-col gap-4 font-menu text-white/90 text-[15px]">
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> Privacy Policy</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> Terms & Conditions</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> Wikipedia</li>
          </ul>
        </div>

        {/* Column 4: Customer Support */}
        <div className="flex flex-col items-start px-4 md:px-0">
          <h4 className="font-heading font-black text-[#f08c50] text-[18px] mb-6 tracking-wide uppercase">Customer Support</h4>
          <ul className="flex flex-col gap-4 font-menu text-white/90 text-[15px]">
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> Delivery</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> Return Policy</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> VIP Pet</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> POLICIES</li>
            <li className="hover:text-white transition cursor-pointer flex items-center gap-2"><span className="opacity-50">-</span> Track in Gallery</li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#f08c50] py-4 text-center">
        <p className="font-menu text-white/90 text-[13px] tracking-widest font-medium uppercase">
          © 2026 PETJAM PRIVATE CO. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
