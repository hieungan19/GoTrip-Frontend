import React from 'react';
import Notification from './Notification'; // Adjust the path based on your project structure

const NotificationList = () => {
  const notifications = [
    {
      id: 1,
      avatarSrc: 'https://i.pravatar.cc/40',
      username: 'John Doe',
      detail: 'Liked your post.',
      datetime: '2023-01-01T12:30:00', // ISO 8601 datetime format
    },
    {
      id: 2,
      avatarSrc: 'https://i.pravatar.cc/41',
      username: 'Jane Smith',
      detail: 'Commented on your photo.',
      datetime: '2023-01-02T08:45:00',
    },
    // Add more notifications as needed
  ];

  return (
    <div>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          avatarSrc={notification.avatarSrc}
          username={notification.username}
          detail={notification.detail}
          datetime={notification.datetime}
        />
      ))}
    </div>
  );
};

export default NotificationList;
