import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Footer from "../../components/Footer/Footer";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    field: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // בדיקת אימות סיסמה
    if (formData.password !== formData.confirmPassword) {
      alert("הסיסמאות אינן תואמות");
      return;
    }

    // כאן אפשר להוסיף שליחה לשרת בעתיד
    console.log("🟢 Registration data:", formData);

    // ניתוב לעמוד המלגות
    navigate("/scholarships");
  };

  return (
    <div className={styles.mainPageLayout}>
      <div className={styles.pageContentWrapper}>
        <div className={styles.card}>
          <h2 className={styles.header}>טופס הרשמה</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>שם פרטי:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />

            <label>שם משפחה:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />

            <label>מייל:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <label>סיסמה:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />

            <label>אימות סיסמה:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />

            <label>גיל:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />

            <label>מגדר:</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} />

            <label>תחום לימודים:</label>
            <input type="text" name="field" value={formData.field} onChange={handleChange} />

            <button type="submit" className={styles.submitBtn}>הרשמה</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
