import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AdoptionForm from '../../../components/adopt/AdoptionForm';

export default async function AdoptPetPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-body flex flex-col">
      <Header />
      
      <main className="flex-grow w-full z-0 mt-2 bg-[#F8FAFC]">
        <AdoptionForm petId={resolvedParams.id} />
      </main>

      <Footer />
    </div>
  );
}
