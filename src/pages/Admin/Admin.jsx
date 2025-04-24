import React from "react";
import styles from "./Admin.module.css";

function Admin() {
  return (
    <div className="main-page-layout">
      <div className={styles.adminLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h2 className={styles.adminTitle}>Admin</h2>
          <nav>
            <ul>
              <li>דאשבורד</li>
              <li className={styles.active}>מלגות</li>
              <li>משתמשים</li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>מלגות</h2>
            <button className={styles.addBtn}>הוסף מלגה ➕</button>
          </div>

          <div className={styles.controls}>
            <input type="text" placeholder="חיפוש" className={styles.searchInput} />
            <select className={styles.filterSelect}>
              <option>סינון לפי קטגוריה</option>
              <option>מלגות לימודים</option>
              <option>מלגות קהילה</option>
            </select>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>מספר</th>
                <th>שם</th>
                <th>קטגוריה</th>
                <th>סכום המלגה</th>
                <th>פעולה</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: "שם המלגה 1", category: "סוג", amount: 5000 },
                { id: 2, name: "שם המלגה 2", category: "סוג", amount: 1000 },
                { id: 3, name: "שם המלגה 3", category: "סוג", amount: 3000 },
                { id: 4, name: "שם המלגה 4", category: "סוג", amount: 1000 },
                { id: 5, name: "שם המלגה 5", category: "סוג", amount: 1500 },
              ].map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.amount}</td>
                  <td>
                    <button className={styles.editBtn}>עריכה</button>
                    <button className={styles.deleteBtn}>מחיקה</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
