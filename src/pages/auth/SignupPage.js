import React from 'react';
import SignUpForm from './component/UserSignUpForm';
import { Box, Grid } from '@mui/material';
import signupImg from '../../assets/images/signup.png';

const SignupPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} md={6}>
          <SignUpForm />
        </Grid>
        <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <img
            src={signupImg}
            alt='Signup Img'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupPage;
