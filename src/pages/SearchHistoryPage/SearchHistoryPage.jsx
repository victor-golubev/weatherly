import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { clearHistory } from "../../helpers/history";
import HistoryCard from "../../components/HistoryCard/HistoryCard";

const SearchHistoryPage = ({ onSelect }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(
    () => JSON.parse(localStorage.getItem("history")) || []
  );
  const [inputSearch, setInputSearch] = useState("");
  const [filteredHistory, setFilteredHistory] = useState(history);

  const handleClick = (city) => {
    onSelect(city);
    navigate("/");
  };

  const handleClearHistory = () => {
    clearHistory([]);
    setHistory([]);
    setFilteredHistory([]);
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
    <div className={style.history}>
      <input
        type="text"
        value={inputSearch}
        onChange={handleChange}
        placeholder="Поиск по истории"
        className={style.input}
      />
      <div className={style.title}>
        <h1>История поиска</h1>
        <button className={style.clear} onClick={handleClearHistory}>
          Очистить историю
        </button>
      </div>
      {filteredHistory.map((city, i) => (
        <HistoryCard city={city} key={i} onClick={handleClick} />
      ))}
    </div>
  );
};

export default SearchHistoryPage;
