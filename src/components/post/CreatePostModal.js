import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../firebase/firebaseConfig';
import { selectUserAvatar, selectUserName } from '../../redux/slice/authSlice';

const CreatePostModal = ({
  open,
  onClose,
  setCurrentPost,
  setPosts,
  postDataToUpdate = null,
}) => {
  const avatar_url = useSelector(selectUserAvatar);
  const userName = useSelector(selectUserName);
  const [postDetail, setPostDetail] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const [isLoading, setLoading] = useState(false);
  //api
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (postDataToUpdate) {
      setPostDetail(postDataToUpdate.content || ''); // Set content for updating
      setSelectedImages(postDataToUpdate?.images.map((i) => i.image_url) || []);
    }
  }, [postDataToUpdate]);

  const handleImageInputChange = (event) => {
    const files = event.target.files;
    setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleUploadImages = async () => {
    try {
      const imageUrls = await Promise.all(
        selectedImages.map(async (image) => {
          if (typeof image !== 'string') {
            const imageRef = ref(storage, `images/${uuidv4()}`);
            const uploadTask = uploadBytesResumable(imageRef, image);

            return new Promise((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                },
                (err) => {
                  reject(err);
                },
                () => {
                  // download url
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                      resolve(url);
                    })
                    .catch((error) => {
                      reject(error);
                    });
                }
              );
            });
          } else return image;
        })
      );

      return imageUrls;
    } catch (error) {
      toast.error('Error uploading images:', error.message);
    }
  };

  const handleCreateOrUpdatePost = async () => {
    setLoading(true);
    try {
      const images = await handleUploadImages();

      const postData = {
        content: postDetail,
        images: images,
      };

      if (postDataToUpdate) {
        // If updating, send a PUT request
        await axios.patch(`${API_URL}/posts/${postDataToUpdate.id}`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Handle the response as needed

        setCurrentPost({
          ...postDataToUpdate,
          images: images.map((imgUrl, index) => ({ image_url: imgUrl })),
          content: postDetail,
        });
      } else {
        // If creating, send a POST request
        const response = await axios.post(`${API_URL}/posts`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Post created sucessfully.');
        setPosts((prePosts) => [response.data, ...prePosts]);
        setSelectedImages([]);
        setPostDetail('');
      }
    } catch (error) {
      toast.error('Failed to create/ update post. ');
    }
    setLoading(false);
    onClose(); // Close the modal after creating/updating
  };
  const getImageUrl = (image) => {
    if (typeof image === 'string' && image.startsWith('https://')) {
      return image;
    } else {
      const blobUrl = URL.createObjectURL(image);
      return blobUrl;
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ height: '100%' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '600px',
          minWidth: { lg: '600px', md: '500px', xs: '300px' },
          maxHeight: '400px',
          p: 3,
          bgcolor: 'background.paper',
          overflowY: 'auto',
        }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Box display='flex' alignItems='center'>
            <Avatar src={avatar_url} alt='User Avatar' />
            <Box ml={2}>
              <Typography variant='body1' fontWeight='bold'>
                {userName}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          variant='standard'
          multiline
          fullWidth
          placeholder="What's on your mind?"
          autoFocus
          value={postDetail}
          onChange={(e) => setPostDetail(e.target.value)}
          mb={1}
          sx={{ border: 'none' }}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Box mt={2} display='flex' flexDirection='row' flexWrap={'wrap'}>
          {Array.isArray(selectedImages) &&
            selectedImages.map((image, index) => (
              <Box
                key={index}
                mr={2}
                position='relative'
                style={{ maxHeight: '200px', overflow: 'hidden' }}
              >
                <IconButton
                  size='small'
                  onClick={() => handleRemoveImage(index)}
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  <CloseIcon fontSize='small' />
                </IconButton>
                <img
                  src={getImageUrl(image)}
                  alt={`Selected Img ${index + 1}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              </Box>
            ))}
          <Box position='relative' mt={0}>
            <label htmlFor='imageInput'>
              <IconButton
                component='span'
                sx={{
                  width: '100px',
                  height: '100px',
                  border: '2px dotted #ccc',
                  borderRadius: '4px',
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
            <input
              type='file'
              accept='image/*'
              id='imageInput'
              style={{ display: 'none', outline: 'none' }}
              onChange={handleImageInputChange}
              multiple
            />
          </Box>
        </Box>
        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='flex-end'
          mt={2} // Push the button to the bottom
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={handleCreateOrUpdatePost}
              mt={2}
            >
              {postDataToUpdate !== null ? 'Update Post' : 'Create Post'}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
