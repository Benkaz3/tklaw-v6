import { useTranslation } from 'react-i18next'; // Import i18n's useTranslation hook
import heroBg from '../assets/practices_hero_bg.webp';
import BreadCrumb from '../components/Breadcrumb';

function PoliciesPage() {
  const { t } = useTranslation(); // Use i18n's useTranslation hook

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
          {t('policies.title')} {/* Use translated title */}
        </h1>

        {/* Privacy Policy */}
        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.privacy_policy.title')} {/* Translated title */}
          </h2>
          {t('policies.privacy_policy.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        {/* Terms of Use */}
        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.terms_of_use.title')} {/* Translated title */}
          </h2>
          {t('policies.terms_of_use.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        {/* Disclaimer */}
        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.disclaimer.title')} {/* Translated title */}
          </h2>
          {t('policies.disclaimer.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        {/* Cookie Policy */}
        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.cookie_policy.title')} {/* Translated title */}
          </h2>
          {t('policies.cookie_policy.content', { returnObjects: true }).map(
            (paragraph, index) => (
              <p key={index} className='text-lg mb-4'>
                {paragraph}
              </p>
            )
          )}
        </section>

        {/* Accessibility Statement */}
        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.accessibility_statement.title')}{' '}
            {/* Translated title */}
          </h2>
          {t('policies.accessibility_statement.content', {
            returnObjects: true,
          }).map((paragraph, index) => (
            <p key={index} className='text-lg mb-4'>
              {paragraph}
            </p>
          ))}
        </section>

        {/* Client Rights */}
        <section className='mb-6'>
          <h2 className='text-2xl font-semibold mb-2'>
            {t('policies.client_rights.title')} {/* Translated title */}
          </h2>
          {t('policies.client_rights.content', { returnObjects: true }).map(
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
