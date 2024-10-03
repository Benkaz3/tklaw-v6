import award1 from '../assets/award1.png';
import award2 from '../assets/award2.png';
import award3 from '../assets/award3.png';
import award4 from '../assets/award4.png';
import { useLanguage } from './LanguageProvider';

function AwardsSection() {
  const { content } = useLanguage();

  // List of awards
  const awards = [
    { id: 1, image: award1 },
    { id: 2, image: award2 },
    { id: 3, image: award3 },
    { id: 4, image: award4 },
  ];

  return (
    <section className="py-8 px-4 sm:px-8 md:px-16">
      <h2 className="text-start text-white text-3xl mb-4">{content.global.labels.awards_label}</h2>
      <div className="flex items-center justify-center space-x-5">
        {awards.map((award) => (
          <div key={award.id} className="flex items-center justify-center p-1 rounded-md">
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
