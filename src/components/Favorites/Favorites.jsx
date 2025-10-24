import { useEffect, useState } from "react";
import style from "./style.module.css";
import FavoritesCard from "../FavoritesCard/FavoritesCard";
import Skeleton from "../Skeleton/Skeleton";
import { fetchWeather } from "@/helpers/weatherApi";

function Favorites({ favorites, onSelect, onRemoveFavorite }) {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (favorites.length === 0) {
      setWeatherDataList([]);
      return;
    }

    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        const data = await Promise.all(
          favorites.map((city) => fetchWeather(city))
        );
        setWeatherDataList(data.filter(Boolean));
      } catch (err) {
        console.error("Ошибка при загрузке избранного:", err);
        setWeatherDataList([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [favorites]);

  return (
    <div className={style.favoritesContainer}>
      <h2 className={style.title}>Избранное</h2>
      {isLoading || weatherDataList.length === 0 ? (
        <Skeleton type="favorite" count={favorites.length} />
      ) : (
        <div className={style.cards}>
          {weatherDataList.map((data) => (
            <FavoritesCard
              key={data.id || `${data.name}-${data.dt}`}
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
