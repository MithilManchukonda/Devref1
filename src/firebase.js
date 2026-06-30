import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKJaspflnMWE2RLmjdJfrjw8c5jfarjaE",
  authDomain: "devref-5f7d2.firebaseapp.com",
  projectId: "devref-5f7d2",
  storageBucket: "devref-5f7d2.firebasestorage.app",
  messagingSenderId: "287381109973",
  appId: "1:287381109973:web:fb3833f9961f3c3a17365c",
  measurementId: "G-F5LCK7XYL4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
