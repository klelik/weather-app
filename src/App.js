import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import React from "react";
import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL, FORECAST_API_URL } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [lati, setLati] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("ok");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLati(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  // console.log(lati)
  // console.log(lng)

  const fetchCurrent = () => {
    fetch(
      `${WEATHER_API_URL}lat=${lati}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
    ).then(async (response) => {
      const currentResponse = await response.json(); //
      setCurrentPosition({ city: currentResponse.name, ...currentResponse });
      //  console.log(currentPosition);   //it fetches from the api correctly the weather at my location
    });
  };

  const handleOnSearchChange = (searchData) => {
    //a function to console log the results which we call on <Search />
    console.log(searchData); //we get the following every time we search for a new city  {value: '51.507222222 -0.1275', label: 'London,GB'}
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${FORECAST_API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch]) //order is important, we first fetch current weather
      .then(async (response) => {
        const weatherResponse = await response[0].json(); //
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log.log(err));
  };
  console.log(currentWeather);
  return (
    <div className="App ">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}{" "}
      {/* //that means if the current weather is not null show <CurrentWeather /> otherwise dont show anything  */}
      {/* To show current weather <CurrentWeather data={currentWeather} */}
      <button
        onClick={() => {
          getLocation();
          fetchCurrent();
        }}
      >
        Get Location
      </button>
      {/* <Forecast data={forecast}    /> */}
    </div>
  );
}

export default App;
