import heroBg from '../assets/practices_hero_bg.webp';
import OurTeamSection from '../components/OurTeamSection';


const OurTeamPage = () => {
  return (
    <div className="container mx-auto lg:px-8">
      {/* Hero Section */}
      <section
        className="relative h-[25vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-white text-3xl font-bold z-10">Our Team</h1>
      </section>

      {/* Team Section */}
      <OurTeamSection />
    </div>
  );
};

export default OurTeamPage;
