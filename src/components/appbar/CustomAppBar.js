import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import avatar from '../../assets/logo/logo.svg';
import SideBar from '../sidebar/SideBar';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import { Colors } from '../../styles/theme';

const CustomAppBar = (props) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar component='nav' sx={{ px: '12px' }} elevation={0}>
        <Toolbar sx={{ padding: '0px' }}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2, padding: 0 }}
            onClick={handleDrawerToggle}
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
            sx={{
              mr: 1,
              border:
                location.pathname === '/login' ? '1px solid white' : 'none',
            }}
            onClick={() => navigate('login')}
          >
            Login
          </Button>
          <Button
            variant='contained'
            sx={{
              border:
                location.pathname === '/signup' ? '2px solid white' : 'none',
            }}
            onClick={() => navigate('signup')}
          >
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <nav
        style={{
          display:
            location.pathname === '/login' ||
            location.pathname === '/signup' ||
            location.pathname === '/change-password'
              ? 'none'
              : 'block',
        }}
      >
        <SideBar open={mobileOpen} onClose={handleDrawerToggle} />
      </nav>
    </Box>
  );
};

export default CustomAppBar;
