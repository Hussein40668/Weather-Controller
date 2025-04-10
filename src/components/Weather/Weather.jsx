import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoSunny } from "react-icons/io5";
import  humidity  from "../../assets/humidity.png"
import  windSpeed  from "../../assets/wind_speed.png";
import styles from "./Weather.module.css";

const Weather = () => {
const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": IoSunny,
        "01n": IoSunny,
        "02d": humidity,
        "02n": humidity,
        "03d": humidity,
        "03n": humidity,
        "04d": humidity,
        "04n": humidity,
        "09d": windSpeed,
        "09n": windSpeed,
        "10d": windSpeed,
        "10n": windSpeed,
        "11d": windSpeed,
        "11n": windSpeed,
        "13d": windSpeed,
        "13n": windSpeed,



    }

    const searchWeather = async (city) => {
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
            import.meta.env.VITE_APP_ID
          }`;
            
            const response = await fetch(url);          
            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || IoSunny;
            console.log(data);

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,  
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            
        }
    }

    useEffect(() => {
        searchWeather("london");
    }, []);

  return (
    <div className={styles.weather}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" />
        <CiSearch size={60} className={styles.searchIcon} />
      </div>
      <img src={weatherData.icon} alt= "" className={styles.weatherIcon} />
          <p className={styles.temperature}>{weatherData.temperature }°C</p>
          <p className={styles.location}>{weatherData.location }</p>

      <div className={styles.weatherDeta}>
        <div className={styles.col}>
          <img src={humidity} alt="" />
          <div>
                      <p>{weatherData.humidity }</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className={styles.col}>
          <img src={windSpeed} alt="" />
          <div>
                      <p>{weatherData.windSpeed }</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
