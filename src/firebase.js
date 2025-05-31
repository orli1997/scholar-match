import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAo0po5EQKPoSO3gzDp3UyMNlgRps7Bpyw",
  authDomain: "scholarmatch-eb7a7.firebaseapp.com",
  projectId: "scholarmatch-eb7a7",
  storageBucket: "scholarmatch-eb7a7.appspot.com",
  messagingSenderId: "338901046104",
  appId: "1:338901046104:web:51c0478fd3f5bc85724b2d",
  measurementId: "G-KZQ818HJFH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
