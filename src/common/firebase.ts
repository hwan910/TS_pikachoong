// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDBK5f221Tz_cXzXifU5ka5ZV9ythLPDYk',
  authDomain: 'pikachoong-64dd9.firebaseapp.com',
  projectId: 'pikachoong-64dd9',
  storageBucket: 'pikachoong-64dd9.appspot.com',
  messagingSenderId: '908557937456',
  appId: '1:908557937456:web:86de33b0ec1ebd56af76f5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
