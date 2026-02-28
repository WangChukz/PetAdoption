import Image from 'next/image';

const teamMembers = [
  { name: 'Fion', role: 'CEO / Founder', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
  { name: 'Alain', role: 'MKT', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop' },
  { name: 'Johathon', role: 'DEV', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
  { name: 'Ashkaya', role: 'LEAD DEV', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98a?q=80&w=400&auto=format&fit=crop' },
  { name: 'Amanda', role: 'HR MANAGER', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop' },
  { name: 'Jenson D.B', role: 'CFO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
  { name: 'Arman', role: 'FOUNDER/DESIGNER', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
  { name: 'Rajan', role: 'LEGAL ADVISER', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
];

export default function TeamGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
      <h2 className="font-heading font-black text-[#1a1a1a] text-[28px] md:text-[36px] mb-12">Meet the team</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="relative group rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300">
            <Image 
              src={member.image} 
              alt={member.name} 
              fill 
              className="object-cover group-hover:scale-105 transition duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5 text-left">
               <h3 className="font-heading font-bold text-[#f08c50] text-[20px] leading-tight mb-1">{member.name}</h3>
               <p className="font-menu text-white/80 text-[11px] font-bold tracking-widest uppercase">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
