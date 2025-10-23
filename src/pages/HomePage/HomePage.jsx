import SearchForm from "@/components/SearchForm/SearchForm";
import Favorites from "@/components/Favorites/Favorites";
import WeatherState from "@/components/WeatherState/WeatherState";
import useFavorites from "@/helpers/hooks/useFavorites";
import { useWeather } from "@/context/WeatherContext";

export default function HomePage() {
  const { weatherData, isLoading, error, handleSearch, handleSelectFavorite } =
    useWeather();

  const { favorites, handleFavorite, handleRemoveFavorite } = useFavorites();

  return (
    <>
      <SearchForm onSearch={handleSearch} />

      <WeatherState
        weatherData={weatherData}
        isLoading={isLoading}
        error={error}
        onFavorite={handleFavorite}
        onRemoveFavorite={handleRemoveFavorite}
      />

      {favorites.length > 0 && (
        <Favorites
          favorites={favorites}
          onSelect={handleSelectFavorite}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </>
  );
}
