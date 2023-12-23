import React, { useState, useEffect, useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PostComponent from './PostComponent';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostList = ({ url, posts, setPosts }) => {
  const perpage = 5;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const [author, setAuthor] = useState({});

  const fetchData = useCallback(
    async (url) => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await axios.get(`${API_URL}/${url}`, {
          params: {
            page: page,
            perPage: perpage,
          },
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        let data = [];
        if (url == 'posts') data = response.data.data;
        else {
          data = response.data.posts.data;
          setAuthor(response.data.author);
        }

        if (page === 1 && posts.length > 0) return;

        setPosts((prevPosts) => [...prevPosts, ...data]);

        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.log(error);
        // toast.error(error.message);
      }

      setLoading(false);
    },
    [loading, page]
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
    setPosts([]);
    // Fetch data when the component mounts
    fetchData(url);
  }, [url]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Box>
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          post={author.id ? { ...post, author } : post}
          setPosts={setPosts}
        />
      ))}
      {loading && <CircularProgress />}
    </Box>
  );
};

export default PostList;
