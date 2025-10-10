import { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import useFetchWeather from "./helpers/hooks/useFetchWeather";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchHistoryPage from "./pages/SearchHistoryPage";

function App() {
  const [city, setCity] = useState("");
  const [history, setHistory] = useState({});

  const { weatherData, isLoading, error } = useFetchWeather({ city });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history")) || {};
    setHistory(saved);
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
              {weatherData && <WeatherCard data={weatherData} />}
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
