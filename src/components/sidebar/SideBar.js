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
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useState } from 'react';
import { Colors } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 220;
const icons = [
  { icon: <HomeIcon />, label: 'HOME', key: 'home' },
  { icon: <NotificationsIcon />, label: 'NOTIFICATION', key: 'notification' },
  { icon: <ChatIcon />, label: 'CHAT', key: 'chat' },
  { icon: <LogoutIcon />, label: 'LOGOUT', key: 'logout' },
];

const SideBar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleListItemClick = (index) => {
    const url = icons[index].label.toLowerCase();
    navigate(`${url}`);
    if (url === 'logout') navigate('/login');
    setActiveIndex(index);
  };

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
        <Container sx={{ py: 4 }} onClick={() => navigate('/profile')}>
          <Avatar sx={{ mx: 'auto', p: 0, alignSelf: 'center' }} />
          <Typography
            sx={{
              textAlign: 'center',
              color: Colors.dark,
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            User name
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
