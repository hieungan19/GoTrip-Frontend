import { Avatar, Grid, Button } from '@mui/material';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFollowees } from '../../redux/slice/userSlice';
import { selectUserId } from '../../redux/slice/authSlice';

const UserItem = ({ user }) => {
  const meId = useSelector(selectUserId);
  const followees = useSelector(selectFollowees);
  const [isFollowed, setIsFollowed] = useState();
  // followees.some((f) => user.id === f.id)
  const handleFollow = () => {
    setIsFollowed(true);
  };
  const handleUnfollow = () => {
    setIsFollowed(false);
  };
  return (
    <Grid key={user.id} item container alignItems='center' spacing={2} xs={1}>
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
