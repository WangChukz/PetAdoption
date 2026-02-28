import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TeamGrid from '../components/TeamGrid';
import FeaturedLogos from '../components/FeaturedLogos';
import ServicesGrid from '../components/ServicesGrid';
import FAQAccordion from '../components/FAQAccordion';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-black font-body overflow-x-hidden">
      <Header />

      {/* Hero / Offset About Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center border-b border-gray-100">
        {/* Left Image Stack */}
        <div className="relative w-full max-w-[350px] md:max-w-[420px] aspect-square mx-auto lg:mx-0 pt-8 lg:pt-0">
          <div className="absolute inset-0 bg-[#0489a9] rounded-sm transform rotate-[-4deg] scale-[1.02] origin-center z-0"></div>
          <div className="absolute inset-0 bg-[#f08c50] justify-center items-center flex rounded-sm transform rotate-[4deg] scale-[1.02] origin-center z-10 shadow-lg"></div>
          <div className="absolute inset-0 z-20 flex items-center justify-center p-[2px] transform rotate-0">
             <div className="relative w-full h-full bg-[#f4f7f6] rounded-sm overflow-hidden flex items-center justify-center shadow-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=800&auto=format&fit=crop"
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
          <h1 className="font-heading font-black text-[32px] md:text-[42px] text-[#1a1a1a] mb-2">
            PetJam
          </h1>
          <p className="font-menu text-gray-500 text-[15px] font-medium leading-relaxed mb-6">
            PetJam is an animal adoption & rescue facility in New York.
            <br/><br/>
            We provide the best welfare for the pets in our care here. We only let them get adopted by those who care for them here.
          </p>
          <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-8 py-3 rounded-md font-bold text-[15px] transition shadow-sm hover:shadow w-[180px] md:w-auto">
            Get Involved
          </button>
        </div>
      </section>

      {/* Team Grid Component */}
      <TeamGrid />

      {/* Featured Logos Component */}
      <FeaturedLogos />

      {/* Services Grid Component */}
      <ServicesGrid />

      {/* FAQ & Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-gray-100">
        <h2 className="font-heading font-black text-[#1a1a1a] text-[28px] md:text-[36px] mb-12 text-center md:text-left">
          Frequently Asked Questions
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: FAQ Accordion */}
          <div className="w-full">
            <FAQAccordion />
            <div className="mt-8 flex justify-center md:justify-start">
               {/* Decorative line under FAQ */}
               <button className="font-menu text-[#f08c50] border-b-2 border-[#f08c50] pb-1 uppercase font-bold tracking-widest text-[14px]">
                 Load More
               </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-[#fafafa] p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start w-full max-w-lg mx-auto lg:mx-0">
             <p className="font-menu text-gray-500 font-medium text-[14px] leading-relaxed mb-8">
               If you have any questions that are not listed around above, you can send us a message to us to ask us through Form Here.
             </p>

             <form className="flex flex-col gap-5 w-full">
               <input 
                 type="text" 
                 placeholder="Enter your email" 
                 className="w-full bg-white border border-gray-200 px-4 py-3 rounded-md font-menu text-[14px] focus:outline-none focus:border-[#f08c50] focus:ring-1 focus:ring-[#f08c50] transition shadow-sm"
               />
               <textarea 
                 rows={4} 
                 placeholder="Type your message" 
                 className="w-full bg-white border border-gray-200 px-4 py-3 rounded-md font-menu text-[14px] focus:outline-none focus:border-[#f08c50] focus:ring-1 focus:ring-[#f08c50] transition shadow-sm resize-none"
               ></textarea>
               <button type="button" className="font-heading bg-[#f08c50] hover:bg-[#d16830] text-white px-8 py-3.5 rounded-md font-bold text-[15px] transition shadow mt-2 w-max">
                 Send Message
               </button>
             </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
