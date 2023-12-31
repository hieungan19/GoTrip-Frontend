import { Grid } from '@mui/material';
import UserItem from './UserItem';

import React from 'react';

const UserList = ({ text, users }) => {
  return (
    <Grid container direction='column' spacing={2}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </Grid>
  );
};

export default UserList;
