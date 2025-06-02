import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import Footer from "../../components/Footer/Footer";
import { auth, db } from "../../firebase"; // ייבוא auth ו-db
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        navigate("/register");
        return;
      }

      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          // אם אין נתונים, אפשר לאתחל כאן
          setUserData({
            firstName: "",
            lastName: "",
            age: "",
            gender: "",
            field: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
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
      await setDoc(doc(db, "users", auth.currentUser.uid), userData);
      setEditMode(false);
      alert("השינויים נשמרו בהצלחה");
    } catch (error) {
      console.error("Error saving user data:", error);
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
        <div className={styles.logoutInCard}>
          <button className={styles.logoutButton} onClick={handleLogout}>התנתק</button>
        </div>
        <h2 className={styles.header}>הפרופיל שלי</h2>
        <div className={styles.profileCard}>
          <div className={styles.formRow}>
            <label>שם פרטי:</label>
            {editMode ? (
              <input name="firstName" value={userData.firstName} onChange={handleChange} />
            ) : (
              <span>{userData.firstName}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label>שם משפחה:</label>
            {editMode ? (
              <input name="lastName" value={userData.lastName} onChange={handleChange} />
            ) : (
              <span>{userData.lastName}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label>גיל:</label>
            {editMode ? (
              <input name="age" value={userData.age} onChange={handleChange} />
            ) : (
              <span>{userData.age}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label>מגדר:</label>
            {editMode ? (
              <input name="gender" value={userData.gender} onChange={handleChange} />
            ) : (
              <span>{userData.gender}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label>תחום לימודים:</label>
            {editMode ? (
              <input name="field" value={userData.field} onChange={handleChange} />
            ) : (
              <span>{userData.field}</span>
            )}
          </div>

          <div className={styles.buttonsRow}>
            {editMode ? (
              <button className={styles.purpleBtn} onClick={handleSave}>שמור שינויים</button>
            ) : (
              <button className={styles.outlineBtn} onClick={() => setEditMode(true)}>עריכת פרופיל</button>
            )}
            <button className={styles.purpleBtn}>מלגות שמורות</button>
            <button className={styles.purpleBtn}>היסטוריית הגשות</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
