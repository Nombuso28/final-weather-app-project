import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Johannesburg" />
        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/Nombuso28"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nombuso Melinda Ntsele{" "}
          </a>
          and is{" "}
          <a
            href="https://github.com/Nombuso28/react-weather-app-shecodes"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on Github
          </a>
        </footer>
      </div>
    </div>
  );
}