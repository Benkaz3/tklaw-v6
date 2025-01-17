import heroBg from '../assets/practices_hero_bg.webp';
import OurTeamSection from '../components/OurTeamSection';
import Breadcrumb from '../components/Breadcrumb';
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';

const OurTeamPage = () => {
  if (!heroBg) return null;
  const seo = useSeo('OurTeamPage')

  return (
    <div>
      <Helmet>
              <title>{seo.Title}</title>
              <meta name="description" content={seo.Description} />
              <meta name="keywords" content={seo.Keywords.join(', ')} />
            </Helmet>
      <section
        className="relative h-[25vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
      </section>
      <Breadcrumb />
      <OurTeamSection />
    </div>
  );
};

export default OurTeamPage;