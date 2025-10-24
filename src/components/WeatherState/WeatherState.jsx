import Skeleton from "../../components/Skeleton/Skeleton";
import WeatherCard from "../../components/WeatherCard/WeatherCard";

export default function WeatherState({
  weatherData,
  isLoading,
  error,
  onFavorite,
  onRemoveFavorite,
  isFavorite,
}) {
  if (isLoading) return <Skeleton />;

  if (error) return <p>{error.message}</p>;

  if (!weatherData) {
    return (
      <div className={style.empty}>
        <p>Введите название города для поиска погоды</p>
      </div>
    );
  }

  return (
    <WeatherCard
      data={weatherData}
      onFavorite={onFavorite}
      onRemoveFavorite={onRemoveFavorite}
      isFavorite={isFavorite}
    />
  );
}
