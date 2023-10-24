import React, { useState } from "react";
import FollowerList from "./FollowerList";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const FollowerDialog = () => {
  const [open, setOpen] = useState(false);

  const followers = [
    { id: 1, name: "User 1", avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" },
    { id: 2, name: "User 2", avatar: "url_to_avatar_2" },
    { id: 3, name: "User 3", avatar: "url_to_avatar_2" },
    { id: 4, name: "User 4", avatar: "url_to_avatar_2" },
    { id: 5, name: "User 5", avatar: "url_to_avatar_2" },
    { id: 6, name: "User 6", avatar: "url_to_avatar_2" },
    { id: 7, name: "User 7", avatar: "url_to_avatar_2" },
    { id: 8, name: "User 8", avatar: "url_to_avatar_2" },
    { id: 9, name: "User 9", avatar: "url_to_avatar_2" },
    { id: 9, name: "User 9", avatar: "url_to_avatar_2" },
    { id: 9, name: "User 9", avatar: "url_to_avatar_2" },
    { id: 9, name: "User 9", avatar: "url_to_avatar_2" },

    // Thêm các follower khác ở đây
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{followers.length} followers</Button>
      <FollowerList followers={followers} open={open} handleClose={handleClose} />
    </div>
  );
};

export default FollowerDialog;
