import React from "react";
import { Link } from "react-router-dom";
import styles from "./Scholarships.module.css";
import Footer from '../../components/Footer/Footer';


function Scholarships() {
  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <aside className={styles.filtersSidebar}>
          <h3 className={styles.filterTitle}>סינונים</h3>
          <hr className={styles.filterUnderline} />
          <ul className={styles.filtersList}>
            <li>גיל</li>
            <li>מגדר</li>
            <li>מצב סוציו אקונומי</li>
            <li>אזור מגורים</li>
            <li>תחום לימודים</li>
          </ul>
        </aside>

        <main className={styles.scholarshipMain}>
          <h2 className={styles.pageTitle}>עמוד חיפוש מלגות</h2>

          <div className={styles.searchBar}>
            <input type="text" placeholder="הקלד מילה או תחום" />
            <button className={styles.searchButton}>🔍</button>
          </div>

          <h3 className={styles.sectionTitle}>כרטיס מידע</h3>

          <div className={styles.scholarshipCards}>
            {[1, 2, 3].map((id) => (
              <Link
                to={`/scholarships/${id}`}
                className={styles.scholarshipCard}
                key={id}
              >
                <h4>שם המלגה</h4>
                <p>לחץ כאן לפרטים נוספים</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Scholarships;
