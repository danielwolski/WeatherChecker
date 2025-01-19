import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationMenu.scss";

function NavigationMenu() {
  const navigate = useNavigate();

  return (
    <div className="navigation-buttons">
      <button
        onClick={() => navigate("/settings")}
      >
        Settings
      </button>
      <button
        onClick={() => navigate("/weather")}
      >
        Check Weather
      </button>
    </div>
  );
}

export default NavigationMenu;
