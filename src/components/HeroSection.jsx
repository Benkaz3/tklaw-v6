import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";
import heroBg from "../assets/hero_bg.png";

function HeroSection({ title, subtitle, backgroundImage }) {
  const { content } = useLanguage();

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-[100vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Subtle overlay to prevent too much contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl text-center px-4 sm:px-40 md:px-48 transition duration-300 opacity-0 fade-in">
        <p className="text-xs lg:text-base sm:mb-1 text-slate-100">
          {content.hero.subtitle}
        </p>
        <h1 className="font-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-slate-50">
          {content.hero.title.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <p className="lg:text-2xl md:text-xl text-slate-100 mb-8">
          {content.hero.description}
        </p>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="uppercase inline-flex items-center justify-center rounded-sm bg-buttonBg text-white py-3 px-5 hover:bg-white hover:text-buttonBg hover:shadow-lg transition duration-300"
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
          <span>{content.hero.scrollDownText}</span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
