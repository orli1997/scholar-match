import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ScholarshipsDetails.module.css";
import Footer from '../../components/Footer/Footer';
import SharePopup from "../../components/SharePopup/SharePopup";

const scholarshipsData = [
  {
    id: "1",
    name: "מלגת IMPACT",
    requirements: "שירות צבאי מלא והמלצות",
    criteria: "חיילים משוחררים עם מעורבות קהילתית",
    documents: "תעודת שחרור, המלצות, גיליון ציונים",
    link: "https://www.fidfimpact.org/"
  },
  {
    id: "2",
    name: "מלגת פריפריה",
    requirements: "מגורים באזור פריפריה",
    criteria: "תושבות בפריפריה והכנסה נמוכה",
    documents: "תעודת זהות, אישור תושב, אישור הכנסה",
    link: "https://www.keren-peripheria.gov.il/"
  },
  {
    id: "3",
    name: "מלגת חנן עינור",
    requirements: "השתתפות בתכניות קהילתיות",
    criteria: "סטודנטים מהחברה האתיופית",
    documents: "תעודת סטודנט, מכתב מוטיבציה",
    link: "https://kerenaynor.org.il/"
  },
  {
    id: "4",
    name: "מלגת רוטשילד",
    requirements: "הצטיינות אקדמית",
    criteria: "רקע סוציו-אקונומי נמוך והצטיינות",
    documents: "גיליון ציונים, המלצות, תעודת זהות",
    link: "https://rothschildfund.org.il/"
  },
  {
    id: "5",
    name: "מלגת מנהיגי שוליך",
    requirements: "לימודי STEM והובלה חברתית",
    criteria: "מצוינות בלימודי הנדסה או מדעים",
    documents: "תעודת סטודנט, גיליון ציונים, המלצות",
    link: "https://schulichleaders.com/"
  }
];

function ScholarshipDetails() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const scholarship = scholarshipsData.find((s) => s.id === id);

  if (!scholarship) return <p>לא נמצאה מלגה</p>;

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
            <span>{isFavorite ? "הסר מהמועדפים" : "הוסף למועדפים"}</span>
          </div>

          <h2 className={styles.title}>🎓 {scholarship.name}</h2>
          <p className={styles.label}><strong>דרישות:</strong> {scholarship.requirements}</p>
          <p className={styles.label}><strong>קריטריונים:</strong> {scholarship.criteria}</p>
          <p className={styles.label}><strong>מסמכים נדרשים:</strong> {scholarship.documents}</p>

          <div className={styles.buttons}>
            <a href={scholarship.link} target="_blank" rel="noopener noreferrer">
              <button className={styles.applyBtn}>הגש מועמדות</button>
            </a>
            <button className={styles.shareBtn} onClick={() => setShowShare(true)}>↗️ שתף מלגה זאת</button>
          </div>

          {showShare && (
            <SharePopup
              title={`מצאתי מלגה: ${scholarship.name}`}
              url={window.location.href}
              onClose={() => setShowShare(false)}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ScholarshipDetails;
