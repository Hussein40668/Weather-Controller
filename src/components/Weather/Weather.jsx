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
  const [forecastData, setForecastData] = useState([]);
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
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      if (!weatherResponse.ok) {
        alert(weatherData.message);
        return;
      }

      const icon = allIcons[weatherData.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        temperature: Math.floor(weatherData.main.temp),
        location: weatherData.name,
        icon: icon,
        description: weatherData.weather[0].description,
      });

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if (!forecastResponse.ok) {
        console.error("Error fetching forecast:", forecastData.message);
        setForecastData([]);
        return;
      }

      const dailyForecast = forecastData.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 3)
        .map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          temperature: Math.floor(item.main.temp),
          icon: allIcons[item.weather[0].icon] || clear_icon,
          description: item.weather[0].description,
        }));

      setForecastData(dailyForecast);
    } catch (error) {
      setWeatherData(false);
      setForecastData([]);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    searchWeather("Addis Ababa");
  }, []);

  return (
    <div className={styles.weather}>
      <div className={styles.searchBar}>
        <input ref={inputRef} type="text" placeholder="Search City" />
        <CiSearch
          onClick={() => searchWeather(inputRef.current.value)}
          size={60}
          className={styles.searchIcon}
        />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="" className={styles.weatherIcon} />
          <p className={styles.temperature}>{weatherData.temperature}°C</p>
          <p className={styles.location}>{weatherData.location}</p>
          <p className={styles.weatherDescription}>{weatherData.description}</p>{" "}

          {/* Styled description */}
          <div className={styles.weatherDeta}>
            <div className={styles.col}>
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className={styles.col}>
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
          <div className={styles.weatherDeta}>
            {forecastData.map((day, index) => (
              <div key={index} className={styles.col}>
                <img src={day.icon} alt="" />
                <div>
                  <p>{day.temperature}°C</p>
                  <span>{day.date}</span>
                  <span className={styles.forecastDescription}>
                    {day.description}
                  </span>{" "}
                  {/* Styled forecast description */}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
