import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  
  // Check if the current route is the homepage
  const isHomePage = location.pathname === '/';
  const footerTextColor = isHomePage ? 'text-white' : 'text-primary';

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer transparent textColor={footerTextColor} />
    </div>
  );
}

export default Layout;
