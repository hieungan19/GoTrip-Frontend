import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import UserList from './UserList';
import SearchIcon from '@mui/icons-material/Search';

const SearchUserList = ({ openDialog, handleCloseDialog }) => {
  const users = [];
  for (let i = 1; i <= 5; i++) {
    users.push({
      id: i,
      name: `Friend ${i}`,
      avatar: `https://i.pravatar.cc/40?u=${i}`, // Example avatar URL
    });
  }

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth='sm'
      >
        <DialogContent>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchUserList;
