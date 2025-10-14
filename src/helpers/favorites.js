// helpers/favorites.js
export const getFavorites = () =>
  JSON.parse(localStorage.getItem("favorites")) || [];

export const addFavorite = (city) => {
  const saved = getFavorites();
  if (saved.includes(city)) return saved;
  const updated = [...saved, city];
  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
};

export const removeFavorite = (city) => {
  const saved = getFavorites();
  const updated = saved.filter((c) => c !== city);
  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
};
