import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [scholarships, setScholarships] = useState([]);

  const dailyUsersData = [
    { day: "ראשון", users: 20 },
    { day: "שני", users: 25 },
    { day: "שלישי", users: 22 },
    { day: "רביעי", users: 28 },
    { day: "חמישי", users: 35 },
    { day: "שישי", users: 38 },
    { day: "שבת", users: 30 },
  ];

  const COLORS = ["#001a7d", "#3d1dbe", "#7044d9", "#b28eff", "#8ca9ff"];

  useEffect(() => {
    fetchUsersCount();
    fetchApplications();
    fetchMostAppliedScholarships();
  }, []);

  const fetchUsersCount = async () => {
    const usersSnapshot = await getDocs(collection(db, "users"));
    setUserCount(usersSnapshot.size);
  };

  const fetchApplications = async () => {
    const usersSnapshot = await getDocs(collection(db, "users"));
    let total = 0;

    for (const userDoc of usersSnapshot.docs) {
      const appsSnapshot = await getDocs(
        collection(db, "users", userDoc.id, "applications")
      );
      total += appsSnapshot.size;
    }

    setTotalApplications(total);
  };

  // כאן שינוי – תצוגה מזויפת של המלגות הכי מבוקשות
  const fetchMostAppliedScholarships = async () => {
    const fakeData = [
      { name: "מלגת חנן עינור", value: 12 },
      { name: "מלגת רוטשליד", value: 7 },
      { name: "מלגת גיל למצוינות", value: 5 },
    ];
    setScholarships(fakeData);
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.adminTitle}>Dashboard</h2>
        <ul>
          <li className={styles.active}>Dashboard</li>
          <li onClick={() => navigate("/admin")}>Admin</li>
          <li>Users</li>
        </ul>
      </aside>

      <div className={styles.dashboardContent}>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>

        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <div className={styles.infoCard}>
              <p>משתמשים</p>
              <h2>{userCount}</h2>
            </div>

            <div className={styles.infoCard}>
              <p>מספר הגשות למלגות</p>
              <h2>{totalApplications}</h2>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>מספר משתמשים יומי</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dailyUsersData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#001a7d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>המלגות המבוקשות ביותר</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={scholarships}
                    cx="50%"
                    cy="50%"
                    label={({ name }) => name}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {scholarships.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
