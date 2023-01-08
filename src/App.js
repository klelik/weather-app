import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import React, { useEffect } from "react";
import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL, FORECAST_API_URL } from "./api";
import { ImLocation } from "react-icons/im";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState(null);

  const getCoords = async (searchData) => {
    setLatitude(null);
    setLongitude(null);
    setCity(null);
    if (searchData) {
      // console.log(searchData);
      setLatitude(searchData.searchData.latitude);
      setLongitude(searchData.searchData.longitude);
      setCity(searchData.searchData.label);
    } else {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      const currentWeatherFetch = fetch(
        //fetching the weather of the city we searched using the lat and lon of the specific city
        `${WEATHER_API_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${FORECAST_API_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
      );

      Promise.all([currentWeatherFetch, forecastFetch]) //order is important, we first fetch current weather
        .then(async (response) => {
          const weatherResponse = await response[0].json(); //
          const forecastResponse = await response[1].json();
          setCurrentWeather({ city, ...weatherResponse });
          setForecast({ city, ...forecastResponse });
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude]);

  console.log(currentWeather);

  const handleOnSearchChange = (searchData) => {
    getCoords({ searchData });
  };

  // if (currentActive) {
  return (
    <div className="App">
      <Search onSearchChange={handleOnSearchChange} />
      <div className="flex justify-between items-center">
        {currentWeather && <CurrentWeather data={currentWeather} />}

        {/* //that means if the current weather is not null show <CurrentWeather /> otherwise dont show anything  */}
        {/* {JSON.stringify(forecast, null, 2)} */}
        {forecast && <Forecast data={forecast} />}
      </div>

      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => {
          getCoords();
        }}
      >
        <ImLocation />
      </button>
      {/* <Forecast data={forecast}    /> */}

      {/* <Forecast data={forecast}    /> */}
    </div>
  );
  // }
  // else {
  //   return (
  //     <div className="App">
  //       <Search onSearchChange={handleOnSearchChange} />
  //       <div className="flex justify-between items-center">
  //         {currentWeather && <CurrentWeather data={currentWeather} />}
  //         {/* //that means if the current weather is not null show <CurrentWeather /> otherwise dont show anything  */}
  //         {/* To show current weather <CurrentWeather data={currentPosition} */}
  //         {/* <Forecast data={forecast} /> */}
  //       </div>
  //       <button
  //         className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
  //         onClick={() => {
  //           getCoords();
  //         }}
  //       >
  //         <ImLocation />
  //       </button>
  //       {/* <ForecastTest data={forecast} /> */}

  //       <Forecast data={forecast} />
  //     </div>
  //   );
  // }
}

export default App;
