import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostComponent from '../../components/post/PostComponent';
import axios from 'axios';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';

const PostPage = () => {
  const { id } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const [post, setPost] = useState({});
  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/posts/get-post-by-id/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use localStorage or another state management solution
          },
        }
      );
      setPost(response.data.post);
    } catch (error) {
      toast.error(error.message);
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
