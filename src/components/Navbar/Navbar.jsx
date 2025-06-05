import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/logo.png';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';

function Navbar() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ מצב טעינה
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("שגיאה בשליפת נתוני המשתמש:", error.message);
        }
      } else {
        setUserData(null);
      }
      setIsLoading(false); // ✅ סיום טעינה
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('שגיאה בעת ההתנתקות:', error);
    }
  };

  if (isLoading) return null; 

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="ScholarMatch Logo" className="logo" />
      </div>
      <div className="nav-links">
                <span className="username">
  שלום, {userData?.fullName || userData?.firstName || user?.email || 'משתמשת'}
</span>
        <Link to="/">דף בית</Link>
        <Link to="/scholarships">מלגות</Link>
        <Link to="/help">עזרה</Link>

        {user ? (
          <>
    
            <Link to="/profile">הפרופיל שלי</Link>
            <button onClick={handleLogout} className="logout-button">
              התנתק
            </button>
          </>
        ) : (
          <>
            <Link to="/login">התחברות</Link>
            <Link to="/register">הרשמה</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
