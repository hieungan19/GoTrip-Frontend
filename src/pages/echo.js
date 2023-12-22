// Echo.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_WEBSOCKETS_KEY,
  cluster: 'ap1',
  encrypted: true,
  forceTLS: false,
  disableStats: true,
  authEndpoint: 'https://gotrip.leobordea.uk/broadcasting/auth',
  auth: {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  },
});

export default echo;
