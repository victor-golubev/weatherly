import { useEffect, useState } from "react";

function useFetchWeather({ city }) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Ошибка при получении данных");

        const result = await response.json();
        setWeatherData(result);
      } catch (error) {
        setError(error);
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [city, API_KEY]);

  return { weatherData, isLoading, error };
}

export default useFetchWeather;
