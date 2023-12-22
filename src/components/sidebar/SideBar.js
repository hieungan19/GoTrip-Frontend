import {
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  ListItemIcon,
  Badge,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_ACTIVE_USER,
  selectUserAvatar,
  selectUserId,
  selectUserName,
} from '../../redux/slice/authSlice';
import axios from 'axios';
import { StyledBadge } from '../../styles/noti';
import { toast } from 'react-toastify';

const drawerWidth = 220;

const SideBar = ({ open, onClose, setCountUnReadNoti, countUnReadNoti }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);

  const avatar = useSelector(selectUserAvatar);

  const userId = useSelector(selectUserId);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const icons = [
    { icon: <HomeIcon />, label: 'HOME', key: 'home' },
    {
      icon: (
        <Badge badgeContent={countUnReadNoti} color='secondary'>
          <NotificationsIcon />
        </Badge>
      ),
      label: 'NOTIFICATION',
      key: 'notification',
    },
    { icon: <ChatIcon />, label: 'CHAT', key: 'chat' },
    { icon: <LogoutIcon />, label: 'LOGOUT', key: 'logout' },
  ];

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleListItemClick = (index) => {
    const url = icons[index].label.toLowerCase();

    navigate(`${url}`);
    if (url === 'logout') {
      navigate('/login');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
    }
    if (url === 'notification') {
      setCountUnReadNoti(0);
    }
    setActiveIndex(index);
  };

  const fetchDataUser = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/users/${localStorage.getItem('id')}`
      );
      setUser(response.data);
      dispatch(
        SET_ACTIVE_USER({
          email: response.data.email,
          name: response.data.name,
          isLoggedIn: true,
          token: localStorage.getItem('token'),
          id: response.data.id,
          phone_number: response.data.phone_number,
          cover_image_url: response.data.cover_image_url,
          avatar_url: response.data.avatar_url,
          intro: response.data.intro,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer
        open={open}
        container={container}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          overflowX: 'hidden',
          width: drawerWidth,
          display:
            open === false
              ? { xs: 'none', sm: 'block' }
              : { xs: 'block', sm: 'none' },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Container
          sx={{ py: 4 }}
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <Avatar src={avatar} sx={{ mx: 'auto', p: 0, alignSelf: 'center' }} />
          <Typography
            sx={{
              textAlign: 'center',
              color: Colors.dark,
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            {userName}
          </Typography>
        </Container>
        <Divider sx={{ width: '100%', borderWidth: '2px' }} />
        <List sx={{ py: 0 }}>
          {icons.map(({ icon, label, key }, index) => (
            <ListItem
              key={key} // Add the key prop here
              disablePadding
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                borderBottom:
                  index === activeIndex
                    ? `2px solid ${Colors.primary}`
                    : 'none',
              }}
            >
              <ListItemButton
                selected={index === activeIndex}
                onClick={() => handleListItemClick(index)}
                sx={{ width: drawerWidth }}
              >
                <ListItemIcon
                  sx={{
                    color: index === activeIndex ? Colors.white : Colors.black,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  sx={{
                    color: index === activeIndex ? Colors.white : Colors.black,
                    fontWeight: 'bold',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
