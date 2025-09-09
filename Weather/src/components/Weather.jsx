import React from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import drizzle_icon from '../assets/drizzle.png'
import { useState, useEffect } from 'react'
const Weather = () => {


  const [weatherData, setWeatherData] = useState(false);
  const inputRef= React.useRef(null);
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
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if(city === ""){
      alert("Please enter a city name");
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const res = await fetch(url);
      const data = await res.json();
      
      if(res.ok) {
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
          humidity: data.main.humidity,
          temp: Math.floor(data.main.temp),
          windSpeed: data.wind.speed,
          city: data.name,
          country: data.sys.country,
          icon: icon
        })
      } else {
        alert(data.message || "City not found");
        setWeatherData(false);
      }
    } catch (error) {
      console.log(error);
      setWeatherData(false);
    }

  }

  useEffect(() => {
    search("London");
  }
  , [])
  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={searchIcon} alt="" onClick={() => search(inputRef.current.value)}/>
      </div>
      <img src={weatherData ? weatherData.icon : clear_icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData ? `${weatherData.temp}°C` : "Loading..."}</p>
      <p className='location'>{weatherData ? `${weatherData.city}, ${weatherData.country}` : "Loading..."}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData ? `${weatherData.humidity} %` : "--"}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData ? `${weatherData.windSpeed} Km/h` : "--"}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
