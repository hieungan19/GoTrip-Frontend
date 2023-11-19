import { Box, Grid } from '@mui/material';
import React from 'react';
import LoginForm from './component/UserLoginForm';
import car from '../../assets/images/login.png';

const LoginPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} md={6}>
          <LoginForm />
        </Grid>
        <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <img
            src={car}
            alt='car'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
