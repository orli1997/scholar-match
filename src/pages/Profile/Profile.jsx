/* Profile.jsx */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import Footer from "../../components/Footer/Footer";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import UserHistory from "./UserHistory";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSection, setShowSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate("/register");
        return;
      }

      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          if (!data.firstName && data.fullName) {
            const [firstName, ...rest] = data.fullName.split(" ");
            data.firstName = firstName;
            data.lastName = rest.join(" ");
          }
          setUserData(data);
        } else {
          setUserData({ firstName: "", lastName: "", age: "", gender: "", field: "" });
        }
      } catch (error) {
        console.error("שגיאה בטעינת נתוני המשתמש:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...userData, fullName: `${userData.firstName} ${userData.lastName}` };
      await setDoc(doc(db, "users", auth.currentUser.uid), updatedData);
      setEditMode(false);
      alert("השינויים נשמרו בהצלחה");
    } catch (error) {
      console.error("שגיאה בשמירה:", error);
      alert("אירעה שגיאה בשמירת הנתונים. נסה שוב.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>טוען נתונים...</div>;
  if (!userData) return null;

  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <h2 className={styles.header}>הפרופיל שלי</h2>
        <div className={styles.profileCard}>
          <div className={styles.formRow}><label>שם פרטי:</label>{editMode ? (<input name="firstName" value={userData.firstName} onChange={handleChange} />) : (<span>{userData.firstName}</span>)}</div>
          <div className={styles.formRow}><label>שם משפחה:</label>{editMode ? (<input name="lastName" value={userData.lastName} onChange={handleChange} />) : (<span>{userData.lastName}</span>)}</div>
          <div className={styles.formRow}><label>גיל:</label>{editMode ? (<input name="age" value={userData.age} onChange={handleChange} />) : (<span>{userData.age}</span>)}</div>
          <div className={styles.formRow}><label>מגדר:</label>{editMode ? (<input name="gender" value={userData.gender} onChange={handleChange} />) : (<span>{userData.gender}</span>)}</div>
          <div className={styles.formRow}><label>תחום לימודים:</label>{editMode ? (<input name="field" value={userData.field} onChange={handleChange} />) : (<span>{userData.field}</span>)}</div>

          <div className={styles.buttonsRow}>
            {editMode ? (
              <button className={styles.purpleBtn} onClick={handleSave}>שמור שינויים</button>
            ) : (
              <button className={styles.outlineBtn} onClick={() => setEditMode(true)}>עריכת פרופיל</button>
            )}
            <button className={styles.purpleBtn} onClick={() => setShowSection('favorites')}>מלגות שמורות</button>
            <button className={styles.purpleBtn} onClick={() => setShowSection('history')}>היסטוריית הגשות</button>
          </div>
        </div>

        {showSection && (
          <div className={styles.userHistorySection}>
            <UserHistory section={showSection} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
