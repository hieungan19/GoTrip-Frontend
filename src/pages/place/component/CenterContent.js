import React from "react";
import { Divider, Paper, Typography } from "@mui/material";
import HeadComponent from "./HeadComponent";

import TabDetail from "./TabDetail";
import RateAndComment from "./RateAndComment";
import RelatedPlace from "./RelatedPlace";
const CenterContent = () => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{ backgroundColor: "rgba(168, 228, 169, 0.1)", padding: 1 }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "left",
            paddingTop: 2,
            paddingLeft: 2,
            marginBottom: 2,
          }}
        >
          Places
        </Typography>
        <Divider />
        <HeadComponent />
        <TabDetail />
        <Typography gutterBottom></Typography>
        <RateAndComment />
        <RelatedPlace />
      </Paper>
    </>
  );
};
export default CenterContent;
