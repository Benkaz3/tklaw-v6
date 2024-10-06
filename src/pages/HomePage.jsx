import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import HomeSecondHalf from '../components/HomeSecondHalf';
import heroBg from "../assets/hero_bg.webp";
import OurTeamSection from '../components/OurTeamSection';

function HomePage() {
  const [blur, setBlur] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxBlur = 20; // Maximum blur in pixels
    const maxScroll = window.innerHeight; // Set max scroll to the viewport height for a smooth transition

    // Calculate blur based on the scroll position
    const blurValue = Math.min((scrollY / maxScroll) * maxBlur, maxBlur);
    setBlur(blurValue);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background image with dynamic blur */}
      <div
        className="fixed inset-0 bg-cover bg-center grayscale"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: `blur(${blur}px) grayscale(100%)`, // Grayscale effect applied
          transition: 'filter 0.3s ease',
        }}
      ></div>

      {/* Dark overlay applied across the whole page */}
      <div className="fixed inset-0 bg-black opacity-40 z-0"></div>

      {/* Hero Section */}
      <div className="relative z-10">
        <section className="h-screen flex items-center justify-center">
          <HeroSection />
        </section>
        <OurTeamSection />
        <HomeSecondHalf isHomepage={true}/>
       
      </div>
    </div>
  );
}

export default HomePage;
