import { Box, Grid } from '@mui/material';
import React from 'react';
import LoginForm from './component/UserLoginForm';
import car from '../../assets/images/login.png';

const LoginPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={6}>
          <LoginForm />
        </Grid>
        <Grid item xs={6}>
          <img src={car} alt='car' style={{ height: '80vh' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
