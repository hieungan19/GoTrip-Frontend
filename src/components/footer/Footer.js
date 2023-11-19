import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';

import { FooterTitle, SubscribeTextField } from './style';
import { Colors } from '../../styles/theme';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display:
          location.pathname === '/login' || location.pathname === '/signup'
            ? 'block'
            : 'none',
        marginLeft:
          location.pathname === '/login' || location.pathname === '/signup'
            ? '0px'
            : '200px',
        background: Colors.shaft,
        color: Colors.white,
        p: { xs: 4, md: 4 },
        fontSize: { xs: '14px', md: '16px' },
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent='center'
        sx={{ flexWrap: 'nowrap' }}
      >
        <Grid item md={6} lg={4}>
          <FooterTitle variant='body1'>About us</FooterTitle>
          <Box sx={{ mt: 4, color: Colors.dove_gray }}>
            <FacebookIcon sx={{ mr: 1 }} />
            <TwitterIcon sx={{ mr: 1 }} />
            <InstagramIcon />
          </Box>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant='body1'>Information</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant='caption2'>
                About Us
              </Typography>
            </ListItemText>

            <ListItemText>
              <Typography lineHeight={2} variant='caption2'>
                Privacy &amp; Policy
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant='caption2'>
                Terms &amp; Conditions
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant='body1'>My account</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant='caption2'>
                Login
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant='caption2'>
                Places
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant='caption2'>
                My Account
              </Typography>
            </ListItemText>
            <ListItemText></ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={4}>
          <FooterTitle variant='body1'>Newsletter</FooterTitle>
          <Stack>
            <SubscribeTextField
              color='primary'
              label='Email address'
              variant='standard'
            />
            <Button
              variant='contained'
              sx={{ mt: 4, mb: 4 }}
              startIcon={<SendIcon sx={{ color: Colors.white }} />}
            >
              Subscribe
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
