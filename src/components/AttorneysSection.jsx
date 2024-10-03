import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import attorney01 from '../assets/attorney01.webp';
import attorney02 from '../assets/attorney02.webp';
import attorney03 from '../assets/attorney03.webp';

// Map of attorney images based on the image field from JSON content
const attorneyImages = {
  attorney01: attorney01,
  attorney02: attorney02,
  attorney03: attorney03,
};

const AttorneysSection = () => {
  const { content } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h1 className="font-primary text-center text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-primary mb-6">
          {content.attorneys_section.title}
        </h1>
        {content.attorneys_section.attorneys.map((attorney, index) => (
          <div key={index} className="mb-6">
            {/* Attorney Row */}
            <div
              className="flex items-center p-4 cursor-pointer border-b border-gray-300 hover:bg-gray-50"
              onClick={() => toggleDetails(index)}
              aria-expanded={expandedIndex === index} // Accessibility
              role="button"
              tabIndex={0} // Allow keyboard navigation
              onKeyDown={(e) => e.key === 'Enter' && toggleDetails(index)} // Keyboard accessibility
            >
              {/* Attorney Image */}
              <div
                className={`w-16 h-16 flex-shrink-0 overflow-hidden rounded-full transition-colors duration-300 ${
                  expandedIndex === index ? 'bg-buttonBg' : 'bg-gray-100'
                }`}
              >
                <img
                  src={attorneyImages[attorney.image]}
                  alt={`${attorney.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Title */}
              <div className="ml-4 flex-grow text-left">
                <h3 className="font-primary font-bold text-lg text-gray-900">{attorney.name}</h3>
                <p className="font-primary text-sm text-gray-600">{attorney.title}</p>
                <p className="font-primary text-xs text-gray-500">
                  {attorney.areas_of_practice.join(', ')}
                </p>
              </div>
            </div>

            {/* Expandable Details */}
            {expandedIndex === index && (
              <div className="ml-10 mt-4 p-4 bg-gray-50 border-l-4 border-buttonBg rounded-sm">
                <p className="text-gray-700 mb-2">{attorney.introduction}</p>

                <h4 className="font-primary font-bold mt-4">Education:</h4>
                <ul className="list-disc list-inside mb-2">
                  {attorney.education.map((edu, eduIndex) => (
                    <li key={eduIndex}>{edu}</li>
                  ))}
                </ul>

                <h4 className="font-primary font-bold mt-4">Work Experience:</h4>
                <ul className="list-disc list-inside mb-2">
                  {attorney.work_experience.map((work, workIndex) => (
                    <li key={workIndex}>{work}</li>
                  ))}
                </ul>

                <h4 className="font-primary font-bold mt-4">Professional Associations:</h4>
                <ul className="list-disc list-inside mb-2">
                  {attorney.professional_associations.map((assoc, assocIndex) => (
                    <li key={assocIndex}>{assoc}</li>
                  ))}
                </ul>

                <h4 className="font-primary font-bold mt-4">Awards:</h4>
                <ul className="list-disc list-inside">
                  {attorney.awards.map((award, awardIndex) => (
                    <li key={awardIndex}>
                      {award.name} ({award.year})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AttorneysSection;
