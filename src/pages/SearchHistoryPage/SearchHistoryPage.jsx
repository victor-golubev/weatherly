import HistoryCard from "../../components/HistoryCard/HistoryCard";
import useCityNavigation from "@/helpers/hooks/useCityNavigation";
import useSearchHistory from "@/helpers/hooks/useSearchHistory";
import style from "./style.module.css";
import SearchInput from "@/components/SearchInput/SearchInput";

const SearchHistoryPage = () => {
  const { navigateToCity } = useCityNavigation();
  const {
    history,
    searchQuery,
    setSearchQuery,
    filteredHistory,
    handleClearHistory,
  } = useSearchHistory();

  if (history.length === 0)
    return <p className={style.empty}>История поиска пуста.</p>;

  return (
    <div className={style.history}>
      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className={style.title}>
        <h1>История поиска</h1>
        <button className={style.clear} onClick={handleClearHistory}>
          Очистить историю
        </button>
      </div>

      {filteredHistory.map((city, i) => (
        <HistoryCard key={i} city={city} onClick={() => navigateToCity(city)} />
      ))}
    </div>
  );
};

export default SearchHistoryPage;
