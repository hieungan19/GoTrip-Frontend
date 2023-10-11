import './App.css';
import React from 'react';
import LoginPage from './pages/auth/LoginPage';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/auth/SignupPage';
import CustomAppBar from './components/appbar/CustomAppBar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className='App'>
      <CustomAppBar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
