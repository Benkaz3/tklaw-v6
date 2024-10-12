import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Use i18n's useTranslation hook

const FAQSection = () => {
  const { t } = useTranslation(); // Use i18n's useTranslation hook
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className='py-12 lg:py-16 px-4 lg:px-8'>
      <div className='container mx-auto'>
        <h1 className='font-primary text-start sm:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text'>
          {t('faqs_section.title')} {/* Translated title of the FAQ Section */}
        </h1>

        <div className='space-y-4'>
          {t('faqs_section.faqs', { returnObjects: true }).map((faq, index) => (
            <div key={index} className='border-b border-gray-300 pb-4'>
              {/* Question */}
              <div
                className='cursor-pointer flex justify-between items-center'
                onClick={() => toggleFAQ(index)}
              >
                <h3 className='font-primary font-medium text-lg text-gray-800'>
                  {faq.question} {/* Translated question */}
                </h3>
                <span className='text-primary text-xl'>
                  {expandedIndex === index ? '-' : '+'}
                </span>
              </div>

              {/* Answer */}
              {expandedIndex === index && (
                <div className='mt-2 text-gray-600 font-primary leading-relaxed'>
                  {faq.answer} {/* Translated answer */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
