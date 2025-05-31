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
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();
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
    const fetchScholarships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "scholarships"));
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name || "מלגה כללית",
          value: Math.floor(Math.random() * 400 + 100),
        }));
        setScholarships(data);
      } catch (error) {
        console.error("שגיאה בשליפת מלגות: ", error);
      }
    };
    fetchScholarships();
  }, []);

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.adminTitle}>Dashboard</h2>
        <ul>
          <li className={styles.active}>דאשבורד</li>
          <li onClick={() => navigate("/admin")}>מלגות</li>
          <li>משתמשים</li>
        </ul>
      </aside>

      <div className={styles.dashboardContent}>
        <h1 className={styles.dashboardTitle}>דאשבורד</h1>

        <div className={styles.columns}>
          {/* עמודה שמאלית: ריבועים כחולים */}
          <div className={styles.leftColumn}>
            <div className={styles.infoCard}>
              <p>משתמשים</p>
              <h2>1250</h2>
            </div>

            <div className={styles.infoCard}>
              <p>מספר הגשות למלגות - יומי</p>
              <h2>367</h2>
            </div>
          </div>

          {/* עמודה ימנית: גרפים */}
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
              <h3 className={styles.cardTitle}>המלגה שהגישו אליה הכי הרבה</h3>
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
