import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function Weather({ settings }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (settings.city) {
      const fetchWeather = async () => {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            q: settings.city,
            units: settings.unit,
            appid: "YOUR_API_KEY" // Replace with your OpenWeatherMap API key
          }
        });
        setWeatherData(response.data);
      };
      fetchWeather();
    }
  }, [settings]);

  if (!settings.city) {
    return <p>Please set your city in Settings.</p>;
  }

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  const labels = weatherData.list.map(item => item.dt_txt);
  const temperatures = weatherData.list.map(item => item.main.temp);

  return (
    <div>
      <h1>Weather in {settings.city}</h1>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Temperature",
              data: temperatures,
              borderColor: "blue",
              fill: false
            }
          ]
        }}
      />
    </div>
  );
}

export default Weather;
