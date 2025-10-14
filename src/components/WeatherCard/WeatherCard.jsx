import style from "./style.module.css";
import { Heart } from "lucide-react";
import { getFavorites } from "../../helpers/favorites";
import { useEffect, useState } from "react";

function WeatherCard({ data, onFavorite, onRemoveFavorite }) {
  const { name, main, weather, wind, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const isFavorite = getFavorites().includes(name);

  const description =
    weather[0].description[0].toUpperCase() + weather[0].description.slice(1);
  if (!data || !main || !weather || !wind) return null;

  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "2-digit",
  });

  const toggleFavorite = () => {
    if (isFavorite) {
      onRemoveFavorite(name);
    } else {
      onFavorite(name);
    }
  };

  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "2-digit",
  });

  const now = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatted = new Intl.DateTimeFormat("ru-RU", options)
    .format(now)
    .replace(/^./, (c) => c.toUpperCase());

  return (
    <div className={style.card}>
      <div className={style.date}>{formatted}</div>
      <div className={style.main}>
        <h2 className={style.title}>
          {name} <span>{Math.round(main.temp)}°C</span>
        </h2>

        <img src={iconUrl} alt={weather[0].description} className={style.img} />
      </div>
      <div className={style.info}>
        <div className={style.block}>
          <p className={style.subtitle}>Ощущается как:</p>
          <p className={style.value}>{Math.round(main.feels_like)}°C</p>
        </div>
        <div className={style.block}>
          <p className={style.subtitle}>Влажность:</p>
          <p className={style.value}>{main.humidity}%</p>
        </div>
        <div className={style.block}>
          <p className={style.subtitle}>Давление: </p>
          <p className={style.value}>{main.pressure} мм</p>
        </div>
        <div className={style.block}>
          <p className={style.subtitle}>Ветер: </p>
          <p className={style.value}>{wind.speed} м/с</p>
        </div>
        <div className={style.block}>
          <p className={style.subtitle}>Восход:</p>
          <p className={style.value}> {sunrise}</p>
        </div>
        <div className={style.block}>
          <p className={style.subtitle}>Заход: </p>
          <p className={style.value}>{sunset}</p>
        </div>
      </div>

      <button onClick={toggleFavorite} className={style.favorite}>
        <Heart
          size={20}
          color="white"
          fill={isFavorite ? "white" : "none"}
          style={{ cursor: "pointer" }}
        />
      </button>
    </div>
  );
}

export default WeatherCard;
