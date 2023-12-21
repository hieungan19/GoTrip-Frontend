import { Container } from '@mui/material';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CustomAppBar from './components/appbar/CustomAppBar';
import Footer from './components/footer/Footer';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ChatPage from './pages/chat/ChatPage';
import echo from './pages/echo';
import HomePage from './pages/home/HomePage';
import NotificationPage from './pages/notification/NotificationPage';
import EditProfilePage from './pages/userProfile/EditProfilePage';
import ProfilePage from './pages/userProfile/ProfilePage';
import PostPage from './pages/post/PostPage';
import axios from 'axios';

function App() {
  const [countUnReadNotification, setCountUnReadNotification] = useState(0);
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const meId = localStorage.getItem('id');
  const fetchAllNotifications = async () => {
    try {
      const response = await axios.get(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Noti', response);
      const countUnReadNoti = response.data.notifications.filter(
        (n) => n.is_read === false
      ).length;
      setCountUnReadNotification(countUnReadNoti);
    } catch (error) {
      console.log('Error when fetch notifications');
    }
  };
  const startWebSocket = async () => {
    echo
      .private(`author-channel.${meId}`)
      .listen('.post.liked.notification', (e) => {
        console.log('Listen Like Sent');
        if (localStorage.getItem('id') !== e.like.user_id) {
          setCountUnReadNotification((pre) => pre + 1);
        }
      });
  };
  useEffect(() => {
    fetchAllNotifications();
    startWebSocket();
    const token = localStorage.getItem('token');
    if (token) navigate('/home');
    else navigate('/login');
  }, []);
  return (
    <div className='App'>
      {/* <ChatPage /> */}
      <CustomAppBar
        countUnReadNoti={countUnReadNotification}
        setCountUnReadNoti={setCountUnReadNotification}
      />

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
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/profile/edit' element={<EditProfilePage />}></Route>
          <Route path='/home' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/notification' element={<NotificationPage />} />
          <Route path='/posts/:id' element={<PostPage />}></Route>
        </Routes>
      </Container>
      <Footer />
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
