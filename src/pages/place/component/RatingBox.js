import { Box, Rating, Typography } from '@mui/material';
import * as React from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
const RatingBox = () => {
    return (
      <>
        <Box
          sx={{
            backgroundColor: '#00796B',
            borderRadius: '15px',
            display: 'inline-flex',
            alignItems: 'center',
            paddingLeft: '9px',
            paddingTop:'3px',
            paddingBottom:'3px',
            marginLeft: '-24px',
          }}
        >
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '0.6rem', // Điều chỉnh kích thước của chữ
            }}
          >
            4.8
          </Typography>
          <StarRateIcon
            sx={{
              color: '#FFD600',
              fontSize: '0.9rem',
              marginLeft: '3px',
              marginBottom: '1px', 
            }}
          />
        </Box>
      </>
    );
  };
 export default RatingBox;