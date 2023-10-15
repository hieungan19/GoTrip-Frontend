import React, { useState } from "react";
import { Colors } from "../../../styles/theme";
import { Container, Typography, TextField, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';

const MyPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 80,
  padding: theme.spacing(2),
  margin: theme.spacing(4),
  ...theme.typography.body2,
  textAlign: 'center',
  borderRadius: "15px",
  background: "rgba(168, 228, 169, 0.7)", 
}));

const RightContent = () => {
  return (
    <>
      <Container sx={{ backgroundColor: 'rgba(168, 228, 169, 0.1)', padding:5}}>
        <MyPaper elevation={3} >
            <Typography variant="h6" gutterBottom>OPEN:</Typography>
            <Typography variant="body1">Monday to friday: 6am-12pm</Typography>
            <Typography variant="body1">Weekend: 9am-10pm</Typography>
        </MyPaper>

      </Container>
    </>
  );
};
export default RightContent;
