import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns'; // Import the format function from date-fns

const Notification = ({ avatarSrc, username, detail, datetime }) => {
  // Format the datetime using date-fns
  const formattedDatetime = format(new Date(datetime), 'MMMM dd, yyyy HH:mm');

  return (
    <Paper
      elevation={3}
      style={{
        padding: '16px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        textAlign: 'start',
      }}
    >
      {/* Avatar */}
      <Avatar alt={username} src={avatarSrc} style={{ marginRight: '16px' }} />

      {/* Notification Details */}
      <div>
        <Typography variant='subtitle1' fontWeight={'bold'}>
          {username}
        </Typography>
        <Typography variant='body2'>{detail}</Typography>
        <Typography variant='caption' color='textSecondary'>
          {formattedDatetime}
        </Typography>
      </div>
    </Paper>
  );
};

export default Notification;
