import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ScholarshipsDetails.module.css";
import Footer from '../../components/Footer/Footer';
import SharePopup from "../../components/SharePopup/SharePopup";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

function ScholarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const docRef = doc(db, "scholarships", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setScholarship({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("לא נמצאה מלגה עם מזהה זה");
        }
      } catch (err) {
        setError("שגיאה בטעינת המלגה");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  if (loading) return <p>טוען...</p>;
  if (error) return <p>{error}</p>;
  if (!scholarship) return null;

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
            <button className={styles.backButton} onClick={() => navigate("/scholarships")}> חזור לעמוד הקודם</button>
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
