import AboutUsSection from '../components/AboutUsSection';
import { useLanguage } from '../components/LanguageProvider';
import heroBg from '../assets/practices_hero_bg.png';
import Breadcrumb from '../components/Breadcrumb';
import { useState, useEffect } from 'react';


// Import SVG icons
import IntegrityIcon from '../assets/integrity.svg';
import JusticeIcon from '../assets/justice.svg';
import LitigationIcon from '../assets/litigation.svg';
import ProtectIcon from '../assets/protect.svg';
import HomeSecondHalf from "../components/HomeSecondHalf"
import AttorneysSection from '../components/AttorneysSection';

const iconMapping = {
  integrity: IntegrityIcon,
  justice: JusticeIcon,
  litigation: LitigationIcon,
  protect: ProtectIcon,
};

function AboutUsPage() {
  const { content } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % content.about_us_section.values.length);
    }, 4000); // Change the core value every 4 seconds

    return () => clearInterval(interval);
  }, [content]);

  return (
    <div className="about-us-page">
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
        <div className="relative z-10 max-w-4xl text-center text-white mx-4">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mt-12">
            {content.about_us_section.hero.heading}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mt-4">
            {content.about_us_section.hero.subtitle}
          </p>
        </div>
      </section>
      <Breadcrumb />
      <AboutUsSection />

      {/* Core Values Section */}
      <section className="py-16 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-primary text-3xl sm:text-4xl font-bold mb-6">
            {content.about_us_section.values_title}
          </h2>

          {/* Icons for Core Values */}
          {/* <div className="flex justify-center mb-4">
            {content.about_us_section.values.map((value) => {
              const IconSrc = iconMapping[value.icon.replace('.svg', '')]; // Get the SVG file path
              return (
                <div
                  key={value.title} // Use a unique key from the value
                  className={`h-12 w-12 mx-2 transition-transform duration-300 ${
                    activeIndex === content.about_us_section.values.indexOf(value) ? 'transform scale-125 text-buttonBg' : 'text-muted'
                  }`}
                >
                  {IconSrc && <img src={IconSrc} alt={value.title} className="h-12 w-12" />}
                </div>
              );
            })}
          </div> */}

          {/* Core Values Display */}
          <div className="relative overflow-hidden">
            {content.about_us_section.values.map((value, index) => {
              const IconSrc = iconMapping[value.icon.replace('.svg', '')]; // Get the SVG file path
              return (
                <div
                  key={value.title} // Use a unique key from the value
                  className={`p-6 transition-opacity duration-500 ease-in-out ${
                    activeIndex === index ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                  style={{ zIndex: activeIndex === index ? 10 : 1 }} // Ensure active item is on top
                >
                  <div className="mb-4 text-buttonBg">
                    {IconSrc && <img src={IconSrc} alt={value.title} className="h-12 w-12 mx-auto" />}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
      </section>
      <AttorneysSection />
      <HomeSecondHalf />
    </div>
  );
}

export default AboutUsPage;
