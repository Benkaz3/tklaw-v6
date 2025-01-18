import heroBg from '../assets/practices_hero_bg.webp';
import OurTeamSection from '../components/OurTeamSection';
import Breadcrumb from '../components/Breadcrumb';
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';
import generateMetaTags from '../seo/generateMetaTags';

const OurTeamPage = () => {
  if (!heroBg) return null;
  const seo = useSeo('OurTeamPage')
  const metaTags = generateMetaTags(seo);


  return (
    <div>
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