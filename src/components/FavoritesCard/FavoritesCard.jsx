import style from "./style.module.css";

function FavoritesCard({ data, onRemoveFavorite }) {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const description =
    weather[0].description[0].toUpperCase() + weather[0].description.slice(1);

  if (!data || !main || !weather) return null;

  return (
    <div style={{ textAlign: "center" }} className={style.card}>
      <h2 className={style.title}>{name}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <p>{description}</p>
      <p>Температура: {Math.round(main.temp)}°C</p>
      <p>Ощущается как: {Math.round(main.feels_like)}°C</p>
      <p>Влажность: {main.humidity}%</p>
      <p>Ветер: {wind.speed} м/с</p>
      <button onClick={() => onRemoveFavorite(name)} className={style.favorite}>
        ×
      </button>
    </div>
  );
}

export default FavoritesCard;
