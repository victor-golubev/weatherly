import { useNavigate } from "react-router-dom";

const SearchHistoryPage = ({ history, onSelect }) => {
  const navigate = useNavigate();
  const entries = Object.entries(history);

  if (entries.length === 0) return <p>История поиска пуста.</p>;

  const handleClick = (city) => {
    onSelect(city);
    navigate("/");
  };

  return (
    <div>
      <h1>История поиска</h1>
      {entries.map(([city, data]) => (
        <div
          key={city}
          onClick={() => handleClick(city)}
          style={{ marginBottom: "10px", cursor: "pointer" }}
        >
          <strong>{city}</strong>: {data.main?.temp}°C,{" "}
          {data.weather?.[0]?.description}
          <br />
          Поиск: {new Date(data.searchedAt).toLocaleString()}
        </div>
      ))}
    </div>
  );
};

export default SearchHistoryPage;
