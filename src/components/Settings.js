import React, { useState } from "react";

function Settings({ onSave }) {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric"); // metric for Celsius, imperial for Fahrenheit

  const handleSave = () => {
    onSave({ city, unit });
  };

  return (
    <div>
      <h1>Settings</h1>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <label>
        Unit:
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Settings;
