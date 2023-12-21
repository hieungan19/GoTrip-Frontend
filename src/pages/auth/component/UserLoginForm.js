import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Colors } from '../../../styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER } from '../../../redux/slice/authSlice';

function LoginForm() {
  const BASE_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [confirmationCode, setConfirmationCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [dialogForgotPasswordOpen, setDialogForgotPasswordOpen] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyCode = async () => {
    try {
      const data = new FormData();

      data.append('email', formData.email);
      data.append('token', confirmationCode);

      const response = await axios.post(`${BASE_URL}/authen/verify/pin`, data);
      const r = response.data;

      dispatch(
        SET_ACTIVE_USER({
          email: formData.email,
        })
      );
      console.log('Email when dispatch ', formData.email);
      navigate('/change-password');
    } catch (err) {
      toast.error('Wrong code.');
    }
  };

  const closeDialog = () => {
    setDialogForgotPasswordOpen(false);
  };

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
      const data = new FormData();
      data.append('email', formData.email); // Thay email bằng giá trị từ state hoặc form input
      data.append('password', formData.password); // Thay password bằng giá trị từ state hoặc form input
      const response = await axios.post(`${BASE_URL}/authen/login`, data);

      const userInfo = response.data.data.user;
      const token = response.data.data.token;

      dispatch(
        SET_ACTIVE_USER({
          email: userInfo.email,
          name: userInfo.name,
          isLoggedIn: true,
          token: token,
          id: userInfo.id,
          phone_number: userInfo.phone_number,
          cover_image_url: userInfo.cover_image_url,
          avatar_url: userInfo.avatar_url,
          intro: userInfo.intro,
        })
      );

      toast.success('Login successfully!');
      localStorage.setItem('token', token);
      localStorage.setItem('id', userInfo.id);
      navigate('/home');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSendVerifyCode = async () => {
    try {
      const data = new FormData();
      data.append('email', formData.email);
      console.log(data);
      const response = await axios.post(
        `${BASE_URL}/authen/forgot-password`,
        data
      );
      if (response.data.success === true) {
        toast.success('Send code successfully!');
        setDialogForgotPasswordOpen(true);
      }
    } catch (err) {
      toast.error('Send code failed.');
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
          {'Login'}
        </Typography>
        <form style={{ width: '100%' }}>
          <>
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
          </>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{ mt: 1 }}
            onClick={loginUser}
          >
            {isLoading ? <CircularProgress /> : 'Log In'}
          </Button>
          <Button
            onClick={handleSendVerifyCode}
            fullWidth
            variant='text'
            color='primary'
            sx={{
              mt: 1,
              textTransform: 'none', // Tắt chữ in hoa
              fontSize: '0.85rem', // Điều chỉnh kích thước chữ
              textDecoration: 'underline', // Gạch chân
              '&:hover': {
                backgroundColor: 'transparent', // Loại bỏ màu nền khi hover
              },
            }}
          >
            Forgot Password?
          </Button>
          <Box mt={1} />
          <Grid container justifyContent='center'>
            <Grid item>
              <Typography variant='body2'>
                <>
                  {"Don't have an account?"}
                  <Link to={'/signup'}> Sign Up</Link>
                </>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Dialog
        open={dialogForgotPasswordOpen}
        onClose={closeDialog}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: { xs: '300px', md: '400px' } }}>
          <DialogTitle>Password Reset Email Sent</DialogTitle>
          <DialogContent>
            <DialogContentText>
              An email with a verification code was just sent to{' '}
              {formData.email}
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <TextField
              label='Confirmation Code'
              fullWidth
              variant='outlined'
              mb={2}
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleVerifyCode} variant='contained'>
              NEXT
            </Button>
            <Button onClick={closeDialog} variant='contained' color='secondary'>
              CANCEL
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
}

export default LoginForm;
