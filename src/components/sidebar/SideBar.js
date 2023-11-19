import {
  Avatar,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Colors } from '../../styles/theme';
const drawerWidth = 200;

const SideBar = ({ open, onClose }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleListItemClick = (index) => {
    setActiveIndex(index);
    onClose();
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
        <Toolbar></Toolbar>
        <Container sx={{ py: 4 }}>
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
        <List sx={{ py: 0 }}>
          {['HOME', 'NOTIFICATION', 'CHAT', 'LOGOUT'].map((text, index) => (
            <ListItem
              key={index}
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
                <ListItemText
                  primary={text}
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
