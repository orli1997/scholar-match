import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Scholarships.module.css";
import Footer from "../../components/Footer/Footer";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const filters = ["גיל", "מגזר", "מצב סוציו אקונומי", "אזור מגורים", "תחום לימודים"];

function getIconFileName(category) {
  switch (category) {
    case "חיילים משוחררים":
      return "/assets/icons/soldier.png";
    case "פריפריה":
      return "/assets/icons/location.png";
    case "התנדבות":
      return "/assets/icons/volunteer.png";
    case "מגזר":
      return "/assets/icons/gender.png";
    case "חרדים":
      return "/assets/icons/torah.png";
    case "גיל":
      return "/assets/icons/age.png";
    default:
      return "/assets/icons/default.png";
  }
}

function Scholarships() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scholarshipsData, setScholarshipsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchScholarships = async () => {
      const querySnapshot = await getDocs(collection(db, "scholarships"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

     

      // שמירה למצב
      setScholarshipsData(data);
    };

    fetchScholarships();
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredScholarships = scholarshipsData.filter((s) => {
    if (!selectedFilter && !query) return true;
    return (
      (selectedFilter && s.category?.includes(selectedFilter)) ||
      (query && s.name?.includes(query))
    );
  });

  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <aside className={styles.filtersSidebar}>
          <h3 className={styles.filterTitle}>סינונים</h3>
          <ul className={styles.filtersList}>
            {filters.map((filter, index) => (
              <React.Fragment key={filter}>
                <li
                  onClick={() => handleFilterClick(filter)}
                  className={selectedFilter === filter ? styles.activeFilter : ""}
                >
                  {filter}
                </li>
                {index < filters.length - 1 && <hr className={styles.filterDivider} />}
              </React.Fragment>
            ))}
          </ul>
        </aside>

        <main className={styles.scholarshipMain}>
          <h2 className={styles.pageTitle}>עמוד חיפוש מלגות</h2>

          {!isLoggedIn && (
            <p className={styles.loginNotice}>
              כדי להגיש מועמדות או לצפות בפרטי המלגה – יש להתחבר למערכת
            </p>
          )}

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
                <div className={styles.scholarshipCard} key={s.id}>
                  <img
                    src={getIconFileName(s.category)}
                    alt={s.category}
                    className={styles.icon}
                  />
                  <h4>🎓 {s.name}</h4>
                  <p>
                    {isLoggedIn ? (
                      <Link to={`/scholarships/${s.id}`}>לחץ כאן לפרטים נוספים</Link>
                    ) : (
                      <span style={{ color: "gray" }}>התחבר כדי לצפות</span>
                    )}
                  </p>
                </div>
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
