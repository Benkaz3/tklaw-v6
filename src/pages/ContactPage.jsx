import { useLanguage } from '../components/LanguageProvider';
import Breadcrumb from '../components/Breadcrumb';
import heroBg from '../assets/practices_hero_bg.webp'

const ContactPage = () => {
  const { content } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[25vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>
      <Breadcrumb />
    <section className="bg-background mt-16">
      
      <div className="container mx-auto max-w-container-desktop px-4">
        {/* Embedded Google Map */}
        <div className="flex justify-center mt-8">
          <iframe
            src={content.businessInfo.mapEmbedUrl}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="w-full h-96"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="w-full md:w-1/2 lg:w-1/3 p-card-padding">
            <h3 className="text-h2 font-semibold mb-4 text-primary">
              {content.global.labels.office_address_label}
            </h3>
            <div>
  <p className="text-text">
    {content.global.office_address}
  </p>
  <p className="text-text text-xl font-bold">
    {content.global.labels.phone_label}:{' '}
    <a href={`tel:${content.global.phone}`} className="text-blue-600 font-bold hover:underline">
      {content.global.phone}
    </a>
  </p>
  <p className="text-text">
    {content.global.labels.email_label}:{' '}
    <a href={`mailto:${content.global.email}`} className="hover:underline">
      {content.global.email}
    </a>
  </p>
</div>

          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ContactPage;
