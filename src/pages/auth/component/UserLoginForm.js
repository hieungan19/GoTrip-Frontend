import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Colors } from '../../../styles/theme';
import { linkStyle } from '../../../styles/text';
import axios from 'axios';
import { toast } from 'react-toastify';

function LoginForm() {
  const BASE_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/authenticate/login`, {
        email: formData.email,
        password: formData.password,
      });

      console.log('Login successful!', response.data);
      setIsLoading(false);
    } catch (error) {
      // Handle login failure (e.g., show error message)
      console.error('Login failed:', error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h5'
          color={Colors.primary}
          fontWeight={700}
          gutterBottom
        >
          Login
        </Typography>
        <form onSubmit={loginUser} style={{ width: '100%' }}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{ mt: 1 }}
          >
            Sign In
          </Button>
          <Box mt={1} />
          <Grid container justifyContent='center'>
            <Grid item>
              <Typography // Replace with your sign-up route
                variant='body2'
              >
                Dont have an account?
                <Link style={linkStyle} to={'/signup'}>
                  {' '}
                  Log In
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginForm;
