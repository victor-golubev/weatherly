import { useEffect, useState } from "react";
import style from "./style.module.css";
import FavoritesCard from "../FavoritesCard/FavoritesCard";
import Skeleton from "../Skeleton/Skeleton";
import { fetchWeather } from "@/helpers/weatherApi";
import useFavoriteWeather from "@/helpers/hooks/useFavoriteWeather";

function Favorites({ favorites, onSelect, onRemoveFavorite }) {
  const { data: weatherDataList, isLoading } = useFavoriteWeather(favorites);

  return (
    <div className={style.favoritesContainer}>
      <h2 className={style.title}>Избранное</h2>
      {isLoading ? (
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
