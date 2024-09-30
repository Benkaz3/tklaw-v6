import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';
import { Link } from 'react-router-dom';

function Footer() {
  const { content } = useLanguage();
  return (
    <footer className="bg-background text-primary py-8 px-4 lg:px-12 mt-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{content.footer.followUs}</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-primary hover:text-buttonBg transition duration-300"><FaFacebook size={24} /></a>
            <a href="#" className="text-primary hover:text-buttonBg transition duration-300"><FaTwitter size={24} /></a>
            <a href="#" className="text-primary hover:text-buttonBg transition duration-300"><FaInstagram size={24} /></a>
            <a href="#" className="text-primary hover:text-buttonBg transition duration-300"><FaPinterest size={24} /></a>
            <a href="#" className="text-primary hover:text-buttonBg transition duration-300"><FaLinkedin size={24} /></a>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{content.footer.contact}</h4>
          <p className="mb-2">{content.footer.contactInfo}</p>
          <p className="mb-2">{content.footer.phone}: {content.footer.phoneNum}</p>
          <p className="mb-2">Fax: {content.footer.faxNum}</p>
          <p>Email: <a href={content.footer.email} className="hover:text-buttonBg transition duration-300">{content.footer.email}</a></p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{content.footer.usefulLinks}</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-buttonBg transition duration-300">{content.footer.aboutUs}</a></li>
            <li><a href="#" className="hover:text-buttonBg transition duration-300">{content.footer.blog}</a></li>
            <li><a href="#" className="hover:text-buttonBg transition duration-300">{content.footer.faqs}</a></li>
            <li><a href="#" className="hover:text-buttonBg transition duration-300">{content.footer.contact}</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">{content.footer.legal}</h4>
          <ul className="space-y-2">
            <li><Link to="/privacy-policy" className="hover:text-buttonBg transition duration-300">{content.footer.privacyPolicy}</Link></li>
            <li><Link to="/cookies-policy" className="hover:text-buttonBg transition duration-300">{content.footer.cookiePolicy}</Link></li>
            <li><Link to="/terms-of-use" className="hover:text-buttonBg transition duration-300">{content.footer.termsOfUse}</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 text-center border-t border-accent opacity-50 pt-4 text-sm">
        <p>&copy; {new Date().getFullYear()} {content.businessInfo.registeredName}</p>
      </div>
    </footer>
  );
}

export default Footer;
