import logo from './logo.svg';
import './App.css'
import LoginUser from './Components/LoginUser';
import RegisterUser from './Components/RegisterUser';
import React from 'react';
import { BrowserRouter as Router, Route,Routes,useNavigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import Layout from './Components/Layout/Layout';
import AboutUs from './Components/AboutUs'
import Home from './Components/Home'
import MenuItems from './Components/MenuItems'
import { ToastContainer } from 'react-toastify';

function App() {
   // Array to store registered users
  //  const [users, setUsers] = React.useState([]);
   const [users, setUsers] = React.useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  
   // Register a new user
   const handleRegister = (userData) => {
      // Store the user in local storage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = [...existingUsers, userData];
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  // // Update the state
  // setUsers(updatedUsers);
  //    setUsers([...users, userData]);
  //    console.log(userData)
   };
 
   // Login a user
   const handleLogin = (userData) => {
     console.log('User logged in:', userData);
   
   };
   return (
    <Router>
      <div>
        <Routes>
        <Route path="/login" element={<LoginUser users={users} onLogin={handleLogin} />} />
          <Route path="/register-user" element={<RegisterUser onRegister={handleRegister} />} />
          <Route path="/" element={<Layout />}>
            {/* <Route path="/dasboard" element={<Dashboard />} /> */}
            <Route path="/Home" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/MenuItems" element={<MenuItems />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

  


export default App;
