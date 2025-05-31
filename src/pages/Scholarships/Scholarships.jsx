import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Scholarships.module.css";
import Footer from '../../components/Footer/Footer';

const scholarshipsData = [
  { id: 1, name: "מלגת IMPACT", category: "חיילים משוחררים" },
  { id: 2, name: "מלגת פריפריה", category: "אזור מגורים" },
  { id: 3, name: "מלגת קרן חנן-עינור", category: "מגדר" },
  { id: 4, name: "מלגת רוטשילד", category: "מצב סוציו אקונומי" },
  { id: 5, name: "מלגת מנהיגי שוליך", category: "תחום לימודים" }
];

const filters = ["גיל", "מגדר", "מצב סוציו אקונומי", "אזור מגורים", "תחום לימודים"];

function Scholarships() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [query, setQuery] = useState("");

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredScholarships = scholarshipsData.filter((scholarship) => {
    if (!selectedFilter && !query) return true;
    return (
      (selectedFilter && scholarship.category.includes(selectedFilter)) ||
      (query && scholarship.name.includes(query))
    );
  });

  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <aside className={styles.filtersSidebar}>
          <h3 className={styles.filterTitle}>סינונים</h3>
          <hr className={styles.filterUnderline} />
          <ul className={styles.filtersList}>
            {filters.map((filter) => (
              <li
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={selectedFilter === filter ? styles.activeFilter : ""}
                style={{ cursor: "pointer" }}
              >
                {filter}
              </li>
            ))}
          </ul>
        </aside>

        <main className={styles.scholarshipMain}>
          <h2 className={styles.pageTitle}>עמוד חיפוש מלגות</h2>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="הקלד מילה או תחום"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className={styles.searchButton}>🔍</button>
          </div>

          <h3 className={styles.sectionTitle}>כרטיס מידע</h3>

          <div className={styles.scholarshipCards}>
            {filteredScholarships.length > 0 ? (
              filteredScholarships.map((s) => (
                <Link
                  to={`/scholarships/${s.id}`}
                  className={styles.scholarshipCard}
                  key={s.id}
                >
                  <h4>🎓 {s.name}</h4>
                  <p>לחץ כאן לפרטים נוספים</p>
                </Link>
              ))
            ) : (
              <p>לא נמצאו מלגות מתאימות</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Scholarships;
