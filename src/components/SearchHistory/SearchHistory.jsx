function SearchHistory({ history, onSelect }) {
  if (!Object.entries(history).length) return null;

  return (
    <div>
      <ul>
        {Object.entries(history).map(([city, weather]) => {
          const temp = weather?.main?.temp;
          const date = weather?.searchedAt
            ? new Date(weather.searchedAt).toLocaleString()
            : "";
          return (
            <li key={city}>
              <button onClick={() => onSelect(city)}>
                {city} {weather.main.temp}°C{" "}
                {new Date(weather.searchedAt).toLocaleString()}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchHistory;
