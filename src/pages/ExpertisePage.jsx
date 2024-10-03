
import { useLanguage } from '../components/LanguageProvider';
import heroBg from '../assets/practices_hero_bg.png';
import Breadcrumb from '../components/Breadcrumb';
import ExpertiseSection from '../components/ExpertiseSection';
import HomeSecondHalf from '../components/HomeSecondHalf';

const Expertise = () => {
  const { content } = useLanguage();
  const expertiseContent = content.expertise;

  return (
    <div className="expertise-page-container py-8 max-w-7xl mx-auto">
      <section
        className="relative h-[15vh] bg-cover bg-center flex items-center justify-start"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl text-white mx-4">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mt-12">
            {expertiseContent.hero_banner_title}
          </h1>
        </div>
      </section>
      <Breadcrumb />
      <ExpertiseSection />
      <HomeSecondHalf isHomepage={false}/>
    </div>
  );
};

export default Expertise;
