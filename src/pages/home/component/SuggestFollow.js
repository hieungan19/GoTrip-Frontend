import { Box, InputAdornment, TextField } from '@mui/material';
import UserList from '../../../components/user/UserList';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

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
    <Box
      paddingLeft={{ sm: 0, lg: '20px' }}
      display={{ xs: 'none', sm: 'none', lg: 'block' }}
    >
      <div
        style={{
          padding: '16px',
          borderRight: '1px solid #ccc',
          height: '100vh',
          position: 'fixed',
          minWidth: '300px',
        }}
      >
        {/* Search Bar */}
        <TextField
          label='Search'
          variant='outlined'
          fullWidth
          style={{ marginBottom: '16px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <UserList text={'Suggest Friend'} users={users} />
      </div>
    </Box>
  );
};

export default SuggestFollow;
