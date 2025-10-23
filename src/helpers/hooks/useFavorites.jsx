import { useEffect, useState } from "react";
import { addFavorite, getFavorites, removeFavorite } from "../favorites";

function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = (city) => setFavorites(addFavorite(city));
  const handleRemoveFavorite = (city) => setFavorites(removeFavorite(city));

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return { favorites, setFavorites, handleFavorite, handleRemoveFavorite };
}

export default useFavorites;
