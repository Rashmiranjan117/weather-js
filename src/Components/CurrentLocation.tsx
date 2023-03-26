import React, { useState, useEffect } from "react";
import axios from "axios";

const api = "780394a78657001a17b66be2b1695f61";

interface WeatherData {
  base: string;
  clouds: {
    all: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timeZone: number;
  visibility: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

const getData = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await axios.get<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`
  );
  return response.data;
};

const CurrentLocation: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);


  useEffect(() => {
    const success = async (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const data = await getData(lat, lon);
      setWeatherData(data);
    };
    const error = (err: GeolocationPositionError) => {
      console.warn(`ERROR (${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  }, []);
  console.log(weatherData);

  if (weatherData === null) {
    return <h1>Loading...</h1>;
  }
  return <div></div>;
};

export default CurrentLocation;
