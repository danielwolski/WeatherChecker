import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/settings")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007BFF",
          color: "white",
          flex: "1",
        }}
      >
        Go to Settings
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/weather")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#28A745",
          color: "white",
          flex: "1",
        }}
      >
        Go to Weather
      </motion.button>
    </div>
  );
}

export default NavigationButtons;
