// src/helpers/history.js

// Получить историю из localStorage
export const getHistory = () => {
  return JSON.parse(localStorage.getItem("history")) || [];
};

export const addToHistory = (weatherData) => {
  if (!weatherData) return;

  const saved = JSON.parse(localStorage.getItem("history")) || [];

  // Создаем запись с временем
  const entry = {
    ...weatherData,
    searchedAt: new Date().toISOString(),
  };

  // Вставляем в начало
  const updated = [entry, ...saved].slice(0, 10); // максимум 10 записей

  localStorage.setItem("history", JSON.stringify(updated));
};

// Очистить историю
export const clearHistory = () => {
  localStorage.removeItem("history");
};
