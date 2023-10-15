import React from "react";
import RatingBox from "./RatingBox";
import { LinearProgress, Paper, Typography, Container, Grid, Stack } from '@mui/material';
import Comment from "./Comment";

const RateAndComment = () => {
    // Dữ liệu đánh giá
    const totalReviews = 3000; // Số lượng tổng đánh giá
    const ratings = [2500, 300, 20, 30, 150]; // Mảng số đánh giá cho mỗi mức 1 sao đến 5 sao
  
    const ReviewProgressBar = ({ totalReviews, ratings }) => {
      return (
        <Container >
          <Grid container spacing={3}>
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={0} sx={{backgroundColor: "rgba(168, 228, 169, 0)" }}>
                  <Grid container spacing={-60} alignItems="center">
                    <Grid item xs={2}>
                      <Typography variant="h6" mt={-1} ml={2}>{`${rating}`}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <LinearProgress
                        variant="determinate"
                        value={(ratings[index] / totalReviews) * 100}
                        color="warning"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    };
  
    return(
        <>
        <Typography variant="h4" align="left">Rate and Comment</Typography>
        <Stack direction="row" spacing={2}>
        <RatingBox/>
        <Typography>{totalReviews} rates</Typography>
        </Stack>
        <ReviewProgressBar totalReviews={totalReviews} ratings={ratings} />
        <Typography gutterBottom></Typography>
        <Comment/>
        <Comment/>

        </>
    );
};

export default RateAndComment;
