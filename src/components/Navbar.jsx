import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaMapMarkerAlt, FaInfoCircle, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageProvider';
import logoBlack from '/logoBlack.png'; // Black logo for light background
import logoColor from '/logoColor.png'; // blueish logo

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (event.target.closest('.language-dropdown')) {
      return; // Do nothing if clicked inside the dropdown
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // No need for scroll logic since the navbar is always white
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { content } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow">
      <div className="container mx-auto py-2 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            <Link to="/">
              <img 
                src={logoColor} 
                alt="TK & Associates Logo" 
                className="h-9 w-auto max-w-full rounded border border-buttonBg"  
              />
            </Link>
            <Link to="/" className={`hidden md:block font-secondary font-bold text-buttonBg hover:text-buttonBg transition duration-300`}>
              {content.businessInfo.name}
            </Link>
          </div>

          <div className="hidden lg:flex space-x-6">
            <Link 
              to="/about" 
              className="hover:text-buttonBg transition duration-300 text-black">
              {content.menu.about}
            </Link>
            <Link to="/practices" className="hover:text-buttonBg transition duration-300 text-black">
              {content.menu.practices}
            </Link>
            <Link to="/blog" className="hover:text-buttonBg transition duration-300 text-black">
              {content.menu.blog}
            </Link>
            <Link to="/location" className="flex items-center hover:text-buttonBg transition duration-300 text-black">
              <FaMapMarkerAlt className="mr-2" /> {content.menu.location}
            </Link>
            <Link to="/contact" className="flex items-center hover:text-buttonBg transition duration-300 text-black">
              <FaInfoCircle className="mr-2" /> {content.menu.contact}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative language-dropdown">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="flex items-center px-2 text-black border border-black rounded-sm focus:outline-none"
              >
                {language === 'en' ? 'En' : 'Vi'}
                <FaChevronDown size={12} className="ml-2" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-16 bg-white border border-primary rounded shadow-lg z-50">
                  <button 
                    onClick={() => { setLanguage('en'); setIsDropdownOpen(false); }} 
                    className="block px-4 py-2 text-left text-primary hover:bg-primary hover:text-white w-full transition duration-200"
                  >
                    En
                  </button>
                  <button 
                    onClick={() => { setLanguage('vi'); setIsDropdownOpen(false); }} 
                    className="block px-4 py-2 text-left text-primary hover:bg-primary hover:text-white w-full transition duration-200"
                  >
                    Vi
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={toggleMenu} 
              className="block lg:hidden focus:outline-none transition-transform delay-150 duration-1000 transform hover:scale-110 text-black"
              >
              {isOpen ? <FaTimes size={32} /> : <FaBars size={32} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="bg-white text-black shadow-lg overflow-hidden transition-transform duration-1000 ease-in-out transform">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link to="/about" className="hover:text-accent transition duration-300 font-bold text-black" onClick={toggleMenu}>
                {content.menu.about}
              </Link>
              <Link to="/practices" className="hover:text-accent transition duration-300 font-bold text-black" onClick={toggleMenu}>
                {content.menu.practices}
              </Link>
              <Link to="/blog" className="hover:text-accent transition duration-300 font-bold text-black" onClick={toggleMenu}>
                {content.menu.blog}
              </Link>

              <hr className="w-4/5 border-accent opacity-50" />

              <Link to="/location" className="flex items-center hover:text-accent transition duration-300 font-bold text-black" onClick={toggleMenu}>
                <FaMapMarkerAlt className="mr-2" /> {content.menu.location}
              </Link>
              <Link to="/contact" className="flex items-center hover:text-accent transition duration-300 font-bold text-black" onClick={toggleMenu}>
                <FaInfoCircle className="mr-2" /> {content.menu.contact}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
