import { useState, useEffect } from "react";
import style from "./style.module.css";
import { Heart } from "lucide-react";
import { getFavorites } from "../../helpers/favorites";

function WeatherCard({ data, onFavorite, onRemoveFavorite }) {
  if (!data) return null;

  const { name, main, weather, wind, sys } = data;
  const weatherItem = weather?.[0];
  if (!main || !wind || !weatherItem || !sys) return null;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(getFavorites().includes(name));
  }, [name]);

  const toggleFavorite = () => {
    if (isFavorite) {
      onRemoveFavorite?.(name);
      setIsFavorite(false);
    } else {
      onFavorite?.(name);
      setIsFavorite(true);
    }
  };

  const description =
    weatherItem.description[0].toUpperCase() + weatherItem.description.slice(1);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherItem.icon}@4x.png`;

  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

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
        <InfoBlock label="Давление:" value={`${main.pressure} мм`} />
        <InfoBlock label="Ветер:" value={`${wind.speed} м/с`} />
        <InfoBlock label="Восход:" value={sunrise} />
        <InfoBlock label="Заход:" value={sunset} />
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
