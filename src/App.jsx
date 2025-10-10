import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search/Search";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Favorites from "./components/Favorites/Favorites";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import useFetchWeather from "./helpers/hooks/useFetchWeather";
import { addToHistory } from "./helpers/history";
import { getFavorites, addFavorite, removeFavorite } from "./helpers/favorites";
import Header from "./components/Header/Header";

function App() {
  const [city, setCity] = useState("");
  const [favorites, setFavorites] = useState([]);

  const { weatherData, isLoading, error } = useFetchWeather({ city });

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    if (weatherData) addToHistory(weatherData);
  }, [weatherData]);

  const handleSearch = (newCity) => {
    if (!newCity.trim()) return;
    setCity(newCity.trim());
  };

  const handleFavorite = (city) => {
    const updated = addFavorite(city);
    setFavorites(updated);
  };

  const handleRemoveFavorite = (city) => {
    const updated = removeFavorite(city);
    setFavorites(updated);
  };

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
                <WeatherCard data={weatherData} onFavorite={handleFavorite} />
              )}
              {favorites.length > 0 && (
                <Favorites
                  favorites={favorites}
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
