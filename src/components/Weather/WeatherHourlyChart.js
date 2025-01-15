import React from "react";
import { Line, Bar } from "react-chartjs-2";

function WeatherHourlyChart({ weatherData, settings }) {
  const currentDay = weatherData.days[0];
  const hourlyLabels = currentDay.hours.map((hour) => hour.datetime);
  
  const hourlyTemp = currentDay.hours.map((hour) =>
    settings.unit === "metric" ? ((hour.temp - 32) * 5) / 9 : hour.temp
  );
  const hourlyFeelsLike = currentDay.hours.map((hour) =>
    settings.unit === "metric" ? ((hour.feelslike - 32) * 5) / 9 : hour.feelslike
  );

  const hourlyHumidity = currentDay.hours.map((hour) => hour.humidity);
  const hourlyDew = currentDay.hours.map((hour) => hour.dew);
  const hourlyPrecipProb = currentDay.hours.map((hour) => hour.precipprob);
  const hourlyWindSpeed = currentDay.hours.map((hour) => hour.windspeed);
  const hourlyPressure = currentDay.hours.map((hour) => hour.pressure);
  const hourlyVisibility = currentDay.hours.map((hour) => hour.visibility);
  const hourlyCloudCover = currentDay.hours.map((hour) => hour.cloudcover);

  return (
    <div>
      <h2>Today's Weather Details</h2>

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
              label: `Perceived Temperature (${settings.unit === "metric" ? "°C" : "°F"})`,
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
              text: `Temperature and Perceived Temperature`,
            },
          },
        }}
      />

      <Line
        data={{
          labels: hourlyLabels,
          datasets: [
            {
              label: `Humidity (%)`,
              data: hourlyHumidity,
              borderColor: "rgba(0, 123, 255, 0.6)",
              fill: false,
            },
            {
              label: `Dew Point (${settings.unit === "metric" ? "°C" : "°F"})`,
              data: hourlyDew,
              borderColor: "rgba(255, 159, 64, 0.6)",
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
              text: `Humidity and Dew Point`,
            },
          },
        }}
      />

      <Bar
        data={{
          labels: hourlyLabels,
          datasets: [
            {
              label: "Precipitation Probability (%)",
              data: hourlyPrecipProb,
              backgroundColor: "rgba(0, 123, 255, 0.3)",
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
              text: `Precipitation Probability`,
            },
          },
        }}
      />

      <Line
        data={{
          labels: hourlyLabels,
          datasets: [
            {
              label: "Wind Speed (km/h)",
              data: hourlyWindSpeed,
              borderColor: "rgba(255, 165, 0, 0.7)",
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
              text: `Wind Gusts`,
            },
          },
        }}
      />

      <Line
        data={{
          labels: hourlyLabels,
          datasets: [
            {
              label: "Pressure (hPa)",
              data: hourlyPressure,
              borderColor: "rgba(75, 192, 192, 0.6)",
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
              text: `Pressure`,
            },
          },
        }}
      />

      <Line
        data={{
          labels: hourlyLabels,
          datasets: [
            {
              label: "Visibility (km)",
              data: hourlyVisibility,
              borderColor: "rgba(153, 102, 255, 0.6)",
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
              text: `Visibility`,
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
              text: `Cloud Cover`,
            },
          },
        }}
      />
    </div>
  );
}

export default WeatherHourlyChart;
