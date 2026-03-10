'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

import { getPetImageUrl } from '@/lib/imageUtils';

export default function FindPetPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('Loài');
  const [breed, setBreed] = useState('Giống');
  const [ageFilter, setAgeFilter] = useState('Độ tuổi');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (species !== 'Loài') query.append('species', species);
      if (breed !== 'Giống') query.append('breed', breed);
      if (ageFilter !== 'Độ tuổi') query.append('age', ageFilter);

      const res = await fetch(`${url}/pets?${query.toString()}`);
      const data = await res.json();
      setPets(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();

    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getAgeDisplay = (pet: any) => {
    if (pet.age_months !== null && pet.age_months !== undefined) {
      if (pet.age_months < 12) return `${pet.age_months} tháng`;
      const years = Math.floor(pet.age_months / 12);
      const months = pet.age_months % 12;
      if (months === 0) return `${years} tuổi`;
      return `${years} tuổi ${months} tháng`;
    }
    return pet.age ? `${pet.age} ${pet.age_unit || 'tuổi'}` : '1 tuổi';
  };

  const handleDropdownClick = (e: React.MouseEvent, dropdownName: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-body overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Hero Search Section */}
      <section className="relative w-full h-[450px] md:h-[550px] flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-[#2b1f15]">
          <Image 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1920&auto=format&fit=crop" 
            alt="Hero Background"
            fill
            className="object-cover brightness-[0.65] object-center"
            priority
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center px-4 w-full mt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 text-center tracking-tight">
            Tìm người bạn <span className="text-[#f08c50]">bốn chân</span> của bạn
          </h1>
          <p className="text-white/90 text-center max-w-2xl text-sm md:text-lg font-medium mb-12 drop-shadow-md">
            Mang lại mái ấm yêu thương cho những tâm hồn bé nhỏ đang chờ đợi bạn.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-2 md:p-3 w-full max-w-5xl shadow-2xl flex flex-col md:flex-row items-center gap-1">
            <div className="flex-[1.5] flex items-center px-5 h-[54px] border-b md:border-b-0 md:border-r border-slate-100 w-full">
              <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchPets()}
                placeholder="Tìm kiếm thú cưng..." 
                className="w-full bg-transparent outline-none text-slate-700 text-[15px] font-medium placeholder:font-normal"
              />
            </div>
            
            <div className="flex-[3] flex w-full flex-col sm:flex-row gap-0">
              
              {/* Species Dropdown */}
              <div 
                className="flex-1 h-[54px] flex items-center px-4 border-b sm:border-b-0 sm:border-r border-slate-100 relative group cursor-pointer"
                onClick={(e) => handleDropdownClick(e, 'species')}
              >
                <div className="w-full flex items-center justify-between">
                  <span className={`font-semibold text-[14px] ${species !== 'Loài' ? 'text-slate-800' : 'text-slate-600'}`}>{species}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${activeDropdown === 'species' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'species' && (
                  <div className="absolute top-[110%] left-0 w-full sm:min-w-[140px] bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-[10px] overflow-hidden z-20 py-1" onClick={(e) => e.stopPropagation()}>
                    {['Loài', 'Chó', 'Mèo'].map(opt => (
                      <div 
                        key={opt} 
                        onClick={() => { setSpecies(opt); setActiveDropdown(null); }} 
                        className={`px-4 py-2.5 text-[14px] cursor-pointer hover:bg-slate-50 transition-colors ${species === opt ? 'font-bold text-[#4890A9] bg-[#4890A9]/5' : 'text-slate-700 font-medium'}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Breed Dropdown */}
              <div 
                className="flex-1 h-[54px] flex items-center px-4 border-b sm:border-b-0 sm:border-r border-slate-100 relative group cursor-pointer"
                onClick={(e) => handleDropdownClick(e, 'breed')}
              >
                <div className="w-full flex items-center justify-between">
                   <span className={`font-semibold text-[14px] ${breed !== 'Giống' ? 'text-slate-800' : 'text-slate-600'}`}>{breed}</span>
                   <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${activeDropdown === 'breed' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'breed' && (
                  <div className="absolute top-[110%] left-0 w-full sm:min-w-[160px] bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-[10px] overflow-hidden z-20 py-1" onClick={(e) => e.stopPropagation()}>
                    {['Giống', 'Poodle', 'Husky', 'Mèo Anh', 'Corgi'].map(opt => (
                      <div 
                        key={opt} 
                        onClick={() => { setBreed(opt); setActiveDropdown(null); }} 
                        className={`px-4 py-2.5 text-[14px] cursor-pointer hover:bg-slate-50 transition-colors ${breed === opt ? 'font-bold text-[#4890A9] bg-[#4890A9]/5' : 'text-slate-700 font-medium'}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Age Dropdown */}
              <div 
                className="flex-1 h-[54px] flex items-center px-4 md:border-r border-slate-100 relative group cursor-pointer"
                onClick={(e) => handleDropdownClick(e, 'ageFilter')}
              >
                <div className="w-full flex items-center justify-between">
                   <span className={`font-semibold text-[14px] ${ageFilter !== 'Độ tuổi' ? 'text-slate-800' : 'text-slate-600'}`}>{ageFilter}</span>
                   <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${activeDropdown === 'ageFilter' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'ageFilter' && (
                  <div className="absolute top-[110%] left-0 right-0 sm:min-w-[150px] bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-[10px] overflow-hidden z-20 py-1" onClick={(e) => e.stopPropagation()}>
                    {['Độ tuổi', 'Dưới 1 tuổi', '1 - 3 tuổi', 'Trên 3 tuổi'].map(opt => (
                      <div 
                        key={opt} 
                        onClick={() => { setAgeFilter(opt); setActiveDropdown(null); }} 
                        className={`px-4 py-2.5 text-[14px] cursor-pointer hover:bg-slate-50 transition-colors ${ageFilter === opt ? 'font-bold text-[#4890A9] bg-[#4890A9]/5' : 'text-slate-700 font-medium'}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <button 
              onClick={fetchPets}
              className="w-full md:w-auto px-10 py-3 bg-[#4890A9] hover:bg-[#3A8D9D] transition-all text-white font-bold rounded-xl whitespace-nowrap text-[15px] h-[54px] shadow-lg shadow-[#4890A9]/20 md:ml-2"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* Latest Pets Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full mb-10">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-[28px] md:text-[32px] font-black text-[#001529] tracking-tight">Thú cưng mới nhất</h2>
          <div className="flex gap-3">
            <button className="w-[42px] h-[42px] rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-300 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-[42px] h-[42px] rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-300 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[1,2,3,4].map(i => (
               <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-[420px]"></div>
             ))}
           </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pets.map((pet: any) => (
              <div key={pet.id} className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
                {/* Image Area */}
                <div className="relative w-full aspect-[4/3.6] bg-slate-50 overflow-hidden">
                  <img 
                    src={getPetImageUrl(pet.image_url)}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Tags */}
                  {pet.status === 'urgent' && (
                    <div className="absolute top-3 right-3 bg-[#f08c50] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      URGENT
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-4 flex flex-col flex-1 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-extrabold text-[17px] text-slate-900 group-hover:text-[#4890A9] transition-colors leading-none">{pet.name}</h3>
                    {(pet.gender === 'female' || pet.gender === 'mái') ? (
                      <span className="text-[#f472b6] text-[13px] font-medium leading-none">female</span>
                    ) : (
                      <span className="text-[#3b82f6] text-[13px] font-medium leading-none">male</span>
                    )}
                  </div>
                  
                  <p className="text-[#475569] text-[13px] font-medium mb-1">{pet.breed || pet.species || 'Chưa rõ giống'}</p>
                  <p className="text-[#475569] text-[13px] font-medium mb-5">{getAgeDisplay(pet)}</p>
                  
                  <div className="mt-auto">
                    <Link href={`/find-pet/${pet.id}`} className="block w-full">
                      <button className="w-full bg-[#f8fafc] text-slate-800 font-bold py-3 rounded-xl text-[14px] transition-all duration-300 hover:bg-slate-100">
                        Xem chi tiết
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center border border-dashed border-slate-200 rounded-3xl">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">pets</span>
            <p className="text-slate-500 font-medium">Chưa có thú cưng nào sẵn sàng lúc này.</p>
          </div>
        )}
      </section>

      {/* Statistics Section */}
      <section className="bg-[#f8fafc] w-full py-16 md:py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-black text-[#4890A9] mb-3">1.2k+</h3>
            <p className="text-slate-600 text-[13px] font-bold uppercase tracking-wider">Thành công</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-black text-[#4890A9] mb-3">500+</h3>
            <p className="text-slate-600 text-[13px] font-bold uppercase tracking-wider">Thú cưng sẵn sàng</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-black text-[#4890A9] mb-3">200+</h3>
            <p className="text-slate-600 text-[13px] font-bold uppercase tracking-wider">Tình nguyện viên</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-black text-[#4890A9] mb-3">15</h3>
            <p className="text-slate-600 text-[13px] font-bold uppercase tracking-wider">Trạm cứu hộ</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
