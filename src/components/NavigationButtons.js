import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div className="navigation-buttons">
      <motion.button
        className="settings"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/settings")}
      >
        Settings
      </motion.button>
      <motion.button
        className="weather"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/weather")}
      >
        Weather
      </motion.button>
    </div>
  );
}

export default NavigationButtons;
