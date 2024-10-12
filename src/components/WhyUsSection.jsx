import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WhyUsSection = () => {
  const { t, i18n } = useTranslation(); // Use i18n's useTranslation hook
  const currentLanguage = i18n.language; // Get current language

  // Array of background colors for the cards
  const bgColors = ['bg-primary', 'bg-secondary', 'bg-text', 'bg-accent'];

  return (
    <section className='w-full py-12 bg-background'>
      <div className='container mx-auto px-4'>
        <h1 className='font-primary text-start sm:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('homepage.why_choose_us_section_title')}{' '}
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
          {t('homepage.why_choose_us', { returnObjects: true }).map(
            (point, index) => (
              <div
                key={index}
                className={`card ${
                  bgColors[index % bgColors.length]
                } py-16 px-8 lg:px-28 rounded-lg shadow-sm hover:shadow-lg transition-shadow`}
              >
                <h3
                  className={`text-4xl font-medium ${
                    bgColors[index % bgColors.length] === 'bg-primary' ||
                    bgColors[index % bgColors.length] === 'bg-text'
                      ? 'text-white'
                      : 'text-text'
                  } mb-4`}
                >
                  {point.title}
                </h3>
                <div className='border-t border-background pt-4'>
                  <p
                    className={`${
                      bgColors[index % bgColors.length] === 'bg-primary' ||
                      bgColors[index % bgColors.length] === 'bg-text'
                        ? 'text-white'
                        : 'text-text'
                    } mb-6`}
                  >
                    {point.description.map((part, i) => {
                      if (part.type === 'text') {
                        return <span key={i}>{part.value}</span>;
                      } else if (part.type === 'link') {
                        const linkTo = `/${currentLanguage}/${part.to}`;
                        return (
                          <span
                            key={i}
                            className='font-bold underline-animation'
                          >
                            <Link to={linkTo}>{part.value}</Link>
                          </span>
                        );
                      }
                      return null;
                    })}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
