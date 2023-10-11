import React from 'react';
import SignUpForm from './component/UserSignUpForm';
import { Box, Grid } from '@mui/material';
import signupImg from '../../assets/images/signup.png';

const SignupPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={6}>
          <SignUpForm />
        </Grid>
        <Grid item xs={6}>
          <img src={signupImg} alt='car' style={{ height: '90vh' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupPage;
