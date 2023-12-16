import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PostList from '../../components/post/PostList';
import SuggestFollow from './component/SuggestFollow';
import CreatePostButton from './component/CreatePostButton';
import SearchUserList from '../../components/user/SearchUserList';

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh((pre) => !pre);
  };
  useEffect(() => {}, []);
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
        <CreatePostButton handleRefresh={handleRefresh} />
        <PostList url={'posts'} refresh={refresh} />
      </Box>

      <SearchUserList isDialog={false} />
    </Box>
  );
};

export default HomePage;
