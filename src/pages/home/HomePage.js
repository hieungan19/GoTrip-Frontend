import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PostList from '../../components/post/PostList';
import SearchUserList from '../../components/user/SearchUserList';
import echo from '../echo';
import CreatePostButton from './component/CreatePostButton';
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: { sm: 'center', lg: 'flex-start' },
        pl: { xs: 0, sm: '200px' },
      }}
    >
      <Box>
        <CreatePostButton setPosts={setPosts} />
        <PostList url={'posts'} posts={posts} setPosts={setPosts} />
      </Box>

      <SearchUserList isDialog={false} />
    </Box>
  );
};

export default HomePage;
