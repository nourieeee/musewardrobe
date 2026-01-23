// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKuCrCqnF9_D0Pelq_tubj_fxWpgXwt1M",
  authDomain: "musewardrobe-c7f73.firebaseapp.com",
  projectId: "musewardrobe-c7f73",
  storageBucket: "musewardrobe-c7f73.firebasestorage.app",
  messagingSenderId: "56908909585",
  appId: "1:56908909585:web:8f2e3ecfdf26301692b5b0"
};
// Prevent re-initializing Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
