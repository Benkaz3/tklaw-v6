import { useState, useCallback, useMemo } from 'react';
import { FaBars, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangSwitcher from './LangSwitcher';
import LogoVi from '../assets/tklaw-logo-vi.png';
import LogoEn from '../assets/tklaw-logo-en.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const getDynamicPath = useCallback(
    (path) => {
      const basePath = t(`menu.path.${path}`, { defaultValue: '' });
      return `/${language}${basePath ? `/${basePath}` : ''}`;
    },
    [language, t]
  );

  const menuItems = useMemo(
    () => [
      { key: 'attorneys', icon: null },
      { key: 'practices_and_sectors', icon: null },
      { key: 'blog', icon: null },
      { key: 'contact', icon: FaInfoCircle },
    ],
    []
  );

  const logos = useMemo(
    () => ({
      en: LogoEn,
      vi: LogoVi,
    }),
    []
  );

  const currentLogo = logos[language] || LogoEn;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow">
      <div className="container mx-auto py-2 px-4 sm:px-6 max-w-3xl">
        <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center justify-center">
  <img
    src={currentLogo}
    alt={t('logo.alt')}
    title={t('logo.title')}
    loading="lazy"
    aria-label={t('logo.alt')}
    className="h-8 w-auto flex-shrink-0"
  />
  <div className="text-left" style={{ fontSize: '0.2rem' }}>
    <p className='text-center text-blue-700'>VĂN PHÒNG LUẬT SƯ TK VÀ LIÊN DANH</p>
    <p className='text-center text-blue-700'>TK & ASSOCIATES</p>
    <p className='font-style: italic font-weight: bold'>Tầng 2 Tòa nhà Rosana 60 Nguyễn Đình Chiểu</p>
    <p className='font-style: italic font-weight: bold'>Phường Đa Kao - Quận 1- TP. Hồ Chí Minh</p>
    <p className='font-style: italic font-weight: bold'>
      <span>ĐT: (028) 22216597</span>
      <span> Fax: (028) 22202201</span>
    </p>
    <p className='font-style: italic font-weight: bold'>
      Email: tklaw.vn@gmail.com Web: www.tklaw.vn
    </p>
  </div>
</Link>

          <div className="hidden lg:flex space-x-6">
            {menuItems.map(({ key, icon }) => (
              <Link
                key={key}
                to={getDynamicPath(key)}
                className="flex items-center hover:text-buttonBg transition duration-300 uppercase"
              >
                {icon && <icon className="mr-2" />} {t(`menu.${key}`)}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <LangSwitcher />
            <button
              onClick={toggleMenu}
              className="block lg:hidden focus:outline-none transition-transform duration-200 transform hover:scale-110"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden bg-white text-black overflow-hidden transition-transform duration-300 ease-in-out">
            <div className="flex flex-col items-center space-y-4 py-4">
              {menuItems.map(({ key }) => (
                <Link
                  key={key}
                  to={getDynamicPath(key)}
                  className="hover:text-accent transition duration-300 uppercase"
                  onClick={toggleMenu}
                >
                  {t(`menu.${key}`)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;