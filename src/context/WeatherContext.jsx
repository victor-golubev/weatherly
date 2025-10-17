import { createContext, useContext, useState } from "react";
import { getHistory } from "../helpers/history";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const history = getHistory();
  const initialCity =
    history.length > 0
      ? history[0]?.location?.name || history[0]?.name
      : "Moscow"; // если истории нет — Москва

  const [city, setCity] = useState(initialCity);

  return (
    <WeatherContext.Provider value={{ city, setCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
