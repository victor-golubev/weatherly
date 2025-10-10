function SearchHistory({ history, onSelect }) {
  if (!Object.entries(history).length) return null;

  return (
    <div>
      <ul>
        {Object.entries(history).map(([city, weather]) => (
          <li key={city}>
            <button onClick={() => onSelect(city)}>
              {city} {weather.main.temp}°C{" "}
              {new Date(weather.searchedAt).toLocaleString()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
