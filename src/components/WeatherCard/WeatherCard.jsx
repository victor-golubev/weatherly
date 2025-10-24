import style from "./style.module.css";
import { Heart } from "lucide-react";
import { formatTime } from "@/helpers/formatTime";
import { capitalize } from "@/helpers/formatText";

function WeatherCard({ data, onFavorite, onRemoveFavorite, isFavorite }) {
  if (!data) return null;

  const { name, main, weather, wind, sys } = data;
  const weatherItem = weather?.[0];
  if (!main || !wind || !weatherItem || !sys) return null;

  const toggleFavorite = () => {
    if (isFavorite) {
      onRemoveFavorite?.(name);
    } else {
      onFavorite?.(name);
    }
  };

  const description = capitalize(weatherItem.description);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherItem.icon}@4x.png`;
  const pressureInMmHg = Math.round(main.pressure * 0.75);

  return (
    <div className={style.card}>
      <div className={style.main}>
        <h2 className={style.title}>
          {name} <span>{Math.round(main.temp)}°C</span>
        </h2>
        <img
          src={iconUrl}
          alt={description}
          title={description}
          className={style.img}
        />
      </div>

      <button
        onClick={toggleFavorite}
        className={style.favorite}
        aria-label={
          isFavorite ? "Удалить из избранного" : "Добавить в избранное"
        }
      >
        <Heart size={20} color="white" fill={isFavorite ? "white" : "none"} />
      </button>

      <div className={style.info}>
        <InfoBlock
          label="Ощущается как:"
          value={`${Math.round(main.feels_like)}°C`}
        />
        <InfoBlock label="Влажность:" value={`${main.humidity}%`} />
        <InfoBlock label="Давление:" value={`${pressureInMmHg} мм`} />
        <InfoBlock label="Ветер:" value={`${wind.speed} м/с`} />
        <InfoBlock label="Восход:" value={formatTime(sys.sunrise)} />
        <InfoBlock label="Заход:" value={formatTime(sys.sunset)} />
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className={style.block}>
      <p className={style.subtitle}>{label}</p>
      <p className={style.value}>{value}</p>
    </div>
  );
}

export default WeatherCard;
