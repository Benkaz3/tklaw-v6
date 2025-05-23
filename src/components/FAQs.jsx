import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQSection = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = Array.isArray(t('faqs_section.faqs', { returnObjects: true }))
    ? t('faqs_section.faqs', { returnObjects: true })
    : [];

  return (
    <section className="py-12 lg:py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <h2 className="font-primary text-start sm:text-center font-bold leading-tight mb-6 text-text">
          {t('faqs_section.title')}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <button
                type="button"
                className="w-full text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={expandedIndex === index}
              >
                <p className="font-primary font-medium text-gray-800">
                  {faq.question}
                </p>
                <span className="text-primary">
                  {expandedIndex === index ? '-' : '+'}
                </span>
              </button>
              {expandedIndex === index && (
                <p className="mt-2 text-gray-600 font-primary leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;