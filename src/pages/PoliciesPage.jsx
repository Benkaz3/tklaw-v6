import { useTranslation } from 'react-i18next';
import heroBg from '../assets/practices_hero_bg.webp';
import BreadCrumb from '../components/Breadcrumb';

function PoliciesPage() {
  const { t } = useTranslation(); 

  return (
    <div className='container mx-auto'>
      <section
        className='relative h-[20vh] bg-cover bg-center flex items-center justify-start'
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
      </section>

      <BreadCrumb />
      <div className='px-4 py-16'>
        <h1 className='text-4xl font-bold text-center mb-8'>
          {t('policies.title')}
        </h1>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.terms_acceptance.title')}
          </h2>
          {t('policies.terms_acceptance.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.use_of_information.title')}
          </h2>
          {t('policies.use_of_information.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.copyrights_ip.title')}
          </h2>
          {t('policies.copyrights_ip.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.limitation_of_liability.title')}
          </h2>
          {t('policies.limitation_of_liability.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.changes_to_terms_of_use.title')}
          </h2>
          {t('policies.changes_to_terms_of_use.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.third_party_links.title')}
          </h2>
          {t('policies.third_party_links.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.privacy_policy.title')}
          </h2>
          {t('policies.privacy_policy.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>
      </div>
    </div>
  );
}

export default PoliciesPage;
