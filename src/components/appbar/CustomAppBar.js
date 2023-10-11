import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import avatar from '../../assets/logo/logo.svg';
import { useNavigate } from 'react-router-dom';

const CustomAppBar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ padding: '0px', mb: 1 }}>
        <Toolbar sx={{ padding: '0px' }}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2, padding: 0 }}
          >
            <Avatar alt='Logo' src={avatar} sx={{ width: 64, height: 64 }} />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              fontWeight: 600,
              letterSpacing: '2px',
            }}
          >
            GOTRIP
          </Typography>
          <Button
            color='inherit'
            variant='outlined'
            sx={{ mr: 1 }}
            onClick={() => navigate('login')}
          >
            Login
          </Button>
          <Button variant='contained' onClick={() => navigate('signup')}>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CustomAppBar;
