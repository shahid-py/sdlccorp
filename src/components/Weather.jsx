import React from "react";


const Weather = ({ data }) => {
  return (
    <div className="text-white w-fit bg-cyan-700 shadow-xl border b-2  mt-5 mb-0 mx-auto pt-0 pb-5 px-5 rounded-md">
      <div className="flex justify-between mt-4 items-center">
        <div>
          <p className="font-semibold text-lg leading-none tracking-[1px] m-0">{data.city}</p>
          <p className="font-normal text-sm leading-none m-0">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="w-[100px];"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="flex mb-4 justify-between items-center;">
        <p className="font-semibold text-[70px] w-auto tracking-[-5px] mx-0 my-2.5">{Math.round(data.main.temp)}°C</p>
        <div className="w-full pl-5">
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">Details</span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">Feels like</span>
            <span className="text-right font-semibold text-xs">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">Wind</span>
            <span className="text-right font-semibold text-xs">{data.wind.speed} m/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">Humidity</span>
            <span className="text-right font-semibold text-xs">{data.main.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">Pressure</span>
            <span className="text-right font-semibold text-xs">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;