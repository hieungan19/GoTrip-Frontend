import React, { useState, useEffect, useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PostComponent from './PostComponent';
import CreatePostButton from '../../pages/home/component/CreatePostButton';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const perpage = 2;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // api url
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(async () => {
    if (loading) return;
    console.log('Page: ', page);
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/posts`, {
        params: {
          page: page,
          perPage: perpage,
        },
        headers: {
          Accept: 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      const data = response.data.data;
      if (page === 1 && posts.length > 0) return;

      setPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }

    setLoading(false);
  }, [loading, page]);

  const handleScroll = useCallback(() => {
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 200) {
      if (page === 1) setPage((prevPage) => prevPage - 1);

      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Box>
      <CreatePostButton />
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
      {loading && <CircularProgress />}
    </Box>
  );
};

export default PostList;
