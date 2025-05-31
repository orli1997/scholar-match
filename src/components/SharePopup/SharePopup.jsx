// components/SharePopup/SharePopup.jsx
import React from "react";

function SharePopup({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
        width: "260px",
        textAlign: "center"
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "transparent",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          color: "#ff4d4f"
        }}
      >
        ✖
      </button>

      <h3 style={{ marginBottom: "20px", fontWeight: "bold" }}>שתף מלגה</h3>

      <a href="https://wa.me/?text=Check%20out%20this%20scholarship!" target="_blank" rel="noreferrer" style={linkStyle}>
        WhatsApp
      </a>
      <hr style={hrStyle} />

      <a href="mailto:?subject=Scholarship&body=Check%20this%20scholarship!" target="_blank" rel="noreferrer" style={linkStyle}>
        מייל
      </a>
      <hr style={hrStyle} />

      <a href="https://www.facebook.com/sharer/sharer.php?u=https://example.com" target="_blank" rel="noreferrer" style={linkStyle}>
        Facebook
      </a>
      <hr style={hrStyle} />

      <a href="https://twitter.com/intent/tweet?url=https://example.com&text=Check%20this%20scholarship!" target="_blank" rel="noreferrer" style={linkStyle}>
        X
      </a>
    </div>
  );
}

const linkStyle = {
  display: "block",
  fontSize: "16px",
  color: "#4a3cd4",
  marginBottom: "10px",
  textDecoration: "none",
};

const hrStyle = {
  border: "none",
  borderTop: "1px solid #ddd",
  margin: "10px 0",
};

export default SharePopup;
