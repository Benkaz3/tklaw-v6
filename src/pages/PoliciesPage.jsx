
import { useLanguage } from '../components/LanguageProvider'; // Assuming you have a language provider
import heroBg from '../assets/practices_hero_bg.webp';
import BreadCrumb from '../components/Breadcrumb';

function PoliciesPage() {
  const { language, content } = useLanguage(); // Fetch language and corresponding content from context
  
  const policies = content.policies; // Access policies content
  
  return (
    <div className="container mx-auto">
      <section
        className="relative h-[20vh] bg-cover bg-center flex items-center justify-start"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
       
      </section>
       <BreadCrumb />
      <div className='px-4 py-16'>
        <h1 className="text-4xl font-bold text-center mb-8">{language === 'vi' ? 'Chính Sách' : 'Policies'}</h1>

      {/* Privacy Policy */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{policies.privacy_policy.title}</h2>
        {policies.privacy_policy.content.map((paragraph, index) => (
          <p key={index} className="text-lg mb-4">{paragraph}</p>
        ))}
      </section>

      {/* Terms of Use */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{policies.terms_of_use.title}</h2>
        {policies.terms_of_use.content.map((paragraph, index) => (
          <p key={index} className="text-lg mb-4">{paragraph}</p>
        ))}
      </section>

      {/* Disclaimer */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{policies.disclaimer.title}</h2>
        {policies.disclaimer.content.map((paragraph, index) => (
          <p key={index} className="text-lg mb-4">{paragraph}</p>
        ))}
      </section>

      {/* Cookie Policy */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{policies.cookie_policy.title}</h2>
        {policies.cookie_policy.content.map((paragraph, index) => (
          <p key={index} className="text-lg mb-4">{paragraph}</p>
        ))}
      </section>

      {/* Accessibility Statement */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{policies.accessibility_statement.title}</h2>
        {policies.accessibility_statement.content.map((paragraph, index) => (
          <p key={index} className="text-lg mb-4">{paragraph}</p>
        ))}
      </section>

      {/* Client Rights */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{policies.client_rights.title}</h2>
        {policies.client_rights.content.map((paragraph, index) => (
          <p key={index} className="text-lg mb-4">{paragraph}</p>
        ))}
      </section>
      </div>
      
    </div>
  );
};

export default PoliciesPage;