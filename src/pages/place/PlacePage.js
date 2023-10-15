import React from "react";
import { Grid,Box } from "@mui/material";
import CenterContent from "./component/CenterContent";
import RightContent from "./component/RightContent";

const PlacePage = () => {
  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', minHeight: 'calc(100vh - 64px)' }}>   
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <p>Trái</p>
        </Grid>
        <Grid item xs={7} >
          <CenterContent />
        </Grid>
        <Grid item xs={3}>
          <RightContent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlacePage;
