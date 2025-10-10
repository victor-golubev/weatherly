function FavoritesCard({ data, onRemoveFavorite }) {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{name}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <p>{weather[0].description}</p>
      <p>Температура: {Math.round(main.temp)}°C</p>
      <p>Ощущается как: {Math.round(main.feels_like)}°C</p>
      <p>Влажность: {main.humidity}%</p>
      <p>Ветер: {wind.speed} м/с</p>
      <button onClick={() => onRemoveFavorite(name)}>
        Удалить из избранного
      </button>
    </div>
  );
}

export default FavoritesCard;
