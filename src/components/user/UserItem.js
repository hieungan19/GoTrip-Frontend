import { Avatar, Grid, Button } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFollowees } from '../../redux/slice/userSlice';
import { selectUserId } from '../../redux/slice/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserItem = ({ user }) => {
  const meId = useSelector(selectUserId);
  const [isFollowed, setIsFollowed] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const fetchIsFollowed = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user-relationships/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFollowed(response.data.status);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchIsFollowed();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const response = await axios.post(
        `${API_URL}/user-relationships/follow`,
        {
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setIsFollowed(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleUnfollow = async (userId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/user-relationships/unfollow`,
        {
          data: {
            user_id: userId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsFollowed(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleClickOnUser = () => {
    navigate(`/profile/${user.id}`);
  };
  return (
    <Grid
      key={user.id}
      item
      container
      alignItems='center'
      spacing={2}
      xs={1}
      onClick={() => {
        handleClickOnUser(user.id);
      }}
    >
      <Grid item>
        <Avatar alt={user.name} src={user.avatar_url} />
      </Grid>
      <Grid item xs={4}>
        {user.name}
      </Grid>
      {meId != user.id ? (
        <Grid item xs={1}>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() =>
              isFollowed ? handleUnfollow(user.id) : handleFollow(user.id)
            }
          >
            {isFollowed ? 'UnFollow' : 'Follow'}
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default UserItem;
