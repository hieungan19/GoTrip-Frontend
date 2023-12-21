import React from 'react';
import Notification from './Notification'; // Adjust the path based on your project structure

const NotificationList = ({ notifications }) => {
  return (
    <div>
      {notifications.map((noti) => (
        <Notification
          key={noti.id}
          avatarSrc={noti.hehe}
          detail={noti.message}
          datetime={noti.created_at}
        />
      ))}
    </div>
  );
};

export default NotificationList;
