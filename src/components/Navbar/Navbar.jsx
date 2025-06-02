import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/logo.png';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="ScholarMatch Logo" className="logo" />
      </div>
      <div className="nav-links">
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
          <Link to="/login">התחברות</Link>
        )}

        {!user && <Link to="/register">הרשמה</Link>}
      </div>
    </nav>
  );
}

export default Navbar;
