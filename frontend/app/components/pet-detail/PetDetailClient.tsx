'use client';

import React, { useState, useEffect } from 'react';

// Detail Page components
import PetProfileHero from './PetProfileHero';
import PetFactsGrid from './PetFactsGrid';
import PetFeatureChecklist from './PetFeatureChecklist';
import PetStorySection from './PetStorySection';
import PetAdoptionBanner from './PetAdoptionBanner';

export default function PetDetailClient({ petId }: { petId: string }) {
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const res = await fetch(`${url}/pets/${petId}`);
        if (!res.ok) throw new Error('Pet not found');
        const data = await res.json();
        setPet(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [petId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Oops!</h2>
        <p className="text-gray-600 mb-6">{error || 'Could not load pet details.'}</p>
        <button onClick={() => window.location.href='/find-pet'} className="bg-primary text-white py-2 px-6 rounded-md hover:bg-orange-600 transition">
          Browse Other Pets
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white z-0 mt-2">
      <PetProfileHero pet={pet} />
      <PetFactsGrid pet={pet} />
      <PetFeatureChecklist pet={pet} />
      <PetStorySection pet={pet} />
      <PetAdoptionBanner petId={petId} pet={pet} />
    </div>
  );
}
