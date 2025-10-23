import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getHistory, addToHistory } from "../helpers/history";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const history = getHistory();
  const lastSearch = history?.[0];
  const initialCity = lastSearch?.name || "Moscow";

  const [city, setCity] = useState(initialCity);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userSearchRef = useRef(false);

  // Fetch погоды при изменении города
  useEffect(() => {
    if (!city) return;

    const loadWeather = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) throw new Error("Город не найден");
          throw new Error("Ошибка при получении данных");
        }

        const result = await response.json();
        setWeatherData(result);
      } catch (err) {
        setError(err);
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadWeather();
  }, [city, API_KEY]);

  // Сохранение в историю
  useEffect(() => {
    if (weatherData && userSearchRef.current) {
      addToHistory(weatherData);
      userSearchRef.current = false;
    }
  }, [weatherData]);

  const handleSearch = (newCity) => {
    if (!newCity.trim()) return;
    userSearchRef.current = true;
    setCity(newCity.trim());
  };

  const handleSelectFavorite = (selectedCity) => {
    userSearchRef.current = true;
    setCity(selectedCity);
  };

  const value = {
    city,
    setCity,
    weatherData,
    isLoading,
    error,
    handleSearch,
    handleSelectFavorite,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
