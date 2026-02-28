"use client";

import React, { useRef } from 'react';

export default function VolunteerSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Volunteer Request Submitted');
  };

  const openFileBrowser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
       {/* Section Header */}
       <div className="text-center max-w-2xl mb-12">
         <h2 className="font-heading font-black text-[28px] md:text-[32px] text-[#1a1a1a] mb-4">
           Volunteer
         </h2>
         <p className="font-menu text-[14px] md:text-[15px] text-gray-500 leading-relaxed italic px-4">
           Could you offer to offer by our community? Let's talk to meet you join us firmly fill to your details below.
         </p>
       </div>

       {/* Form Wrapper */}
       <form 
         className="w-full max-w-xl bg-white flex flex-col gap-6" 
         onSubmit={handleVolunteerSubmit}
       >
         
         {/* Name Line */}
         <div className="flex flex-col gap-1.5 w-full">
           <label className="font-menu text-[14px] font-medium text-gray-700 ml-1">Name</label>
           <input 
             type="text" 
             placeholder="Full Name" 
             required
             className="w-full border-b border-gray-200 border-opacity-70 py-2.5 px-0 font-menu text-[14px] text-gray-700 bg-transparent outline-none focus:border-[#0489a9] transition placeholder-gray-400"
           />
         </div>

         {/* Email Line */}
         <div className="flex flex-col gap-1.5 w-full">
           <label className="font-menu text-[14px] font-medium text-gray-700 ml-1">Email Address</label>
           <input 
             type="email" 
             placeholder="Email Address" 
             required
             className="w-full border-b border-gray-200 border-opacity-70 py-2.5 px-0 font-menu text-[14px] text-gray-700 bg-transparent outline-none focus:border-[#0489a9] transition placeholder-gray-400"
           />
         </div>

         {/* Phone Line */}
         <div className="flex flex-col gap-1.5 w-full">
           <label className="font-menu text-[14px] font-medium text-gray-700 ml-1">Phone Number</label>
           <input 
             type="tel" 
             placeholder="Phone Number" 
             required
             className="w-full border-b border-gray-200 border-opacity-70 py-2.5 px-0 font-menu text-[14px] text-gray-700 bg-transparent outline-none focus:border-[#0489a9] transition placeholder-gray-400"
           />
         </div>

         {/* Area Of Focus */}
         <div className="flex flex-col gap-1.5 w-full">
           <label className="font-menu text-[14px] font-medium text-gray-700 ml-1">Area of focus</label>
           <select 
             className="w-full border-b border-gray-200 border-opacity-70 py-2.5 px-0 font-menu text-[14px] text-gray-700 bg-transparent outline-none cursor-pointer focus:border-[#0489a9] transition appearance-none"
             required
             defaultValue=""
           >
             <option value="" disabled hidden>Select Area</option>
             <option value="animal-care">Animal Care</option>
             <option value="administration">Administration</option>
             <option value="event-organization">Event Organization</option>
             <option value="fostering">Fostering</option>
           </select>
         </div>

         {/* CV Upload Line */}
         <div className="flex flex-col gap-1.5 w-full mt-2">
           <label className="font-menu text-[14px] font-medium text-gray-700 ml-1 mb-1">Your CV</label>
           <button 
             type="button"
             onClick={openFileBrowser}
             className="font-menu text-[13px] border border-gray-300 rounded text-gray-600 bg-gray-50 max-w-fit px-4 py-1.5 hover:bg-gray-100 transition shadow-sm"
           >
             Choose File
           </button>
           {/* Hidden strict native file input */}
           <input 
             type="file" 
             ref={fileInputRef}
             className="hidden"
             accept=".pdf,.doc,.docx"
           />
         </div>

         {/* Tell us Textarea */}
         <div className="flex flex-col gap-1.5 w-full mt-4">
           <label className="font-menu text-[14px] font-medium text-gray-700 ml-1">Tell us about yourself?</label>
           <textarea 
             placeholder="Add descriptions on the value you can offer..." 
             rows={5}
             required
             className="w-full border border-gray-200 rounded p-4 font-menu text-[14px] text-gray-700 bg-transparent outline-none focus:border-[#0489a9] transition placeholder-gray-400 mt-1 resize-y"
           ></textarea>
         </div>

         {/* Submit Wrapper */}
         <div className="w-full flex justify-center mt-6">
           <button 
             type="submit" 
             className="font-heading bg-[#f08c50] hover:bg-[#d16830] transition text-white px-10 py-2.5 rounded text-[15px] font-semibold text-center shadow hover:shadow-md"
           >
             Submit
           </button>
         </div>

       </form>
    </section>
  );
}
