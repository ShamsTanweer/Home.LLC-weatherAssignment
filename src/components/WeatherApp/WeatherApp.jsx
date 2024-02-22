import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
import search_icon from '../Assests/search.png';
import clear_icon from '../Assests/clear.png';
import cloud_icon from '../Assests/cloud.png';
import drizzle_icon from '../Assests/drizzle.png';
import rain_icon from '../Assests/rain.png';
import snow_icon from '../Assests/snow.png';
import wind_icon from '../Assests/wind.png';
import humidity_icon from '../Assests/humidity.png';



function WeatherApp() {
  const [inputValue, setInputValue] = useState("Patna");
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperature: "",
    location: "",
    icon: cloud_icon,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;

  const search = async () => {
    if (inputValue === "") {
      return;
    }

    setLoading(true);
    setError(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=Metric&appid=${api_key}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      setWeatherData({
        humidity: data.main.humidity + ' %',
        windSpeed: data.wind.speed + ' km/h',
        temperature: data.main.temp + ' °c',
        location: data.name,
        icon: getWeatherIcon(data.weather[0].icon),
      });
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
    setInputValue("")
  };

  const getWeatherIcon = (iconCode) => {
    if (iconCode === "01d" || iconCode === "01n") {
      return clear_icon;
    } else if (iconCode === "02d" || iconCode === "02n") {
      return cloud_icon;
    } else if (iconCode === "03d" || iconCode === "03n") {
      return drizzle_icon;
    } else if (iconCode === "04d" || iconCode === "04n") {
      return drizzle_icon;
    } else if (iconCode === "09d" || iconCode === "09n") {
      return rain_icon;
    } else if (iconCode === "10d" || iconCode === "10n") {
      return rain_icon;
    } else if (iconCode === "13d" || iconCode === "13n") {
      return snow_icon;
    } else {
      return clear_icon;
    }
  };


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    search();
  }, []); 

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <div className="weather-image">
            <img src={weatherData.icon} alt="" />
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
                <div className="weather-rate">{weatherData.windSpeed}</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherApp;
























// import React, { useState, useEffect } from "react";
// import "./WeatherApp.css";
// import search_icon from '../Assests/search.png';
// import clear_icon from '../Assests/clear.png';
// import cloud_icon from '../Assests/cloud.png';
// import drizzle_icon from '../Assests/drizzle.png';
// import rain_icon from '../Assests/rain.png';
// import snow_icon from '../Assests/snow.png';
// import wind_icon from '../Assests/wind.png';
// import humidity_icon from '../Assests/humidity.png';

// function WeatherApp() {
//   const [inputValue, setInputValue] = useState("");
//   const [weatherData, setWeatherData] = useState({
//     humidity: "",
//     windSpeed: "",
//     temperature: "",
//     location: "",
//     icon: cloud_icon,
//   });

//   const api_key = "56b9cf140bcd6586c24359c7216f3ed5";

//   const search = async () => {
//     if (inputValue === "") {
//       return;
//     }

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=Metric&appid=${api_key}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       setWeatherData({
//         humidity: data.main.humidity + ' %',
//         windSpeed: data.wind.speed + ' km/h',
//         temperature: data.main.temp + ' °c',
//         location: data.name,
//         icon: getWeatherIcon(data.weather[0].icon),
//       });
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     }
//   };

//   const getWeatherIcon = (iconCode) => {
//     if (iconCode === "01d" || iconCode === "01n") {
//       return clear_icon;
//     } else if (iconCode === "02d" || iconCode === "02n") {
//       return cloud_icon;
//     } else if (iconCode === "03d" || iconCode === "03n") {
//       return drizzle_icon;
//     } else if (iconCode === "04d" || iconCode === "04n") {
//       return drizzle_icon;
//     } else if (iconCode === "09d" || iconCode === "09n") {
//       return rain_icon;
//     } else if (iconCode === "10d" || iconCode === "10n") {
//       return rain_icon;
//     } else if (iconCode === "13d" || iconCode === "13n") {
//       return snow_icon;
//     } else {
//       return clear_icon;
//     }
//   };
  

//   return (
//     <div className="container">
//       <div className="top-bar">
//         <input
//           type="text"
//           className="cityInput"
//           placeholder="search"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//         <div className="search-icon" onClick={search}>
//           <img src={search_icon} alt="" />
//         </div>
//       </div>
//       <div className="weather-image">
//         <img src={weatherData.icon} alt="" />
//       </div>
//       <div className="weather-temp">{weatherData.temperature}</div>
//       <div className="weather-location">{weatherData.location}</div>
//       <div className="data-container">
//         <div className="element">
//           <img src={humidity_icon} alt="" className="icon" />
//           <div className="data">
//             <div className="humidity-percent">{weatherData.humidity}</div>
//             <div className="text">Humidity</div>
//           </div>
//         </div>
//         <div className="element">
//           <img src={wind_icon} alt="" className="icon" />
//           <div className="data">
//             <div className="weather-rate">{weatherData.windSpeed}</div>
//             <div className="text">Wind Speed</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WeatherApp;













// import React, { useState } from "react";
// import "./WeatherApp.css"
// import search_icon from '../Assests/search.png'
// import clear_icon from '../Assests/clear.png'
// import cloud_icon from '../Assests/cloud.png'
// import drizzle_icon from '../Assests/drizzle.png'
// import rain_icon from '../Assests/rain.png'
// import snow_icon from '../Assests/snow.png'
// import wind_icon from '../Assests/wind.png'
// import humidity_icon from '../Assests/humidity.png'

// function WeatherApp() {

//     const [wicon, setWicon] = useState(cloud_icon);
//     let api_key = "56b9cf140bcd6586c24359c7216f3ed5";

//     const search = async () => {
//         const element = document.getElementsByClassName("cityInput");
//         if (element[0].value==="") {
//             return 0;
//         }
//         let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
//         let response = await fetch(url);
//         let data = await response.json();
//         const humidity = document.getElementsByClassName("humidity-percent")
//         const wind = document.getElementsByClassName("weather-rate")
//         const tempreature = document.getElementsByClassName("weather-temp")
//         const location = document.getElementsByClassName("weather-location")

//         humidity[0].innerHTML  = data.main.humidity+' %';
//         wind[0].innerHTML  = data.wind.speed+ ' km/h';
//         tempreature[0].innerHTML  = data.main.temp+ ' °c';
//         location[0].innerHTML  = data.name;


//         if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
//             setWicon(clear_icon)
//         } else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n") {
//             setWicon(cloud_icon)
//         } else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n") {
//             setWicon(drizzle_icon)
//         }else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n") {
//             setWicon(drizzle_icon)
//         } else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n") {
//             setWicon(rain_icon)
//         } else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n") {
//             setWicon(rain_icon)
//         } else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n") {
//             setWicon(snow_icon)
//         } else {
//             setWicon(clear_icon)
//         }
    
//     }






//   return <div className="container">
//     <div className="top-bar">
//         <input type="text" className="cityInput" placeholder="search"/>
//         <div className="search-icon" onClick={()=>{search()}}>
//             <img src={search_icon} alt="" />
//         </div>
//     </div>
//     <div className="weather-image">
//         <img src={wicon} alt="" />
//     </div>
//     <div className="weather-temp">24°c</div>
//     <div className="weather-location">London</div>
//     <div className="data-container">
//         <div className="element">
//             <img src={humidity_icon} alt="" className="icon" />
//             <div className="data">
//                 <div className="humidity-percent">64%</div>
//                 <div className="text">Humidity</div>
//             </div>
//         </div>
//         <div className="element">
//             <img src={wind_icon} alt="" className="icon" />
//             <div className="data">
//                 <div className="weather-rate">18 km/h</div>
//                 <div className="text">Wind Speed</div>
//             </div>
//         </div>
//     </div>
//     </div>;
// }

// export default WeatherApp;
