import { useEffect, useState } from "react";
import { fetchWeather } from "../helpers/fetchWeather";
import FavoritesCard from "../components/FavoritesCard/FavoritesCard";

function FavoritesPage({ favorites, onRemoveFavorite }) {
  const [weatherDataList, setWeatherDataList] = useState([]);

  useEffect(() => {
    if (favorites.length === 0) {
      setWeatherDataList([]);
      return;
    }

    const loadFavorites = async () => {
      const data = await Promise.all(
        favorites.map((city) => fetchWeather(city))
      );
      setWeatherDataList(data.filter(Boolean));
    };

    loadFavorites();
  }, [favorites]);

  return (
    <div>
      <h2>Избранное:</h2>
      <div>
        {weatherDataList.map((data) => (
          <FavoritesCard
            data={data}
            onRemoveFavorite={onRemoveFavorite}
            key={data.name}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
