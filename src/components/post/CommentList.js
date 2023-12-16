import React, { useEffect, useState } from 'react';
import Comment from './Comment'; // Adjust the path based on your folder structure
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';

const CommentList = ({ postId, refresh }) => {
  console.log('Post id for comment: ', postId);
  const API_URL = process.env.REACT_APP_API_URL;
  const initialCommentsToShow = 1;
  const additionalCommentsToShow = 5;
  const [commentsToShow, setCommentsToShow] = useState(initialCommentsToShow);

  const [comments, setComments] = useState([]);
  const fetchComment = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/comment/get-comments/${postId}`,
        {
          params: { perPage: 50 },
        }
      );
      setComments(response.data.comments);
      console.log('Comment', response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchComment();
  }, [refresh]);

  const handleShowMoreClick = () => {
    const newCommentsToShow = commentsToShow + additionalCommentsToShow;
    setCommentsToShow(Math.min(newCommentsToShow, comments.length));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {comments.slice(0, commentsToShow).map((comment) => {
        const formattedDate = format(
          new Date(comment.created_at),
          'dd/MM/yyyy HH:mm'
        );
        return (
          <Comment
            key={comment.id}
            avatarSrc={comment.avatar_url}
            username={comment.user.name}
            detail={comment.content}
            createdAt={formattedDate}
          />
        );
      })}
      {comments.length > initialCommentsToShow &&
        commentsToShow < comments.length && (
          <Button
            onClick={handleShowMoreClick}
            variant='text'
            color='primary'
            sx={{
              alignSelf: 'flex-start',
              textAlign: 'start',
              textTransform: 'capitalize',
            }}
          >
            ... Show more comments
          </Button>
        )}
    </Box>
  );
};

export default CommentList;
