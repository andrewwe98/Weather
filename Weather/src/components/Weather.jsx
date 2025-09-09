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
  const search = async (city) => {
    if(city === ""){
      alert("Please enter a city name");
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        temp: data.main.temp,
        windSpeed: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        icon: data.weather[0].main
      })
    } catch (error) {
      console.log(error);
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
      <img src={clear_icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData ? `${weatherData.temp}°C` : "Loading..."}</p>
      <p className='location'>{weatherData ? `${weatherData.city}, ${weatherData.country}` : "Loading..."}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
