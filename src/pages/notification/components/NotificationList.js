import React from 'react';
import Notification from './Notification'; // Adjust the path based on your project structure

const NotificationList = ({ notifications }) => {
  return (
    <div>
      {notifications.map((noti) => (
        <Notification
          key={noti.id}
          notiId={noti.id}
          avatarSrc={noti.user_avatar_url}
          detail={noti.message}
          datetime={noti.created_at}
          postId={noti.post}
          isRead={noti.is_read}
        />
      ))}
    </div>
  );
};

export default NotificationList;
