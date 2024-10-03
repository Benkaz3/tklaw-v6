
import { Link } from 'react-router-dom';
import { FaBriefcase, FaUsers, FaHome, FaGavel } from 'react-icons/fa'; // Importing specific icons
import { useLanguage } from '../components/LanguageProvider';
import heroBg from '../assets/practices_hero_bg.png';
import Breadcrumb from '../components/Breadcrumb';

function PracticesPage() {
  const { content } = useLanguage();

  // Mapping practice areas to their corresponding icons
  const practiceAreas = [
    {
      name: content.practices.areasOfPractice[0].name,
      description: content.practices.areasOfPractice[0].description,
      additionalInfo: content.practices.areasOfPractice[0].additionalInfo,
      slug: content.practices.areasOfPractice[0].slug,
      icon: <FaBriefcase className="h-16 w-16 mx-auto mb-4" />,
    },
    {
      name: content.practices.areasOfPractice[1].name,
      description: content.practices.areasOfPractice[1].description,
      additionalInfo: content.practices.areasOfPractice[1].additionalInfo,
      slug: content.practices.areasOfPractice[1].slug,
      icon: <FaUsers className="h-16 w-16 mx-auto mb-4" />,
    },
    {
      name: content.practices.areasOfPractice[2].name,
      description: content.practices.areasOfPractice[2].description,
      additionalInfo: content.practices.areasOfPractice[2].additionalInfo,
      slug: content.practices.areasOfPractice[2].slug,
      icon: <FaHome className="h-16 w-16 mx-auto mb-4" />,
    },
    {
      name: "Litigation",
      description: "Experienced attorneys ready to advocate for your rights in court.",
      additionalInfo: "Our litigation team has a proven track record of success in various cases.",
      slug: "litigation",
      icon: <FaGavel className="h-16 w-16 mx-auto mb-4" />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[30vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl text-center text-white">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
            {content.practices.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mt-4">
            {content.practices.heroSubtitle}
          </p>
        </div>
      </section>
      <Breadcrumb />

      {/* Practices Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            {content.practices.sectionTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((practice, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {practice.icon}
                <h3 className="text-xl font-bold mb-2 text-center">
                  {practice.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  {practice.description}
                </p>
                <p className="text-sm text-gray-500 text-center mb-4">
                  {practice.additionalInfo}
                </p>
                <div className="text-center">
                  <Link
                    to={`/practices/${practice.slug}`}
                    className="inline-block bg-buttonBg text-white px-6 py-2 rounded-md hover:bg-white hover:text-buttonBg transition duration-300"
                  >
                    {content.practices.learnMore}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12">
            {content.practices.testimonialsTitle}
          </h2>
          <div className="flex flex-col space-y-8">
            {content.practices.testimonials.map((testimonial, index) => (
              <div key={index} className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            {content.practices.faqTitle}
          </h2>
          <div className="max-w-2xl mx-auto">
            {content.practices.faqs.map((faq, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            {content.practices.ctaTitle}
          </h2>
          <p className="text-lg lg:text-xl mb-8">
            {content.practices.ctaDescription}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-buttonBg px-8 py-3 rounded-md hover:bg-buttonBg hover:text-white transition duration-300"
          >
            {content.practices.ctaButtonText}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default PracticesPage;
