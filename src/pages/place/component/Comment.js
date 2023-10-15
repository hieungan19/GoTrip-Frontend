import React from "react";
import { Typography, Grid, Avatar, Paper, Rating, Box, Stack } from "@mui/material";

const Comment = () => {
  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  return (
    <Paper elevation={0} sx={{ padding: 2, backgroundColor: "rgba(168, 228, 169, 0)" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} sx={{ width: 45, height: 45 }} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ margin: 0, padding: 0, textAlign: "left" }}>
              Michel Michel
            </Typography>
            <Rating
              name="size-small"
              size="small"
              defaultValue={4.5}
              precision={0.25}
              readOnly
            />
            <Typography variant="body2" component="p" marginLeft={0.5}>
            4.5
          </Typography>
          </Stack>
          <Typography variant="body2" sx={{ margin: 0, padding: 0, textAlign: "left" }}>
            August 10, 2023
          </Typography>
          
          <Typography style={{ textAlign: "left" }}>
            Highly recommend this adventure with Alpaca. Our guides Alvin and
            Rosita were passionate and professional local guides, and even better
            human beings. Alvin went out of his way to help me with my altitude
            sickness, if it was not for him I doubt I would have made it to the end. The
            food was excellent! Our chef Hermando and his team turned out an
            impressive feast for us every day; you will not go hungry on this
            adventure!
          </Typography>
          <Typography style={{ textAlign: "left", color: "gray" }}>
            posted 1 minute ago
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
