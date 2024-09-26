import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjHrMmhgBmpk28-hIZKZEcZuknyYN4sn4",
  authDomain: "blogging-app-7.firebaseapp.com",
  projectId: "blogging-app-7",
  storageBucket: "blogging-app-7.appspot.com",
  messagingSenderId: "948610079768",
  appId: "1:948610079768:web:da7a230dc82f92ba64f76d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export  const db = getFirestore(app);
