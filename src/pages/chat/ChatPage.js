import React, { useState } from 'react';
import ChatSidebar from './components/ChatSideBar'; // Import the ChatSidebar component
import ChatBox from './components/ChatBox'; // Import the ChatBox component
import { Box } from '@mui/material';

const App = () => {
  const [startChat, setStartChat] = useState(false);
  const [chatId, setChatId] = useState(null);

  const renderChat = (chatId) => {
    setStartChat(true);
    setChatId(chatId);
  };

  return (
    <Box sx={{ pl: { xs: 0, sm: '200px' } }}>
      <main className='container min-h-content mb-3 mt-5 '>
        <h1 className='h3 mb-3'>
          <i className='bi bi-chat-left-dots-fill'></i> Messages
        </h1>

        <div className='card chat-card p-3'>
          <div className='row g-0'>
            <div className='col-md-8'>
              {/* Chat Box */}
              {startChat === true ? <ChatBox /> : null}
            </div>
            <div className='col-md-4 '>
              {/* Chat Sidebar */}
              <ChatSidebar renderChat={renderChat} />
            </div>
          </div>
        </div>
      </main>
    </Box>
  );
};

export default App;
