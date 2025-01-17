import HeroSection from '../components/HeroSection';
import OurTeamSection from '../components/OurTeamSection';
import PracticesSection from '../components/PracticesSection';
import WhyUsSection from '../components/WhyUsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQs';

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
  return (
    <div>
      {sections.map((Section, index) => (
        <Section key={index} data-aos="fade-up" />
      ))}
    </div>
  );
}

export default HomePage;