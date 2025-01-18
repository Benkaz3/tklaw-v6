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
import generateMetaTags from '../seo/generateMetaTags';

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

  const metaTags = generateMetaTags(seo);

  return (
    <>
   <Helmet>
        <title>{seo.Title}</title>
        <link rel="canonical" href={seo.ogUrl} />
        {metaTags.map((tag, index) =>
          tag.name ? (
            <meta key={index} name={tag.name} content={tag.content} />
          ) : (
            <meta key={index} property={tag.property} content={tag.content} />
          )
        )}
      </Helmet>

      {sections.map((Section, index) => (
        <Section key={index} data-aos="fade-up" />
      ))}
    </>
  );
}

export default HomePage;