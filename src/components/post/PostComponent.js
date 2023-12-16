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
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component

import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import {
  selectToken,
  selectUserAvatar,
  selectUserId,
  selectUserName,
} from '../../redux/slice/authSlice';
import { Colors } from '../../styles/theme';
import UserList from '../user/UserList';
import CommentList from './CommentList';
import DeletePostDialog from './DeletePostDialog';
import CreatePostModal from './CreatePostModal';

const PostComponent = ({ post }) => {
  const avatar_url = useSelector(selectUserAvatar);
  const API_URL = process.env.REACT_APP_API_URL;
  const formattedDate = format(new Date(post.created_at), 'dd/MM/yyyy HH:mm');
  const token = useSelector(selectToken);
  const meId = useSelector(selectUserId);

  const [showFullContent, setShowFullContent] = useState(false);
  const [showReadMore, setShowReadMore] = useState(
    post.content?.length > 50 ? true : false
  );
  const [comment, setComment] = useState('');
  const [like, setLike] = useState(
    post.likes_with_users.some((user) => user.user_id == meId)
  );
  const [anchorEl, setAnchorEl] = useState(null); // State for Menu
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [likeUserListOpen, setLikeUserListOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(
    post.likes_with_users ? post.likes_with_users.length : 0
  );

  //like
  const handleToggleLike = async () => {
    try {
      if (!like) {
        const response = await axios.post(
          `${API_URL}/posts/${post.id}/like`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLike(true);
        setLikeCount(likeCount + 1);
      } else {
        const response = await axios.delete(
          `${API_URL}/posts/${post.id}/unlike`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLike(false);
        setLikeCount(likeCount - 1);
      }

      console.log('Success');
    } catch (error) {
      toast.error('Fail');
      console.log('Error: ', error.message);
    }
  };

  const userName = useSelector(selectUserName);
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
    console.log('Close');
    setOpenEditDialog(false);
  };

  const handleDeleteClick = () => {
    // Implement logic for deleting the post
    console.log('Delete Post clicked!');
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

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

  return (
    <Card
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        px: 1,
        flexDirection: 'column',
        mt: 4,
        width: { lg: '500px', md: '500px', xs: '400px' },
      }}
      elevation={3}
    >
      <CardHeader
        sx={{ textAlign: 'left', px: 0 }}
        avatar={
          <Avatar
            src={
              post.author?.id !== meId ? post.author?.avatar_url : avatar_url
            }
          />
        }
        title={post.author?.id !== meId ? post.author?.name : userName}
        subheader={formattedDate}
        action={
          post.author_id === meId ? (
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
                image={item.image_url}
                style={{
                  height: '500px',
                  objectFit: 'cover',
                  px: 0.2,
                }}
              />
            </Box>
          ))}
        </Slider>
      )}

      <CardActions sx={{ px: 0 }} disableSpacing>
        <IconButton sx={{ pl: 0 }} aria-label='like' onClick={handleToggleLike}>
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
        onClick={() => {
          setLikeUserListOpen(true);
        }}
      >
        {likeCount}
      </Typography>
      <Box>
        <CommentList postId={post.id} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          my: '16px',
        }}
      >
        <Avatar sx={{ mr: 2 }} src=''></Avatar>
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
      {post.author_id === meId ? (
        <Menu
          id='post-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick}>Edit Post</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete Post</MenuItem>
        </Menu>
      ) : null}

      <DeletePostDialog
        openDeleteDialog={openDeleteDialog}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteConfirm={handleDeleteConfirm}
      />
      <Dialog
        open={likeUserListOpen}
        onClose={() => {
          setLikeUserListOpen(false);
        }}
      >
        <Box sx={{ height: '300px', p: 2 }}>
          <UserList
            text={'Users like'}
            users={post.likes_with_users.map((u) => u.user)}
          />
        </Box>
      </Dialog>
      <CreatePostModal
        open={openEditDialog}
        onClose={handleCloseEdit}
        postDataToUpdate={post}
      />
    </Card>
  );
};

export default PostComponent;
