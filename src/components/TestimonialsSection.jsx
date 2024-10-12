import { useTranslation } from 'react-i18next';

const TestimonialsSection = () => {
  const { t } = useTranslation(); // Use i18n's useTranslation hook

  const photoBackgroundColors = [
    'bg-background', // tinted white/grey
    'bg-primary', // muted blue
    'bg-secondary', // tinted blue
    'bg-accent', // shaded blue
    'bg-shaded_accent', // light shade of blue
  ];

  return (
    <section id='testimonials' className='py-10 bg-background'>
      <div className='max-w-container-desktop mx-auto px-4'>
        <h2 className='font-primary text-start sm:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-text'>
          {t('homepage.testimonials_section.title')}{' '}
          {/* Dynamic title using i18n */}
        </h2>
        <p className='text-start sm:text-center text-lg md:text-xl text-text mb-6'>
          {t('homepage.testimonials_section.subtitle')}{' '}
          {/* Dynamic subtitle using i18n */}
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {t('homepage.testimonials_section.items', {
            returnObjects: true,
          }).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className='flex flex-col items-start bg-card_background rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg'
            >
              <div className='flex items-start mb-4'>
                <div
                  className={`w-16 h-16 rounded-full border border-text flex items-center justify-center ${
                    testimonial.photo
                      ? 'bg-transparent'
                      : photoBackgroundColors[
                          index % photoBackgroundColors.length
                        ]
                  }`}
                >
                  {testimonial.photo ? (
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className='w-full h-full rounded-full object-cover'
                    />
                  ) : (
                    <span className='text-white text-xl font-bold'></span>
                  )}
                </div>
                <div className='flex flex-col ml-4'>
                  <p className='font-semibold text-text'>{testimonial.name}</p>
                  <p className='text-text text-sm'>{testimonial.caseDetail}</p>
                </div>
              </div>
              <div className='flex mb-4'>
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-accent'
                    fill={index < testimonial.rating ? 'currentColor' : 'none'}
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.77L12 2 11.19 8.47 2 9.24l5.46 4.73L5.82 21z'
                    />
                  </svg>
                ))}
              </div>
              <p className='text-start text-text mb-2 italic'>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
