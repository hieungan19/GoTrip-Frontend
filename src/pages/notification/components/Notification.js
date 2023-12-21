import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns'; // Import the format function from date-fns
import { Colors } from '../../../styles/theme';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Notification = ({
  notiId,
  avatarSrc,
  username,
  detail,
  datetime,
  postId,
  isRead = false,
}) => {
  // Format the datetime using date-fns
  const formattedDatetime = format(new Date(datetime), 'MMMM dd, yyyy HH:mm');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const readNotification = async () => {
    try {
      let response;
      if (!isRead)
        response = await axios.patch(
          `${API_URL}/notifications/read-notification/${notiId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      onClick={readNotification}
      elevation={1}
      style={{
        padding: '16px',
        marginBottom: '16px',
        display: 'flex',

        alignItems: 'center',

        textAlign: 'start',
        backgroundColor: isRead ? 'white' : Colors.light_gray,
      }}
    >
      {/* Avatar */}
      <Avatar alt={username} src={avatarSrc} style={{ marginRight: '16px' }} />

      {/* Notification Details */}
      <div>
        <Typography variant='body2'>{detail}</Typography>
        <Typography variant='caption' color='textSecondary'>
          {formattedDatetime}
        </Typography>
      </div>
    </Paper>
  );
};

export default Notification;
