import { useWeather } from "@/context/WeatherContext";
import { useNavigate } from "react-router-dom";

function useCityNavigation() {
  const { setCity } = useWeather();
  const navigate = useNavigate();

  const navigateToCity = (city) => {
    const cityName = city?.location?.name || city?.name;
    if (!cityName) return;

    setCity(cityName);
    navigate("/", { replace: true });
  };

  return { navigateToCity };
}

export default useCityNavigation;
