import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import CreatePostModal from '../../../components/post/CreatePostModal';
import { useSelector } from 'react-redux';
import { selectUserAvatar } from '../../../redux/slice/authSlice';

const CreatePostButton = ({ setPosts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const avatar_url = useSelector(selectUserAvatar);
  const handleOpenModal = () => {
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
        src={avatar_url}
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
      <CreatePostModal
        open={isModalOpen}
        onClose={handleCloseModal}
        setPosts={setPosts}
      />
      {/* Add any other fields or buttons you need in the modal */}
    </Paper>
  );
};

export default CreatePostButton;
