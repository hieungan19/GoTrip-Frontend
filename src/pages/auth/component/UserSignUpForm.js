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
import axios from 'axios';
import { toast } from 'react-toastify';

const UserSignUpForm = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation here
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatchError(true);
      return;
    }
    // Reset the error state
    setPasswordsMatchError(false);
    // Implement logic to change the password
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('password_confirmation', formData.confirmPassword);

      const response = await axios.post(`${BASE_URL}/authen/register`, data);
      toast.success('Register sucessfully!Please login.');
      setIsLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
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
              name='name'
              value={formData.name}
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
              error={passwordsMatchError}
              helperText={passwordsMatchError ? 'Passwords do not match' : ''}
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
                  <Link to={'/login'}> Login</Link>
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
