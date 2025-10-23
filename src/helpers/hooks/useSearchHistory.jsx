import { useState, useMemo, useEffect } from "react";
import { clearHistory, getHistory } from "../history";

function useSearchHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState(getHistory());

  useEffect(() => {
    const handleStorageChange = () => {
      setHistory(getHistory());
    };

    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("focus", handleStorageChange);
    };
  }, []);

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
