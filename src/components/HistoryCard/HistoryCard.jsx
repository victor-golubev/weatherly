import style from "./style.module.css";

function HistoryCard({ city, onClick }) {
  return (
    <div
      key={city.searchedAt}
      onClick={() => onClick(city.name)}
      className={style.card}
    >
      <div className={style.left}>
        <p>
          {city.name} | {city.main?.temp}°C | {city.weather?.[0]?.description}
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${city.weather?.[0]?.icon}@4x.png`}
          alt={city.weather?.[0]?.description}
          className={style.img}
        />
      </div>
      <div className={style.right}>
        <p>{new Date(city.searchedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default HistoryCard;
