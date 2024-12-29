import React, { useState } from "react";
import axios from "axios";
import WeatherForm from "./WeatherForm";
import WeatherTabs from "./WeatherTabs";
import "./Weather.scss";

function Weather({ settings }) {
  const [city, setCity] = useState("");
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_VISUALCROSSING_API_KEY;

  const fetchWeather = async (cityName, isRefresh = false) => {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${apiKey}`
      );
      if (isRefresh) {
        setWeatherHistory((prevHistory) =>
          prevHistory.map((entry) =>
            entry.city === cityName ? { city: cityName, data: response.data } : entry
          )
        );
      } else {
        setWeatherHistory((prevHistory) => [
          ...prevHistory,
          { city: cityName, data: response.data },
        ]);
      }
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Wrong city. Please try again.");
      } else {
        setError("An error occurred while fetching the weather data.");
      }
    }
  };

  const handleCityChange = (e) => setCity(e.target.value);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (!weatherHistory.some((entry) => entry.city === city)) {
      fetchWeather(city);
    }
    setCity("");
  };

  const handleRefresh = (cityName) => {
    fetchWeather(cityName, true);
  };

  const handleDelete = (cityName) => {
    setWeatherHistory((prevHistory) =>
      prevHistory.filter((entry) => entry.city !== cityName)
    );
  };

  return (
    <div className="weather-container">
      <h1>Check weather for city</h1>
      <WeatherForm
        city={city}
        onCityChange={handleCityChange}
        onCitySubmit={handleCitySubmit}
      />
      {error && <p className="error-text">{error}</p>}
      {weatherHistory.length > 0 && (
        <WeatherTabs
          weatherHistory={weatherHistory}
          settings={settings}
          onRefresh={handleRefresh}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Weather;
