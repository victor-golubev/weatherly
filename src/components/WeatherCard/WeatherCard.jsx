import style from "./style.module.css";

function WeatherCard({ data, onFavorite, onRemoveFavorite }) {
  const { name, main, weather, wind, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const description =
    weather[0].description[0].toUpperCase() + weather[0].description.slice(1);
  if (!data || !main || !weather || !wind) return null;
  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "2-digit",
  });
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className={style.card}>
      <div className={style.main}>
        <h2 className={style.title}>
          {name} <span>{Math.round(main.temp)}°C</span>
        </h2>

        <img src={iconUrl} alt={weather[0].description} />
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
      {onFavorite && (
        <button onClick={() => onFavorite(name)} className={style.favorite}>
          ♥
        </button>
      )}
    </div>
  );
}

export default WeatherCard;
