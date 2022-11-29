import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    //here we fetch info from the API
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=500000&namePrefix=${inputValue}`, //${inputValue} is added at the end of the url triggering the correct search every time we type
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            //map to the cities that start with the letters we type
            return {
              value: `${city.latitude} ${city.longitude}`, //from these cities, get the latitude and longitude
              label: `${city.name}, ${city.countryCode}`, //label: city name and the country code
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData); //setSearch is set to new value every time we click
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange} // when we select our city =>  onChange()
      loadOptions={loadOptions} //shows suggestions of cities while we type
    />
  );
};

export default Search;
