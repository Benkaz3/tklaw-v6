import { useLanguage } from './LanguageProvider';  // Adjust the path as necessary
import logoColor from '/logoColor.png'; // Update this path to the actual logo file location

function CTASection() {
  const { content } = useLanguage(); // Fetch business info using the useLanguage hook

  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-6 text-center">
        <img src={logoColor} alt={`${content.businessInfo.name} Logo`} className="h-16 mx-auto mb-4 border border-buttonBg rounded" />
        
        <h2 className="font-secondary text-4xl font-bold text-buttonBg mb-2">
          {content.businessInfo.name}
        </h2>
        
        {/* <p className="text-lg text-primary mb-4">
          {content.footer.contactInfo}
        </p> */}
        
        <a href={`tel:${content.businessInfo.hotline.replace(/\s+/g, '')}`} className="text-lg text-primary mb-4 ">
          {content.footer.phone}: <span className="font-bold hover:text-buttonBg">{content.businessInfo.hotline}</span>
        </a>
        
        <p className="text-lg text-primary mb-4">
          Email: <a href={`mailto:${content.footer.email}`} className="hover:text-buttonBg transition duration-300">
            {content.footer.email}
          </a>
        </p>
        
        <p className="text-lg text-primary mb-4">
          {content.businessInfo.ctaText}
        </p>
        
        <a href={`tel:${content.businessInfo.hotline.replace(/\s+/g, '')}`} className="uppercase inline-flex items-center justify-center bg-buttonBg text-white py-2 px-4 rounded-sm hover:bg-white hover:text-buttonBg transition duration-300">
          {content.businessInfo.buttonText}
        </a>
      </div>
    </section>
  );
}

export default CTASection;
