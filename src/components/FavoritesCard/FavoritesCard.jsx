import style from "./style.module.css";
import { X } from "lucide-react";

function FavoritesCard({ data, onFavorite, onSelect, onRemoveFavorite }) {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const description =
    weather[0].description[0].toUpperCase() + weather[0].description.slice(1);
  if (!data || !main || !weather || !wind) return null;

  return (
    <div className={style.card} onClick={() => onSelect(name)}>
      <img src={iconUrl} alt={weather[0].description} />

      <h2 className={style.title}>
        {name} <span>{Math.round(main.temp)}°C</span>
      </h2>
      <p className={style.description}>{weather[0].description}</p>
      {onRemoveFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveFavorite(name);
          }}
          className={style.favorite}
        >
          <X size={16} color="white" />
        </button>
      )}
    </div>
  );
}

export default FavoritesCard;
