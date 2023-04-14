import axios from "axios";

const api = "780394a78657001a17b66be2b1695f61";

import { WeekData2 } from "../Hooks/getWeekly";

export interface QuerryDataInterface {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibilty: number;
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

export const getQueryData = async (
  query: string
): Promise<QuerryDataInterface> => {
  let res = await axios.get<QuerryDataInterface>(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api}&units=metric`
  );
  return res.data;
};

export const getQueryWeeklyData = async (
  lat: number,
  lon: number
): Promise<WeekData2> => {
  let res = await axios.get<WeekData2>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}&units=metric`
  );
  return res.data;
};
