import React, { useState } from 'react';
import Comment from './Comment'; // Adjust the path based on your folder structure
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const CommentList = () => {
  const initialCommentsToShow = 1;
  const additionalCommentsToShow = 5;
  const [commentsToShow, setCommentsToShow] = useState(initialCommentsToShow);

  const comments = [
    {
      id: 1,
      avatarSrc: 'url_to_avatar_image1',
      username: 'User1',
      detail: 'This is the first comment.',
      createdAt: '2023-01-01 12:00 PM',
    },
    {
      id: 2,
      avatarSrc: 'url_to_avatar_image2',
      username: 'User2',
      detail: 'This is the second comment.',
      createdAt: '2023-01-02 01:30 PM',
    },
  ];

  const handleShowMoreClick = () => {
    const newCommentsToShow = commentsToShow + additionalCommentsToShow;
    setCommentsToShow(Math.min(newCommentsToShow, comments.length));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {comments.slice(0, commentsToShow).map((comment) => (
        <Comment
          key={comment.id}
          avatarSrc={comment.avatarSrc}
          username={comment.username}
          detail={comment.detail}
          createdAt={comment.createdAt}
        />
      ))}
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
