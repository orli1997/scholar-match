import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import styles from "./Home.module.css";
import Footer from "../../components/Footer/Footer";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  // אם המשתמש כבר מחובר - ננווט אוטומטית
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/scholarships");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogin = async () => {
    setErrorMessage(""); // ננקה שגיאה קודמת

    if (!email.trim() || !password.trim()) {
      setErrorMessage("יש להזין כתובת מייל וסיסמה");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/scholarships");
    } catch (error) {
      console.error("שגיאה בהתחברות:", error);
      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("כתובת אימייל לא תקינה");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMessage("אימייל או סיסמה שגויים");
          break;
        default:
          setErrorMessage("אירעה שגיאה בהתחברות. נסה שוב.");
      }
    }
  };

  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <div className={styles.card}>
          <h1 className={styles.header}>מציאת מלגה שמתאימה לך בקליק</h1>

          <button className={styles.searchButton} onClick={() => navigate("/scholarships")}>
            מצא מלגה בלחיצת כפתור 
          </button>

          <div className={styles.loginBox} id="login-section">
            <h3>התחברות</h3>
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button className={styles.registerLink} onClick={() => navigate("/register")}>
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
