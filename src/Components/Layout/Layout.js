import Header from './Header';
import Footer from './Footer'
import './Layout.css'
import { Outlet,useLocation } from 'react-router-dom';
import LoginUser from '../LoginUser'

const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the current location is "/login" or "/register-user"
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register-user';

  // // Render the header and footer conditionally
  // const renderHeader = !isLoginPage && !isRegisterPage;
  // const renderFooter = !isLoginPage && !isRegisterPage; 
  const renderHeader = !isLoginPage && !isRegisterPage;
const renderFooter = !isLoginPage && !isRegisterPage && location.pathname !== '/';

  return (
    <div className="layout-container">
      {renderHeader && <Header />}
      
      <main>
        {children}
      </main>
      <Outlet />
      {renderFooter && <Footer />}
    </div>
  );
};

export default Layout;





