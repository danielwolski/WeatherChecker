import React from "react";

function WeatherForm({ city, onCityChange, onCitySubmit }) {
  return (
    <form onSubmit={onCitySubmit} className="weather-form">
      <input
        type="text"
        value={city}
        onChange={onCityChange}
        placeholder="Enter city name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default WeatherForm;
