import React, { useState, useEffect } from "react";
import "./Weather.css";

export const Weather = () => {
  const apiKey = "b99a57eb561fdb436a5124cce3472164";
  const [cityName, setCityName] = useState("Delhi");
  const [inputValue, setInputValue] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
      );
      if (!response.ok) {
        throw new Error("Problem in API");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getWeather();
  }, [cityName]); // Fetch weather data when cityName changes

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitBtn = () => {
    setCityName(inputValue);
  };

  return (
    <>
      <div className="weather-container">
        <h1>Weather</h1>
        <div className="input-block">
          <h2 className="city-name">Enter city name:</h2>
          <input
            className="form-tag"
            type="text"
            value={inputValue}
            onChange={handleInput}
            placeholder="Enter city name"
          />
        </div>
        <button className="btn" type="button" onClick={handleSubmitBtn}>
          Show me weather
        </button>
        {error && <p>Error: {error}</p>}
        {weatherData ? (
          <div className="result-block">
            <p>City : {weatherData.name}</p>
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          </div>
        ) : (
          <p>Fetching data...</p>
        )}
      </div>
    </>
  );
};
