import { useState, useEffect, useRef } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import Favorites from "../../components/Favorites/Favorites";
import useFetchWeather from "../../helpers/hooks/useFetchWeather";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../helpers/favorites";
import { addToHistory } from "../../helpers/history";
import { useWeather } from "../../context/WeatherContext";
import Skeleton from "../../components/Skeleton/Skeleton";
import WeatherState from "../../components/WeatherState/WeatherState";

export default function HomePage() {
  const { city, setCity } = useWeather();
  const [favorites, setFavorites] = useState([]);
  const userSearchRef = useRef(false);

  const { weatherData, isLoading, error } = useFetchWeather({ city });

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    if (weatherData && userSearchRef.current && city !== "Moscow") {
      addToHistory(weatherData);
      userSearchRef.current = false;
    }
  }, [weatherData]);

  const handleSearch = (newCity) => {
    if (!newCity.trim()) return;
    userSearchRef.current = true;
    setCity(newCity.trim());
  };

  const handleFavorite = (city) => setFavorites(addFavorite(city));
  const handleRemoveFavorite = (city) => setFavorites(removeFavorite(city));

  return (
    <>
      <SearchForm onSearch={handleSearch} />

      <WeatherState
        weatherData={weatherData}
        isLoading={isLoading}
        error={error}
        onFavorite={handleFavorite}
        onRemoveFavorite={handleRemoveFavorite}
      />

      {favorites.length > 0 && (
        <Favorites
          favorites={favorites}
          onSelect={(city) => {
            setCity(city);
            userSearchRef.current = true;
          }}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </>
  );
}
