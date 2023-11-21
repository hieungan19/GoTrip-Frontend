import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Colors } from '../../styles/theme';
import CommentList from './CommentList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeletePostDialog from './DeletePostDialog';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreatePostModal from './CreatePostModal';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectToken, selectUserId } from '../../redux/slice/authSlice';

const images = [
  'https://th.bing.com/th/id/R.1abee17234dca9feaf9d0064bf491f6e?rik=Gs1TTKs9hDMyHg&pid=ImgRaw&r=0',
  'https://th.bing.com/th/id/R.1abee17234dca9feaf9d0064bf491f6e?rik=Gs1TTKs9hDMyHg&pid=ImgRaw&r=0',

  // Add more image URLs as needed
];

const PostComponent = ({ post }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const formattedDate = format(new Date(post.created_at), 'dd/MM/yyyy HH:mm');
  const token = useSelector(selectToken);

  const [showFullContent, setShowFullContent] = useState(false);
  const [showReadMore, setShowReadMore] = useState(
    post.content?.length > 50 ? true : false
  );
  const [comment, setComment] = useState('');
  const [like, setLike] = useState(true); // Added state for likes
  const [anchorEl, setAnchorEl] = useState(null); // State for Menu
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // post - user
  const userId = useSelector(selectUserId);

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Delete successfully.');
    } catch (error) {
      toast.error(error.message);
    }
    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };
  //menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    // Implement logic for editing the post
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const handleCloseEdit = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteClick = () => {
    // Implement logic for deleting the post
    console.log('Delete Post clicked!');
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const content =
    'Your long content goes here... Your long content goes here... Your long content goes here...';

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleReadMoreClick = () => {
    setShowFullContent(!showFullContent);
    setShowReadMore(!showReadMore);
  };

  const handleAddCommentClick = () => {
    // Implement the logic to add a comment using the 'comment' state
    console.log('Add Comment clicked! Comment:', comment);
    setComment(''); // Clear the comment field after adding
  };

  const handleLikeClick = () => {
    // Implement the logic to increment the likes count
    setLike(!like);
  };

  return (
    <Card
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        px: 1,
        flexDirection: 'column',
        mt: 4,
        width: { lg: '600px', md: '500px', xs: '400px' },
      }}
      elevation={3}
    >
      <CardHeader
        sx={{ textAlign: 'left', px: 0 }}
        avatar={<Avatar src={post.author.avatar_url} />}
        title={post.author.name}
        subheader={formattedDate}
        action={
          post.author_id != userId ? (
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
      />
      <CardContent sx={{ px: 0 }}>
        <Typography variant='body2' textAlign={'left'}>
          {post && post.content && (
            <>
              {showFullContent
                ? post.content
                : `${post.content.slice(0, 50)}${showReadMore ? '...' : ''}`}
              {showReadMore && !showFullContent && (
                <Button
                  onClick={handleReadMoreClick}
                  sx={{ textTransform: 'capitalize' }}
                >
                  ... Read More
                </Button>
              )}
              {!showReadMore && post.content?.length > 50 && (
                <Button
                  onClick={handleReadMoreClick}
                  sx={{ textTransform: 'capitalize' }}
                >
                  Read Less
                </Button>
              )}
            </>
          )}
        </Typography>
      </CardContent>
      {Array.isArray(post.images) && (
        <Slider {...settings}>
          {post.images.map((item, index) => (
            <Box key={item.id}>
              <CardMedia
                component='img'
                alt={`Post Image ${index + 1}`}
                height={{ lg: '600px', md: '500px', xs: '400px' }}
                image={item.image_url}
                sx={{ objectFit: 'cover', px: 0.2 }}
              />
            </Box>
          ))}
        </Slider>
      )}

      <CardActions sx={{ px: 0 }} disableSpacing>
        <IconButton sx={{ pl: 0 }} aria-label='like' onClick={handleLikeClick}>
          <FavoriteIcon sx={{ color: like ? Colors.love : null }} />
        </IconButton>
        <IconButton aria-label='comment'>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <SendIcon />
        </IconButton>
      </CardActions>
      <Typography
        variant='body2'
        fontWeight={700}
        sx={{ alignSelf: 'flex-start', mb: 1 }}
      >
        {post.like_count}
      </Typography>
      <Box>
        <CommentList />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          my: '16px',
        }}
      >
        <Avatar sx={{ mr: 2 }}></Avatar>
        <TextField
          sx={{ flexGrow: 1 }}
          size='small'
          value={comment}
          placeholder='Add Comment'
          onChange={(e) => setComment(e.target.value)}
          InputProps={{
            sx: { borderRadius: '24px' },
            endAdornment: (
              <IconButton onClick={handleAddCommentClick}>
                <SendIcon sx={{ color: 'primary.main' }} />
              </IconButton>
            ),
          }}
        />
      </Box>
      <Menu
        id='post-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>Edit Post</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete Post</MenuItem>
      </Menu>
      <DeletePostDialog
        openDeleteDialog={openDeleteDialog}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteConfirm={handleDeleteConfirm}
      />
      {/* <CreatePostModal
        open={openEditDialog}
        onClose={handleCloseEdit}
        postDataToUpdate={post}
      /> */}
    </Card>
  );
};

export default PostComponent;
