import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import React from "react";
import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL, FORECAST_API_URL } from "./api";
import { render } from "@testing-library/react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [lati, setLati] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [currentActive, setCurrentActive] = useState(false);

  const getLocation = () => {
    //find current lat and long
    setCurrentActive(true);
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
      //fetching weather api after finding geolocation 
      fetch(
        `${WEATHER_API_URL}lat=${lati}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
      ).then(async (response) => {
        const currentResponse = await response.json(); //
        setCurrentPosition({ city: currentResponse.name, ...currentResponse });
        //  console.log(currentPosition);   //it fetches from the api correctly the weather at my location
        console.log(currentPosition);
      });
    }
  };

  const handleOnSearchChange = (searchData) => {
    setCurrentActive(false);
    //a function to console log the results which we call on <Search />
    console.log(searchData); //we get the following every time we search for a new city  {value: '51.507222222 -0.1275', label: 'London,GB'}
    const [lat, lon] = searchData.value.split(" ");   //we need the lat and lon from searchData

    const currentWeatherFetch = fetch(  //fetching the weather of the city we searched using the lat and lon of the specific city
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

  if(currentActive){
    console.log("test1");
    return(
      <div className="App">
      <Search onSearchChange={handleOnSearchChange} />
        {/* {currentPosition ? (<div>Loading</div>): ( <CurrentWeather data={currentPosition} />)} */}
      {currentPosition && <CurrentWeather data={currentPosition} />}{" "}
      {/* //that means if the current weather is not null show <CurrentWeather /> otherwise dont show anything  */}
      <button
        onClick={() => {
          getLocation();
        }}
      >
        Get Location
      </button>
      {/* <Forecast data={forecast}    /> */}
    </div>
    )
  } else {
    console.log("test2");
    return (
      <div className="App">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {/* //that means if the current weather is not null show <CurrentWeather /> otherwise dont show anything  */}
      {/* To show current weather <CurrentWeather data={currentPosition} */}
      <button
        onClick={() => {
          getLocation();
        }}
      >
        Get Location
      </button>

      {/* <Forecast data={forecast}    /> */}
    </div>
    )
  }

}


export default App;
