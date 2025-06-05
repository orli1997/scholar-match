// components/UserHistory.js
import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import styles from "./UserHistory.module.css"; // ייבוא הקובץ

function UserHistory({ section }) {
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // מועדפים
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      const savedIds = userSnap.data().savedScholarships || [];

      const savedData = [];
      for (const id of savedIds) {
        const schRef = doc(db, "scholarships", id);
        const schSnap = await getDoc(schRef);
        if (schSnap.exists()) {
          savedData.push({ id, ...schSnap.data() });
        }
      }
      setSavedScholarships(savedData);

      // היסטוריית הגשות
      const appsCol = collection(db, "users", currentUser.uid, "applications");
      const appsSnap = await getDocs(appsCol);

      const appsData = [];
      for (const docSnap of appsSnap.docs) {
        const schId = docSnap.data().scholarshipId;
        const schRef = doc(db, "scholarships", schId);
        const schSnap = await getDoc(schRef);
        if (schSnap.exists()) {
          appsData.push({ id: schId, ...schSnap.data(), submittedAt: docSnap.data().submittedAt });
        }
      }
      setApplications(appsData);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.userHistoryContainer}>
      {section === "favorites" && (
        <>
          <h3>מלגות שמורות למועדפים</h3>
          <ul>
            {savedScholarships.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </>
      )}

      {section === "history" && (
        <>
          <h3>היסטוריית הגשות</h3>
          <ul>
            {applications.map((a) => (
              <li key={a.id}>
                {a.name} - נשלחה ב:{" "}
                {a.submittedAt
                  ? new Date(a.submittedAt).toLocaleDateString()
                  : "תאריך לא זמין"}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default UserHistory;
