import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostComponent from '../../components/post/PostComponent';
import axios from 'axios';
import { Box } from '@mui/system';

const PostPage = () => {
  const { id } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const [post, setPost] = useState({});
  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use localStorage or another state management solution
        },
      });
      setPost(response.data.data.find((p) => p.id == id));
      console.log(response.data.post);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <Box sx={{ pl: { xs: 0, sm: '220px' } }}>
      <PostComponent post={post} />
    </Box>
  );
};

export default PostPage;
