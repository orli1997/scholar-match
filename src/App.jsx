import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Scholarships from "./pages/Scholarships/Scholarships";
import ScholarshipDetails from "./pages/ScholarshipsDetails/ScholarshipsDetails";
import Profile from "./pages/Profile/Profile";
import Help from "./pages/Help/Help";
import Admin from "./pages/Admin/Admin";
import Dashboard from "./pages/Dashboard/Dashboard";

// קומפוננטת Layout כדי לשלוט על הופעת ה-Navbar
function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin") || location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
