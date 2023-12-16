import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import coverImgTemp from '../../assets/images/cover_img.jpg';
import { storage } from '../../firebase/firebaseConfig';
import {
  SET_ACTIVE_USER,
  SET_USER_AVATAR,
  SET_USER_COVER_IMAGE,
  SET_USER_NAME,
  selectToken,
  selectUserId,
} from '../../redux/slice/authSlice';

const EditProfilePage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    intro: null,
    phone_number: null,
    avatar_url: null,
    cover_image_url: null,
  });
  const meId = localStorage.getItem('id');
  const [avatarFile, setAvatarFile] = useState();
  const [coverImageFile, setCoverImageFile] = useState();
  const token = localStorage.getItem('token');
  const [avatar, setAvatar] = useState(formData.avatar_url);
  const [coverPicture, setCoverPicture] = useState(
    formData.cover_image_url ?? coverImgTemp
  );
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${meId}`);
      const user = response.data;
      setFormData({
        name: user.name,
        intro: user.intro,
        phone_number: user.phone_number,
        avatar_url: user.avatar_url,
        cover_image_url: user.cover_image_url,
      });
      setAvatar(user.avatar_url);
      setCoverImageFile(user.cover_image_url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
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
    setCoverImageFile(file);
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

  const handleImageUpload = async (isAvatar, file) => {
    if (!file) return null;
    const storageRef = ref(storage, `user/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
          toast.error(error.message);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            if (isAvatar) setFormData({ ...formData, avatar_url: downloadURL });
            else setFormData({ ...formData, cover_image_url: downloadURL });

            resolve(downloadURL);
          } catch (error) {
            console.log(error);
            toast.error(error.message);
            reject(error);
          }
        }
      );
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let downloadURLAvatar = await handleImageUpload(true, avatarFile);
      let downloadURLCoverImg = await handleImageUpload(false, coverImageFile);
      if (downloadURLAvatar == null) downloadURLAvatar = formData.avatar_url;
      if (downloadURLCoverImg == null)
        downloadURLCoverImg = formData.cover_image_url;

      const response = await axios.patch(
        `${API_URL}/authen/user`,
        {
          ...formData,
          avatar_url: downloadURLAvatar,
          cover_image_url: downloadURLCoverImg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(SET_USER_AVATAR({ avatar_url: downloadURLAvatar }));
      dispatch(SET_USER_COVER_IMAGE({ cover_image_url: downloadURLCoverImg }));
      dispatch(SET_USER_NAME({ name: formData.name }));

      toast.success('Update sucessfully.');
    } catch (error) {
      toast.error('Fail');
      console.log(error);
    }
  };

  return (
    <Box sx={{ pl: { xs: 0, sm: '200px' } }}>
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
              name='name'
              value={formData.name}
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
              name='phone_number'
              value={formData.phone_number}
              onChange={handleChange}
              placeholder='Enter phone number'
              sx={{ mb: 2 }}
              InputProps={{
                inputProps: {
                  pattern: '[0-9]*', // Chỉ cho phép nhập các ký tự số
                },
              }}
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
    </Box>
  );
};

export default EditProfilePage;
