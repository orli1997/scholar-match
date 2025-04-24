import React, { useState } from "react";
import styles from "./ScholarshipsDetails.module.css";
import Footer from '../../components/Footer/Footer';



function ScholarshipDetails() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="main-page-layout">
      <div className="page-content-wrapper">
        <div className={styles.scholarshipBox}>
          <div
            className={`${styles.favorite} ${isFavorite ? styles.active : ""}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <span className={styles.starIcon}>
              {isFavorite ? "★" : "☆"}
            </span>
            <span>{isFavorite ? "הוסר מהמועדפים" : "הוסף למועדפים"}</span>
          </div>

          <h2 className={styles.title}>שם המלגה</h2>
          <p className={styles.label}>דרישות: ...</p>
          <p className={styles.label}>קריטריונים: ...</p>
          <p className={styles.label}>מסמכים נדרשים: ...</p>

          <div className={styles.buttons}>
            <button className={styles.applyBtn}>הגש מועמדות</button>
            <button className={styles.shareBtn}>📧 שתף מלגה זאת</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ScholarshipDetails;
