import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Scholarships.module.css";
import Footer from "../../components/Footer/Footer";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const filters = ["גיל", "מגדר", "מצב סוציו אקונומי", "אזור מגורים", "תחום לימודים"];

function Scholarships() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [scholarshipsData, setScholarshipsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.email); // או טען שם ממשי אם יש
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchScholarships = async () => {
      const querySnapshot = await getDocs(collection(db, "scholarships"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setScholarshipsData(data);
    };

    fetchScholarships();
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            {isLoggedIn && <span style={{ fontWeight: "bold" }}>שלום, {userName}!</span>}
            {isLoggedIn && (
              <button onClick={handleLogout} style={{ border: "1px solid #ccc", padding: "6px 12px", borderRadius: "6px", background: "white", cursor: "pointer" }}>
                התנתק
              </button>
            )}
          </div>

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
