import style from "./style.module.css";
import { X } from "lucide-react";
import { capitalize } from "@/helpers/formatText";
import { memo } from "react";

const FavoritesCard = memo(function FavoritesCard({
  data,
  onSelect,
  onRemoveFavorite,
}) {
  if (!data) return null;

  const { name, main, weather } = data;
  const weatherItem = weather?.[0];

  if (!main || !weatherItem) return null;

  const description = capitalize(weatherItem.description);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherItem.icon}@4x.png`;

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemoveFavorite(name);
  };

  return (
    <div
      className={style.card}
      onClick={() => onSelect?.(name)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect?.(name);
        }
      }}
    >
      <img
        src={iconUrl}
        alt={description}
        title={description}
        className={style.icon}
      />

      <h3 className={style.title}>
        {name} <span>{Math.round(main.temp)}°C</span>
      </h3>

      <p className={style.description}>{description}</p>

      {onRemoveFavorite && (
        <button
          onClick={handleRemove}
          className={style.removeBtn}
          aria-label={`Удалить ${name} из избранного`}
          type="button"
        >
          <X size={16} color="white" />
        </button>
      )}
    </div>
  );
});

export default FavoritesCard;
