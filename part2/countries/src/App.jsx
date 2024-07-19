import { useState, useEffect } from "react";

import Country from "./components/Country";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import countriesService from "./services/countries";

const App = () => {
  const [countryFilter, setCountryFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [curCountryInfo, setCurCountryInfo] = useState(null);
  const [pendingCountryName, setPendingCountryName] = useState(null);
  const [notificationText, setNotificationText] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value);
    setCurCountryInfo(null);
    setPendingCountryName(null);
  };

  const displayNotification = (message, type) => {
    setNotificationText(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationText(null);
      setNotificationType(null);
    }, 5000);
  };

  useEffect(() => {
    countriesService.getAll().then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    const countriesToShow = countries.filter((country) =>
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    );
    if (countriesToShow.length !== 1 && pendingCountryName === null) {
      setCurCountryInfo(null);
      return;
    }
    console.log(countriesToShow, pendingCountryName);
    const countryName =
      countriesToShow.length === 1
        ? countriesToShow[0].name.common
        : pendingCountryName;
    countriesService
      .getByName(countryName)
      .then((countryInfo) => {
        console.log("countryInfo", countryInfo);
        setCurCountryInfo(countryInfo);
      })
      .catch((error) => {
        console.log(error);
        displayNotification(
          `Unknown error while fetching country ${countryName}`,
          "error"
        );
      });
  }, [countryFilter, pendingCountryName, countries]);

  if (curCountryInfo !== null) {
    return (
      <div>
        <Notification message={notificationText} type={notificationType} />
        <Filter
          filterValue={countryFilter}
          handleValueChange={handleCountryFilterChange}
        />
        <Country country={curCountryInfo} />
      </div>
    );
  }

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  if (countriesToShow.length === 0) {
    return (
      <div>
        <Notification message={notificationText} type={notificationType} />
        <Filter
          filterValue={countryFilter}
          handleValueChange={handleCountryFilterChange}
        />
        No countries found
      </div>
    );
  } else if (countriesToShow.length <= 10) {
    return (
      <div>
        <Notification message={notificationText} type={notificationType} />
        <Filter
          filterValue={countryFilter}
          handleValueChange={handleCountryFilterChange}
        />
        {countriesToShow.map((country) => (
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button
              onClick={() => {
                setPendingCountryName(country.name.common);
              }}
            >
              show
            </button>
          </li>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <Notification message={notificationText} type={notificationType} />
        <Filter
          filterValue={countryFilter}
          handleValueChange={handleCountryFilterChange}
        />
        Too many matches, specify another filter
      </div>
    );
  }
};

export default App;
