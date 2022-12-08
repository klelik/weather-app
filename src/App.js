import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import React from "react";
import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL, FORECAST_API_URL } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

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
  console.log(forecast);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {});
  });

  return (
    <div className="App ">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data = {currentWeather} /> } 
    </div>//that means if the current weather is not null show <CurrentWeather /> otherwise dont show anything 
  );
}

export default App;
