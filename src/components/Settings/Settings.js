import React, { useState } from "react";

function Settings({ onSave }) {
  const [unit, setUnit] = useState("");

  const handleSave = () => {
    onSave({ unit });
  };

  return (
    <div className="weather-container">
      <h1>Settings</h1>
      <div className="weather-form">
        <label>
          Temperature units:
        </label>
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
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Settings;
