// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  authDomain: "gpt-clone-9ae32.firebaseapp.com",
  projectId: "gpt-clone-9ae32",
  storageBucket: "gpt-clone-9ae32.appspot.com",
  messagingSenderId: "998028515281",
  appId: "1:998028515281:web:33537949b97433a66eb2f0",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
