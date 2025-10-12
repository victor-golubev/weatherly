import { useEffect, useState } from "react";
import { fetchWeather } from "../../helpers/fetchWeather";
import style from "./style.module.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import FavoritesCard from "../FavoritesCard/FavoritesCard";

function Favorites({ favorites, onSelect, onRemoveFavorite }) {
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
    <div className={style.favorites}>
      <h2>Избранное:</h2>
      <div className={style.cards}>
        {weatherDataList.map((data) => (
          <FavoritesCard
            data={data}
            onSelect={onSelect}
            onRemoveFavorite={onRemoveFavorite}
            key={data.searchedAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
