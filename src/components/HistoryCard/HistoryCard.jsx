import style from "./style.module.css";
import { formatDate } from "@/helpers/formatDate";

function HistoryCard({ city, onClick }) {
  const weather = city.weather?.[0];
  const temp = city.main?.temp ? Math.round(city.main.temp) : "--";
  const date = city.searchedAt ? formatDate(city.searchedAt) : "--";

  return (
    <div onClick={onClick} className={style.card}>
      <div className={style.left}>
        <p>
          {city.name} | {temp}°C | {weather?.description || "--"}
        </p>
        {weather?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt={weather.description}
            className={style.img}
            title={weather.description}
          />
        )}
      </div>
      <div className={style.right}>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default HistoryCard;
