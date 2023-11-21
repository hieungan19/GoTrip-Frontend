import { Box } from '@mui/material';
import React from 'react';
import PostList from '../../components/post/PostList';
import SuggestFollow from './component/SuggestFollow';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: { sm: 'center', lg: 'flex-start' },
        pl: { xs: 0, sm: '200px' },
      }}
    >
      <PostList />
      <SuggestFollow />
    </Box>
  );
};

export default HomePage;
