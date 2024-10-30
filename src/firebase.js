// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyArH0JG44qIQcdEvKTUxbadI95VNiqwG4M",
  authDomain: "deagon-507c3.firebaseapp.com",
  projectId: "deagon-507c3",
  storageBucket: "deagon-507c3.appspot.com",
  messagingSenderId: "696862991694",
  appId: "1:696862991694:web:3b69582b56a3139212ea1f",
  measurementId: "G-DEGX802PQ0"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 객체 내보내기
export const auth = getAuth(app);

// Analytics 사용 가능 시 초기화
isSupported().then((supported) => {
  if (supported) {
    // const analytics = getAnalytics(app);
    console.log("Analytics 초기화 완료");
  }
});