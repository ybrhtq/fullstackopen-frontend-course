import weatherService from "../services/weather";
import { useState, useEffect } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getWeather(country.capitalInfo.latlng).then((response) => {
      setWeather(response);
      console.log(response);
    });
  }, [country.capitalInfo]);

  if (weather == null) {
    return;
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <ul className="row-list">
        <li>capital {country.capital[0]}</li>
        <li>area {country.area}</li>
      </ul>
      <h3>languages</h3>
      <ul>
        {Object.entries(country.languages).map(([abbr, lang]) => (
          <li key={abbr}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      <li>temperature {weather.main.temp} Celsius</li>
      <li>
        <img
          src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
      </li>
      <li>wind {weather.wind.speed} m/s</li>
    </div>
  );
};

export default Country;
