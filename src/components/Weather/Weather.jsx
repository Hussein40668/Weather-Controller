import React, { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloudy.png";
import drizzle_icon from "../../assets/drizzle.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/windy.png";
import humidity_icon from "../../assets/humidity.png";
import styles from "./Weather.module.css";

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": wind_icon,
    "11n": wind_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": humidity_icon,
  };

  const searchWeather = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      // console.log(data);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    searchWeather();
  }, []);

  return (
    <div className={styles.weather}>
      <div className={styles.searchBar}>
        <input ref={inputRef} type="text" placeholder="Search" />
        <CiSearch
          onClick={() => searchWeather(inputRef.current.value)}
          size={60}
          className={styles.searchIcon}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className={styles.weatherIcon} />

          <p className={styles.temperature}>{weatherData.temperature}°C</p>
          <p className={styles.location}>{weatherData.location}</p>

          <div className={styles.weatherDeta}>
            <div className={styles.col}>
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className={styles.col}>
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
