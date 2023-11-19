import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Grid,
  Tooltip,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    intro: 'Web Developer | Travel Enthusiast',
    password: '',
    phoneNumber: '',
    avatar:
      'https://img6.thuthuatphanmem.vn/uploads/2022/10/27/anh-avatar-nu-che-mat-anime_084750690.jpg',
    coverPicture:
      'https://img4.thuthuatphanmem.vn/uploads/2020/05/13/anh-nen-4k-anime_062606240.jpg', // Add your own password state logic
  });

  const [avatar, setAvatar] = useState(formData.avatar);
  const [coverPicture, setCoverPicture] = useState(formData.coverPicture);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverPicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update user profile (send data to server, etc.)
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              position: 'relative',
              height: '200px',
            }}
          >
            <img
              src={coverPicture}
              alt='Cover'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: 2,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Tooltip title='Change Avatar'>
                <IconButton
                  style={{
                    backgroundColor: '#fff',
                    opacity: 0.5, // Màu nền trắng
                  }}
                >
                  <DriveFolderUploadIcon />
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleCoverPictureChange}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                      zIndex: 1000,
                      // Add cursor style for better UX
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                bottom: 0, // Adjust this value to create space for the upload button
                left: '50%',
                bottom: -60,
                transform: 'translateX(-50%)',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                src={avatar}
                alt='Avatar'
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid #fff',
                  marginBottom: 2,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '20%',
                  right: '20%',
                  padding: 2,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Thêm biểu tượng hoặc nút thay đổi ảnh bìa tại đây */}
                <Tooltip title='Change Avatar'>
                  <IconButton
                    style={{
                      backgroundColor: '#fff',
                      opacity: 0.5, // Màu nền trắng
                    }}
                  >
                    <DriveFolderUploadIcon />
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleAvatarChange}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                        zIndex: 1000,
                        // Add cursor style for better UX
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box height={50}></Box>
          <TextField
            label='Full Name'
            fullWidth
            variant='outlined'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Intro'
            fullWidth
            multiline
            rows={3}
            variant='outlined'
            name='intro'
            value={formData.intro}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Phone Number'
            variant='outlined'
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder='Enter phone number'
            sx={{ mb: 2 }}
            InputProps={{
              inputProps: {
                pattern: '[0-9]*', // Chỉ cho phép nhập các ký tự số
              },
            }}
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            variant='outlined'
            name='password'
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            startIcon={<EditIcon />}
          >
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProfilePage;
