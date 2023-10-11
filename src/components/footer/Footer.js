import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import logo from '../../assets/logo/logo.svg';

const Footer = () => {
  return (
    <Paper
      sx={{
        marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}
      component='footer'
      square
      variant='outlined'
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex',
            my: 0,
          }}
        >
          <Avatar src={logo} width='100px' />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex',
            mb: 1,
          }}
        >
          <Typography variant='caption' color='initial'>
            Copyright ©2023
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;
