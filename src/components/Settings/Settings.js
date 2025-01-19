import React, { useState } from "react";
import "./Settings.scss";

function Settings({ onSave }) {
  const [unit, setUnit] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = () => {
    onSave({ unit });
    setSuccessMessage("Settings saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3000); 
  };

  return (
    <div className="weather-container">
      <h1>Settings</h1>
      <div className="settings-form">
        <label>Temperature units:</label>
        <div>
          <label>
            <input
              type="checkbox"
              checked={unit === "metric"}
              onChange={() => setUnit(unit === "metric" ? "" : "metric")}
            />
            Celsius
          </label>
          <label>
            <input
              type="checkbox"
              checked={unit === "imperial"}
              onChange={() => setUnit(unit === "imperial" ? "" : "imperial")}
            />
            Fahrenheit
          </label>
        </div>
      </div>
      <button className="settings-save-button" onClick={handleSave}>
        Save
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Settings;
