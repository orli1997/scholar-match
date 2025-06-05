import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [scholarships, setScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    amount: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "scholarships"));
      setScholarships(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (err) {
      console.error("שגיאה בשליפת מלגות:", err);
    }
  };

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "scholarships"), {
        name: "מלגה חדשה",
        category: "לא הוגדרה",
        amount: 0,
      });
      fetchScholarships();
    } catch (err) {
      console.error("שגיאה בהוספה:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      category: item.category,
      amount: item.amount,
    });
  };

  const handleSave = async (id) => {
    try {
      const ref = doc(db, "scholarships", id);
      await updateDoc(ref, {
        name: editForm.name,
        category: editForm.category,
        amount: Math.max(0, parseInt(editForm.amount)), // סכום לא שלילי
      });
      setEditingId(null);
      fetchScholarships();
    } catch (err) {
      console.error("שגיאה בעדכון:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "scholarships", id));
      fetchScholarships();
    } catch (err) {
      console.error("שגיאה במחיקה:", err);
    }
  };

  const filteredData = scholarships.filter((s) => {
    const matchesSearch = s.name.includes(searchTerm);
    const matchesCategory = !filterCategory || s.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.adminTitle}>Admin</h2>
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li className={styles.active} onClick={() => navigate("/admin")}>Admin</li>
          <li onClick={() => navigate("/users")}>Users</li>
        </ul>
      </aside>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Scholarships</h2>
          <button className={styles.addBtn} onClick={handleAdd}>
            הוסף מלגה ➕
          </button>
        </div>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="חיפוש"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className={styles.filterSelect}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">סינון לפי קטגוריה</option>
            <option value="חיילים משוחררים">חיילים משוחררים</option>
            <option value="אזור מגורים">אזור מגורים</option>
            <option value="חברה אתיופית">חברה אתיופית</option>
            <option value="הצטיינות אקדמית">הצטיינות אקדמית</option>
            <option value="לא הוגדרה">לא הוגדרה</option>
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
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {editingId === item.id ? (
                    <input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) =>
                        setEditForm({ ...editForm, amount: e.target.value })
                      }
                    />
                  ) : (
                    item.amount
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <button
                      className={styles.editBtn}
                      onClick={() => handleSave(item.id)}
                    >
                      שמור
                    </button>
                  ) : (
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(item)}
                    >
                      עריכה
                    </button>
                  )}
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(item.id)}
                  >
                    מחיקה
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
