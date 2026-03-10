import React from 'react';

export default function PetStorySection({ pet }: { pet: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="w-full max-w-[950px] mx-auto pb-10">
        
        {/* Need a new home */}
        <div className="border-b border-dashed border-gray-300 pb-10 mb-10">
          <h2 className="font-heading font-bold text-[20px] md:text-[22px] text-[#1a1a1a] mb-6">
            Important Information
          </h2>
          <p className="font-menu text-[14.5px] text-gray-600 leading-relaxed italic whitespace-pre-wrap">
            {pet?.important_information || 'No specific medical or historical information provided.'}
          </p>
        </div>

        {/* Story */}
        <div>
          <h2 className="font-heading font-bold text-[20px] md:text-[22px] text-[#1a1a1a] mb-6">
            My Story
          </h2>
          <div className="font-menu text-[14.5px] text-gray-600 leading-relaxed italic space-y-5 whitespace-pre-wrap">
            {pet?.description ? (
              <p>{pet.description}</p>
            ) : (
              <>
                <p>
                  Highly energetic and friendly little rascal who if you don't know retains in guilty, that he is regular at play.
                </p>
                <p>
                  He loves to run and play:<br />
                  - catching<br />
                  - tug-of-toys<br />
                  - fetching<br />
                  - messing his toy with other dogs<br />
                  - napping with his people 
                </p>
                <p>
                  She wants to be involved in whatever you're doing and hates being left out. Truly! So much nobody dares stay quietly and will climb on your lap despite being a bit too big.
                </p>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
