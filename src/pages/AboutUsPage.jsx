import AboutUsSection from '../components/AboutUsSection';
import AwardsSection from '../components/Awards';
import CTASection from '../components/CTASection';
import { useLanguage } from '../components/LanguageProvider';

function AboutUsPage() {
  const { content } = useLanguage();

  return (
    <div className="about-us-page mt-32">
      {/* Hero Section */}
      

      {/* About Us Section */}
      <AboutUsSection />

      {/* Our Values Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-primary text-3xl sm:text-4xl font-bold mb-6">
            {content.aboutUs.valuesTitle}
          </h2>
          <p className="text-lg mb-8">
            {content.aboutUs.valuesDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.aboutUs.values.map((value, index) => (
              <div key={index} className="p-6 bg-white shadow-md rounded-md">
                <div className="mb-4 text-primary">
                  {/* Add icons or other visuals related to each value */}
                  {value.icon && <value.icon className="h-12 w-12 mx-auto" />}
                </div>
                <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <AwardsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

export default AboutUsPage;
