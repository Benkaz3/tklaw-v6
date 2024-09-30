import { FiArrowRight } from 'react-icons/fi';
import { FaUser, FaBullseye, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageProvider';

function WhyUsSection() {
  const { content } = useLanguage();

  return (
    <section className="relative w-full bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8 md:px-16">
        {/* Left side: Title, Subtitle, and Button */}
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-md text-center lg:text-left flex flex-col justify-center">
          <h2 className="font-primary text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            {content.whyUs.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6">
            {content.whyUs.subtitle}
          </p>
          <Link
            to="/contact"
            className="uppercase inline-flex items-center justify-center rounded-sm bg-buttonBg text-white py-3 px-5 hover:bg-white hover:text-buttonBg transition duration-300"
          >
            {content.whyUs.buttonText}
            <FiArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Right side: Points with icons */}
        <div className="flex flex-col justify-center space-y-6 text-black">
          {content.whyUs.points.map((point, index) => (
            <div key={index} className="flex items-start space-x-4">
              {/* Icon for each point */}
              <div className="text-buttonBg text-3xl sm:text-4xl lg:text-5xl">
                {index === 0 && <FaUser />}
                {index === 1 && <FaBullseye />}
                {index === 2 && <FaTrophy />}
              </div>
              {/* Title and Description */}
              <div>
                <h3 className="text-black text-base sm:text-lg lg:text-xl font-bold">{point.title}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;
