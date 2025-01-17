import { useState } from 'react';
import { FaBars, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangSwitcher from './LangSwitcher';
import LogoVi from '../assets/tklaw-logo-vi.png'
import LogoEn from '../assets/tklaw-logo-en.png'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getDynamicPath = (path) => {
    const basePath = t(`menu.path.${path}`) || ''; 
    return `/${i18n.language}${basePath ? `/${basePath}` : ''}`;
  };

  const logos = {
    en: LogoEn,
    vi: LogoVi,
  };

  const logoAlts = {

  }

  const currentLogo = logos[i18n.language] || LogoEn;

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-white text-black shadow navbar'>
      <div className='container mx-auto py-2 px-4 sm:px-6 max-w-3xl'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2 text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
            <Link
              to='/'
              className='flex items-center max-w-16'
            >
              <img 
                src={currentLogo} 
                alt={t('logo.alt')}
                title={t('logo.title')}
                loading="lazy"
                role="img"
                aria-label={t('logo.alt')}
                />
            </Link>

          </div>

          {/* Desktop Menu */}
          <div className='hidden lg:flex space-x-6'>
            {/* Main Navigation Links */}
            <Link
              to={getDynamicPath('attorneys')}
              className='hover:text-buttonBg transition duration-300'
            >
              {t('menu.attorneys')}
            </Link>
            <Link
              to={getDynamicPath('practices_and_sectors')}
              className='hover:text-buttonBg transition duration-300'
            >
              {t('menu.practices')}
            </Link>
            <Link
              to={getDynamicPath('blog')}
              className='hover:text-buttonBg transition duration-300'
            >
              {t('menu.blog')}
            </Link>
            <Link
              to={getDynamicPath('contact')}
              className='flex items-center hover:text-buttonBg transition duration-300'
            >
              <FaInfoCircle className='mr-2' /> {t('menu.contact')}
            </Link>
          </div>

          <div className='flex items-center space-x-4'>
            {/* Language switcher */}
            <LangSwitcher /> 
            <button
              onClick={toggleMenu}
              className='block lg:hidden focus:outline-none transition-transform duration-1000 transform hover:scale-110 text-black menu-button'
              aria-label='Toggle Menu'
            >
              {isOpen ? (
                <FaTimes size={28} className='text-text' />
              ) : (
                <FaBars size={28} className='text-text' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className='bg-white text-black overflow-hidden transition-transform duration-300 ease-in-out'>
            <div className='flex flex-col items-center space-y-4 py-4'>
              <Link
                to={getDynamicPath('attorneys')}
                className='hover:text-accent transition duration-300 uppercase'
                onClick={toggleMenu}
              >
                {t('menu.attorneys')}
              </Link>
              <Link
                to={getDynamicPath('practices_and_sectors')}
                className='hover:text-accent transition duration-300 uppercase'
                onClick={toggleMenu}
              >
                {t('menu.practices')}
              </Link>
              <Link
                to={getDynamicPath('blog')}
                className='hover:text-accent transition duration-300 uppercase'
                onClick={toggleMenu}
              >
                {t('menu.blog')}
              </Link>
              <hr className='w-4/5 border-accent opacity-50' />
              <Link
                to={getDynamicPath('contact')}
                className='flex items-center hover:text-accent transition duration-300 uppercase'
                onClick={toggleMenu}
              >
                {t('menu.contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
