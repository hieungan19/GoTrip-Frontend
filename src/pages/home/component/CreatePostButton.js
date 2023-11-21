import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CreatePostModal from '../../../components/post/CreatePostModal';
import { Colors } from '../../../styles/theme';
import { Box, Grid, Paper } from '@mui/material';
import { Container } from 'reactstrap';

const CreatePostButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log('hehe');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        p: 2,
      }}
    >
      {/* Create Post Button */}

      <Avatar
        alt='User Avatar'
        src='https://i.pravatar.cc/40'
        style={{ marginRight: '8px' }}
      />

      {/* Text Field */}

      <TextField
        placeholder='What do you feel?'
        variant='outlined'
        fullWidth
        multiline
        disabled
        onClick={handleOpenModal}
      />

      {/* Additional Content in Modal */}
      <CreatePostModal open={isModalOpen} onClose={handleCloseModal} />
      {/* Add any other fields or buttons you need in the modal */}
    </Paper>
  );
};

export default CreatePostButton;
