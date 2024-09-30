import React from 'react';
import award1 from '../assets/award1.webp';
import award2 from '../assets/award2.webp';
import award3 from '../assets/award3.webp';
import award4 from '../assets/award4.webp';
import award5 from '../assets/award5.webp';

function AwardsSection() {
  // List of awards
  const awards = [
    { id: 1, image: award1 },
    { id: 2, image: award2 },
    { id: 3, image: award3 },
    { id: 4, image: award4 },
    { id: 5, image: award5 },
  ];

  return (
    <section className="py-8 px-4 sm:px-8 md:px-16 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-6">Our Awards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {awards.map((award) => (
          <div key={award.id} className="flex items-center justify-center p-4 border border-gray-300 rounded-md">
            <img
              src={award.image}
              alt={`Award ${award.id}`}
              className="max-h-24 max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AwardsSection;
