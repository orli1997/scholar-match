import React, { useState } from "react";
import styles from "./Help.module.css";
import Footer from "../../components/Footer/Footer";

function Help() {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleContactClick = () => {
    setShowContactInfo(true);
  };

  const handleFAQClick = () => {
    window.open("https://example.com/faq", "_blank");
  };

  const handleFormsClick = () => {
    window.open("https://example.com/forms", "_blank");
  };

  const handleGuideClick = () => {
    window.open("https://example.com/system-guide", "_blank");
  };

  return (
    <div className="main-page-layout">
      <div className="page-content-wrapper">
        <div className={styles.helpCard}>
          <h2 className={styles.title}>עזרה ותמיכה</h2>

          <button className={styles.contactButton} onClick={handleContactClick}>
            צור קשר ✉️
          </button>

          {showContactInfo && (
            <div className={styles.contactInfo}>
              <p>נשמח לעזור! ניתן לפנות אלינו בכתובת:</p>
              <p>
                <strong>
                  <a href="mailto:support@scholar-match.com">
                    support@scholar-match.com
                  </a>
                </strong>
              </p>
            </div>
          )}

          <div className={styles.buttonsContainer}>
            <button className={styles.optionButton} onClick={handleFAQClick}>
              שאלות נפוצות
            </button>
            <button className={styles.optionButton} onClick={handleFormsClick}>
              קישורים לדוגמות טפסים
            </button>
            <button className={styles.optionButton} onClick={handleGuideClick}>
              הגדרות והסבר על המערכת
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Help;
