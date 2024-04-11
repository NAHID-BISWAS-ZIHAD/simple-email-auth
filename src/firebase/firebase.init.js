// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFlBCV99bc9QIaeuTU-Bldh5Z2To-AkAk",
  authDomain: "simple-email-auth-57ace.firebaseapp.com",
  projectId: "simple-email-auth-57ace",
  storageBucket: "simple-email-auth-57ace.appspot.com",
  messagingSenderId: "376258869515",
  appId: "1:376258869515:web:02885c1c9e072bedc30a0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;