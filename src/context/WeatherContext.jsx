import { createContext, useContext, useState } from "react";
import { getHistory } from "../helpers/history";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const history = getHistory();
  const lastSearch = history?.[0];
  const initialCity =
    lastSearch?.location?.name || lastSearch?.name || "Moscow";

  const [city, setCity] = useState(initialCity);

  return (
    <WeatherContext.Provider value={{ city, setCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
