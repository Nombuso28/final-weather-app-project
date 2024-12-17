// App.js
import React, { useState } from "react";
import Weather from "./Weather";
import "./App.css";

function App() {
  const [city, setCity] = useState("Paris");

  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchInput = event.target.city.value;
    setCity(searchInput);
  }

  return (
    <div className="weather-app">
      <header>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            name="city"
            placeholder="Enter a city"
            className="search-form-input"
          />
          <button type="submit" className="search-form-button">
            Search
          </button>
        </form>
      </header>
      <main>
        <Weather city={city} />
      </main>
      <footer>
        This project was coded by Karabo Lesapo and is open-sourced on{" "}
        <a
          href="https://github.com/Karabo-L/final_react_weather_app"
          target="blank"
        >
          GitHub
        </a>{" "}
        and hosted on{" "}
        <a href="https://shecodes-react-meteo-app.netlify.app/" target="blank">
          Netlify
        </a>
      </footer>
    </div>
  );
}

export default App;