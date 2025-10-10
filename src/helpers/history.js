export const addToHistory = (weatherData) => {
  if (!weatherData) return;
  const saved = JSON.parse(localStorage.getItem("history")) || [];
  const dataWithDate = { ...weatherData, searchedAt: new Date().toISOString() };
  const updated = [dataWithDate, ...saved].slice(0, 10);
  localStorage.setItem("history", JSON.stringify(updated));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem("history")) || [];
};
