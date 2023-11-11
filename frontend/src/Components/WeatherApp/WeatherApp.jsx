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
    let url = `http://127.0.0.1:4000/weather/${element[0].value}`;
    let response = await fetch(url);
    if (response.status === 200) {
      let data = await response.json();

      setWeatherDataFull(data.weather_data);
      setWeatherData({
        humidity: `${data.weather_data[0].humidity}%`,
        windSpeed: `${data.weather_data[0].wind_speed} km/h`,
        temperature: `${data.weather_data[0].temp}°C`,
        location: data.name,
      });

      const iconPrefix = data.weather_data[0].weather_types[0].icon.slice(0, 2);

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
          weatherDataFull.map((data, index) => {
            return (
              index !== 0 && (
                <WeatherCard
                  key={index}
                  icon={`${data.weather_types[0].icon}%`}
                  humidity={`${data.humidity}%`}
                  windSpeed={`${data.wind_speed} km/h`}
                  temperature={`${data.temp}°C`}
                  dt_txt={data.dt_txt}
                />
              )
            );
          })}
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
