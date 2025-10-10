import { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import useFetchWeather from "./helpers/hooks/useFetchWeather";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const [city, setCity] = useState("");
  const [history, setHistory] = useState({});
  const [favorites, setFavorites] = useState([]);

  const { weatherData, isLoading, error } = useFetchWeather({ city });

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || {};
    setHistory(savedHistory);
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    if (weatherData) {
      const saved = JSON.parse(localStorage.getItem("history")) || {};
      const dataWithDate = {
        ...weatherData,
        searchedAt: new Date().toISOString(),
      };
      saved[weatherData.name] = dataWithDate;
      localStorage.setItem("history", JSON.stringify(saved));
      setHistory(saved);
    }
  }, [weatherData]);

  const handleSearch = (newCity) => {
    if (!newCity.trim()) return;
    setCity(newCity.trim());
  };

  const handleFavorite = (city) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!savedFavorites.includes(city)) {
      const updated = [...savedFavorites, city];
      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated);
    }
  };

  const handleRemoveFavorite = (city) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = [...savedFavorites.filter((c) => c !== city)];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Главная</Link> | <Link to="/history">Истоия поиска</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Погода</h1>
              <Search onSearch={handleSearch} />
              {isLoading && <p>Загрузка...</p>}
              {error && <p>Ошибка: {error.message}</p>}
              {weatherData && (
                <WeatherCard data={weatherData} onFavorite={handleFavorite} />
              )}
              <FavoritesPage
                favorites={favorites}
                onRemoveFavorite={handleRemoveFavorite}
              />
            </>
          }
        />
        <Route
          path="/history"
          element={<SearchHistoryPage history={history} onSelect={setCity} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
