import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoSunny } from "react-icons/io5";
import  humidity  from "../../assets/humidity.png"
import  windSpeed  from "../../assets/wind_speed.png";
import styles from "./Weather.module.css";

const Weather = () => {
  return (
    <div className={styles.weather}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" />
        <CiSearch size={60} className={styles.searchIcon} />
      </div>
      <IoSunny size={120} className={styles.weatherIcon} />
      <p className={styles.temperature}>16°C</p>
      <p className={styles.location}>London</p>

      <div className={styles.weatherDeta}>
        <div className={styles.col}>
          <img src={humidity} alt="" />
          <div>
            <p>91 %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className={styles.col}>
          <img src={windSpeed} alt="" />
          <div>
            <p>3.6 Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
