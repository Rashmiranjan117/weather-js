import React, { useState, useEffect } from "react";
import CurrentLocation from "../Components/CurrentLocation";
import RenderCurrent from "../Components/RenderCurrent";
import {
  getCurrentLocation,
  getData as getDayData,
  WeatherData,
} from "../Hooks/getCurrentLocation";

import { getData as getWeekData, DayData, WeekData2 } from "../Hooks/getWeekly";
import {
  getQueryData,
  QuerryDataInterface,
  getQueryWeeklyData,
} from "../Hooks/getQueryData";
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

  const [queryData, setQueryData] = useState<QuerryDataInterface | null>(null);
  const [queryWeekly, setQueryWeekly] = useState<any>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const [weekly, setWeekly] = useState<WeekData2 | null>(null);
  const [date, setDate] = useState<string[]>([]);
  const [queryName, setQueryName] = useState<string | undefined>("");
  const [flag, setFlag] = useState<boolean>(true);

  const handleQuerry = () => {
    if (query.length === 0) {
      return alert("Innvalid Search Query!");
    }
    setFlag(false);
    getQueryData(query)
      .then((res) => {
        setQueryData(res);
        // console.log(res);
        setQueryName(res.name);
        getQueryWeeklyData(res.coord.lat, res.coord.lon)
          .then((res) => {
            setQueryWeekly(res);
          })
          .catch((err) => {
            console.warn(err);
          });
        setQuery("");
      })
      .catch((err) => {
        console.warn("Err ffrom qquery", err);
        alert(`Error in Fetching Data : ${err}`);
      });
  };

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

  const handleReset = () => {
    setFlag(true);
    setQueryData(null);
    setQueryWeekly(null);
  };

  useEffect(() => {
    handleCurrent();
  }, [queryData]);
  // console.log(weekly,);
  if (data === null) {
    return <h1>Loading...</h1>;
  }
  console.log("Data-querry", queryData, queryData?.name);

  return (
    <>
      <div className="inputs">
        <input
          type="search"
          placeholder="Enter a city name"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button onClick={handleQuerry} className="btn">
          Search
        </button>
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>
      <div className="home">
        <div className="details">
          <div className="main_details">
            <h4>
              {/* {data?.name}, {data?.sys?.country} */}
              {queryData ? (
                <>
                  {queryData?.name}, {queryData?.sys?.country}
                </>
              ) : (
                <>
                  {data?.name}, {data?.sys?.country}
                </>
              )}
            </h4>
            <h3>
              {/* {data?.main.temp} {degree + "C"} */}
              {queryData ? (
                <>
                  {queryData?.main.temp} {degree + "C"}
                </>
              ) : (
                <>
                  {data?.main.temp} {degree + "C"}
                </>
              )}
            </h3>

            {queryData ? (
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${queryData?.weather[0].icon}@2x.png`}
                  alt="weather_icon"
                  loading="lazy"
                />
              </>
            ) : (
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                  alt="weather_icon"
                  loading="lazy"
                />
              </>
            )}
            <p>
              {queryData ? (
                <>{queryData?.weather[0]?.description?.toLocaleLowerCase()}</>
              ) : (
                <>{data?.weather[0]?.description.toLocaleUpperCase()}</>
              )}
            </p>
          </div>
          <div className="small_details">
            <div className="card">
              <p className="content">
                {queryData ? (
                  <>
                    {queryData?.main?.feels_like} {degree + "C"}
                  </>
                ) : (
                  <>
                    {data?.main?.feels_like} {degree + "C"}
                  </>
                )}
              </p>
              <p className="content_name">Feels Like</p>
            </div>
            <div className="card">
              <p className="content">
                {queryData ? (
                  <>{queryData?.main?.humidity}%</>
                ) : (
                  <>{data?.main?.humidity}%</>
                )}
              </p>
              <p className="content_name">Humidity</p>
            </div>
            <div className="card">
              <p className="content">
                {queryData ? (
                  <>{queryData?.wind?.speed} Km/hr</>
                ) : (
                  <>{data?.wind?.speed} Km/hr</>
                )}
              </p>
              <p className="content_name">W speed</p>
            </div>
            <div className="card">
              <p className="content">
                {queryData ? (
                  <>{queryData?.main?.pressure}hPa</>
                ) : (
                  <>{data?.main?.pressure}hPa</>
                )}
              </p>
              <p className="content_name">Pressure</p>
            </div>
          </div>
        </div>
        <div className="map">
          {queryName && queryData?.name ? (
            <RenderCurrent name={queryName} />
          ) : (
            <RenderCurrent name={data?.name} />
          )}
        </div>
      </div>
      <div className="week">
        {queryData ? (
          <>
            {queryWeekly &&
              queryWeekly?.daily?.map((el: any, i: number) => {
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Home;
