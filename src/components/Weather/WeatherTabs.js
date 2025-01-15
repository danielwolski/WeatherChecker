import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherHourlyChart from "./WeatherHourlyChart";
import WeatherDailyChart from "./WeatherDailyChart";
import "./WeatherTabs.scss";

function WeatherTabs({ weatherHistory, settings, onRefresh, onDelete }) {
  const [activeTab, setActiveTab] = useState(
    weatherHistory.length > 0 ? weatherHistory[0].city : null
  );

  const handleTabClick = (city) => setActiveTab(city);

  const activeWeatherData = weatherHistory.find(
    (entry) => entry.city === activeTab
  );

  return (
    <div className="weather-tabs-container">
      <div className="tabs">
        {weatherHistory.map((entry) => (
          <div key={entry.city} className="tab-container">
            <button
              className={`tab ${entry.city === activeTab ? "active" : ""}`}
              onClick={() => handleTabClick(entry.city)}
            >
              {entry.city}
            </button>
            <button
              className="tab-action refresh"
              onClick={() => onRefresh(entry.city)}
            >
              🔄
            </button>
            <button
              className="tab-action delete"
              onClick={() => onDelete(entry.city)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      {activeWeatherData ? (
        <div className="weather-content">
          <h1>Weather in {activeWeatherData.city}</h1>
          <WeatherInfo weatherData={activeWeatherData.data} />
          <div className="chart-container">
            <WeatherHourlyChart
              weatherData={activeWeatherData.data}
              settings={settings}
            />
          </div>
          {/* <div className="chart-container">
            <WeatherDailyChart
              weatherData={activeWeatherData.data}
              settings={settings}
            />
          </div> */}
        </div>
      ) : (
        <p>Select a city to view weather data</p>
      )}
    </div>
  );
}

export default WeatherTabs;
