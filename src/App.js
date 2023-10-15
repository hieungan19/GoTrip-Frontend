import './App.css';
import React from 'react';
import LoginPage from './pages/auth/LoginPage';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/auth/SignupPage';
import CustomAppBar from './components/appbar/CustomAppBar';
import Footer from './components/footer/Footer';
import PlacePage from './pages/place/PlacePage';
function App() {
  return (
    <div className='App'>
      <PlacePage />
    </div>
  );
}

export default App;
