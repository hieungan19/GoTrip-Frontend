import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  colors,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../styles/theme";

const FollowerList = ({ followers, open, handleClose }) => {
  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            boxSizing: "border-box",
            overflowX: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(168, 228, 169, 0.1)",
          }}
        >
          Followers
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            sx={{ position: "absolute", right: "8px", top: "8px" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            width: "350px",
            height: "650px",
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(168, 228, 169, 0.1)",
            overflowY: "auto",
            maxHeight: "100%",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#588E76",
              borderRadius: "6px",
            },
          }}
        >
          <List>
            {followers.map((follower) => (
              <ListItem key={follower.id}>
                <Grid container alignItems="center">
                  <Grid item xs={7} container alignItems="center">
                    <ListItemAvatar>
                      <Avatar
                        src={follower.avatar}
                        sx={{ width: 45, height: 45 }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={follower.name} />
                  </Grid>
                  <Grid item xs={3}>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="remove"
                        color="primary"
                        sx={{
                          backgroundColor: "#A5D6A7",
                          borderRadius: "28px",
                          width: "100px",
                          height: "45px",
                          padding: "18px",
                        }}
                      >
                        Remove
                      </IconButton>
                    </ListItemSecondaryAction>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FollowerList;
