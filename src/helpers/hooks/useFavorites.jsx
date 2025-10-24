import { useState } from "react";
import { addFavorite, getFavorites, removeFavorite } from "../favorites";

function useFavorites() {
  const [favorites, setFavorites] = useState(getFavorites());

  const handleFavorite = (city) => setFavorites(addFavorite(city));
  const handleRemoveFavorite = (city) => setFavorites(removeFavorite(city));

  return { favorites, handleFavorite, handleRemoveFavorite };
}

export default useFavorites;
