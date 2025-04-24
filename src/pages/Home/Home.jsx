
import styles from "./Home.module.css";
import Footer from '../../components/Footer/Footer';


function Home() {
  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <div className={styles.card}>
          <h1 className={styles.header}>מציאת מלגה שמתאימה לך בקליק</h1>

          <button className={styles.searchButton}>
            מצא מלגה בלחיצת כפתור 🔍
          </button>

          <div className={styles.loginBox}>
            <h3>התחברות</h3>
            <input type="text" placeholder="שם משתמש" />
            <input type="password" placeholder="סיסמה" />
            <a href="#">שכחת סיסמה?</a>
            <button className={styles.loginBtn}>כניסה</button>
            <a href="#">הרשמה</a>
          </div>

          <hr className={styles.separator} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
