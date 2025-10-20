import { useEffect, useState } from "react";
import { fetchWeather } from "../../helpers/fetchWeather";
import style from "./style.module.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import FavoritesCard from "../FavoritesCard/FavoritesCard";
import Skeleton from "../Skeleton/Skeleton";

function Favorites({ favorites, onSelect, onRemoveFavorite }) {
  const [weatherDataList, setWeatherDataList] = useState([]);

  useEffect(() => {
    if (favorites.length === 0) {
      setWeatherDataList([]);
      return;
    }

    const loadFavorites = async () => {
      try {
        const data = await Promise.all(
          favorites.map((city) => fetchWeather(city))
        );
        setWeatherDataList(data.filter(Boolean));
      } catch (err) {
        console.error("Ошибка при загрузке избранного:", err);
        setWeatherDataList([]);
      }
    };

    loadFavorites();
  }, [favorites]);

  return (
    <div className={style.favorites}>
      <h2 className={style.favorites}>Избранное:</h2>
      {weatherDataList.length === 0 ? (
        <Skeleton type="favorite" count={favorites.length} />
      ) : (
        <div className={style.cards}>
          {weatherDataList.map((data, i) => (
            <FavoritesCard
              key={i}
              data={data}
              onSelect={onSelect}
              onRemoveFavorite={onRemoveFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
