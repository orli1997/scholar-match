import styles from './Register.module.css';
import Footer from "../../components/Footer/Footer";





function Register() {
  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <div className={styles.card}>
          <h2 className={styles.header}>טופס הרשמה</h2>
          <form className={styles.form}>
            <label>שם פרטי:</label>
            <input type="text" />
            <label>שם משפחה:</label>
            <input type="text" />
            <label>מייל:</label>
            <input type="email" />
            <label>סיסמה:</label>
            <input type="password" />
            <label>אימות סיסמה:</label>
            <input type="password" />
            <label>גיל:</label>
            <input type="number" />
            <label>מגדר:</label>
            <input type="text" />
            <label>תחום לימודים:</label>
            <input type="text" />
            <button type="submit" className={styles.submitBtn}>הרשמה</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
