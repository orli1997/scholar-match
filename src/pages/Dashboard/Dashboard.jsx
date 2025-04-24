import React from "react";
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
  Legend
} from "recharts";

const Dashboard = () => {
  const dailyUsersData = [
    { day: "ראשון", users: 20 },
    { day: "שני", users: 25 },
    { day: "שלישי", users: 22 },
    { day: "רביעי", users: 28 },
    { day: "חמישי", users: 35 },
    { day: "שישי", users: 38 },
    { day: "שבת", users: 30 }
  ];

  const pieData = [
    { name: "מלגה א", value: 400 },
    { name: "מלגה ב", value: 300 },
    { name: "מלגה ג", value: 300 },
    { name: "מלגה ד", value: 200 }
  ];

  const COLORS = ["#001a7d", "#3d1dbe", "#7044d9", "#b28eff"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(to right, #001a7d, #b833e1)",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
        direction: "rtl"
      }}
    >
      <h1 style={{ color: "white", fontSize: "40px", marginBottom: "20px" }}>
        דאשבורד
      </h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
          background: "white",
          borderRadius: "16px",
          padding: "30px",
          width: "90%",
          maxWidth: "1200px"
        }}
      >
        {/* גרף קו */}
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "16px"
          }}
        >
          <h3 style={{ textAlign: "center" }}>מספר משתמשים יומי</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyUsersData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#001a7d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* כרטיסי נתונים */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#001a7d",
              color: "white",
              borderRadius: "12px",
              padding: "16px",
              width: "220px",
              textAlign: "center",
              border: "1px solid white"
            }}
          >
            <p>משתמשים</p>
            <h2>1250</h2>
          </div>

          <div
            style={{
              background: "#001a7d",
              color: "white",
              borderRadius: "12px",
              padding: "16px",
              width: "220px",
              textAlign: "center",
              border: "1px solid white"
            }}
          >
            <p>מספר הגשות למלגות - יומי</p>
            <h2>367</h2>
          </div>
        </div>

        {/* תרשים פאי */}
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "16px"
          }}
        >
          <h3 style={{ textAlign: "center" }}>המלגה שהגישו אליה הכי הרבה</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                label={({ name }) => name}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
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
  );
};

export default Dashboard;
