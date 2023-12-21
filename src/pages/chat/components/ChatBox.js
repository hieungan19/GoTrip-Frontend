import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { TextField, Button, Avatar } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import echo from '../../echo';
import { useSelector } from 'react-redux';
import { selectUserAvatar } from '../../../redux/slice/authSlice';

const ChatBox = ({ chat_id }) => {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState('');
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [users, setUsers] = useState([]);
  const messsageContainersRef = useRef(null);
  const meAvatar = useSelector(selectUserAvatar);
  const meId = localStorage.getItem('id');
  const participantAvt = chat.participants?.find(
    (p) => p.user_id != meId
  ).avatar_url;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    scrollToLastMessage();
  }, [messages]);

  useEffect(() => {
    getData();
    return () => {
      echo.leave(`chat.${chat_id}`);
    };
  }, [chat_id]);

  const scrollToLastMessage = () => {
    if (messsageContainersRef.current) {
      const items = messsageContainersRef.current.children;
      const last = items[items.length - 1];
      if (items.length > 0) {
        last.scrollIntoView({
          block: 'nearest',
          inline: 'center',
          behavior: 'smooth',
          alignToTop: false,
        });
      }
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/chat/get-messages-by-id/${chat_id}`,

        {
          params: { perPage: 100 },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use localStorage or another state management solution
          },
        }
      );

      console.log('Messages:', response.data.messages);
      setMessages(response.data.messages);
      setChat(response.data.chat);
      echo.leave(`chat.${chat_id}`);
      console.log('Chat id', chat_id);

      startWebSocket();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async () => {
    setIsSendingForm(true);
    try {
      const response = await axios.post(
        `${API_URL}/chat/send-text-message`,
        { message, chat_id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use localStorage or another state management solution
          },
        }
      );
      console.log(response);
      setIsSendingForm(false);
      setMessage('');
    } catch (error) {
      console.error(error);
      setIsSendingForm(false);
    }
  };

  const startWebSocket = () => {
    console.log('Hello from start socket.');
    echo
      .join(`chat.${chat_id}`)
      .here((users) => {
        console.log('Successfully joined chat channel. Users:', users);
        setUsers(users);
      })
      .joining((user) => {
        console.log('Join user');
        setUsers((prevUsers) => [...prevUsers, user]);
      })
      .listen('.chat.message.sent', (e) => {
        console.log('Listen Chat Message Sent');
        setMessages((prevMessages) => [...prevMessages, e.message]);
        scrollToLastMessage();
        if (localStorage.getItem('id') != e.message.sender.id) {
          const url = `${API_URL}/chat/message-status/${e.message.id}`;
          axios.patch(url, null, {
            headers: {
              // 'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Use localStorage or another state management solution
            },
          });
        }
      })
      .listen('ChatMessageStatus', (e) => {
        console.log('Listen ChatMessageStatus');
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === e.message.id
              ? { ...msg, data: { ...msg.data, status: e.message.data.status } }
              : msg
          )
        );
      });
  };
  return (
    <div>
      {/* Chat participants */}
      <div className='py-2 px-4 border-bottom  d-lg-block'>
        {chat.participants &&
          chat.participants.map((participant) => (
            <div key={participant.user_id}>
              {localStorage.getItem('id') != participant.user_id && (
                <div className='d-flex align-items-center py-1'>
                  <div className='position-relative me-1'>
                    <Avatar
                      src={participant.avatar_url}
                      className='rounded-circle mr-1'
                      alt='Avatar'
                      width='40'
                      height='40'
                    />
                  </div>
                  <div>
                    <strong>
                      <span>{participant.name}</span>
                    </strong>
                    <div className='small'>
                      <i
                        className={`bi bi-circle-fill ${
                          users.find((u) => u.id == participant.user_id)
                            ? ' chat-online'
                            : ' chat-offline'
                        }`}
                      />
                      {users.find((u) => u.id == participant.user_id)
                        ? ' Online'
                        : ' Offline'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
      {/* Chat messages */}
      <div className='position-relative'>
        <div
          id='chatBox'
          className='chat-messages p-4'
          ref={messsageContainersRef}
        >
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`pb-4 ${
                localStorage.getItem('id') == msg.sender.id
                  ? 'chat-message-right'
                  : 'chat-message-left'
              }`}
            >
              <div>
                <Avatar
                  src={
                    localStorage.getItem('id') == msg.sender.id
                      ? meAvatar
                      : participantAvt
                  }
                  alt='Avatar'
                  width='40'
                  height='40'
                />
              </div>
              <div className='flex-shrink-1 message-box rounded py-2 px-3 mx-2'>
                <div className='fw-bold mb-1'>{msg.sender.name}</div>
                {msg.message}
                <div className='text-muted small text-nowrap mt-2'>
                  {moment(msg.created_at).format('DD-MM-yy, h:m a')} -{' '}
                  {msg.data.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Input for new message */}
      <div className='flex-grow-0 py-3 px-4 border-top'>
        <div className='input-group'>
          <TextField
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='form-control'
            placeholder='Type your message'
            fullWidth
          />
          <Button
            variant='contained'
            color='primary'
            onClick={onSubmit}
            disabled={isSendingForm}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
