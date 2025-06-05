import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Scholarships from "./pages/Scholarships/Scholarships";
import ScholarshipDetails from "./pages/ScholarshipsDetails/ScholarshipsDetails";
import Profile from "./pages/Profile/Profile";
import Help from "./pages/Help/Help";
import Admin from "./pages/Admin/Admin";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Login from "./pages/Home/Home"; // אם דף ההתחברות הוא בעצם Home.jsx

<Route path="/login" element={<Home />} />

// קומפוננטת Layout כדי לשלוט על הופעת ה-Navbar
function Layout({ userData, setUserData }) {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin") || location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setUserData={setUserData} />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
        <Route path="/profile" element={<Profile userData={userData} />} />
        <Route path="/help" element={<Help />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Home />} />
      </Routes>
    </>
  );
}

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <Router>
      <Layout userData={userData} setUserData={setUserData} />
    </Router>
  );
}

export default App;
