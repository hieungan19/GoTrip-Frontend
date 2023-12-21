// ChangePasswordPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;

  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const email = useSelector(selectEmail);

  const navigate = useNavigate();

  const handleChangePassword = async () => {
    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordsMatchError(true);
      return;
    }
    // Reset the error state
    setPasswordsMatchError(false);
    // Implement logic to change the password
    try {
      const data = new FormData();
      data.append('email', email);
      data.append('password', formData.newPassword);
      data.append('password_confirmation', formData.confirmPassword);
      const response = await axios.post(
        `${BASE_URL}/authen/reset-password`,
        data
      );
      toast.success('Change password successfully! Please login. ');
      setTimeout(function () {
        navigate('/login');
      }, 1500);
    } catch (err) {
      toast.error('Failed to change password. Please try again.');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div>
        <Typography component='h1' variant='h5'>
          Change Password
        </Typography>
        <form>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='newPassword'
            label='New Password'
            type='password'
            id='newPassword'
            autoComplete='new-password'
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirmPassword'
            autoComplete='confirm-password'
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            error={passwordsMatchError}
            helperText={passwordsMatchError ? 'Passwords do not match' : ''}
          />
          <Button
            type='button'
            variant='contained'
            color='primary'
            onClick={handleChangePassword}
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ChangePasswordPage;
