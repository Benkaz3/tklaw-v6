import { useTranslation } from 'react-i18next';
import heroBg from '../assets/practices_hero_bg.webp';
import BreadCrumb from '../components/Breadcrumb';
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';

const policies = [
  {
    titleKey: 'policies.terms_acceptance.title',
    contentKey: 'policies.terms_acceptance.content',
  },
  {
    titleKey: 'policies.use_of_information.title',
    contentKey: 'policies.use_of_information.content',
  },
  {
    titleKey: 'policies.copyrights_ip.title',
    contentKey: 'policies.copyrights_ip.content',
  },
  {
    titleKey: 'policies.limitation_of_liability.title',
    contentKey: 'policies.limitation_of_liability.content',
  },
  {
    titleKey: 'policies.changes_to_terms_of_use.title',
    contentKey: 'policies.changes_to_terms_of_use.content',
  },
  {
    titleKey: 'policies.third_party_links.title',
    contentKey: 'policies.third_party_links.content',
  },
  {
    titleKey: 'policies.privacy_policy.title',
    contentKey: 'policies.privacy_policy.content',
  },
];

const PoliciesPage = () => {
  const { t } = useTranslation();
  const seo = useSeo('PoliciesPage');

  if (!heroBg) return null;

  return (
    <div className="container mx-auto">
         <Helmet>
        <title>{seo.Title}</title>
        <meta name="description" content={seo.Description} />
        <meta name="keywords" content={seo.Keywords.join(', ')} />
      </Helmet>
      <section
        className="relative h-[20vh] bg-cover bg-center flex items-center justify-start"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
      </section>
      <BreadCrumb />
      <div className="px-4 py-16">
        {t('policies.title') && (
          <h1 className="text-4xl font-bold text-center mb-8">{t('policies.title')}</h1>
        )}
        {policies.map(({ titleKey, contentKey }, index) => {
          const title = t(titleKey);
          const content = t(contentKey, { returnObjects: true });

          if (!title || !content) return null;

          return (
            <section key={index} className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              {content.map((paragraph, idx) => (
                <p key={idx} className="text-lg mb-4">
                  {paragraph}
                </p>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PoliciesPage;