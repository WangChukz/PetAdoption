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
    <div className="min-h-screen w-full flex items-center justify-center relative font-body selection:bg-[#f08c50] selection:text-white overflow-hidden p-4 md:p-8">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          fill 
          className="object-cover scale-105"
          priority
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        {/* Ambient glow behind the form */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-[#f08c50]/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      </div>

      {/* Back to Home Button (Floating top-left) */}
      <Link href="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white hover:text-[#f08c50] transition bg-black/20 hover:bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-white/10 text-sm font-menu font-bold">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Về trang chủ
      </Link>

      {/* Centered Form Container */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center mt-12 md:mt-0">
        {/* Logo or Brand */}
        <div className="text-center mb-5 md:mb-6">
           <h2 className="font-heading font-black text-3xl md:text-4xl tracking-tight leading-none text-white drop-shadow-xl">
             PET<span className="text-[#f08c50]">JAM</span>
           </h2>
           <p className="font-menu text-white/90 font-medium text-[13px] md:text-[14px] mt-2 drop-shadow-md">
             Cùng hàng ngàn người yêu thú cưng tạo nên sự khác biệt.
           </p>
        </div>

        {/* Glass Box */}
        <div className="w-full bg-gradient-to-br from-white/60 via-white/40 to-white/20 backdrop-blur-[40px] p-6 md:p-8 rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-white/60 relative">
          {/* Glossy sheen reflection */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
          
          <div className="text-center mb-6 relative z-10">
            <h1 className="font-heading font-black text-white text-[24px] md:text-[28px] tracking-tight mb-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
              {title}
            </h1>
            <p className="font-menu text-white/90 font-medium text-[13px] md:text-[14px] leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
              {subtitle}
            </p>
          </div>

          <div className="w-full text-left relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
