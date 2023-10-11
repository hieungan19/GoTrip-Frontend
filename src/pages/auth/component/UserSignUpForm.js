import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Colors } from '../../../styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { linkStyle } from '../../../styles/text';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserSignUpForm = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation here
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/authenticate/register`, {
        ...formData,
      });
      console.log('Sign up successful!', response.data);
      setIsLoading(false);
      navigate('/login');
    } catch (error) {
      console.error('Sign up failed:', error);
      setIsLoading(false);
      toast.error(error.message);
    }

    // Handle form submission here, e.g., send data to the server
  };

  return (
    <>
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
            Sign up
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Full Name'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              margin='normal'
            />
            <TextField
              fullWidth
              label='Username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              margin='normal'
            />
            <TextField
              fullWidth
              label='Email'
              name='email'
              type='email'
              required
              value={formData.email}
              onChange={handleChange}
              margin='normal'
            />
            <TextField
              fullWidth
              label='Password'
              name='password'
              type='password'
              required
              value={formData.password}
              onChange={handleChange}
              margin='normal'
            />
            <TextField
              fullWidth
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              margin='normal'
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              size='large'
              style={{ marginTop: '16px' }}
            >
              Sign Up
            </Button>
            <Box mt={1} />
            <Grid container justifyContent='center'>
              <Grid item>
                <Typography // Replace with your sign-up route
                  variant='body2'
                >
                  Already have an account?
                  <Link style={linkStyle} to={'/login'}>
                    {' '}
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default UserSignUpForm;
