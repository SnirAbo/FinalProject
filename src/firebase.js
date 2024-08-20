import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBPaY2_XsVnAxitHjXnHVJ8pYelg-1Guv4",
  authDomain: "finalproject-7c9b4.firebaseapp.com",
  projectId: "finalproject-7c9b4",
  storageBucket: "finalproject-7c9b4.appspot.com",
  messagingSenderId: "1059204496498",
  appId: "1:1059204496498:web:a43775ef361d02517f56eb",
  measurementId: "G-CVPNJ0J5FF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;