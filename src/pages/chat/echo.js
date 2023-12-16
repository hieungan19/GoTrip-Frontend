// Echo.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.pusher = require('pusher-js');

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_WEBSOCKETS_KEY,
  secret: process.env.REACT_APP_WEBSOCKETS_SECRET,
  wsHost: process.env.REACT_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  wssPort: 6001,
  cluster: 'ap1',
  forceTLS: false,
  disableStats: true,
  authEndpoint: process.env.REACT_APP_API_URL + '/broadcasting/auth',
  auth: {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  },
});

export default echo;
