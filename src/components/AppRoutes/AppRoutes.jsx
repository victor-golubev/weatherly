import Search from "../Search/Search";
import WeatherCard from "../WeatherCard/WeatherCard";
import Favorites from "../Favorites/Favorites";
import SearchHistoryPage from "../../pages/SearchHistoryPage/SearchHistoryPage";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import useFetchWeather from "../../helpers/hooks/useFetchWeather";
import { addToHistory, getHistory } from "../../helpers/history";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../helpers/favorites";
import Header from "../Header/Header";

function AppRoutes() {
  const [city, setCity] = useState("");
  const [isUseSearch, setIsUseSearch] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { weatherData, isLoading, error } = useFetchWeather({ city });

  const handleSearch = (newCity) => {
    if (!newCity.trim()) return;
    setCity(newCity.trim());
    setIsUseSearch(true);
  };

  const handleFavorite = (city) => {
    const updated = addFavorite(city);
    setFavorites(updated);
  };

  const handleRemoveFavorite = (city) => {
    const updated = removeFavorite(city);
    setFavorites(updated);
  };

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    if (weatherData && isUseSearch) addToHistory(weatherData);
    if (!weatherData && !isUseSearch) setCity("Moscow");
    if (!weatherData && getHistory().length) {
      setCity(getHistory()[0].name);
    }
  }, [weatherData]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Search onSearch={handleSearch} />
            {isLoading && (
              <div className="loading">
                <p>Загрузка...</p>
              </div>
            )}
            {error && <p>{error.message}</p>}
            {weatherData && !isLoading && (
              <WeatherCard
                data={weatherData}
                onFavorite={handleFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            )}
            {favorites.length > 0 && (
              <Favorites
                favorites={favorites}
                onSelect={setCity}
                onRemoveFavorite={handleRemoveFavorite}
              />
            )}
          </>
        }
      />
      <Route
        path="/history"
        element={<SearchHistoryPage onSelect={setCity} />}
      />
    </Routes>
  );
}

export default AppRoutes;
