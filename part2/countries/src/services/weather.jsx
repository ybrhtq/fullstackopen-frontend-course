import axios from "axios";

const baseUrl = "http://api.openweathermap.org/data/2.5/weather/?units=metric";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = ([lat, lng]) => {
  const url = `${baseUrl}&lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`;
  console.log("run api call", url);
  return axios.get(url).then((response) => response.data);
};

export default { getWeather };
