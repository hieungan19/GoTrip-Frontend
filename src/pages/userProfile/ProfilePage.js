import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import coverImgTemp from '../../assets/images/cover_img.jpg';
import PostList from '../../components/post/PostList';
import { selectUserId } from '../../redux/slice/authSlice';
import { Colors } from '../../styles/theme';
import UserList from '../../components/user/UserList';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const [openCoverPicture, setOpenCoverPicture] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [user, setUser] = useState({});
  const meId = useSelector(selectUserId);
  const [isFollowed, setIsFollowed] = useState(false);
  const [countFollowing, setCountFollowing] = useState(0);
  const [countFollower, setCountFollower] = useState(0);
  const [listFollowingOpen, setListFollowingOpen] = useState(false);
  const [listFollowerOpen, setListFollowerOpen] = useState(false);

  const [followers, setFollowers] = useState([]);
  const [followees, setFollowees] = useState([]);

  const token = localStorage.getItem('token');

  const handleOpenCoverPicture = () => setOpenCoverPicture(true);
  const handleCloseCoverPicture = () => setOpenCoverPicture(false);

  const handleOpenAvatar = () => setOpenAvatar(true);
  const handleCloseAvatar = () => setOpenAvatar(false);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user-relationships/followers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const followers = response.data.followers.data;
      if (followers != undefined) setFollowers(followers);
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchFollowees = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user-relationships/followees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const followees = response.data.followees.data;
      if (followees != undefined) setFollowees(followees);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchIsFollowed = async () => {
    try {
      const response = await axios.get(`${API_URL}/user-relationships/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsFollowed(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      setUser(response.data);
      setCountFollowing(response.data.count_followees);
      setCountFollower(response.data.count_followers);
      await fetchIsFollowed();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/user-relationships/follow`,
        {
          user_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setIsFollowed(true);
      }
      setCountFollower((pre) => pre + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnFollow = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/user-relationships/unfollow`,
        {
          data: {
            user_id: id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsFollowed(false);
      }

      setCountFollower((pre) => pre - 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFollowees();
    fetchFollowers();
  }, []);

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
            src={user.cover_image_url ?? coverImgTemp}
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
              src={user.avatar_url}
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
            {user.name}
          </Typography>

          <Typography
            variant='body1'
            sx={{ marginTop: 2, textAlign: 'center', color: Colors.dim_gray }}
          >
            {user.intro ? `"${user.intro}"` : null}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: 1, justifyContent: 'center' }}
          >
            <Grid
              item
              onClick={() => {
                setListFollowerOpen(true);
              }}
            >
              <Typography
                variant='h6'
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                {countFollower}
              </Typography>
              <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                Followers
              </Typography>
            </Grid>
            <Grid
              item
              onClick={() => {
                setListFollowingOpen(true);
              }}
            >
              <Typography
                variant='h6'
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                {countFollowing}
              </Typography>
              <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                Following
              </Typography>
            </Grid>
          </Grid>
          {id != meId ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Align the items horizontally
                  marginTop: 2,
                }}
              >
                <Button
                  variant='outlined'
                  sx={{ marginRight: 1 }}
                  onClick={isFollowed ? handleUnFollow : handleFollow}
                >
                  {isFollowed ? 'Unfollow' : 'Follow'}
                </Button>
                <Button
                  variant='outlined'
                  startIcon={<EmailIcon />}
                  sx={{ color: 'primary.main', textTransform: 'none' }}
                  onClick={() => {
                    navigate('/chat');
                  }}
                >
                  Message
                </Button>
              </Box>
            </>
          ) : (
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
              onClick={() => {
                navigate('/profile/edit');
              }}
            >
              Edit Profile
            </Button>
          )}
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
      {/* Follow Count Dialog */}
      <Dialog
        open={listFollowerOpen}
        onClose={() => {
          setListFollowerOpen(false);
        }}
      >
        <Box sx={{ height: '300px', p: 2 }}>
          <UserList text={'Follower'} users={followers} />
        </Box>
      </Dialog>

      <Dialog
        open={listFollowingOpen}
        onClose={() => {
          setListFollowingOpen(false);
        }}
      >
        <Box sx={{ height: '300px', p: 2 }}>
          <UserList text={'Following'} users={followees} />
        </Box>
      </Dialog>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <PostList url={`posts/${id}`} posts={posts} setPosts={setPosts} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
