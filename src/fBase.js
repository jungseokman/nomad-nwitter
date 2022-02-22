import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4j1xNtPqiwNYlPGn5iyp7XK2nD9jzxlA",
  authDomain: "nwitter-4b14f.firebaseapp.com",
  databaseURL: "https://nwitter-4b14f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nwitter-4b14f",
  storageBucket: "nwitter-4b14f.appspot.com",
  messagingSenderId: "792665672919",
  appId: "1:792665672919:web:ed0d354118cd010589b492"
};

  
  
  
  
initializeApp(firebaseConfig);
  

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();