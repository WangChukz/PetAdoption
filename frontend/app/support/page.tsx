import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsletterSubscription from '../components/NewsletterSubscription';

// Support Page Components
import DonationSection from '../components/support/DonationSection';
import VolunteerSection from '../components/support/VolunteerSection';

export const metadata = {
  title: 'Support Us | PetJam',
  description: 'Make a donation or become a volunteer to help pets in need.',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white text-black font-body overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Main Content Area */}
      <main className="w-full bg-white z-0 mt-2 flex flex-col items-center">
        
        {/* 1. Donation Section (Financial & Food) */}
        <DonationSection />

        {/* 2. Volunteer Application Form */}
        <VolunteerSection />

      </main>

      {/* Adding negative margin to pull footer up underneath the floating Newsletter box */}
      <div className="-mt-16 relative z-0 w-full">
         <Footer />
      </div>
    </div>
  );
}
