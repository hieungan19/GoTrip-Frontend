import React, { useState } from 'react';
import ChatSidebar from './components/ChatSideBar'; // Import the ChatSidebar component
import ChatBox from './components/ChatBox'; // Import the ChatBox component
import { Box } from '@mui/material';
import { useLocation } from 'react-router';

const App = () => {
  const location = useLocation();
  const user = location.state ? location.state.user : null;

  const [startChat, setStartChat] = useState(false);
  const [chatId, setChatId] = useState(0);

  const renderChat = (chatId) => {
    setStartChat(true);
    setChatId(chatId);
  };

  return (
    <Box sx={{ pl: { xs: 0, sm: '200px' }, height: '200px' }}>
      <main className='container min-h-content mb-3 '>
        <div className='card chat-card p-3'>
          <div className='row g-0'>
            <div className='col-md-8'>
              {/* Chat Box */}
              {startChat === true ? <ChatBox chat_id={chatId} /> : null}
            </div>
            <div className='col-md-4 '>
              {/* Chat Sidebar */}
              <ChatSidebar renderChat={renderChat} user={user} />
            </div>
          </div>
        </div>
      </main>
    </Box>
  );
};

export default App;
