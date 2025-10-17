import { useState, useEffect } from "react";
import useFetchWeather from "../../helpers/hooks/useFetchWeather";
import { addToHistory } from "../../helpers/history";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../helpers/favorites";

function useWeatherPage() {
  const [city, setCity] = useState("");
  const [isUseSearch, setIsUseSearch] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { weatherData, isLoading, error } = useFetchWeather({ city });

  const handleSearch = (newCity) => {
    if (!newCity.trim()) return;
    setCity(newCity.trim());
    setIsUseSearch(true);
  };

  const handleFavorite = (city) => setFavorites(addFavorite(city));
  const handleRemoveFavorite = (city) => setFavorites(removeFavorite(city));

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    if (weatherData && isUseSearch) addToHistory(weatherData);
    if (!weatherData && !isUseSearch) setCity("Moscow");
  }, [weatherData, isUseSearch]);

  return {
    city,
    weatherData,
    isLoading,
    error,
    favorites,
    handleSearch,
    handleFavorite,
    handleRemoveFavorite,
    setCity,
  };
}

export default useWeatherPage;
