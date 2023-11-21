import React from 'react';
import NotificationList from './components/NotificationList';
import { Box } from '@mui/material';

const NotificationPage = () => {
  return (
    <Box sx={{ pl: { xs: 0, sm: '200px' } }}>
      <NotificationList />
    </Box>
  );
};

export default NotificationPage;
