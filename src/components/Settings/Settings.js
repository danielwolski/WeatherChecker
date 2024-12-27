import React, { useState } from "react";

function Settings({ onSave }) {
  const [unit, setUnit] = useState("metric");

  const handleSave = () => {
    onSave({ unit });
  };

  return (
    <div>
      <h1>Settings</h1>
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
