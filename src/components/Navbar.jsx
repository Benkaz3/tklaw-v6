import { useState } from 'react';
import { FaBars, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangSwitcher from './LangSwitcher'; // Import LangSwitcher

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getDynamicPath = (path) => {
    const basePath = t(`menu.path.${path}`) || ''; // Handle undefined paths
    return `/${i18n.language}${basePath ? `/${basePath}` : ''}`; // Append basePath only if it exists
  };

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-white text-black shadow navbar'>
      <div className='container mx-auto py-2 px-4 sm:px-6 max-w-3xl'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2 text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
            <Link
              to='/'
              className='flex items-center p-1 border border-buttonBg rounded-sm'
            >
              <svg
                width='27'
                height='27'
                viewBox='0 0 100 100'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                // style='width: 50%; height: auto;'
              >
                <path
                  d='M0.192478 0.150797C-0.0348555 0.37813 -0.0803223 31.2652 0.162167 31.4168C0.298567 31.4925 1.35946 30.5377 4.42089 27.5521C4.96649 27.0065 6.20925 25.8092 7.16405 24.8999C8.93725 23.2024 15.9391 16.4279 17.3486 15.0487C17.773 14.6244 19.243 13.2301 20.6071 11.9418C27.4574 5.45525 32.6861 0.302353 32.5497 0.165953C32.4739 0.10533 25.2143 0.0295525 16.3938 0.0143967C4.10262 -0.0159149 0.328878 0.0143967 0.192478 0.150797Z'
                  fill='#3E4F7A'
                />
                <path
                  d='M56.2678 0.120392C55.7222 0.241638 55.3888 0.514435 54.2824 1.69656C53.9035 2.12093 51.9788 4.076 50.0237 6.06137C48.0686 8.06192 45.1739 11.0021 43.5826 12.6237C42.0064 14.2302 38.1872 18.1252 35.0954 21.2624C28.0481 28.431 27.7147 28.7948 20.5461 36.1149C17.3028 39.434 13.7109 43.0865 12.5894 44.2231C3.52637 53.4074 0.38916 56.681 0.38916 57.0296C0.38916 57.2873 1.81378 58.8483 6.0725 63.1828C9.19455 66.3654 13.529 70.7757 15.6963 72.9884C17.8635 75.2011 20.3491 77.7321 21.2281 78.6263C22.1071 79.5205 25.3807 82.8547 28.5028 86.0526C31.6248 89.2352 35.3076 92.9938 36.6868 94.3881C38.0659 95.7976 41.8851 99.6926 45.1739 103.042C55.3585 113.439 56.0708 114.166 59.2686 117.425C60.9812 119.152 65.0732 123.32 68.3619 126.685C71.6507 130.049 75.379 133.838 76.6217 135.096C78.789 137.294 85.7151 144.341 95.0358 153.859C97.4152 156.284 101.128 160.057 103.296 162.24L107.236 166.226H121.255C130.288 166.226 135.319 166.165 135.41 166.074C135.516 165.968 135.501 165.922 135.38 165.922C135.274 165.922 135.198 165.862 135.198 165.771C135.198 165.695 133.652 164.073 131.773 162.179C129.894 160.285 126.09 156.42 123.331 153.601C118.057 148.221 110.161 140.219 105.842 135.839C104.447 134.414 99.8249 129.716 95.5662 125.381C91.3227 121.047 86.776 116.439 85.4878 115.136C84.1995 113.833 80.5622 110.15 77.425 106.952C68.756 98.1315 65.7703 95.0853 57.5863 86.78C53.4489 82.5819 49.4175 78.4899 48.6445 77.6867C46.8865 75.8831 33.7769 62.5766 31.3672 60.1517C29.1999 57.9844 28.3512 57.0145 28.3512 56.681C28.3512 56.5446 29.9729 54.832 31.9431 52.8921C33.9285 50.9522 36.4746 48.4667 37.5961 47.3603C38.7176 46.254 42.4459 42.6166 45.8559 39.2673C49.2811 35.9179 53.1306 32.1441 54.4188 30.8862C55.707 29.6132 58.8746 26.5214 61.451 24.0056C64.0123 21.5049 67.9073 17.6857 70.0897 15.5488C72.2569 13.4118 75.2426 10.4868 76.6975 9.06218C82.1838 3.71227 85.4878 0.378036 85.4878 0.211319C85.4878 -0.000854492 57.1165 -0.0917816 56.2678 0.120392Z'
                  fill='#3E4F7A'
                />
                <path
                  d='M108.07 0.120743C107.282 0.211678 108.191 -0.667343 94.8087 13.0788C92.8081 15.1399 90.1104 17.8982 88.8222 19.2319C86.7307 21.3689 83.1237 25.0668 74.3486 34.0693C72.8482 35.6 71.0447 37.4489 70.3324 38.1613C69.6201 38.8736 67.756 40.7983 66.1646 42.42C63.1638 45.5117 55.389 53.4987 52.9035 56.0297C47.7809 61.2735 44.4921 64.6835 44.4467 64.8199C44.3709 65.0321 55.8134 76.5049 56.0862 76.5049C56.2529 76.5049 87.1551 45.633 119.77 12.8969C122.574 10.078 125.029 7.62276 125.226 7.45605C126.347 6.42547 132.167 0.439011 132.167 0.302612C132.167 0.226837 132.061 0.105591 131.925 0.0601273C131.637 -0.0459671 108.979 -0.000495911 108.07 0.120743Z'
                  fill='#3E4F7A'
                />
                <path
                  d='M21.107 87.8561C20.8039 88.1592 19.5612 89.4626 18.3487 90.7356C17.1363 92.0238 15.4691 93.7971 14.6204 94.6761C13.7717 95.5551 12.7866 96.6311 12.4229 97.0403C11.7106 97.8587 11.6954 97.8739 10.0738 99.5562C8.87646 100.814 4.75415 105.194 2.13223 108.013C1.17743 109.028 0.328716 109.983 0.252938 110.104C0.162005 110.286 2.16254 112.363 8.93709 119.152C13.7869 123.987 26.3205 136.566 36.8082 147.099L55.8588 166.226H67.9378C74.5759 166.226 80.0471 166.165 80.0926 166.104C80.1229 166.044 68.3621 154.162 53.9492 139.703C39.5362 125.245 27.5481 113.196 27.3057 112.954C27.0783 112.696 26.654 112.287 26.366 112.029C25.0172 110.771 23.8047 109.422 23.8047 109.15C23.8047 108.968 25.6234 107.073 28.7303 104.027C31.4431 101.375 33.6558 99.1318 33.6558 99.056C33.6558 98.8136 22.274 87.4469 21.9557 87.3711C21.7587 87.3105 21.4859 87.4772 21.107 87.8561Z'
                  fill='#3E4F7A'
                />
              </svg>
            </Link>

            {/* <Link
              to='/'
              className=' text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-primary font-bold text-buttonBg hover:text-buttonBg transition duration-300'
            >
              {t('businessInfo.name')}
            </Link> */}
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
            <LangSwitcher /> {/* This will handle the language switching */}
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
