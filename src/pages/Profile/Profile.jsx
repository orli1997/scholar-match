import React from "react";
import styles from "./Profile.module.css";
import Footer from '../../components/Footer/Footer';


function Profile() {
  return (
    <div className="main-page-layout">
      <div className="page-content-wrapper">
        <div className={styles.profileCard}>
          <h2 className={styles.title}>הפרופיל שלי</h2>

          <form className={styles.form}>
            <div className={styles.formRow}>
              <label>שם פרטי:</label>
              <input type="text" />
            </div>
            <div className={styles.formRow}>
              <label>שם משפחה:</label>
              <input type="text" />
            </div>
            <div className={styles.formRow}>
              <label>גיל:</label>
              <input type="number" />
            </div>
            <div className={styles.formRow}>
              <label>מגדר:</label>
              <input type="text" />
            </div>
            <div className={styles.formRow}>
              <label>תחום לימודים:</label>
              <input type="text" />
            </div>

            <div className={styles.buttonsRow}>
              <button className={styles.purpleBtn}>שמור שינויים</button>
              <button className={styles.purpleBtn}>מלגות שמורות</button>
              <button className={styles.purpleBtn}>היסטוריית הגשות</button>
              <button className={styles.outlineBtn}>עריכת פרופיל</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />

    </div>
  );
}

export default Profile;
