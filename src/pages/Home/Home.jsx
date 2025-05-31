import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Footer from "../../components/Footer/Footer";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      navigate("/scholarships");
    } else {
      alert("יש להזין שם משתמש וסיסמה");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <div className={styles.card}>
          <h1 className={styles.header}>מציאת מלגה שמתאימה לך בקליק</h1>

          <button className={styles.searchButton} onClick={goToRegister}>
            מצא מלגה בלחיצת כפתור 🔍
          </button>

          <div className={styles.loginBox}>
            <h3>התחברות</h3>
            <input
              type="text"
              placeholder="שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">שכחת סיסמה?</a>
            <button className={styles.loginBtn} onClick={handleLogin}>
              כניסה
            </button>
            <a href="#" onClick={goToRegister}>הרשמה</a>
          </div>

          <hr className={styles.separator} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
