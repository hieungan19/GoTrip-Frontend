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
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Colors } from '../../styles/theme';
import CommentList from './CommentList';

const images = [
  'https://th.bing.com/th/id/R.1abee17234dca9feaf9d0064bf491f6e?rik=Gs1TTKs9hDMyHg&pid=ImgRaw&r=0',
  'https://th.bing.com/th/id/R.1abee17234dca9feaf9d0064bf491f6e?rik=Gs1TTKs9hDMyHg&pid=ImgRaw&r=0',

  // Add more image URLs as needed
];

const PostComponent = () => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showReadMore, setShowReadMore] = useState(true);
  const [comment, setComment] = useState('');
  const [like, setLike] = useState(true); // Added state for likes

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
        width: { lg: '600px', md: '500px', xs: '400px' },
      }}
      elevation={3}
    >
      <CardHeader
        sx={{ textAlign: 'left', px: 0 }}
        avatar={<Avatar src='/path/to/avatar.jpg' />}
        title='Username'
        subheader='Posted 2 hours ago'
      />
      <CardContent sx={{ px: 0 }}>
        <Typography variant='body2' color='textSecondary' textAlign={'left'}>
          {showFullContent
            ? content
            : `${content.slice(0, 50)}${showReadMore ? '...' : ''}`}
          {showReadMore && !showFullContent && (
            <Button
              onClick={handleReadMoreClick}
              sx={{ textTransform: 'capitalize' }}
            >
              ... Read More
            </Button>
          )}
          {!showReadMore && (
            <Button
              onClick={handleReadMoreClick}
              sx={{ textTransform: 'capitalize' }}
            >
              Read Less
            </Button>
          )}
        </Typography>
      </CardContent>

      <Slider {...settings}>
        {images.map((imageUrl, index) => (
          <Box key={index} sx={{}}>
            <CardMedia
              component='img'
              alt={`Post Image ${index + 1}`}
              height={{ lg: '600px', md: '500px', xs: '400px' }}
              image={imageUrl}
              sx={{ objectFit: 'cover', px: 0.2 }}
            />
          </Box>
        ))}
      </Slider>
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
        0 likes
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
    </Card>
  );
};

export default PostComponent;
