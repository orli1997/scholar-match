// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAo0po5EQPKoSO3gzDp3UyMNlgRps7Bpyw",
  authDomain: "scholarmatch-eb7a7.firebaseapp.com",
  projectId: "scholarmatch-eb7a7",
  storageBucket: "scholarmatch-eb7a7.appspot.com", // ✅ תוקן
  messagingSenderId: "338901046104",
  appId: "1:338901046104:web:395134512755fa4d724b2d",
  measurementId: "G-21G93V1DGZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ אלה החלקים שהיו חסרים:
export const auth = getAuth(app);
export const db = getFirestore(app);
