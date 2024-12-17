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
            This project was coded by
            <a href="https://github.com/Nombuso28" target="_blank" rel="noopener noreferrer"> Nombuso Ntsele</a> and is open sourced
            <a href="https://github.com/Nombuso28" target="_blank" rel="noopener noreferrer"> on GitHub</a> and
            <a href="https://nombuso.netlify.app" target="_blank" rel="noopener noreferrer"> hosted on Netlify</a>
        </footer>
    </div>
  );
}

export default App;