import { Avatar, Grid, Button } from '@mui/material';

import React from 'react';

const UserList = ({ text, users }) => {
  const handleFollow = (userId) => {};
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <strong>{text}</strong>
      </Grid>
      {users.map((user) => (
        <Grid key={user.id} item container alignItems='center' spacing={2}>
          <Grid item>
            <Avatar
              alt={user.name}
              src={`https://i.pravatar.cc/40?u=${user.id}`}
            />
          </Grid>
          <Grid item>{user.name}</Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={() => handleFollow(user.id)}
            >
              Follow
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;
