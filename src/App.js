import './App.css';
import React from 'react';
import LoginPage from './pages/auth/LoginPage';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/auth/SignupPage';
import CustomAppBar from './components/appbar/CustomAppBar';
import Footer from './components/footer/Footer';
import { Container } from '@mui/material';
import ProfilePage from './pages/userProfile/ProfilePage';
import EditProfilePage from './pages/userProfile/EditProfilePage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import ChatSidebar from './pages/chat/components/ChatSideBar';
import ChatBox from './pages/chat/components/ChatBox';
import ChatPage from './pages/chat/ChatPage';
import HomePage from './pages/home/HomePage';
import PostComponent from './components/post/PostComponent';
import NotificationPage from './pages/notification/NotificationPage';

function App() {
  return (
    <div className='App'>
      {/* <ChatPage /> */}
      <CustomAppBar />

      <Container
        sx={{
          marginTop: '8px',
          padding: '4px',
        }}
      >
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/change-password' element={<ChangePasswordPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/edit' element={<EditProfilePage />}></Route>
          <Route path='/home' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/notification' element={<NotificationPage />} />
        </Routes>
      </Container>
      <Footer />
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
