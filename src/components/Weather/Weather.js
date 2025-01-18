import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForm from "./WeatherForm";
import WeatherTabs from "./WeatherTabs";
import { saveToDB, getFromDB, deleteFromDB } from "../../db/indexedDB";

function Weather({ settings }) {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_VISUALCROSSING_API_KEY;

  useEffect(() => {
    const loadWeatherHistory = async () => {
      const storedHistory = await getFromDB();
      setWeatherHistory(storedHistory);
    };
    loadWeatherHistory();
  }, []);

  const fetchWeather = async (cityName, selectedDate, isRefresh = false) => {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${selectedDate}?key=${apiKey}`
      );

      const key = `${cityName}-${selectedDate}`;
      const newEntry = { key, data: response.data };

      if (isRefresh) {
        setWeatherHistory((prevHistory) =>
          prevHistory.map((entry) => (entry.key === key ? newEntry : entry))
        );
      } else {
        setWeatherHistory((prevHistory) => [...prevHistory, newEntry]);
        await saveToDB(newEntry);
      }

      setError("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Invalid city or date. Please try again.");
      } else {
        setError("An error occurred while fetching the weather data.");
      }
    }
  };

  const handleCityChange = (e) => setCity(e.target.value);

  const handleDateChange = (e) => setDate(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city || !date) {
      setError("Please enter both a city and a date.");
      return;
    }

    const key = `${city}-${date}`;
    if (!weatherHistory.some((entry) => entry.key === key)) {
      fetchWeather(city, date);
    } else {
      setError("Weather data for this city and date is already loaded.");
    }
  };

  const handleDelete = async (key) => {
    setWeatherHistory((prevHistory) => prevHistory.filter((entry) => entry.key !== key));
    await deleteFromDB(key);
  };

  return (
    <div className="weather-container">
      <h1>Check the weather for a city and date</h1>
      <WeatherForm
        city={city}
        date={date}
        onCityChange={handleCityChange}
        onDateChange={handleDateChange}
        onSubmit={handleSubmit}
      />
      {error && <p className="error-text">{error}</p>}
      {weatherHistory.length > 0 && (
        <WeatherTabs
          weatherHistory={weatherHistory}
          settings={settings}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Weather;