import { useState } from 'react';
import { useLanguage } from './LanguageProvider'; // Assuming you will source questions/answers from en.json and vi.json

const FAQSection = () => {
  const { content } = useLanguage(); // Load language-specific content
  console.log(content.faqs_section.title)
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-12 lg:py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <h1 className="font-primary text-left text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-primary mb-6">
          {content.faqs_section.title} {/* Title of the FAQ Section */}
        </h1>
        
        <div className="space-y-4">
          {content.faqs_section.faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              {/* Question */}
              <div
                className="cursor-pointer flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-primary font-medium text-lg text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-primary text-xl">
                  {expandedIndex === index ? '-' : '+'}
                </span>
              </div>
              
              {/* Answer */}
              {expandedIndex === index && (
                <div className="mt-2 text-gray-600 font-primary leading-relaxed">
                  {faq.answer}
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
