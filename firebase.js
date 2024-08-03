// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQk-2UGBoYJ_D4CBRK9dHhGk8OFFQWCmY",
  authDomain: "isl-4cf69.firebaseapp.com",
  projectId: "isl-4cf69",
  storageBucket: "isl-4cf69.appspot.com",
  messagingSenderId: "350908327110",
  appId: "1:350908327110:web:d0756cb07fb6fc72f863c7",
  measurementId: "G-RNM7V7JMKP"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };