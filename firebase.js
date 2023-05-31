import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getApps } from "firebase/app";
import { getApp } from "firebase/app";
import { getStorage, getStream } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_EX-IRe8y_42bjHYmvS0O0PGAoU4bdEA",
  authDomain: "cora-6a053.firebaseapp.com",
  projectId: "cora-6a053",
  storageBucket: "cora-6a053.appspot.com",
  messagingSenderId: "1050590703229",
  appId: "1:1050590703229:web:1033104bdf608989730b14",
  // apiKey: process.env.NEXT_PUBLIC_APIKEY,
  // authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  // projectId: process.env.NEXT_PUBLIC_PROJECTID,
  // storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  // appId: process.env.NEXT_PUBLIC_APPID,
};

// Source: https://stackoverflow.com/questions/73176346/firebaseerror-firebase-firebase-app-named-default-already-exists-with-diff
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
