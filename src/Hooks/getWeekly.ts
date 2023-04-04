import axios from "axios";

const api = "780394a78657001a17b66be2b1695f61";

export interface DayData {
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
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    eve: number;
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

export interface WeekData2 {
  current: {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    weather: {
      id: number;
      description: string;
      icon: string;
      main: string;
    }[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
  };
  daily: DayData[];
  hourly: any[];
  lat: number;
  lon: number;
  minutely: any[];
  timezome: string;
  timezome_offset: number;
}

const getData = async (lat: number, lon: number): Promise<WeekData2> => {
  let res = await axios.get<WeekData2>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}&units=metric`
  );
  return res.data;
};

export { getData };
