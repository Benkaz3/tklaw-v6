import HeroSection from '../components/HeroSection';
import OurTeamSection from '../components/OurTeamSection';
import PracticesSection from '../components/PracticesSection';
import WhyUsSection from '../components/WhyUsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQs';
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';

const sections = [
  HeroSection,
  PracticesSection,
  WhyUsSection,
  TestimonialsSection,
  OurTeamSection,
  CTASection,
  BlogSection,
  ContactSection,
  FAQSection,
];

function HomePage() {
  const seo = useSeo('HomePage');

  return (
    <>
    <Helmet>
        <title>{seo.Title}</title>
        <meta name="description" content={seo.Description} />
        <meta name="keywords" content={seo.Keywords.join(', ')} />
      </Helmet>
      {sections.map((Section, index) => (
        <Section key={index} data-aos="fade-up" />
      ))}
    </>
  );
}

export default HomePage;