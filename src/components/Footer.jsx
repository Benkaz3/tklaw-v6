import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';
import { Link } from 'react-router-dom';

function Footer({ transparent, textColor }) {
  const { content } = useLanguage();

  return (
    <footer
      className={`${
        transparent ? 'bg-transparent' : 'bg-background'
      } py-8 px-4 lg:px-12 mt-12 relative z-10 `}
    >
      <div className="container mx-auto flex flex-col items-start space-y-4">
        {/* First Row: Contact Us, Our Team, Policies */}
        <div className="container mx-auto flex flex-wrap items-start gap-4">
          <Link 
            to="/contact" 
className={`${textColor} uppercase hover:text-linkActive transition duration-300`}
          >
            {content.global.labels.contact_us_label}
          </Link>
          <Link 
            to="/team" 
className={`${textColor} uppercase hover:text-linkActive transition duration-300`}
          >
            {content.global.labels.our_team_label}
          </Link>
          <Link 
            to="/policies" 
className={`${textColor} uppercase hover:text-linkActive transition duration-300`}
          >
            {content.global.labels.policies_label}
          </Link>
          <Link 
            to="/expertise" 
className={`${textColor} uppercase hover:text-linkActive transition duration-300`}
          >
            {content.global.labels.expertise_label}
          </Link>
        </div>
        
        {/* Second Row: Social Media Links */}
        <div className="flex space-x-3 text-center">
          <a href="#" className={`${textColor} uppercase hover:text-linkActive transition duration-300`}>
            <FaFacebook size={18} />
          </a>
          <a href="#" className={`${textColor} uppercase hover:text-linkActive transition duration-300`}>
            <FaLinkedin size={18} />
          </a>
          <a href="#" className={`${textColor} uppercase hover:text-linkActive transition duration-300`}>
            <FaTwitter size={18} />
          </a>
        </div>
        
        {/* Bottom Row: Copyright */}
        <div className="text-center border-t border-accent opacity-50 pt-4 text-sm w-full">
          <p className={textColor}>&copy; {new Date().getFullYear()} {content.global.footer_copy_statement}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
