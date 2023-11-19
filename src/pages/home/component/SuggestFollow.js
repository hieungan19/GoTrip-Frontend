import { TextField } from '@mui/material';
import UserList from '../../../components/user/UserList';
import React from 'react';

const SuggestFollow = () => {
  const users = [];
  for (let i = 1; i <= 5; i++) {
    users.push({
      id: i,
      name: `Friend ${i}`,
      avatar: `https://i.pravatar.cc/40?u=${i}`, // Example avatar URL
    });
  }
  return (
    <div
      style={{
        padding: '16px',
        borderRight: '1px solid #ccc',
        height: '100vh',
      }}
    >
      {/* Search Bar */}
      <TextField
        label='Search'
        variant='outlined'
        fullWidth
        style={{ marginBottom: '16px' }}
      />
      <UserList text={'Suggest Friend'} users={users} />
    </div>
  );
};

export default SuggestFollow;
