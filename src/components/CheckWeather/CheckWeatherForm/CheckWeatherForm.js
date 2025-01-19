import React from "react";
import "./CheckWeatherForm.scss"

function CheckWeatherForm({ city, date, onCityChange, onDateChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="weather-form">
      <input
        type="text"
        value={city}
        onChange={onCityChange}
        placeholder="Enter city name"
      />
      <input
        type="date"
        value={date}
        onChange={onDateChange}
        placeholder="Select a date"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CheckWeatherForm;