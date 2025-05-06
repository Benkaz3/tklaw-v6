import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';

  const menuItems = [
    { key: 'contact', path: 'contact' },
    { key: 'attorneys', path: 'attorneys' },
    { key: 'policies', path: 'policies' },
    { key: 'practices', path: 'practices_and_sectors' },
  ];

  const socialMedia = [
    { icon: FaFacebook, url: 'https://www.facebook.com', label: 'Facebook' },
  ];

  const getDynamicPath = (path) => {
    const basePath = t(`menu.path.${path}`, { defaultValue: '' });
    return `/${language}${basePath ? `/${basePath}` : ''}`;
  };

  return (
    <footer className="py-8 px-4 lg:px-12 mt-12 relative z-10">
      <div className="container mx-auto flex flex-col items-start space-y-4">
        <div className="flex flex-wrap items-start gap-6">
          {menuItems.map(({ key, path }) => (
            <Link
              key={key}
              to={getDynamicPath(path)}
              className="uppercase hover:text-accent transition duration-300"
            >
              {t(`menu.${key}`)}
            </Link>
          ))}
        </div>
        <div className="flex space-x-4 text-center">
          {socialMedia.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition duration-300"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <div className="text-center border-t border-accent opacity-50 pt-4 text-sm w-full">
          <p>
            &copy; {new Date().getFullYear()} {t('global.footer_copy_statement')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;