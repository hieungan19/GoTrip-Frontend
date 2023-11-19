import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { TextField, Button } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

const ChatBox = ({ chat_id }) => {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState('');
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [users, setUsers] = useState([]);
  const messageContainersRef = useRef(null);
  const onSubmit = async () => {
    setIsSendingForm(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACKEND_URL}/chat/send-text-message`,
      //   { message, chat_id },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      //     },
      //   }
      // );
      // console.log(response);
      setIsSendingForm(false);
      setMessage('');
    } catch (error) {
      console.error(error);
      setIsSendingForm(false);
    }
  };

  useEffect(() => {
    const initialMessages = [
      {
        id: 1,
        sender: { id: 2, first_name: 'John', last_name: 'Doe' },
        message: 'Hello!',
        created_at: '2023-11-18T12:30:00',
        data: { status: 'delivered' },
      },
      {
        id: 2,
        sender: { id: 1, first_name: 'Jane', last_name: 'Doe' },
        message: 'Hi there!',
        created_at: '2023-11-18T12:32:00',
        data: { status: 'read' },
      },
    ];

    setMessages(initialMessages);
    const scrollToLastMessage = () => {
      if (messageContainersRef.current) {
        const last = messageContainersRef.current.lastChild;
        if (last) {
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
        // const response = await axios.get(
        //   `${process.env.REACT_APP_BACKEND_URL}/chat/get-chat-by-id/${chat_id}`,
        //   {
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        //     },
        //   }
        // );
        // setMessages(response.data.messages.data);
        // setChat(response.data.chat);
        window.Echo.leave(`chat.${chat_id}`);
        startWebSocket();
      } catch (error) {
        console.error(error);
      }
    };

    const startWebSocket = () => {
      console.log('startWebSocket', chat_id);
      // window.Echo.join(`chat.${chat_id}`)
      //   .here((receivedUsers) => setUsers(receivedUsers))
      //   .joining((user) => setUsers((prevUsers) => [...prevUsers, user]))
      //   .leaving((user) =>
      //     setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id))
      //   )
      //   .listen('ChatMessageSent', (e) => {
      //     setMessages((prevMessages) => [...prevMessages, e.message]);
      //     scrollToLastMessage();
      //     if (process.env.REACT_APP_USER_ID !== e.message.sender.id) {
      //       axios.get(
      //         `${process.env.REACT_APP_BACKEND_URL}/chat/message-status/${e.message.id}`,
      //         {
      //           headers: {
      //             'Content-Type': 'application/json',
      //             Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      //           },
      //         }
      //       );
      //     }
      //   })
      //   .listen('ChatMessageStatus', (e) => {
      //     const updatedMessages = messages.map((msg) =>
      //       msg.id === e.message.id
      //         ? { ...msg, data: { status: e.message.data.status } }
      //         : msg
      //     );
      //     setMessages(updatedMessages);
      //   });
    };

    getData();

    return () => {
      // Cleanup logic if needed
    };
  }, [chat_id, messages]);

  return (
    <div>
      {/* Chat participants */}
      <div className='py-2 px-4 border-bottom  d-lg-block'>
        {/* {chat.participants &&
          chat.participants.map((participant) => (
            <div key={participant.id}>
              {process.env.REACT_APP_USER_ID !== participant.id && ( */}
        <div className='d-flex align-items-center py-1'>
          <div className='position-relative me-1'>
            <img
              src='http://localhost:5173/img/avatar-7.png'
              className='rounded-circle mr-1'
              alt='Avatar'
              width='40'
              height='40'
            />
          </div>
          <div>
            <strong>
              <span>
                {/* {participant.first_name} {participant.last_name} */} User
              </span>
            </strong>
            <div className='small'>
              <i
                className={`bi bi-circle-fill ${
                  users.find((u) => u.id === 1)
                    ? ' chat-online'
                    : ' chat-offline'
                }`}
              />
              {users.find((u) => u.id === 1) ? ' Online' : ' Offline'}
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
      {/* ))
          }
      </div> */}
      {/* Chat messages */}
      <div className='position-relative'>
        <div
          id='chatBox'
          className='chat-messages p-4'
          ref={messageContainersRef}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`pb-4 ${
                process.env.REACT_APP_USER_ID === msg.sender.id
                  ? 'chat-message-right'
                  : 'chat-message-left'
              }`}
            >
              <div>
                <img
                  src='http://localhost:5173/img/avatar-7.png'
                  className='rounded-circle mr-1'
                  alt='Avatar'
                  width='40'
                  height='40'
                />
              </div>
              <div className='flex-shrink-1 message-box rounded py-2 px-3 mx-2'>
                <div className='fw-bold mb-1'>{msg.sender.first_name}</div>
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
