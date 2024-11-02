// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArH0JG44qIQcdEvKTUxbadI95VNiqwG4M",
  authDomain: "deagon-507c3.firebaseapp.com",
  projectId: "deagon-507c3",
  storageBucket: "deagon-507c3.appspot.com",
  messagingSenderId: "696862991694",
  appId: "1:696862991694:web:3b69582b56a3139212ea1f",
  measurementId: "G-DEGX802PQ0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);