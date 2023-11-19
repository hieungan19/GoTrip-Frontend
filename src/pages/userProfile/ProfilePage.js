import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Dialog,
  DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import { Colors } from '../../styles/theme';
import ResponsiveSideBar from '../../components/sidebar/SideBar';
const ProfilePage = () => {
  const [openCoverPicture, setOpenCoverPicture] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);

  const handleOpenCoverPicture = () => setOpenCoverPicture(true);
  const handleCloseCoverPicture = () => setOpenCoverPicture(false);

  const handleOpenAvatar = () => setOpenAvatar(true);
  const handleCloseAvatar = () => setOpenAvatar(false);

  const user = {
    fullName: 'John Doe',
    intro: 'Web Developer | Travel Enthusiast',
    followers: 500,
    following: 200,
    coverPicture:
      'https://img4.thuthuatphanmem.vn/uploads/2020/05/13/anh-nen-4k-anime_062606240.jpg',
    avatar:
      'https://img6.thuthuatphanmem.vn/uploads/2022/10/27/anh-avatar-nu-che-mat-anime_084750690.jpg',
  };

  return (
    <Box sx={{ pl: { xs: 0, sm: '200px' } }}>
      <Paper elevation={3}>
        <Box
          sx={{
            position: 'relative',
            height: '200px',
          }}
        >
          <img
            src={user.coverPicture}
            alt='Cover'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onClick={handleOpenCoverPicture}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <Avatar
              src={user.avatar}
              alt='Avatar'
              sx={{ width: 120, height: 120, border: '4px solid #fff' }}
              onClick={handleOpenAvatar}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            position: 'relative',
            zIndex: 0, // Set a lower z-index for the content
            marginTop: '60px', // Adjust the margin to create space for the avatar
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            {user.fullName}
          </Typography>

          <Typography
            variant='body1'
            sx={{ marginTop: 2, textAlign: 'center', color: Colors.dim_gray }}
          >
            {`"${user.intro}"`}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: 1, justifyContent: 'center' }}
          >
            <Grid item>
              <Typography
                variant='h6'
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                {user.followers}
              </Typography>
              <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                Followers
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant='h6'
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                {user.following}
              </Typography>
              <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                Following
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', // Align the items horizontally
              marginTop: 2,
            }}
          >
            <Button variant='outlined' sx={{ marginRight: 1 }}>
              Follow
            </Button>
            <Button
              variant='outlined'
              startIcon={<EmailIcon />}
              sx={{ color: 'primary.main', textTransform: 'none' }}
            >
              Message
            </Button>
          </Box>
          <Button
            variant='contained'
            color='primary'
            startIcon={<EditIcon />}
            sx={{
              marginTop: 2,
              borderRadius: '50px', // Adjust the radius as needed
              fontWeight: '400',
              color: 'white',
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>
      {/* Cover Picture Modal */}
      <Dialog open={openCoverPicture} onClose={handleCloseCoverPicture}>
        <DialogContent>
          <img
            src={user.coverPicture}
            alt='Cover'
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </DialogContent>
      </Dialog>

      {/* Avatar Modal */}
      <Dialog open={openAvatar} onClose={handleCloseAvatar}>
        <DialogContent>
          <img
            src={user.avatar}
            alt='Avatar'
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
