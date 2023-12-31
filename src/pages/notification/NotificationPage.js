import React, { useEffect, useState } from 'react';
import NotificationList from './components/NotificationList';
import echo from '../echo';
import { Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const NotificationPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');
  const fetchAllNotifications = async () => {
    try {
      const response = await axios.get(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(response.data.notifications.reverse());
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllNotifications();
  }, []);
  return (
    <Box sx={{ pl: { xs: 0, sm: '220px' } }}>
      <NotificationList notifications={notifications} />
    </Box>
  );
};

export default NotificationPage;
