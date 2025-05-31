import React, { useState } from "react";
import styles from "./Profile.module.css";
import Footer from '../../components/Footer/Footer';

function Profile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    field: ""
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log("שמור פרופיל:", profile);
    alert("הפרטים נשמרו בהצלחה!");
  };

  const handleSavedScholarships = () => {
    alert("כאן יוצגו המלגות ששמרת (פונקציונליות בהמשך)");
  };

  const handleSubmissionHistory = () => {
    alert("כאן תוצג היסטוריית ההגשות שלך (פונקציונליות בהמשך)");
  };

  return (
    <div className="main-page-layout">
      <div className="page-content-wrapper">
        <div className={styles.profileCard}>
          <h2 className={styles.title}>הפרופיל שלי</h2>

          <form className={styles.form}>
            <div className={styles.formRow}>
              <label>שם פרטי:</label>
              <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
              <label>שם משפחה:</label>
              <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
              <label>גיל:</label>
              <input type="number" name="age" value={profile.age} onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
              <label>מגדר:</label>
              <input type="text" name="gender" value={profile.gender} onChange={handleChange} />
            </div>
            <div className={styles.formRow}>
              <label>תחום לימודים:</label>
              <input type="text" name="field" value={profile.field} onChange={handleChange} />
            </div>

            <div className={styles.buttonsRow}>
              <button type="button" className={styles.purpleBtn} onClick={handleSave}>שמור שינויים</button>
              <button type="button" className={styles.purpleBtn} onClick={handleSavedScholarships}>מלגות שמורות</button>
              <button type="button" className={styles.purpleBtn} onClick={handleSubmissionHistory}>היסטוריית הגשות</button>
              <button type="button" className={styles.outlineBtn}>עריכת פרופיל</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
