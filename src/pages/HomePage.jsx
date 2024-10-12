import HeroSection from '../components/HeroSection';
import OurTeamSection from '../components/OurTeamSection';
import PracticesSection from '../components/PracticesSection';
import WhyUsSection from '../components/WhyUsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQs';

function HomePage() {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <div data-aos='fade-up'>
        <PracticesSection />
      </div>
      <div data-aos='fade-up'>
        <WhyUsSection />
      </div>
      <div data-aos='fade-up'>
        <TestimonialsSection />
      </div>
      <div data-aos='fade-up'>
        <OurTeamSection />
      </div>
      <div data-aos='fade-up'>
        <CTASection />
      </div>
      <div data-aos='fade-up'>
        <BlogSection />
      </div>
      <div data-aos='fade-up'>
        <ContactSection />
      </div>
      <div data-aos='fade-up'>
        <FAQSection />
      </div>
    </div>
  );
}

export default HomePage;
