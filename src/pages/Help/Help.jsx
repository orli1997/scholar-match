import React from "react";
import styles from "./Help.module.css";
import Footer from '../../components/Footer/Footer';



function Help() {
  return (
    <div className="main-page-layout">
      <div className="page-content-wrapper">
        <div className={styles.helpCard}>
          <h2 className={styles.title}>עזרה ותמיכה</h2>

          <button className={styles.contactButton}>✉️ צור קשר</button>

          <div className={styles.buttonsContainer}>
            <button className={styles.optionButton}>שאלות נפוצות</button>
            <button className={styles.optionButton}>קישור לדוגמאות לטפסים הנדרשים</button>
            <button className={styles.optionButton}>הגדרות והסבר על המערכת</button>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
}

export default Help;
