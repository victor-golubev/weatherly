import { useNavigate } from "react-router-dom";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import { useWeather } from "../../context/WeatherContext";
import { getHistory, clearHistory } from "../../helpers/history";
import { useState, useMemo } from "react";
import style from "./style.module.css";

const SearchHistoryPage = () => {
  const { setCity } = useWeather();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState(getHistory());

  const filteredHistory = useMemo(() => {
    return history.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [history, searchQuery]);

  const handleClick = (item) => {
    const cityName = item?.location?.name || item?.name;
    if (!cityName) return;

    setCity(cityName);
    navigate("/", { replace: true });
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  if (history.length === 0)
    return <p className={style.empty}>История поиска пуста.</p>;

  return (
    <div className={style.history}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
        <HistoryCard
          key={i}
          city={city}
          onClick={() => handleClick(city)} // теперь кликабельно
        />
      ))}
    </div>
  );
};

export default SearchHistoryPage;
