import logo from './logo.svg';
import './App.css'
import LoginUser from './Components/LoginUser';
import RegisterUser from './Components/RegisterUser';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home'
import MenuItems from './Components/MenuItems'
import { ToastContainer } from 'react-toastify';
import TransferCoins from './Components/TransferCoins';

function App() {
  const [users, setUsers] = React.useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const handleRegister = (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

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
            <Route path="/Home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer/:coinId" element={<TransferCoins/>} />
            <Route path="/MenuItems" element={<MenuItems />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
