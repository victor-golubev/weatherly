const HISTORY_KEY = "history";

const readHistory = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export const getHistory = () => readHistory();

export const addToHistory = (weatherData) => {
  if (!weatherData || !weatherData.name) return;

  const saved = readHistory();

  const entry = {
    ...weatherData,
    historyId: `${weatherData.id}-${Date.now()}`,
    searchedAt: new Date().toISOString(),
  };

  const updated = [entry, ...saved].slice(0, 10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};
