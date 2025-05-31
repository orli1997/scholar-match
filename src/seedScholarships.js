// src/seedScholarships.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


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
const db = getFirestore(app);

const scholarships = [
  {
    name: "מלגת IMPACT",
    category: "חיילים משוחררים",
    amount: 5000,
    requirements: "שירות צבאי מלא והמלצות",
    criteria: "חיילים משוחררים עם מעורבות קהילתית",
    documents: "תעודת שחרור, המלצות, גיליון ציונים",
  },
  {
    name: "מלגת פריפריה",
    category: "אזור מגורים",
    amount: 3000,
    requirements: "מגורים באזור פריפריה",
    criteria: "תושבות בפריפריה והכנסה נמוכה",
    documents: "תעודת זהות, אישור תושב, אישור הכנסה",
  },
  {
    name: "מלגת חנן עינור",
    category: "חברה אתיופית",
    amount: 4000,
    requirements: "השתתפות בתכניות קהילתיות",
    criteria: "סטודנטים מהחברה האתיופית",
    documents: "תעודת סטודנט, מכתב מוטיבציה",
  },
  {
    name: "מלגת רוטשילד",
    category: "הצטיינות אקדמית",
    amount: 10000,
    requirements: "הצטיינות אקדמית",
    criteria: "רקע סוציו-אקונומי נמוך והצטיינות",
    documents: "גיליון ציונים, המלצות, תעודת זהות",
  },
  {
    name: "מלגת מנהיגי שוליך",
    category: "STEM והובלה חברתית",
    amount: 12000,
    requirements: "לימודי STEM והובלה חברתית",
    criteria: "מצוינות בלימודי הנדסה או מדעים",
    documents: "תעודת סטודנט, גיליון ציונים, המלצות",
  },
];

async function seed() {
  for (const s of scholarships) {
    await addDoc(collection(db, "scholarships"), s);
    console.log("✅ נשלחה מלגה:", s.name);
  }
}

seed();
