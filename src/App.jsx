import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search/Search";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Favorites from "./components/Favorites/Favorites";
import SearchHistoryPage from "./pages/SearchHistoryPage/SearchHistoryPage";
import useFetchWeather from "./helpers/hooks/useFetchWeather";
import { addToHistory, getHistory } from "./helpers/history";
import { getFavorites, addFavorite, removeFavorite } from "./helpers/favorites";
import Header from "./components/Header/Header";

function App() {
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
    if (!weatherData?.name) return;

    const isFav = favorites.some(
      (fav) => fav.toLowerCase() === weatherData.name.toLowerCase()
    );

    weatherData.isFavorite = isFav;
  }, [weatherData, favorites]);

  useEffect(() => {
    if (weatherData && isUseSearch) addToHistory(weatherData);
    if (!weatherData && !isUseSearch) setCity("Moscow");
    if (!weatherData && getHistory().length) {
      setCity(getHistory()[0].name);
    }
  }, [weatherData]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Search onSearch={handleSearch} />
              {isLoading && <p>Загрузка...</p>}
              {error && <p>{error.message}</p>}
              {weatherData && (
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
    </Router>
  );
}

export default App;
