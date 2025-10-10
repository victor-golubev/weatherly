import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchHistoryPage = ({ onSelect }) => {
  const navigate = useNavigate();
  const [history] = useState(
    () => JSON.parse(localStorage.getItem("history")) || []
  );
  const [inputSearch, setInputSearch] = useState("");
  const [filteredHistory, setFilteredHistory] = useState(history);

  const handleClick = (city) => {
    onSelect(city);
    navigate("/");
  };

  const handleChange = (e) => {
    const q = e.target.value;
    setInputSearch(q);
    setFilteredHistory(
      history.filter((city) =>
        city.name.toLowerCase().includes(q.toLowerCase())
      )
    );
  };

  if (history.length === 0) return <p>История поиска пуста.</p>;

  return (
    <div>
      <h1>История поиска</h1>
      <input
        type="text"
        value={inputSearch}
        onChange={handleChange}
        placeholder="Поиск по истории"
      />

      {filteredHistory.map((city, i) => (
        <div
          key={city.searchedAt}
          onClick={() => handleClick(city.name)}
          style={{ marginBottom: "10px", cursor: "pointer" }}
        >
          <strong>{city.name}</strong>: {city.main?.temp}°C,{" "}
          {city.weather?.[0]?.description}
          <br />
          Поиск: {new Date(city.searchedAt).toLocaleString()}
        </div>
      ))}
    </div>
  );
};

export default SearchHistoryPage;
