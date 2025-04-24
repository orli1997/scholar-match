import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/logo.png';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="ScholarMatch Logo" className="logo" />
      </div>
      <div className="nav-links">
        <Link to="/">דף בית</Link>
        <Link to="/scholarships">מלגות</Link>
        <Link to="/profile">הפרופיל שלי</Link>
        <Link to="/help">עזרה</Link>
        <Link to="/register">הרשמה</Link>
      </div>
    </nav>
  );
}

export default Navbar;
