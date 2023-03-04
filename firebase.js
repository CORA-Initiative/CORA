import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getApps } from "firebase/app";
import { getApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyABKB5JMOyc6MInzDB3r5wTA6HtNSfH53s",
  authDomain: "cora-test-c0eac.firebaseapp.com",
  projectId: "cora-test-c0eac",
  storageBucket: "cora-test-c0eac.appspot.com",
  messagingSenderId: "375879564335",
  appId: "1:375879564335:web:294dff3a8f512e52929ada",
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
