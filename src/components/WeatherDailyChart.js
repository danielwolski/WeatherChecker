import React from "react";
import { Line } from "react-chartjs-2";

function WeatherDailyChart({ weatherData, settings }) {
  const labels = weatherData.days.map((day) => day.datetime);
  const temperatures = weatherData.days.map((day) =>
    settings.unit === "metric" ? ((day.temp - 32) * 5) / 9 : day.temp
  );

  return (
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
              text: `Temperature Forecast`,
            },
          },
        }}
      />
  );
}

export default WeatherDailyChart;