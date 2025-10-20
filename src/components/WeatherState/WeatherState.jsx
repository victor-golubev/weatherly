import Skeleton from "../../components/Skeleton/Skeleton";
import WeatherCard from "../../components/WeatherCard/WeatherCard";

export default function WeatherState({
  weatherData,
  isLoading,
  error,
  onFavorite,
  onRemoveFavorite,
}) {
  if (isLoading) return <Skeleton />;

  if (error) return <p>{error.message}</p>;

  if (weatherData) {
    return (
      <WeatherCard
        data={weatherData}
        onFavorite={onFavorite}
        onRemoveFavorite={onRemoveFavorite}
      />
    );
  }

  return null;
}
