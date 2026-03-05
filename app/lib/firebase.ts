import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBU-2OkFn0hJ_B9_5SmvDVbN85H7CUrZPI",
  authDomain: "musewardrobe-c7f73.firebaseapp.com",
  projectId: "musewardrobe-c7f73",
  storageBucket: "musewardrobe-c7f73.firebasestorage.app",
  messagingSenderId:  "56908909585",
  appId: "1:56908909585:web:c9ab16d02a7ccc4d92b5b0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);