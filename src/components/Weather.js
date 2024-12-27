import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Weather.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
        <form onSubmit={handleCitySubmit} className="weather-form">
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
            />
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error-text">{error}</p>}
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-container">
        <h1>Weather</h1>
        <form onSubmit={handleCitySubmit} className="weather-form">
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
            />
          <button type="submit">Submit</button>
        </form>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return <p className="loading-text">Loading weather data for {submittedCity}...</p>;
  }

  const currentDay = weatherData.days[0];
  const hourlyLabels = currentDay.hours.map((hour) => hour.datetime);
  const hourlyTemp = currentDay.hours.map((hour) =>
    settings.unit === "metric" ? ((hour.temp - 32) * 5) / 9 : hour.temp
  );
  const hourlyFeelsLike = currentDay.hours.map((hour) =>
    settings.unit === "metric" ? ((hour.feelslike - 32) * 5) / 9 : hour.feelslike
  );
  const hourlyWindSpeed = currentDay.hours.map((hour) => hour.windspeed);
  const hourlyCloudCover = currentDay.hours.map((hour) => hour.cloudcover);

  const labels = weatherData.days.map((day) => day.datetime);
  const temperatures = weatherData.days.map((day) =>
    settings.unit === "metric" ? ((day.temp - 32) * 5) / 9 : day.temp
  );

  return (
    <div className="weather-container">
      <h1>Weather in {submittedCity}</h1>
      <form onSubmit={handleCitySubmit} className="weather-form">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
          />
        <button type="submit">Update</button>
      </form>

      <div className="weather-info">
        <h2>Location: {weatherData.resolvedAddress}</h2>
        <p>Timezone: {weatherData.timezone}</p>
        <p>Description: {weatherData.description}</p>
      </div>

      <div className="chart-container">
        <h3>Today's Detailed Weather</h3>
        <Line
          data={{
            labels: hourlyLabels,
            datasets: [
              {
                label: `Temperature (${settings.unit === "metric" ? "°C" : "°F"})`,
                data: hourlyTemp,
                borderColor: "blue",
                fill: false,
              },
              {
                label: `Feels Like (${settings.unit === "metric" ? "°C" : "°F"})`,
                data: hourlyFeelsLike,
                borderColor: "green",
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
                text: `Today's Temperature and Feels Like in ${submittedCity}`,
              },
            },
          }}
        />

        <Bar
          data={{
            labels: hourlyLabels,
            datasets: [
              {
                label: "Cloud Cover (%)",
                data: hourlyCloudCover,
                backgroundColor: "rgba(135, 206, 250, 0.5)",
              },
              {
                label: "Wind Speed (km/h)",
                data: hourlyWindSpeed,
                backgroundColor: "rgba(255, 165, 0, 0.5)",
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
                text: `Cloud Cover and Wind Speed for ${submittedCity}`,
              },
            },
          }}
        />
      </div>

      <div className="chart-container">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: `Daily Temperature (${settings.unit === "metric" ? "°C" : "°F"})`,
              data: temperatures,
              borderColor: "red",
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
      
    </div>
  );
}

export default Weather;
