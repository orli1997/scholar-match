import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./Home.module.css";
import Footer from "../../components/Footer/Footer";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage("יש להזין שם משתמש וסיסמה");
      return;
    }

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigate("/scholarships");
    } catch (error) {
      console.error("שגיאה בהתחברות:", error);
      setErrorMessage("שם משתמש או סיסמה שגויים");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goToScholarships = () => {
    navigate("/scholarships");
  };

  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <div className={styles.card}>
          <h1 className={styles.header}>מציאת מלגה שמתאימה לך בקליק</h1>

          <button className={styles.searchButton} onClick={goToScholarships}>
            מצא מלגה בלחיצת כפתור 
          </button>

          <div className={styles.loginBox} id="login-section">
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
            <a href="/forgot-password">שכחת סיסמה?</a>

            {errorMessage && (
              <div className={styles.error}>{errorMessage}</div>
            )}

            <button className={styles.loginBtn} onClick={handleLogin}>
              כניסה
            </button>
            <button className={styles.registerLink} onClick={goToRegister}>
              הרשמה
            </button>
          </div>

          <hr className={styles.separator} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
