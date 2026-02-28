import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdoptionTips from '../components/AdoptionTips';
import NewsletterSubscription from '../components/NewsletterSubscription';

export default function FindPetPage() {
  const mockPets = [
    { id: 1, name: 'Koba', species: 'Dog / Husky', age: '1 Year / Male', image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=600&auto=format&fit=crop' },
    { id: 2, name: 'Milo', species: 'Cat / Persian', age: '2 Years / Male', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop' },
    { id: 3, name: 'Rex', species: 'Dog / Collie', age: '1 Year / Male', image: 'https://images.unsplash.com/photo-1537151608804-ea2f1faeb69c?q=80&w=600&auto=format&fit=crop' },
    { id: 4, name: 'Luna', species: 'Dog / Beagle', age: '8 Months / Female', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop' },
    { id: 5, name: 'Binky', species: 'Rabbit / Lop', age: '3 Years / Female', image: 'https://images.unsplash.com/photo-1585110396000-c9fd4e4e5088?q=80&w=600&auto=format&fit=crop' },
    { id: 6, name: 'Bella', species: 'Cat / Siamese', age: '1 Year / Female', image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-body overflow-x-hidden flex flex-col">
      <Header />
      
      {/* Hero Search Section */}
      <section className="w-full bg-[#0489a9] flex flex-col items-center justify-center relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-end justify-center mix-blend-overlay">
          {/* Faint background grid of pets or shapes to match the silhouette design */}
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop)' }}></div>
        </div>
        
        {/* Search Bar Container */}
        <div className="w-[90%] max-w-5xl bg-[#1a1a1a] p-[3px] shadow-2xl z-10 mx-4">
          <div className="w-full bg-white flex flex-col md:flex-row items-center justify-between">
             <div className="flex-1 flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-gray-200">
               <div className="flex-1 px-4 py-3 flex items-center bg-transparent text-gray-500 font-menu text-[13px] md:text-[14px] min-h-[55px]">
                 <select className="w-full bg-transparent outline-none cursor-pointer flex-1 text-gray-800 font-medium">
                   <option>Location / Address</option>
                   <option>New York</option>
                   <option>Los Angeles</option>
                   <option>Chicago</option>
                 </select>
               </div>
               <div className="flex-1 px-4 py-3 flex items-center bg-transparent text-gray-500 font-menu text-[13px] md:text-[14px] min-h-[55px]">
                 <select className="w-full bg-transparent outline-none cursor-pointer flex-1 text-gray-800 font-medium">
                   <option>Category</option>
                   <option>Shelter</option>
                   <option>Foster</option>
                 </select>
               </div>
               <div className="flex-1 px-4 py-3 flex items-center bg-transparent text-gray-500 font-menu text-[13px] md:text-[14px] min-h-[55px]">
                 <select className="w-full bg-transparent outline-none cursor-pointer flex-1 text-gray-800 font-medium">
                   <option>Animals</option>
                   <option>Dog</option>
                   <option>Cat</option>
                   <option>Parrot</option>
                 </select>
               </div>
               <div className="flex-1 px-4 py-3 flex items-center bg-transparent text-gray-500 font-menu text-[13px] md:text-[14px] min-h-[55px]">
                 <select className="w-full bg-transparent outline-none cursor-pointer flex-1 text-gray-800 font-medium">
                   <option>Dogs</option>
                   <option>Husky</option>
                   <option>Beagle</option>
                   <option>Poodle</option>
                 </select>
               </div>
             </div>
             
             {/* Search Button that touches the edge of the wrapper */}
             <button className="bg-[#f08c50] hover:bg-[#d16830] transition text-white px-8 md:px-10 py-3 md:py-0 h-[55px] md:h-full min-h-[55px] w-full md:w-auto font-heading font-semibold text-[15px] md:text-[16px] m-[2px]">
               Search
             </button>
          </div>
        </div>
      </section>

      {/* Adopt a Pet */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center w-full bg-white z-0">
        
        {/* Header & Button */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between mb-8 md:mb-10 gap-4">
          <h2 className="font-heading font-black text-[26px] md:text-[34px] lowercase first-letter:uppercase text-[#1a1a1a] tracking-tight">
            Adopt a pet
          </h2>
          <button className="font-heading bg-[#f08c50] hover:bg-[#d16830] transition px-8 py-2.5 rounded font-semibold text-[14px] shadow-sm hover:shadow text-white">
            View all
          </button>
        </div>

        {/* Filters */}
        <div className="w-full max-w-5xl flex justify-center items-center gap-6 md:gap-14 text-[14px] md:text-[16px] font-heading font-bold mb-12 border-b border-gray-100 pb-0">
          <button className="text-[#f08c50] border-b-[3px] border-[#f08c50] pb-2 px-1 -mb-[1.5px]">All</button>
          <button className="text-gray-400 hover:text-gray-800 transition pb-2 px-1 -mb-[1.5px] border-b-[3px] border-transparent hover:border-gray-200">Cat</button>
          <button className="text-gray-400 hover:text-gray-800 transition pb-2 px-1 -mb-[1.5px] border-b-[3px] border-transparent hover:border-gray-200">Dog</button>
          <button className="text-gray-400 hover:text-gray-800 transition pb-2 px-1 -mb-[1.5px] border-b-[3px] border-transparent hover:border-gray-200">Parrots</button>
          <button className="text-gray-400 hover:text-gray-800 transition pb-2 px-1 -mb-[1.5px] border-b-[3px] border-transparent hover:border-gray-200">Fishes</button>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
          {mockPets.map((pet) => (
            <Link key={pet.id} href={`/find-pet/${pet.id}`} className="group relative w-full aspect-[4/5] md:aspect-[4/3.8] rounded-md overflow-hidden shadow hover:shadow-xl transition-shadow cursor-pointer bg-[#1a1a1a]">
              <Image 
                src={pet.image} 
                alt={pet.name} 
                fill 
                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out" 
              />
              <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/90 to-transparent p-5 flex flex-col justify-end text-left z-10 transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
                <h3 className="font-heading font-black text-[#f08c50] text-[20px] mb-1">{pet.name}</h3>
                <p className="text-white font-menu text-[14px] font-medium opacity-95 mb-0.5">{pet.species}</p>
                <p className="text-gray-400 font-menu text-[13px]">{pet.age}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Adoption Tips */}
      <AdoptionTips />

      {/* Adding negative margin to pull footer up underneath the floating Newsletter box */}
      <div className="-mt-16 relative z-0">
         <Footer />
      </div>
    </div>
  )
}
