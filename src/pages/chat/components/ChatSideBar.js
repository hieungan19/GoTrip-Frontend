import React, { useState, useEffect } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Avatar,
  Grid,
  InputAdornment,
  Box,
} from '@mui/material';
import { render } from '@testing-library/react';
import SearchIcon from '@mui/icons-material/Search';

const ChatSidebar = ({ renderChat }) => {
  const [chats, setChats] = useState([
    { id: 1, participants: [{ id: 2, first_name: 'John', last_name: 'Doe' }] },
    {
      id: 2,
      participants: [{ id: 3, first_name: 'Alice', last_name: 'Smith' }],
    },
    // Add more mock chat data as needed
  ]);

  const [users, setUsers] = useState([
    { id: 2, email: 'john.doe@example.com' },
    { id: 3, email: 'alice.smith@example.com' },
    // Add more mock user data as needed
  ]);

  const [searchEmail, setSearchEmail] = useState('');
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [chatId, setChatId] = useState(null);

  const OpentChat = async (chatId) => {
    try {
      // Disconnect the current chat channel
      // await window.Echo.leave('chat.' + chatId);

      // Open the new chat
      setChatId(chatId);
      // Emit renderChat event to parent component
      // Replace with actual logic to render the chat in the parent component
      console.log('Render chat with ID:', chatId);
    } catch (error) {
      console.error(error);
    }
  };

  const searchUsers = () => {
    setIsSendingForm(true);
    // Simulating data fetching for user search
    const filteredUsers = users.filter((user) =>
      user.email.includes(searchEmail)
    );
    setUsers(filteredUsers);
    setIsSendingForm(false);
  };

  const onSubmit = async () => {
    setIsSendingForm(true);
    // Simulating data submission to create a chat
    try {
      // Replace with actual logic to create a chat
      const user = users.find((o) => o.email === searchEmail);
      const newChat = {
        id: chats.length + 1,
        participants: [{ id: user.id, first_name: 'Mock', last_name: 'User' }],
      };
      setChats([...chats, newChat]);

      // Start a chat with the user
      setIsSendingForm(false);
      OpentChat(newChat.id);
    } catch (error) {
      console.error(error);
      setIsSendingForm(false);
    }
  };

  return (
    <Grid container direction='column' alignItems='stretch' spacing={2}>
      <Grid item ml={2}>
        <TextField
          list='browsers'
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          type='text'
          placeholder=''
          label='Search by email'
          variant='outlined'
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <datalist id='browsers'>
          {users.map((user) => (
            <option
              key={user.email}
              value={user.email}
              onClick={() => {
                renderChat(user.id);
              }}
            />
          ))}
        </datalist>
      </Grid>

      <Grid item>
        <List>
          {chats.map((chat) => (
            <ListItem key={chat.id} button onClick={() => renderChat(chat.id)}>
              <Avatar
                sx={{ mr: 2 }}
                src='http://localhost:5173/img/avatar-7.png'
                alt='Avatar'
              />
              <ListItemText
                primary={chat.participants.map((participant) => (
                  <span key={participant.id}>
                    {participant.id !== process.env.REACT_APP_USER_ID
                      ? `${participant.first_name} ${participant.last_name}`
                      : ''}
                  </span>
                ))}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ChatSidebar;
