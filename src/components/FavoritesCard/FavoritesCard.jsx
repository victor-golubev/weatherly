import style from "./style.module.css";
import { X } from "lucide-react";

function FavoritesCard({ data, onFavorite, onSelect, onRemoveFavorite }) {
  if (!data) return null;

  const { name, main, weather, wind } = data;

  const weatherItem = weather?.[0];
  if (!main || !weatherItem || !wind) return null;

  const description =
    weatherItem.description[0].toUpperCase() + weatherItem.description.slice(1);

  const iconUrl = `https://openweathermap.org/img/wn/${weatherItem.icon}@4x.png`;

  return (
    <div className={style.card} onClick={() => onSelect?.(name)}>
      <img src={iconUrl} alt={description} title={description} />

      <h2 className={style.title}>
        {name} <span>{Math.round(main?.temp ?? 0)}°C</span>
      </h2>

      <p className={style.description}>{description}</p>

      {onRemoveFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveFavorite(name);
          }}
          className={style.favorite}
          aria-label={`Удалить ${name} из избранного`}
        >
          <X size={16} color="white" />
        </button>
      )}
    </div>
  );
}

export default FavoritesCard;
