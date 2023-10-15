import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import RatingBox from "./RatingBox";

const Card = () => {
  const paperStyle = {
    height: "100%",
    borderRadius: '15px',
  };

  const imgStyle = {
    maxWidth: "100%",
    borderRadius: '15px',
  };

  return (
    <Grid item xs={4}>
      <Paper elevation={3} style={paperStyle}>
        <img
          src="/place_images/Rplace1.jpg"
          alt="Place"
          style={imgStyle}
        />
        <Box paddingX={1}>
          <Typography variant="subtitle1" align="left" fontWeight="bold" mb={-1}>
            Sol by Meliá Phu Quoc
          </Typography>
          <Typography variant="body1" align="left" sx={{ color: 'gray' }}>
            Resort
          </Typography>
          <Stack direction="row" alignItems="center" spacing={13.5}>
          <Typography
          variant="body1"
          gutterBottom
          align="left"
          sx={{
            textDecoration: "underline",
            display: "flex",
            align: 'left',
            color: "primary.main",
          }}
        >
          <RoomIcon style={{ fontSize: "1.2rem", marginRight: 5, marginLeft:-5 }} />
          Phú Quốc
        </Typography>
            <RatingBox/>
          </Stack>
        </Box>
      </Paper>
    </Grid>
  );
};

const RelatedPlace = () => {
  return (
    <>
      <Typography variant="h4" align="left" gutterBottom>Related places</Typography>
      <Grid container spacing={5}>
        <Card />
        <Card />
        <Card />
      </Grid>
    </>
  );
};

export default RelatedPlace;
