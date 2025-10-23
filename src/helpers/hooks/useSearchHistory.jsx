import { useState, useMemo } from "react";
import { clearHistory, getHistory } from "../history";

function useSearchHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState(getHistory());

  const filteredHistory = useMemo(() => {
    return history.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [history, searchQuery]);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return {
    history,
    searchQuery,
    setSearchQuery,
    filteredHistory,
    handleClearHistory,
  };
}

export default useSearchHistory;
