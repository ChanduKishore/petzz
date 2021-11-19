// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4HTGsLADXuZbY2FNbrgs3EDiBgk23Lxc",
  authDomain: "petzz-2356c.firebaseapp.com",
  projectId: "petzz-2356c",
  storageBucket: "petzz-2356c.appspot.com",
  messagingSenderId: "998028808724",
  appId: "1:998028808724:web:526db0c5a966c665bd4d01",
  measurementId: "G-5C6Y5F24C0"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
export default firebase