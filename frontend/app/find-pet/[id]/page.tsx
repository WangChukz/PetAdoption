import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PetDetailClient from '../../components/pet-detail/PetDetailClient';

export default async function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen bg-white text-black font-body overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Main Content Area */}
      <main className="w-full bg-white z-0 mt-2">
        <PetDetailClient petId={resolvedParams.id} />
      </main>
      
      {/* Adding negative margin to pull footer up underneath the floating Newsletter box */}
      <div className="-mt-16 relative z-0">
         <Footer />
      </div>
    </div>
  );
}
