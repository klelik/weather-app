import "./App.css";
import Search from "./components/search/search";
import currentWeather from "./components/current-weather/current-weather";
import React from "react";

function App() {
  const handleOnSearchChange = (searchData) => {
    //a function to console log the results which we call on <Search />
    console.log(searchData); //fff
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("My position : " + position);
    });
  });

  return (
    <div className="App bg-black">
      <Search onSearchChange={handleOnSearchChange} />
      <currentWeather />
    </div>
  );
}

export default App;
