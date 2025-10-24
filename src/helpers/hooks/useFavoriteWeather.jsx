import { useEffect, useState } from "react";
import { fetchWeather } from "@/helpers/weatherApi";

function useFavoriteWeather(favorites) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (favorites.length === 0) {
      setData([]);
      return;
    }

    let isCancelled = false;

    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.allSettled(
          favorites.map((city) => fetchWeather(city))
        );

        if (!isCancelled) {
          setData(
            results
              .filter((r) => r.status === "fulfilled")
              .map((r) => r.value)
              .filter(Boolean)
          );
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Ошибка при загрузке избранного:", err);
          setData([]);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    loadFavorites();

    return () => {
      isCancelled = true;
    };
  }, [favorites]);

  return { data, isLoading };
}

export default useFavoriteWeather;
