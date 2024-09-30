import attorney01 from '../assets/attorney01.webp';
import attorney02 from '../assets/attorney02.webp';
import attorney03 from '../assets/attorney03.webp';

// Sample attorney data with imported images and descriptions
const attorneys = [
  {
    name: 'John Doe',
    title: 'Senior Partner',
    image: attorney01,
    description:
      'John has over 20 years of experience in corporate law, specializing in mergers and acquisitions. His expertise has helped numerous clients navigate complex legal challenges.',
  },
  {
    name: 'Jane Smith',
    title: 'Associate Attorney',
    image: attorney02,
    description:
      'Jane focuses on family law and estate planning, providing compassionate support and expert legal advice for families and individuals seeking guidance.',
  },
  {
    name: 'Michael Brown',
    title: 'Legal Counsel',
    image: attorney03,
    description:
      'Michael is an experienced legal counsel, with a deep focus on intellectual property and technology law, ensuring clients are protected in the digital age.',
  },
];

const AttorneysSection = () => {
  return (
    <section className="bg-background py-8">
      <div className="container mx-auto">
        {attorneys.map((attorney, index) => (
          <div
            key={index}
            className={`mb-4 flex flex-col sm:flex-row items-center bg-white p-4 ${index !== attorneys.length - 1 ? 'border-b border-gray-300' : ''}`}
          >
            {/* Attorney Image */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-full bg-buttonBg transition-colors duration-300 hover:bg-opacity-90">
              <img
                src={attorney.image}
                alt={`${attorney.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name, Title */}
            <div className="sm:ml-6 mt-4 sm:mt-0 flex-grow text-center sm:text-left ">
              <h3 className="font-bold text-lg text-gray-900">{attorney.name}</h3>
              <p className="text-sm text-gray-600">{attorney.title}</p>

              {/* Separator */}
              <hr className="my-4 border-gray-300" />

              {/* Description and Read More Button */}
              <p className="text-gray-700 mb-4">
                {attorney.description}
              </p>
              <button className="text-buttonBg font-medium hover:underline">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AttorneysSection;
