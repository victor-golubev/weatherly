export const getHistory = () => {
  return JSON.parse(localStorage.getItem("history")) || [];
};

export const addToHistory = (weatherData) => {
  if (!weatherData) return;

  const saved = JSON.parse(localStorage.getItem("history")) || [];

  const entry = {
    ...weatherData,
    searchedAt: new Date().toISOString(),
  };

  const updated = [entry, ...saved].slice(0, 10);

  localStorage.setItem("history", JSON.stringify(updated));
};

export const clearHistory = () => {
  localStorage.removeItem("history");
};
