import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Weather.css";

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  // Wrap `searchCity` in `useCallback` to avoid unnecessary re-renders
  const searchCity = useCallback((city) => {
    const apiKey = "b2a5adcct04b33178913oc335f405433";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response) => {
      setWeatherData(response.data);
      getForecast(city);
    });
  }, []);

  useEffect(() => {
    searchCity(city);
  }, [city, searchCity]);

  function getForecast(city) {
    const apiKey = "f875398bf20cafeft6b46o1403180fac";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response) => {
      setForecastData(response.data.daily.slice(0, 5));
    });
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = dayNames[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }

  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[date.getDay()];
  }

  function getWeatherEmoji(description) {
    if (description.includes("clear")) return "☀️";
    if (description.includes("cloud")) return "☁️";
    if (description.includes("rain")) return "🌧️";
    if (description.includes("snow")) return "❄️";
    if (description.includes("thunderstorm")) return "⛈️";
    if (description.includes("mist") || description.includes("fog"))
      return "🌫️";
    return "🌤️"; // Default emoji
  }

  function getDayEmoji(day) {
    const dayEmojis = {
      Sun: "🌞",
      Mon: "🌙",
      Tue: "🌬️",
      Wed: "💧",
      Thu: "🌲",
      Fri: "🌈",
      Sat: "🏝️",
    };
    return dayEmojis[day] || "";
  }

  if (!weatherData) return null;

  return (
    <div>
      <div className="weather-app-data">
        <div>
          <h2 className="weather-app-city">{weatherData.city}</h2>
          <p className="weather-app-details">{formatDate(weatherData.time)}</p>
          <p className="weather-app-details">
            {getWeatherEmoji(weatherData.condition.description)}{" "}
            {weatherData.condition.description} | Humidity:{" "}
            {weatherData.temperature.humidity}% | Wind: {weatherData.wind.speed}{" "}
            km/h
          </p>
        </div>
        <div className="weather-app-temperature-container">
          <img
            src={weatherData.condition.icon_url}
            alt="Weather Icon"
            className="weather-app-icon"
          />
          <div>
            <span className="weather-app-temperature">
              {Math.round(weatherData.temperature.current)}
            </span>
            <span className="weather-app-unit">°C</span>
          </div>
        </div>
      </div>
      <div className="weather-forecast">
        {forecastData.map((day, index) => (
          <div key={index} className="weather-forecast-day">
            <div className="weather-forecast-date">
              {getDayEmoji(formatDay(day.time))} {formatDay(day.time)}
            </div>
            <img
              src={day.condition.icon_url}
              alt="Weather Icon"
              className="weather-forecast-icon"
            />
            <div className="weather-forecast-temperatures">
              <span>
                <strong>{Math.round(day.temperature.maximum)}°</strong>
              </span>
              <span>{Math.round(day.temperature.minimum)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;