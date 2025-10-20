import { useState, useMemo } from "react";
import { getHistory, clearHistory } from "../../helpers/history";

export default function useSearchHistory() {
  const [history, setHistory] = useState(() => getHistory());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = useMemo(() => {
    return history.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [history, searchQuery]);

  const handleSearchChange = (q) => setSearchQuery(q);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  return {
    history,
    filteredHistory,
    searchQuery,
    handleSearchChange,
    handleClear,
    setHistory,
  };
}
