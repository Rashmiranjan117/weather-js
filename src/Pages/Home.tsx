import React, { useState, useEffect } from "react";
import CurrentLocation from "../Components/CurrentLocation";
import RenderCurrent from "../Components/RenderCurrent";
import {
  getCurrentLocation,
  getData,
  WeatherData,
} from "../Hooks/getCurrentLocation";
import "./sass/styles.css";

import { BsSunrise } from "react-icons/bs";

const degree = "°";

interface Location {
  lat: number | null;
  lon: number | null;
}

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [defaultCoords, setDefaultCoords] = useState<Location>({
    lat: null,
    lon: null,
  });

  const [data, setData] = useState<WeatherData | null>(null);

  const handleCurrent = () => {
    getCurrentLocation()
      .then((res) => {
        setDefaultCoords({ ...defaultCoords, lat: res.lat, lon: res.lon });
        getData(res.lat, res.lon).then((res) => {
          setData(res);
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    handleCurrent();
  }, []);
  console.log(data);
  if (data === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="inputs">
        <input type="search" placeholder="Enter a city name" />
      </div>
      <div className="home">
        <div className="details">
          <div className="main_details">
            <h4>
              {data?.name}, {data?.sys?.country}
            </h4>
            <h3>
              {data?.main.temp} {degree + "C"}
            </h3>
            <img
              src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
              alt="weather_icon"
            />
            <p>{data?.weather[0]?.description.toLocaleUpperCase()}</p>
          </div>
          <div className="small_details">
            <div className="card">
              <p className="content">
                {data?.main?.feels_like} {degree + "C"}
              </p>
              <p className="content_name">Feels Like</p>
            </div>
            <div className="card">
              <p className="content">{data?.main?.humidity}%</p>
              <p className="content_name">Humidity</p>
            </div>
            <div className="card">
              <p className="content">{data?.wind?.speed} Km/hr</p>
              <p className="content_name">W speed</p>
            </div>
            <div className="card">
              <p className="content">{data?.main?.pressure}hPa</p>
              <p className="content_name">Pressure</p>
            </div>
          </div>
        </div>
        <div className="map">
          <RenderCurrent name={data?.name} />
        </div>
      </div>
      <div className="week"></div>
    </>
  );
};

export default Home;
