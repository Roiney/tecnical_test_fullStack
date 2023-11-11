import React, { useState, useEffect } from "react";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import "./WeatherCard.css";

function WeatherCard(props) {
  console.log(props);
  const [wicon, setWicon] = useState(cloud_icon);
  const [dayOfWeek, setDayOfWeek] = useState("");

  useEffect(() => {
    switch (props.icon.slice(0, 2)) {
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
    console.log(props.dt_txt);
    const date = new Date(props.dt_txt);
    console.log(date);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    setDayOfWeek(daysOfWeek[date.getDay()]);
  }, [props.icon, props.dt_txt]);

  return (
    <div className="container-card">
      <div className="weather-image-card">
        <img src={wicon} alt="" />
      </div>
      <div className="day-of-week">{dayOfWeek}</div>
      <div className="weather-temp-card">{props.temperature}</div>
      <div className="data-container-card">
        <div className="element-card">
          <div className="data-card">
            <div className="humidity-percent-card">{props.humidity}</div>
            <div className="text-card">Humidity</div>
          </div>
        </div>
        <div className="element-card">
          <div className="data-card">
            <div className="wind-rate-card">{props.windSpeed} </div>
            <div className="text-card">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
