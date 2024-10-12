import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Use i18n's useTranslation hook

function Footer() {
  const { t, i18n } = useTranslation(); // Use i18n's useTranslation hook

  // Function to generate dynamic paths based on language
  const getDynamicPath = (path) => {
    const basePath = t(`menu.path.${path}`) || ''; // Handle undefined paths
    return `/${i18n.language}${basePath ? `/${basePath}` : ''}`; // Append basePath only if it exists
  };

  return (
    <footer className={`py-8 px-4 lg:px-12 mt-12 relative z-10`}>
      <div className='container mx-auto flex flex-col items-start space-y-4'>
        {/* First Row: Contact Us, Our Team, Policies, Expertise */}
        <div className='flex flex-wrap items-start gap-6'>
          <Link
            to={getDynamicPath('contact')}
            className={`uppercase hover:text-accent transition duration-300`}
          >
            {t('menu.contact')}
          </Link>
          <Link
            to={getDynamicPath('attorneys')}
            className={`uppercase hover:text-accent transition duration-300`}
          >
            {t('menu.attorneys')}
          </Link>
          <Link
            to={getDynamicPath('policies')}
            className={`uppercase hover:text-accent transition duration-300`}
          >
            {t('menu.policies')}
          </Link>
          <Link
            to={getDynamicPath('practices_and_sectors')}
            className={`uppercase hover:text-accent transition duration-300`}
          >
            {t('menu.practices')}
          </Link>
        </div>

        {/* Second Row: Social Media Links */}
        <div className='flex space-x-4 text-center'>
          <a href='#' className={`hover:text-accent transition duration-300`}>
            <FaFacebook size={20} />
          </a>
          <a href='#' className={`hover:text-accent transition duration-300`}>
            <FaLinkedin size={20} />
          </a>
          <a href='#' className={`hover:text-accent transition duration-300`}>
            <FaTwitter size={20} />
          </a>
        </div>

        {/* Bottom Row: Copyright */}
        <div className='text-center border-t border-accent opacity-50 pt-4 text-sm w-full'>
          <p>
            &copy; {new Date().getFullYear()}{' '}
            {t('global.footer_copy_statement')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
