import React from 'react';
import { useLanguage } from '../components/LanguageProvider';

const ContactPage = () => {
  const { content } = useLanguage();

  return (
    <section className="bg-background py-section-margin">
      <div className="container mx-auto max-w-container-desktop px-4">
        <h2 className="text-h1 font-bold text-center text-primary mb-section-margin">
          {content.contact.heading}
        </h2>
        <p className="text-center text-muted mb-section-margin">
          {content.contact.description}
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="w-full md:w-1/2 lg:w-1/3 p-card-padding">
            <h3 className="text-h2 font-semibold mb-4 text-primary">
              {content.contact.office_address}
            </h3>
            <p className="text-text">
              {content.contact.address_details.line1}<br />
              {content.contact.address_details.line2}<br />
              {content.contact.address_details.city_country}
            </p>
            <a href={content.businessInfo.mapLink} className="text-navLinkAccent underline" target="_blank" rel="noopener noreferrer">
              View on Google Maps
            </a>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-card-padding">
            <h3 className="text-h2 font-semibold mb-4 text-primary">
              {content.contact.contact_info}
            </h3>
            <p className="text-text">
              {content.contact.phone_label}: {content.businessInfo.hotline}<br />
              {content.contact.email_label}: {content.businessInfo.email}<br />
              {content.businessInfo.officeHours}
            </p>
            <p className="mt-2 text-text">
              Alternate Phone: {content.businessInfo.alternatePhone}
            </p>
          </div>
        </div>

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


        <div className="text-center mt-8">
          <h3 className="text-h3 font-bold text-primary">{content.businessInfo.name}</h3>
          <p className="text-lg">{content.businessInfo.longHotlineText}{content.businessInfo.hotline}</p>
          <button className="mt-4 bg-buttonBg text-white py-button-padding px-4 rounded-sm hover:bg-secondaryButtonBg">
            {content.businessInfo.buttonText}
          </button>
          <p className="mt-2 text-muted">{content.businessInfo.ctaText}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
