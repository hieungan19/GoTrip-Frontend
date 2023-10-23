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
  colors,
} from "@mui/material";
import React from "react";
import { Colors } from "../../styles/theme";

const FollowerList = ({ followers }) => {
  return (
    <List>
      {followers.map((follower) => (
        <ListItem key={follower.id}>
          <Grid container alignItems="center">
            <Grid item xs={7} container alignItems="center">
              <ListItemAvatar>
                <Avatar src={follower.avatar} sx={{ width: 45, height: 45 }} />
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
                    padding: "18px"
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
  );
};

export default FollowerList;
