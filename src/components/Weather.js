import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Weather({ settings }) {
  const [city, setCity] = useState(""); // For form input
  const [submittedCity, setSubmittedCity] = useState(""); // For fetching weather
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(""); // For error message

  const apiKey = process.env.REACT_APP_VISUALCROSSING_API_KEY;

  useEffect(() => {
    if (submittedCity) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${submittedCity}?key=${apiKey}`
          );
          setWeatherData(response.data);
          setError(""); // Clear any previous error
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setError("Wrong city. Please try again.");
          } else {
            setError("An error occurred while fetching the weather data.");
          }
          setWeatherData(null); // Clear weather data on error
        }
      };
      fetchWeather();
    }
  }, [submittedCity, apiKey]);

  const handleCityChange = (e) => setCity(e.target.value);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    setSubmittedCity(city); // Trigger weather data fetch
    setWeatherData(null); // Clear previous data
    setError(""); // Clear any previous error
  };

  if (!submittedCity) {
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={handleCitySubmit}>
          <label>
            City:
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={handleCitySubmit}>
          <label>
            City:
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return <p>Loading weather data for {submittedCity}...</p>;
  }

  const labels = weatherData.days.map((day) => day.datetime);
  const temperatures = weatherData.days.map((day) =>
    settings.unit === "metric"
      ? ((day.temp - 32) * 5) / 9 // Convert to Celsius
      : day.temp // Fahrenheit
  );

  return (
    <div>
      <h1>Weather in {submittedCity}</h1>
      <form onSubmit={handleCitySubmit}>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
          />
        </label>
        <button type="submit">Update</button>
      </form>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: `Daily Temperature (${settings.unit === "metric" ? "°C" : "°F"})`,
              data: temperatures,
              borderColor: "blue",
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Temperature Forecast for ${submittedCity}`,
            },
          },
        }}
      />
    </div>
  );
}

export default Weather;
