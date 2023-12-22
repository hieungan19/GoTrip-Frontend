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
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component

import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { selectUserAvatar, selectUserName } from '../../redux/slice/authSlice';
import { Colors } from '../../styles/theme';
import UserList from '../user/UserList';
import CommentList from './CommentList';
import CreatePostModal from './CreatePostModal';
import DeletePostDialog from './DeletePostDialog';

const PostComponent = ({ post }) => {
  const avatar_url = useSelector(selectUserAvatar);
  const API_URL = process.env.REACT_APP_API_URL;
  const [currentPost, setCurrentPost] = useState(post);
  const formattedDate =
    Object.keys(currentPost).length !== 0
      ? format(new Date(currentPost.created_at), 'dd/MM/yyyy HH:mm')
      : '';
  const token = localStorage.getItem('token');
  const meId = localStorage.getItem('id');

  const [showFullContent, setShowFullContent] = useState(false);
  const [showReadMore, setShowReadMore] = useState(
    currentPost.content?.length > 400 ? true : false
  );
  const [comment, setComment] = useState('');
  const [refreshCommentList, setRefreshCommentList] = useState([]);
  const [like, setLike] = useState(
    currentPost.likes_with_users
      ? currentPost.likes_with_users?.some((user) => user.user_id == meId)
      : 0
  );
  const [anchorEl, setAnchorEl] = useState(null); // State for Menu
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [likeUserListOpen, setLikeUserListOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(
    currentPost.likes_with_users ? currentPost.likes_with_users.length : 0
  );
  useEffect(() => {
    setCurrentPost(post);
    setLike(
      post.likes_with_users
        ? post.likes_with_users?.some((user) => user.user_id == meId)
        : 0
    );
    setLikeCount(post.likes_with_users ? post.likes_with_users.length : 0);
  }, [post]);

  //like
  const handleToggleLike = async () => {
    try {
      if (!like) {
        const response = await axios.post(
          `${API_URL}/posts/like`,
          {
            post_id: currentPost.id,
          },
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
    } catch (error) {
      toast.error('Fail');
    }
  };

  const userName = useSelector(selectUserName);
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/posts/${currentPost.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Delete successfully.');
      setCurrentPost({});
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
    setOpenEditDialog(false);
  };

  const handleDeleteClick = () => {
    // Implement logic for deleting the post
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

  const handleAddCommentClick = async () => {
    // Implement the logic to add a comment using the 'comment' state
    try {
      const response = await axios.post(
        `${API_URL}/comment/create-comment`,
        {
          post_id: currentPost.id,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefreshCommentList(!refreshCommentList);
    } catch (error) {
      toast.error(error.message);
    }
    setComment(''); // Clear the comment field after adding
  };

  if (Object.keys(currentPost).length === 0) {
    return null;
  } else
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
                currentPost.author_id != meId
                  ? currentPost.author?.avatar_url
                  : avatar_url
              }
            />
          }
          title={
            currentPost.author_id != meId ? currentPost.author?.name : userName
          }
          subheader={formattedDate}
          action={
            currentPost.author_id == meId ? (
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
            ) : null
          }
        />
        <CardContent sx={{ px: 0 }}>
          <Typography variant='body2' textAlign={'left'}>
            {currentPost && currentPost.content && (
              <>
                {showFullContent
                  ? currentPost.content
                  : `${currentPost.content.slice(0, 400)}${
                      showReadMore ? '...' : ''
                    }`}
                {showReadMore && !showFullContent && (
                  <Button
                    onClick={handleReadMoreClick}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    ... Read More
                  </Button>
                )}
                {!showReadMore && currentPost.content?.length > 400 && (
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
        {Array.isArray(currentPost.images) && (
          <Slider {...settings}>
            {currentPost.images.map((item, index) => (
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
          <IconButton
            sx={{ pl: 0 }}
            aria-label='like'
            onClick={handleToggleLike}
          >
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
          <CommentList postId={currentPost.id} refresh={refreshCommentList} />
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddCommentClick();
              }
            }}
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
        {post.author_id == meId ? (
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
              users={post.likes_with_users?.map((u) => u.user)}
            />
          </Box>
        </Dialog>
        <CreatePostModal
          open={openEditDialog}
          onClose={handleCloseEdit}
          postDataToUpdate={currentPost}
          setCurrentPost={setCurrentPost}
        />
      </Card>
    );
};

export default PostComponent;
