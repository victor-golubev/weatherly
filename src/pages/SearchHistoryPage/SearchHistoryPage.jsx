import HistoryCard from "../../components/HistoryCard/HistoryCard";
import useCityNavigation from "@/helpers/hooks/useCityNavigation";
import useSearchHistory from "@/helpers/hooks/useSearchHistory";
import style from "./style.module.css";

const EmptyState = () => <p className={style.empty}>История поиска пуста.</p>;

const HistoryHeader = ({ onClear }) => (
  <div className={style.title}>
    <h1>История поиска</h1>
    <button className={style.clear} onClick={onClear}>
      Очистить историю
    </button>
  </div>
);

const SearchHistoryPage = () => {
  const { navigateToCity } = useCityNavigation();
  const {
    history,
    searchQuery,
    setSearchQuery,
    filteredHistory,
    handleClearHistory,
  } = useSearchHistory();

  if (history.length === 0) return <EmptyState />;

  return (
    <div className={style.history}>
      <input
        autoFocus
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск по истории"
        className={style.input}
        aria-label="Поиск по истории"
      />

      <HistoryHeader onClear={handleClearHistory} />

      {filteredHistory.map((city) => (
        <HistoryCard
          key={city.id || `${city.name}-${city.dt}`}
          city={city}
          onClick={() => navigateToCity(city.name)}
        />
      ))}
    </div>
  );
};

export default SearchHistoryPage;
