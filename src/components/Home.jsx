import { useState } from "react";
import { useSelector } from "react-redux";
import Search from "./Search";
import Weather from "./Weather";
import { selectCurrentUser } from "../features";
import { WEATHER_API_KEY,WEATHER_API_URL } from "../utils";
 function Home() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const currentUser = useSelector(selectCurrentUser);

  const handleOnSearchChange = (searchCity) => {
    const [lat, lon] = searchCity.value.split(" ");

    const fetchCurrentWeather = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
   

    Promise.all([fetchCurrentWeather])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
      

        setCurrentWeather({ city: searchCity.label, ...weatherResponse });
      
      })
      .catch(console.log);
  };
  return (
    <div className="container">
      <div className="bg-cyan-700 py-8 my-8 rounded-xl text-center">
      <p className="text-2xl mb-4 font-semibold text-white ">Hello {currentUser?.name} !</p>
      <p className="text-2xl mt-4 text-white font-bold ">Welcome to WeatherAPP</p>
      </div>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <Weather data={currentWeather} />}
    </div>
  );
}

export default Home;