import { useState } from "react";
import Search from "./components/Search/Search";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import useFetchWeather from "./helpers/hooks/useFetchWeather";

function App() {
  const [city, setCity] = useState("");

  const { weatherData, isLoading, error } = useFetchWeather({ city });

  const handleSearch = (newCity) => {
    setCity(newCity);
  };
  return (
    <>
      <h1>Погода</h1>
      <Search onSearch={handleSearch} />
      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error.message}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </>
  );
}

export default App;
