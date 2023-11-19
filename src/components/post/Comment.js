import React from 'react';
import { Avatar, Typography, Box, Paper } from '@mui/material';
import { Colors } from '../../styles/theme';

const Comment = ({ avatarSrc, username, detail, createdAt }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
        backgroundColor: Colors.light_gray,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        src={avatarSrc}
        alt='Avatar'
        sx={{ ml: 1, mt: 1, flexShrink: 0, width: 32, height: 32 }}
      />
      <Box
        sx={{
          p: 1,
          pt: 2,
          mb: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant='body2' fontWeight={600} mt={0.2} mb={0.5}>
          {username}
        </Typography>
        <Typography variant='body2' mb={0.5}>
          {detail}
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          {createdAt}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Comment;
