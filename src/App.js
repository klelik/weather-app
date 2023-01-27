import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  WEATHER_API_KEY,
  WEATHER_API_URL,
  FORECAST_API_URL,
  PHOTO_API_URL_1,
  PHOTO_API_URL_2,
} from "./api";
import { FaLocationArrow, FaSearch } from "react-icons/fa";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState(null);
  const [location, setLocation] = useState(false);
  const [photo, setPhoto] = useState(
    "https://images.unsplash.com/photo-1514454529242-9e4677563e7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
  );
  let randomPhotoNum = Math.floor(Math.random() * 10);

  const getCoords = async (searchData) => {
    setLocation(true);
    setLatitude(null);
    setLongitude(null);
    setCity(null);

    if (searchData) {
      setLatitude(searchData.searchData.latitude);
      setLongitude(searchData.searchData.longitude);
      setCity(searchData.searchData.label);
      console.log(searchData);
    } else {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
      console.log(location);
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
      const photoFetch = fetch(
        `https://api.unsplash.com/search/photos/?query=${city}city&client_id=mX9CmMTe-SWpYa0HqipNsGBnjiatV2xtSVzHNJ10oDs` //fetching unsplash api
      );

      Promise.all([currentWeatherFetch, forecastFetch, photoFetch]) //order is important, we first fetch current weather
        .then(async (response) => {
          const weatherResponse = await response[0].json(); //
          const forecastResponse = await response[1].json();
          const photoResponse = await response[2].json();
          setCurrentWeather({ city, ...weatherResponse });
          setForecast({ city, ...forecastResponse });
          // setPhoto(photoResponse.results[0].urls.full);
          setPhoto(photoResponse.results[randomPhotoNum].urls.full); //setting photo url from api call
          // console.log("photoResponse : "+photoResponse);
        })
        .catch((err) => console.log(err));
    }
  }, [latitude]);

  console.log("city : " + city);
  console.log(photo);
  document.body.style.backgroundImage = `url(${photo})`; //setting backround image

  // console.log(currentWeather);
  const handleOnSearchChange = (searchData) => {
    getCoords({ searchData });
    // console.log(searchData);
  };

  // if (currentActive) {
  return (
    <div className="App">
      {!currentWeather && (
        <label className="inline-flex mt-[16rem] mb-[2.5rem] text-[1.3rem] sm:text-[1.5rem] md:text-[2rem] font-semibold	 text-[white]">
          Tap <FaLocationArrow className="ml-2 mr-2 mt-2" /> or{" "}
          <FaSearch className="ml-2 mr-2 mt-2" /> for Weather and Forecast{" "}
        </label>
      )}

      <div className="flex justify-between items-center justify-center flex-col">
        <div className="flex justify-between gap-1 items-center w-[54%] sm:w-[40%] md:w-[30%]">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 py-[11px] px-4 rounded shadow "
            onClick={() => {
              getCoords(); 
            }}
          >
            <FaLocationArrow />
          </button>
          <Search onSearchChange={handleOnSearchChange} />
        </div>

        {currentWeather && <CurrentWeather data={currentWeather} />}

        {/* //that means if the current weather is not null show <CurrentWeather /> otherwise dont show anything  */}
        {/* {JSON.stringify(forecast, null, 2)} */}
        {forecast && (
          <label className=" mt-[3rem] mb-[3rem] text-[2rem] text-[white]">
            {" "}
            Daily Forecast{" "}
          </label>
        )}
        {forecast && <Forecast data={forecast} />}
      </div>

      {/* <Forecast data={forecast}    /> */}

      {/* <Forecast data={forecast}    /> */}
      <p className=" text-white pt-1 pb-1 text-[10px] ml-14">
        Made With 💙 by Klement
      </p>
    </div>
  );
}

export default App;
