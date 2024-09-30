import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";
import heroBg from "../assets/hero_bg.webp";

function HeroSection({ title, subtitle }) {
  const { content } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false); // State to track when the image is loaded

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen bg-cover bg-center flex items-center justify-center">
      {/* Skeleton Placeholder */}
      <div
        className={`absolute inset-0 bg-gray-300 ${
          imageLoaded ? "opacity-0 transition-opacity duration-500" : "opacity-100"
        }`}
      ></div>

      {/* Lazy-loaded Background Image */}
      <img
        src={heroBg}
        alt="Hero Background"
        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Subtle overlay to prevent too much contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl text-center px-6 md:px-12 lg:px-24 transition duration-300 opacity-0 fade-in">
        <p className="text-sm lg:text-base mb-2 text-slate-100">
          {content.hero.subtitle}
        </p>
        <h1 className="font-secondary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-slate-50">
          {content.hero.title.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-slate-100 mb-8">
          {content.hero.description}
        </p>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="uppercase inline-flex items-center justify-center rounded bg-buttonBg text-white py-3 px-6 hover:bg-white hover:text-buttonBg transition duration-300"
        >
          <span>{content.hero.buttonText}</span>
          <FiArrowRight className="ml-2" />
        </Link>
      </div>

      {/* Scroll-down Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-0 scroll-indicator">
        <button
          onClick={scrollToNextSection}
          className="flex flex-col items-center text-white hover:text-buttonBg transition focus:outline-none"
        >
          {/* Custom SVG for scroll indicator */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce-slow"
          >
            <polyline points="8 12 12 16 16 12"></polyline>
          </svg>
          <span className="text-sm">{content.hero.scrollDownText}</span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
