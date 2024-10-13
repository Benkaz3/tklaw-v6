import heroBg from '../assets/practices_hero_bg.webp';
import OurTeamSection from '../components/OurTeamSection';
import Breadcrumb from '../components/Breadcrumb';

const OurTeamPage = () => {
  return (
    <div className=''>
      {/* Hero Section */}
      <section
        className='relative h-[25vh] bg-cover bg-center flex items-center justify-center'
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
      </section>
      <Breadcrumb />
      <OurTeamSection />
    </div>
  );
};

export default OurTeamPage;
