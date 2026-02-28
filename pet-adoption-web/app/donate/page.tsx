import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DonateHero from '../components/donate/DonateHero';
import QuickDonate from '../components/donate/QuickDonate';
import UrgentCauses from '../components/donate/UrgentCauses';
import DonationForm from '../components/donate/DonationForm';
import MoneyBreakdown from '../components/donate/MoneyBreakdown';
import DonateFAQ from '../components/donate/DonateFAQ';

export const metadata = {
  title: 'Donate | PetJam – Help Pets Find Loving Homes',
  description: 'Make a donation to support rescued pets. Your contribution funds medical care, food, and shelter for animals in need.',
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white text-black font-body overflow-x-hidden flex flex-col">
      <Header />

      {/* 1. Hero */}
      <DonateHero />

      {/* 2. Quick Donate */}
      <QuickDonate />

      {/* 3. Urgent Causes */}
      <UrgentCauses />

      {/* 4. Full Donation Form */}
      <DonationForm />

      {/* 5. Where Money Goes */}
      <MoneyBreakdown />

      {/* 6. FAQ */}
      <DonateFAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}
