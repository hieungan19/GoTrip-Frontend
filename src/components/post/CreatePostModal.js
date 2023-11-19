import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const CreatePostModal = ({ open = true, onClose }) => {
  const [postDetail, setPostDetail] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

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

  const handleCreatePost = () => {
    console.log('User Name:', 'John Doe');
    console.log('Post Detail:', postDetail);
    console.log('Selected Images:', selectedImages);
    onClose();
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
            <Avatar src='/path/to/avatar.jpg' alt='User Avatar' />
            <Box ml={2}>
              <Typography variant='body1' fontWeight='bold'>
                John Doe {/* Replace with actual user name */}
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
            // <== adjusted this
            disableUnderline: true, // <== added this
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
                  src={URL.createObjectURL(image)}
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
          <Button
            variant='contained'
            color='primary'
            onClick={handleCreatePost}
            mt={2}
          >
            Create Post
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
