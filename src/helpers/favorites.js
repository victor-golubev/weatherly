const FAVORITES_KEY = "favorites";

export const getFavorites = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addFavorite = (city) => {
  if (!city || typeof city !== "string") return getFavorites();

  const saved = getFavorites();
  if (saved.includes(city.trim())) return saved;

  const updated = [...saved, city.trim()];
  saveFavorites(updated);
  return updated;
};

export const removeFavorite = (city) => {
  if (!city || typeof city !== "string") return getFavorites();

  const saved = getFavorites();
  const updated = saved.filter((c) => c !== city.trim());
  saveFavorites(updated);
  return updated;
};
