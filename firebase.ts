import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4QgZoXw8DVemiP7_rUD6i6P8NxrYHSxA",
  authDomain: "todo-7b8e8.firebaseapp.com",
  projectId: "todo-7b8e8",
  storageBucket: "todo-7b8e8.appspot.com",
  messagingSenderId: "174708964392",
  appId: "1:174708964392:web:f0306dc6c165125ed4c91d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
