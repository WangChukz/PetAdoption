'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdoptionForm({ petId }: { petId: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [pet, setPet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    address: '',
    home_type: 'house',
    ownership: 'own',
    has_fenced_yard: false,
    adults_count: 1,
    children_count: 0,
    has_allergy: false,
    has_pet_experience: false,
    current_pets: '',
    hours_alone: 4,
    sleep_arrangements: '',
    motivation: '',
  });

  useEffect(() => {
    // Fetch pet details
    const fetchPet = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const res = await fetch(`${url}/pets/${petId}`);
        if (!res.ok) throw new Error('Pet not found');
        const data = await res.json();
        setPet(data);
        
        // Load draft if any
        const draft = localStorage.getItem(`adoption_draft_${petId}`);
        if (draft) {
          setFormData(JSON.parse(draft));
        }
      } catch (err) {
        setError('Could not load pet details. It may not be available.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPet();
  }, [petId]);

  // Save draft
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(`adoption_draft_${petId}`, JSON.stringify(formData));
    }
  }, [formData, petId, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('token');
      const res = await fetch(`${url}/adoptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          ...formData,
          pet_id: petId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit application');
      }

      // Success
      localStorage.removeItem(`adoption_draft_${petId}`);
      setStep(4);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="py-20 text-center text-slate-500">Loading...</div>;
  if (!pet && !isLoading) return <div className="py-20 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-body">
      {step < 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Adoption Application</h1>
                    <p className="text-slate-500 mt-1">
                      Step {step} of 3: {step === 1 ? 'Personal Information' : step === 2 ? 'Living Situation' : 'Experience'}
                    </p>
                  </div>
                  <span className="text-[#3A8D9D] font-bold text-lg">{Math.round((step / 3) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-[#3A8D9D] h-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className={step >= 1 ? "text-[#3A8D9D]" : ""}>Personal Info</span>
                  <span className={step >= 2 ? "text-[#3A8D9D]" : ""}>Living Situation</span>
                  <span className={step >= 3 ? "text-[#3A8D9D]" : ""}>Experience</span>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
                <span className="font-bold flex items-center gap-2"><span className="material-symbols-outlined">error</span> Error:</span> {error}
              </div>
            )}

            {/* Form Steps */}
            <form className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden" onSubmit={handleSubmit}>
              <div className="p-8">
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                      <span className="material-symbols-outlined text-[#3A8D9D]">person</span>
                      <h3 className="text-xl font-bold text-slate-800">Applicant Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                        <input required name="full_name" value={formData.full_name} onChange={handleChange} className="rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#3A8D9D] focus:border-[#3A8D9D] transition-all" placeholder="John Doe" type="text" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                        <input required name="phone" value={formData.phone} onChange={handleChange} className="rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#3A8D9D] focus:border-[#3A8D9D] transition-all" placeholder="(555) 000-0000" type="tel" />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <input required name="email" value={formData.email} onChange={handleChange} className="rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#3A8D9D] focus:border-[#3A8D9D] transition-all" placeholder="john@example.com" type="email" />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Physical Address</label>
                        <textarea required name="address" value={formData.address} onChange={handleChange} className="rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#3A8D9D] focus:border-[#3A8D9D] transition-all" placeholder="123 Rescue Way, Happy Valley, CA" rows={3}></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                      <span className="material-symbols-outlined text-[#3A8D9D]">home</span>
                      <h3 className="text-xl font-bold text-slate-800">Living Environment</h3>
                    </div>
                    
                    {/* Home Type */}
                    <div className="space-y-4">
                      <label className="block text-sm font-bold uppercase tracking-wider text-slate-500">What is your home type?</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['house', 'apartment', 'condo', 'other'].map(type => (
                          <label key={type} className="cursor-pointer group">
                            <input checked={formData.home_type === type} onChange={() => setFormData(p => ({...p, home_type: type}))} className="hidden peer" name="home_type" type="radio" value={type}/>
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-100 peer-checked:border-[#3A8D9D] peer-checked:bg-[#3A8D9D]/5 transition-all">
                              <span className={`material-symbols-outlined text-3xl mb-2 ${formData.home_type === type ? 'text-[#3A8D9D]' : 'text-slate-400 group-hover:text-[#3A8D9D]'}`}>
                                {type === 'house' ? 'home' : type === 'apartment' ? 'apartment' : type === 'condo' ? 'domain' : 'grid_view'}
                              </span>
                              <span className="text-sm font-medium capitalize">{type}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Own or Rent + Yard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-4">
                        <label className="block text-sm font-bold uppercase tracking-wider text-slate-500">Do you own or rent?</label>
                        <div className="flex gap-4">
                          {['own', 'rent'].map(ownType => (
                            <label key={ownType} className="flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                              <input checked={formData.ownership === ownType} onChange={handleChange} className="w-5 h-5 text-[#3A8D9D] focus:ring-[#3A8D9D] border-slate-300" name="ownership" type="radio" value={ownType}/>
                              <span className="font-medium capitalize">{ownType}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="bg-[#3A8D9D]/10 p-2 rounded-lg text-[#3A8D9D]">
                            <span className="material-symbols-outlined">fence</span>
                          </div>
                          <div>
                            <p className="font-semibold">Fenced yard?</p>
                            <p className="text-sm text-slate-500">Required for large breeds</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" name="has_fenced_yard" checked={formData.has_fenced_yard} onChange={handleChange} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3A8D9D]"></div>
                        </label>
                      </div>
                    </div>

                    {/* Household Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Number of Adults</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <span className="material-symbols-outlined">person</span>
                          </span>
                          <input required min="1" name="adults_count" value={formData.adults_count} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-[#3A8D9D] focus:ring-[#3A8D9D]" placeholder="1" type="number" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Number of Children</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <span className="material-symbols-outlined">child_care</span>
                          </span>
                          <input min="0" name="children_count" value={formData.children_count} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-[#3A8D9D] focus:ring-[#3A8D9D]" placeholder="0" type="number" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <input name="has_allergy" checked={formData.has_allergy} onChange={handleChange} className="mt-1 w-5 h-5 rounded text-[#3A8D9D] focus:ring-[#3A8D9D] border-slate-300" id="allergy" type="checkbox" />
                        <label className="text-sm text-slate-700 cursor-pointer" htmlFor="allergy">
                            <span className="font-bold block">Allergy Check</span>
                            Are any household members allergic to pets? If checked, we may require a doctor's clearance.
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                      <span className="material-symbols-outlined text-[#3A8D9D]">pets</span>
                      <h3 className="text-xl font-bold text-slate-800">Your Experience</h3>
                    </div>
                
                    <div className="space-y-4">
                      <label className="block text-sm font-bold text-slate-700">Have you owned pets before?</label>
                      <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer group">
                          <input checked={formData.has_pet_experience === true} onChange={() => setFormData(p => ({...p, has_pet_experience: true}))} className="peer hidden" name="has_pet_experience" type="radio"/>
                          <div className="flex items-center justify-center p-4 rounded-xl border-2 border-slate-100 peer-checked:border-[#3A8D9D] peer-checked:bg-[#3A8D9D]/5 transition-all">
                            <span className={`font-semibold ${formData.has_pet_experience ? 'text-[#3A8D9D]' : 'text-slate-600'}`}>Yes, I have</span>
                          </div>
                        </label>
                        <label className="flex-1 cursor-pointer group">
                          <input checked={formData.has_pet_experience === false} onChange={() => setFormData(p => ({...p, has_pet_experience: false}))} className="peer hidden" name="has_pet_experience" type="radio"/>
                          <div className="flex items-center justify-center p-4 rounded-xl border-2 border-slate-100 peer-checked:border-[#3A8D9D] peer-checked:bg-[#3A8D9D]/5 transition-all">
                            <span className={`font-semibold ${!formData.has_pet_experience ? 'text-[#3A8D9D]' : 'text-slate-600'}`}>No, first time</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700">Which pets do you currently own?</label>
                        <textarea name="current_pets" value={formData.current_pets} onChange={handleChange} className="w-full rounded-xl border-slate-200 focus:ring-[#3A8D9D] focus:border-[#3A8D9D]" placeholder="List your current pets and their temperaments (optional)..." rows={2}></textarea>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-700">How many hours will the pet be alone daily?</label>
                        <span className="px-3 py-1 bg-[#3A8D9D]/10 text-[#3A8D9D] rounded-full text-xs font-bold">{formData.hours_alone} Hours</span>
                      </div>
                      <input name="hours_alone" value={formData.hours_alone} onChange={handleChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#3A8D9D]" max="24" min="0" step="1" type="range" />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        <span>Always with someone</span>
                        <span>Full Work Day (8h)</span>
                        <span>12+ Hours</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-700">Where will the pet sleep?</label>
                      <textarea required minLength={5} name="sleep_arrangements" value={formData.sleep_arrangements} onChange={handleChange} className="w-full rounded-xl border-slate-200 focus:ring-[#3A8D9D] focus:border-[#3A8D9D]" placeholder="e.g., In my bedroom, in their own crate, on the sofa..." rows={2}></textarea>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-700">Why are you interested in this specific pet?</label>
                      <textarea required minLength={20} name="motivation" value={formData.motivation} onChange={handleChange} className="w-full rounded-xl border-slate-200 focus:ring-[#3A8D9D] focus:border-[#3A8D9D]" placeholder="Tell us what caught your eye..." rows={4}></textarea>
                    </div>
                  </div>
                )}

              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between p-8 border-t border-slate-100 bg-slate-50/50">
                {step > 1 ? (
                  <button type="button" onClick={handleBack} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 transition-all">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back
                  </button>
                ) : (
                  <button type="button" onClick={() => router.back()} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 transition-all">
                    Cancel
                  </button>
                )}
                
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#f08c50] text-white font-bold shadow-md hover:bg-opacity-90 active:scale-95 transition-all disabled:opacity-50">
                  {isSubmitting ? 'Processing...' : step === 3 ? 'Submit Application' : 'Next Step'}
                  {step < 3 && <span className="material-symbols-outlined">arrow_forward</span>}
                  {step === 3 && !isSubmitting && <span className="material-symbols-outlined">send</span>}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
                <div className="relative h-56 w-full">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pet.primary_image || 'https://via.placeholder.com/400'})` }}></div>
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#3A8D9D] shadow-sm">
                        PET PROFILE
                   </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">{pet.name}</h2>
                      <p className="text-[#3A8D9D] font-semibold">{pet.breed || 'Mixed Breed'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Age</p>
                      <p className="font-bold text-sm">{pet.age} {pet.age_unit || 'years'}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Sex</p>
                      <p className="font-bold text-sm capitalize">{pet.gender || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>{pet.location || 'Local Shelter'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#3A8D9D] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold mb-2">Why adopt?</h4>
                  <p className="text-sm text-white/90 leading-relaxed">By adopting, you're not just giving a home to a pet in need, you're saving a life and making room for another rescue.</p>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/10 text-9xl">format_quote</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Screen */}
      {step === 4 && (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
                <div className="relative w-full aspect-[16/9] bg-[#3A8D9D]/10 flex flex-col items-center justify-center p-8 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#f08c50]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#3A8D9D]/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-6 h-24 w-24 rounded-full bg-[#f08c50] flex items-center justify-center shadow-lg shadow-[#f08c50]/30">
                    <span className="material-symbols-outlined text-5xl text-white font-bold">check</span>
                    </div>
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl mb-4">
                    <img alt={pet.name} className="w-full h-full object-cover" src={pet.primary_image || 'https://via.placeholder.com/400'} />
                    </div>
                </div>
                </div>
                
                <div className="p-8 sm:p-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted Successfully!</h1>
                    <p className="text-lg text-slate-600">
                    Thank you! Our team will review your application for <span className="font-semibold text-[#f08c50]">{pet.name}</span> within 48 hours.
                    </p>
                </div>
                
                <div className="mb-12">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 text-center">What happens next?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-12 h-12 rounded-xl bg-[#3A8D9D]/10 text-[#3A8D9D] flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined">fact_check</span>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2 text-sm">1. Review</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Our team carefully reviews your profile.</p>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-12 h-12 rounded-xl bg-[#3A8D9D]/10 text-[#3A8D9D] flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined">forum</span>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2 text-sm">2. Interview</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">We will schedule a quick call with you.</p>
                    </div>
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-12 h-12 rounded-xl bg-[#3A8D9D]/10 text-[#3A8D9D] flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined">diversity_1</span>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2 text-sm">3. Meet & Greet</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">You will get to meet the pet in person.</p>
                    </div>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={() => router.push('/')} className="w-full sm:w-auto px-8 py-3 bg-[#f08c50] hover:bg-[#f08c50]/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#f08c50]/20 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">home</span>
                    Return Home
                    </button>
                    <button onClick={() => router.push('/find-pet')} className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">pets</span>
                    Find More Pets
                    </button>
                </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
