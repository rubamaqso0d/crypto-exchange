import React, { useState } from 'react';
import './Header.css';
import { Link ,useNavigate} from 'react-router-dom';
import Dashboard from '../Dashboard';
import Home from '../Home'
import MenuItems from '../MenuItems'




const Header = () => {
    const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions if needed
    // Redirect to the login page
    navigate('/login');
  };
    return(
    <header className="header-container">

   <nav>
     <ul className="header-links">
       <li>
         <Link  className="header-title" to="/Home">Home</Link>
       </li>
       <li>
         <Link className="header-title" to="/dashboard">Dashboard</Link>
       </li>
       <li>
         <Link  className="header-title"to="/MenuItems">Menu Items</Link>
       </li>
       <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
     </ul>
   </nav>
 </header>
    )
}
export default Header;