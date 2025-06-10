import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import UserLoginPage from './pages/UserLoginPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLoginPage';
function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="/user-login" element={<UserLoginPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        <Route path='/adminLoginpage' element={<AdminLoginPage/>} />
    </Routes>
  );
}

export default App;
