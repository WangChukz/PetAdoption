import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

export default function AuthLayout({ children, title, subtitle, imageSrc, imageAlt }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-white font-body selection:bg-[#f08c50] selection:text-white">
      {/* Back to Home Button (Floating top-left) */}
      <Link href="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-500 hover:text-[#f08c50] transition bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-sm font-menu font-bold">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>

      {/* Left Column (Image) - Hidden on mobile, 50% width on desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          fill 
          className="object-cover opacity-90"
          priority
        />
        {/* Brand Overlay (Teal Mix) */}
        <div className="absolute inset-0 bg-[#0489a9]/30 mix-blend-multiply"></div>
        {/* Secondary Overlay (Gradient for depth) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent"></div>
        
        {/* Optional Branding Text over image */}
        <div className="absolute bottom-12 left-12 text-white max-w-sm">
           <h2 className="font-heading font-black text-4xl mb-4 tracking-tight leading-none text-white drop-shadow-lg">
             PET<span className="text-[#f08c50]">JAM</span>
           </h2>
           <p className="font-menu text-white/90 font-medium text-[15px] leading-relaxed drop-shadow">
             Join thousands of pet lovers and make a real difference. Finding a new best friend has never been easier.
           </p>
        </div>
      </div>

      {/* Right Column (Form Container) - Full width on mobile, 50% width on desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 relative">
         <div className="w-full max-w-[420px] flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1 className="font-heading font-black text-[#1a1a1a] text-[32px] md:text-[36px] tracking-tight mb-2">
              {title}
            </h1>
            <p className="font-menu text-gray-500 font-medium text-[15px] leading-relaxed mb-10 md:mb-12">
              {subtitle}
            </p>

            <div className="w-full text-left">
              {children}
            </div>
         </div>
      </div>
    </div>
  );
}
