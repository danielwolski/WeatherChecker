import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherForm from "./WeatherForm";
import WeatherInfo from "./WeatherInfo";
import WeatherHourlyChart from "./WeatherHourlyChart";
import WeatherDailyChart from "./WeatherDailyChart";
import "./Weather.scss";

function Weather({ settings }) {
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_VISUALCROSSING_API_KEY;

  useEffect(() => {
    if (submittedCity) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${submittedCity}?key=${apiKey}`
          );
          setWeatherData(response.data);
          setError("");
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setError("Wrong city. Please try again.");
          } else {
            setError("An error occurred while fetching the weather data.");
          }
          setWeatherData(null);
        }
      };
      fetchWeather();
    }
  }, [submittedCity, apiKey]);

  const handleCityChange = (e) => setCity(e.target.value);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    setSubmittedCity(city);
    setWeatherData(null);
    setError("");
  };

  if (!submittedCity) {
    return (
      <div className="weather-container">
        <h1>Check weather for city</h1>
        <WeatherForm
          city={city}
          onCityChange={handleCityChange}
          onCitySubmit={handleCitySubmit}
        />
        {error && <p className="error-text">{error}</p>}
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-container">
        <h1>Weather</h1>
        <WeatherForm
          city={city}
          onCityChange={handleCityChange}
          onCitySubmit={handleCitySubmit}
        />
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return <p className="loading-text">Loading weather data for {submittedCity}...</p>;
  }

  return (
    <div className="weather-container">
      <h1>Weather in {submittedCity}</h1>
      <WeatherForm
        city={city}
        onCityChange={handleCityChange}
        onCitySubmit={handleCitySubmit}
      />

      <WeatherInfo weatherData={weatherData} />

      <div className="chart-container">
        <WeatherHourlyChart weatherData={weatherData} settings={settings} />
      </div>
        
      <div className="chart-container">
        <WeatherDailyChart weatherData={weatherData} settings={settings} />
      </div>
    </div>
  );
}

export default Weather;
