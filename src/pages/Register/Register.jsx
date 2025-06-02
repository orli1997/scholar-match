import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Footer from "../../components/Footer/Footer";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

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

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword, age, gender, field } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !age || !gender || !field) {
      setError("יש למלא את כל השדות");
      return false;
    }

    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות");
      return false;
    }

    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return false;
    }

    if (Number(age) < 18 || Number(age) > 65) {
      setError("ההרשמה מותרת לגילאים בין 18 ל-65 בלבד");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // יצירת משתמש ב-Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // שמירת פרטי המשתמש ב-Firestore עם תאריך יצירה ותפקיד
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        field: formData.field,
        createdAt: serverTimestamp(), // שדה תאריך יצירה
        role: "user" // תפקיד ברירת מחדל
      });

      alert(`${formData.firstName}, נרשמת בהצלחה! כעת תוכל להתחבר`);
      navigate("/#login-section");
    } catch (error) {
      console.error("שגיאה בהרשמה:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("האימייל כבר רשום במערכת");
      } else if (error.code === "auth/invalid-email") {
        setError("כתובת האימייל לא חוקית");
      } else if (error.code === "auth/weak-password") {
        setError("הסיסמה חלשה מדי. עליך להזין לפחות 6 תווים");
      } else {
        setError("ארעה שגיאה במהלך ההרשמה. נסה שנית.");
      }
    }
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
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="65"
            />

            <label>מגדר:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">בחר מגדר</option>
              <option value="זכר">זכר</option>
              <option value="נקבה">נקבה</option>
            </select>

            <label>תחום לימודים:</label>
            <input type="text" name="field" value={formData.field} onChange={handleChange} />

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submitBtn}>הרשמה</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
