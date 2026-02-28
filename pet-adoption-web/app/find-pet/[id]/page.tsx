import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NewsletterSubscription from '../../components/NewsletterSubscription';

// Detail Page components
import PetProfileHero from '../../components/pet-detail/PetProfileHero';
import PetFactsGrid from '../../components/pet-detail/PetFactsGrid';
import PetFeatureChecklist from '../../components/pet-detail/PetFeatureChecklist';
import PetStorySection from '../../components/pet-detail/PetStorySection';
import PetAdoptionBanner from '../../components/pet-detail/PetAdoptionBanner';

export default function PetDetailPage({ params }: { params: { id: string } }) {
  // Ideally, use the `id` from `params` to fetch actual pet info instead of mock
  
  return (
    <div className="min-h-screen bg-white text-black font-body overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Main Content Area */}
      <main className="w-full bg-white z-0 mt-2">
        
        {/* 1. Hero */}
        <PetProfileHero />

        {/* 2. Pet Facts Grid */}
        <PetFactsGrid />

        {/* 3. My Info Checklists */}
        <PetFeatureChecklist />

        {/* 4. Why I need a home & My Story */}
        <PetStorySection />

        {/* 5. Adoption Banner */}
        <PetAdoptionBanner />

      </main>
      {/* Adding negative margin to pull footer up underneath the floating Newsletter box */}
      <div className="-mt-16 relative z-0">
         <Footer />
      </div>
    </div>
  );
}
