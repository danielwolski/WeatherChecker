import React, { useState } from "react";
import BasicInfo from "../BasicInfo/BasicInfo";
import WeatherHourlyChart from "../HourlyCharts/HourlyCharts";
import "./WeatherCheck.scss";

function WeatherCheck({ weatherHistory, settings, onDelete }) {
  const [activeTab, setActiveTab] = useState(
    weatherHistory.length > 0 ? weatherHistory[0].key : null
  );

  const handleTabClick = (key) => setActiveTab(key);

  const activeWeatherData = weatherHistory.find(
    (entry) => entry.key === activeTab
  );

  return (
    <div className="weather-check-container">
      <div className="tabs">
        {weatherHistory.map((entry) => (
          <div key={entry.key} className="tab-container">
            <button
              className={`tab ${entry.key === activeTab ? "active" : ""}`}
              onClick={() => handleTabClick(entry.key)}
            >
              {entry.key}
            </button>
            <button
              className="tab-action delete"
              onClick={() => onDelete(entry.key)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      {activeWeatherData ? (
        <div className="weather-content">
          <h1>Weather in {activeWeatherData.city}</h1>
          <BasicInfo weatherData={activeWeatherData.data} />
          <div className="chart-container">
            <WeatherHourlyChart
              weatherData={activeWeatherData.data}
              settings={settings}
            />
          </div>
        </div>
      ) : (
        <p>Select a city to view weather data</p>
      )}
    </div>
  );
}

export default WeatherCheck;
