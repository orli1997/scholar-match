import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleReset = async () => {
    if (!email.trim()) {
      return setMessage("אנא הזן כתובת מייל.");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("קישור לאיפוס סיסמה נשלח למייל.");
    } catch (error) {
      setMessage("אירעה שגיאה: " + error.message);
    }
  };

  return (
    <div style={{ padding: "40px", direction: "rtl", textAlign: "center" }}>
      <h2>איפוס סיסמה</h2>
      <p>הכנס את כתובת האימייל שלך ואשלח לך קישור לאיפוס סיסמה.</p>
      <input
        type="email"
        placeholder="כתובת מייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "300px", borderRadius: "10px" }}
      />
      <br />
      <button onClick={handleReset} style={{ marginTop: "20px" }}>
        שלח קישור לאיפוס
      </button>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>חזור לדף הבית</button>
    </div>
  );
}

export default ForgotPassword;
