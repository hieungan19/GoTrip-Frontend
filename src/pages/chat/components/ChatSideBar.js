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
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import echo from '../../echo';
import axios from 'axios';
import { Colors } from '../../../styles/theme/index';
import { toast } from 'react-toastify';

const ChatSidebar = ({ renderChat, user = null }) => {
  const [chats, setChats] = useState([]);

  const [users, setUsers] = useState([
    // Add more mock user data as needed
  ]);

  const [searchName, setSearchName] = useState('');
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(0);
  const API_URL = process.env.REACT_APP_API_URL;

  const OpentChat = async (chatId) => {
    // Ngắt kết nối với kênh chat hiện tại
    await echo.leave('chat.' + currentChatId);

    // Mở cuộc trò chuyện mới
    setCurrentChatId(chatId);
    // Gửi sự kiện lên component cha để render ChatBox
    // Sử dụng callback mà bạn đã định nghĩa
    renderChat(chatId);
    // Ví dụ: renderChat={(chatId) => handleRenderChat(chatId)}
    // Trong đó, handleRenderChat là một hàm của component cha để xử lý sự kiện renderChat
  };

  const searchUsers = (name) => {
    setIsSendingForm(true);

    if (name === '') {
      setUsers([]);
      return;
    }
    const params = {
      name: name,
    };
    axios
      .get(
        API_URL + '/users',
        { params },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        setIsSendingForm(false);
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error(error.message);

        setIsSendingForm(false);
      });
  };
  const onSubmit = (userId = null) => {
    setIsSendingForm(true);

    if (!user) user = users.find((o) => o.id === userId);
    setUsers([]);
    const data = new FormData();
    data.append('users[]', user.id);
    data.append('isPrivate', 1);
    axios
      .post(API_URL + '/chat/create-chat', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setIsSendingForm(false);
        // console.log(response);
        // console.log('After add chat with a new user', [
        //   ...chats,
        //   response.data.chat,
        // ]);
        setChats([...chats, response.data.chat]);
        OpentChat(response.data.chat.id);
      })
      .catch((error) => {
        // open exist chat
        OpentChat(error.response.data.chat_id);

        setIsSendingForm(false);
      });
  };
  const getData = async () => {
    try {
      const response = await axios.get(API_URL + '/chat/get-chats', {
        params: { perPage: 100 },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      setChats(response.data.chats);
    } catch (error) {
      // toast.error(error.message);
      console.log(error);
      // Xử lý lỗi nếu cần thiết
    }

    if (user) onSubmit();
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Grid container direction='column' alignItems='stretch' spacing={2}>
      <Grid item ml={2} sx={{ position: 'relative' }}>
        <TextField
          list='browsers'
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            searchUsers(e.target.value);
          }}
          type='text'
          placeholder=''
          label='Search by name'
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
        <Box
          position={'absolute'}
          top={80}
          zIndex={1000}
          overflow={'visible'}
          width={'100%'}
          mr={2}
          sx={{ backgroundColor: Colors.light_gray }}
        >
          {users.map((user) => {
            console.log(user);
            return (
              <Typography
                textAlign={'left'}
                p={1}
                borderBottom={'0.1px solid white'}
                flexGrow={1}
                key={user.id}
                onClick={() => {
                  onSubmit(user.id);
                }}
              >
                {user.name}
              </Typography>
            );
          })}
        </Box>
      </Grid>

      <Grid item zIndex={0}>
        <List>
          {chats.map((chat) => (
            <ListItem key={chat.id} button onClick={() => OpentChat(chat.id)}>
              {/* Đảm bảo rằng 'chat.participants' là một mảng và có ít nhất một phần tử trước khi truy cập */}
              {Array.isArray(chat.participants) &&
                chat.participants.length > 0 && (
                  <>
                    {/* Hiển thị avatar của người đầu tiên trong danh sách participants */}
                    <Avatar
                      sx={{ mr: 2 }}
                      src={chat.participants.map((participant) =>
                        participant.user_id != localStorage.getItem('id')
                          ? `${participant.avatar_url} `
                          : ''
                      )}
                      alt='Avatar'
                    />

                    {/* Hiển thị tên của mỗi participant, loại bỏ tên của user hiện tại */}
                    <ListItemText
                      primary={chat.participants.map((participant) => {
                        return participant.user_id != localStorage.getItem('id')
                          ? `${participant.name} `
                          : '';
                      })}
                    />
                  </>
                )}
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ChatSidebar;
