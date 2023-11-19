// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCHTd_Krmu_ONBawroetBByjeSVTHLHsU0',
  authDomain: 'gotrip-478e7.firebaseapp.com',
  projectId: 'gotrip-478e7',
  storageBucket: 'gotrip-478e7.appspot.com',
  messagingSenderId: '631864544533',
  appId: '1:631864544533:web:f937ddb6819656eaa2ad1c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imgDB = getStorage(app);
