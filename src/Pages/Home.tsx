import React, { useState, useEffect } from "react";
import CurrentLocation from "../Components/CurrentLocation";
import RenderCurrent from "../Components/RenderCurrent";
import {
  getCurrentLocation,
  getData as getDayData,
  WeatherData,
} from "../Hooks/getCurrentLocation";

import { getData as getWeekData, DayData, WeekData2 } from "../Hooks/getWeekly";
import "./sass/styles.css";

import { BsSunrise } from "react-icons/bs";

const degree = "°";

interface Location {
  lat: number | null;
  lon: number | null;
}

interface DailyData {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: {
    day: number;
    eve: number;
    morn: number;
    night: number;
  };
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  uvi: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [defaultCoords, setDefaultCoords] = useState<Location>({
    lat: null,
    lon: null,
  });

  const [data, setData] = useState<WeatherData | null>(null);
  const [weekly, setWeekly] = useState<WeekData2 | null>(null);
  const [date, setDate] = useState<string[]>([]);

  const handleCurrent = () => {
    getCurrentLocation()
      .then((res) => {
        setDefaultCoords({ ...defaultCoords, lat: res.lat, lon: res.lon });
        getDayData(res.lat, res.lon).then((res) => {
          setData(res);
        });
        handleWeekly(res.lat, res.lon);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  const handleWeekly = (lat: number, lon: number) => {
    getWeekData(lat, lon)
      .then((res) => {
        setWeekly(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    handleCurrent();
  }, []);
  console.log(weekly);
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
              loading="lazy"
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
      <div className="week">
        {weekly &&
          weekly?.daily?.map((el, i) => {
            return (
              <div key={i} className="week-card">
                <p>Date : {new Date(el?.dt * 1000).toLocaleDateString()}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${el?.weather[0]?.icon}@2x.png`}
                  alt="weather_icon"
                  loading="lazy"
                />
                <p>Max : {el?.temp?.max}</p>
                <p>Min : {el?.temp?.min}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
