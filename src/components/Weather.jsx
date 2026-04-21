import React from 'react'
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
    <div className="place-self-center p-8 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 flex flex-col items-center shadow-2xl backdrop-blur-sm border border-white/20">
      <div className="flex items-center gap-3">
        <input 
          ref={inputRef} 
          type="text" 
          placeholder='Search city...' 
          className="h-12 border-none outline-none rounded-full pl-6 text-base text-gray-700 bg-white/90 placeholder-gray-500 w-48 sm:w-64 shadow-inner"
          onKeyDown={(e) => e.key === 'Enter' && search(inputRef.current.value)}
        />
        <button 
          onClick={() => search(inputRef.current.value)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 cursor-pointer hover:bg-white transition-all shadow-md hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      <img 
        src={weatherData ? weatherData.icon : clear_icon} 
        alt="Weather" 
        className="w-36 h-36 my-6 drop-shadow-2xl animate-pulse-slow"
      />
      <p className="text-white text-7xl font-light tracking-wide">
        {weatherData ? `${weatherData.temp}°` : "..."}
      </p>
      <p className="text-white/90 text-3xl font-medium mt-2">
        {weatherData ? `${weatherData.city}, ${weatherData.country}` : "Loading..."}
      </p>
      <div className="w-full mt-10 flex justify-between text-white gap-8">
        <div className="flex items-center gap-3">
          <img src={humidity_icon} alt="Humidity" className="w-6" />
          <div>
            <p className="text-xl font-semibold">{weatherData ? `${weatherData.humidity}%` : "--"}</p>
            <span className="text-sm text-white/70">Humidity</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={wind_icon} alt="Wind" className="w-6" />
          <div>
            <p className="text-xl font-semibold">{weatherData ? `${weatherData.windSpeed} km/h` : "--"}</p>
            <span className="text-sm text-white/70">Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
