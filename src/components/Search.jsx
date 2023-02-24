import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL ,geoApiOptions } from "../utils";

const Search = ({ onSearchChange }) => {
  const [searchWeather, setSearchWeather] = useState(null);

  const loadCities = async (inputValue) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const response_1 = await response.json();
    return {
      options: response_1.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const handleOnChange = (searchData) => {
    setSearchWeather(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={searchWeather}
      onChange={handleOnChange}
      loadOptions={loadCities}
    />
  );
};

export default Search;