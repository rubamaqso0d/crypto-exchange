import logo from './logo.svg';
import './App.css';
import LoginUser from './Components/LoginUser';
import RegisterUser from './Components/RegisterUser';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home';
import MenuItems from './Components/MenuItems';
import { ToastContainer ,toast } from 'react-toastify';
import TransferCoins from './Components/TransferCoins';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const [users, setUsers] = React.useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const handleRegister = (userData) => {
    setUsers((prevUsers) => [...prevUsers, userData]);
    toast.success('Registration successful');
    // const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    // const updatedUsers = [...existingUsers, userData];
    // localStorage.setItem('users', JSON.stringify(updatedUsers));
    // setUsers(updatedUsers); // Update the users state
    
  };

  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    setIsAuthenticated(true);
  };
 
  const ProtectedRoute = ({ path, element: Component }) => {
    return isAuthenticated ? (
      <Layout>
      <Component />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
  };
  // useEffect(() => {
  //   // Check if the current path is the root path ("/")
  //   const isRootPath = window.location.pathname === '/';
  //   const loginUrl = '/login';
  
  //   if (isRootPath) {
  //     // Redirect to the login page
  //     window.location.href = loginUrl;
  //   }
  // }, []);
  


  return (
    <Router>
      <div>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginUser users={users} onLogin={handleLogin} />} />
            <Route path="/register-user" element={<RegisterUser users={users} setUsers={setUsers} onRegister={handleRegister} />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transfer/:coinId" element={<TransferCoins />} />
            <Route path="/MenuItems" element={<MenuItems />} />
          </Route>
          <Route element={<ProtectedRoute path="/" element={<Layout />} />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
