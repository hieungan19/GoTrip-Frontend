import React, { useState, useEffect, useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PostComponent from './PostComponent';
import axios from 'axios';

const PostList = ({ url, refresh }) => {
  const [posts, setPosts] = useState([]);

  const perpage = 5;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(
    async (url) => {
      if (loading) return;
      console.log('Page: ', page);
      setLoading(true);

      try {
        const response = await axios.get(`${API_URL}/${url}`, {
          params: {
            page: page,
            perPage: perpage,
          },
          headers: {
            Accept: 'application/json',
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
    },
    [loading, page, refresh]
  );

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

      fetchData(url);
    }
  }, [fetchData]);

  useEffect(() => {
    console.log('Fetch Post');
    // Fetch data when the component mounts
    fetchData(url);
  }, [refresh]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Box>
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
      {loading && <CircularProgress />}
    </Box>
  );
};

export default PostList;
