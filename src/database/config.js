// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpKfn6ui5Guaq1m0e9lJs2Kgg26DKdawo",
  authDomain: "web-app-p.firebaseapp.com",
  databaseURL: "https://web-app-p-default-rtdb.firebaseio.com",
  projectId: "web-app-p",
  storageBucket: "web-app-p.appspot.com",
  messagingSenderId: "836762302087",
  appId: "1:836762302087:web:cb3a9d0cf92a7632ceea22",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const fileStorage = getStorage();
