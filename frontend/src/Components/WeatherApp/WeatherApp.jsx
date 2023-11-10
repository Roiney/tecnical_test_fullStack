import React, { useState } from "react";
import "./WeatherApp.css";
import seach_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import wind_icon from "../Assets/wind.png";
import clear_icon from "../Assets/clear.png";
import humidity_icon from "../Assets/humidity.png";
import WeatherCard from "./WeatherCard";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";

const WeatherApp = () => {
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handlePopupClose = () => {
    setShowErrorPopup(false);
  };

  let api_key = "5360521dc8ec19a86dd1e2be339825c0";
  const [weatherData, setWeatherData] = useState({
    humidity: "64%",
    windSpeed: "18 km/h",
    temperature: "24°C",
    location: "São Paulo",
  });

  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherDataFull, setWeatherDataFull] = useState();

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&units=Metric&cnt=5&appid=${api_key}`;
    let response = await fetch(url);
    if (response.status === 200) {
      let data = await response.json();
      setWeatherDataFull(data.list);
      setWeatherData({
        humidity: `${data.list[0].main.humidity}%`,
        windSpeed: `${data.list[0].wind.speed} km/h`,
        temperature: `${data.list[0].main.temp}°C`,
        location: data.city.name,
      });

      const iconPrefix = data.list[0].weather[0].icon.slice(0, 2);
      switch (iconPrefix) {
        case "01":
          setWicon(clear_icon);
          break;
        case "02":
          setWicon(cloud_icon);
          break;
        case "03":
          setWicon(drizzle_icon);
          break;
        case "04":
          setWicon(drizzle_icon);
          break;
        case "09":
          setWicon(rain_icon);
          break;
        case "10":
          setWicon(rain_icon);
          break;
        case "13":
          setWicon(snow_icon);
          break;
        default:
          setWicon(clear_icon);
      }
    } else {
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={seach_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      <div className="container-call-card">
        {weatherDataFull &&
          weatherDataFull.map(
            (data, index) =>
              index !== 0 && (
                <WeatherCard
                  key={index}
                  icon={`${data.weather[0].icon}%`}
                  humidity={`${data.main.humidity}%`}
                  windSpeed={`${data.wind.speed} km/h`}
                  temperature={`${data.main.temp}°C`}
                />
              )
          )}
      </div>
      {showErrorPopup && (
        <div className="error-popup">
          <p>
            Cidade não encontrada. Por Favor, confira o nome da cidade
            pesquisada!
          </p>
          <button onClick={handlePopupClose}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
