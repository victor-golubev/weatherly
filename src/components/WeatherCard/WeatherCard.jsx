import style from "./style.module.css";

function WeatherCard({ data, onFavorite, onRemoveFavorite }) {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const description =
    weather[0].description[0].toUpperCase() + weather[0].description.slice(1);
  if (!data || !main || !weather || !wind) return null;

  return (
    <div className={style.card}>
      <img src={iconUrl} alt={weather[0].description} />

      <h2 className={style.title}>
        {name} <span>{Math.round(main.temp)}°C</span>
      </h2>
      <p>{description}</p>
      {/* <p>Температура: {Math.round(main.temp)}°C</p>
      <p>Ощущается как: {Math.round(main.feels_like)}°C</p> */}
      <p>Влажность: {main.humidity}%</p>
      <p>Ветер: {wind.speed} м/с</p>
      {onFavorite && (
        <button onClick={() => onFavorite(name)} className={style.favorite}>
          ♥
        </button>
      )}
      {onRemoveFavorite && (
        <button
          onClick={() => onRemoveFavorite(name)}
          className={style.favorite}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default WeatherCard;
