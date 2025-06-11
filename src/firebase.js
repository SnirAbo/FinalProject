import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDQhxmD4srzXvI-LR8vDVuPgA3lPTdhLTI",
  authDomain: "finalproject-7c9b4.firebaseapp.com",
  projectId: "finalproject-7c9b4",
  storageBucket: "finalproject-7c9b4.firebasestorage.app",
  messagingSenderId: "1059204496498",
  appId: "1:1059204496498:web:cfea2e182587a9e87f56eb",
  measurementId: "G-W0GBN6E1XV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;