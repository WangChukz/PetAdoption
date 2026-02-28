import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Volunteer Page Components
import VolunteerHero from '../components/volunteer/VolunteerHero';
import VolunteerIntro from '../components/volunteer/VolunteerIntro';
import VolunteerPositions from '../components/volunteer/VolunteerPositions';
import VolunteerSignupForm from '../components/volunteer/VolunteerSignupForm';
import VolunteerSupportBanner from '../components/volunteer/VolunteerSupportBanner';

export const metadata = {
  title: 'Tình Nguyện Viên | PetJam',
  description: 'Tham gia đội ngũ tình nguyện viên Hanoi Pet Adoption và giúp đỡ những chú thú cưng cần được yêu thương.',
};

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-white text-black font-body overflow-x-hidden flex flex-col">
      <Header />

      {/* 1. Hero */}
      <VolunteerHero />

      {/* 2. Introduction */}
      <VolunteerIntro />

      {/* 3. Volunteer Positions */}
      <VolunteerPositions />

      {/* 4. Signup Form */}
      <VolunteerSignupForm />

      {/* 5. Support Banner */}
      <VolunteerSupportBanner />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
