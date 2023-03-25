// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,onAuthStateChanged } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu-nGNJTnXN5eWMvWahg38XLJGiVFcBGA",
  authDomain: "doob-b1f18.firebaseapp.com",
  projectId: "doob-b1f18",
  storageBucket: "doob-b1f18.appspot.com",
  messagingSenderId: "600372817848",
  appId: "1:600372817848:web:176714233a3e5d6f1f694d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();

export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}