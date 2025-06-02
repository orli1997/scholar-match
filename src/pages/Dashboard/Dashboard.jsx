import React, { useState, useEffect } from "react";
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
  query,
  where,
  Timestamp,
} from "firebase/firestore";

const COLORS = ["#001a7d", "#3d1dbe", "#7044d9", "#b28eff", "#8ca9ff"];

const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

const getDayName = (date) => {
  return daysOfWeek[date.getDay()];
};

const getLast7Days = () => {
  const today = new Date();
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d);
  }
  return dates;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [usersCount, setUsersCount] = useState(0);
  const [dailySubmissionsCount, setDailySubmissionsCount] = useState(0);
  const [dailyUsersData, setDailyUsersData] = useState([]);
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    // סופר משתמשים
    const fetchUsersCount = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      setUsersCount(usersSnap.size);
    };

    // סופר הגשות יומיות (היום)
    const fetchDailySubmissions = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const submissionsRef = collection(db, "submissions");
      const q = query(
        submissionsRef,
        where("date", ">=", Timestamp.fromDate(today)),
        where("date", "<", Timestamp.fromDate(tomorrow))
      );
      const submissionsSnap = await getDocs(q);
      setDailySubmissionsCount(submissionsSnap.size);
    };

    // נתוני משתמשים יומיים ל-7 ימים אחרונים (מספר ההרשמות או כניסות)
    const fetchDailyUsersData = async () => {
      const last7Days = getLast7Days();

      // נניח שב-users יש שדה 'createdAt' מסוג Timestamp
      const usersRef = collection(db, "users");

      const dataPromises = last7Days.map(async (date) => {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);

        const q = query(
          usersRef,
          where("createdAt", ">=", Timestamp.fromDate(start)),
          where("createdAt", "<", Timestamp.fromDate(end))
        );
        const snap = await getDocs(q);
        return { day: getDayName(start), users: snap.size };
      });

      const results = await Promise.all(dataPromises);
      setDailyUsersData(results);
    };

    // נטען את המלגות עם שדה submissionCount
    const fetchScholarships = async () => {
      const scholarshipsSnap = await getDocs(collection(db, "scholarships"));
      const data = scholarshipsSnap.docs.map((doc) => ({
        name: doc.data().name || "מלגה כללית",
        value: doc.data().submissionCount || 0,
      }));
      setScholarships(data);
    };

    fetchUsersCount();
    fetchDailySubmissions();
    fetchDailyUsersData();
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
          <div className={styles.leftColumn}>
            <div className={styles.infoCard}>
              <p>משתמשים רשומים</p>
              <h2>{usersCount}</h2>
            </div>

            <div className={styles.infoCard}>
              <p>מספר הגשות למלגות - היום</p>
              <h2>{dailySubmissionsCount}</h2>
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
