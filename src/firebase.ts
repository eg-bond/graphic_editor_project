// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRy1RBt9auUNecrD5qfgeaJwfnAUXZ03w',
  authDomain: 'graphic-editor-45c83.firebaseapp.com',
  projectId: 'graphic-editor-45c83',
  storageBucket: 'graphic-editor-45c83.firebasestorage.app',
  messagingSenderId: '244207483799',
  appId: '1:244207483799:web:cf92a6d2c452ea9655e2d2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db: Firestore = getFirestore(app);
// Initialize Firebase Auth
const auth: Auth = getAuth(app);
export { db, auth };
