import axios from "axios";

const api = "780394a78657001a17b66be2b1695f61";

export interface WeatherData {
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
    humidity: number;
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

const getCurrentLocation = async (): Promise<{ lat: number; lon: number }> => {
  return new Promise((res, rej) => {
    const success = (postion: GeolocationPosition) => {
      const lat = postion.coords.latitude;
      const lon = postion.coords.longitude;
      res({ lat, lon });
    };

    const error = (err: GeolocationPositionError) => {
      console.warn(`Error (${err.code}):(${err.message})`);
      rej(err);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  });
};

export { getCurrentLocation, getData };
