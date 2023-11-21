import React, { useState } from 'react';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchUserList from '../user/SearchUserList';

const SearchAppBarIcon = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <IconButton
        sx={{ display: { sm: 'block', lg: 'none' } }}
        onClick={handleOpenDialog}
      >
        <SearchIcon sx={{ color: 'white' }} />
      </IconButton>

      <SearchUserList
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
};

export default SearchAppBarIcon;
