import React from "react";

function WeatherInfo({ weatherData }) {
  return (
    <div className="weather-info">
      <h2>Location: {weatherData.resolvedAddress}</h2>
      <h2>Timezone: {weatherData.timezone}</h2>
      <br></br>
      <p>{weatherData.description}</p>
    </div>
  );
}

export default WeatherInfo;
