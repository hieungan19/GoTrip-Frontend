import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

const DeletePostDialog = ({
  openDeleteDialog,
  handleDeleteCancel,
  handleDeleteConfirm,
}) => {
  return (
    <Dialog
      open={openDeleteDialog}
      onClose={handleDeleteCancel}
      aria-labelledby='delete-dialog-title'
      aria-describedby='delete-dialog-description'
    >
      <DialogTitle id='delete-dialog-title'>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id='delete-dialog-description'>
          Are you sure you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteConfirm} color='secondary' autoFocus>
          Delete
        </Button>
        <Button onClick={handleDeleteCancel} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostDialog;
