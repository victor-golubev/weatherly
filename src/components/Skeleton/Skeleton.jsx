import style from "./style.module.css";

function Skeleton({ type = "weather", count = 1 }) {
  const cards = new Array(count).fill(null);

  return (
    <div className={style.skeletonContainer}>
      {cards.map((_, i) => (
        <div
          key={i}
          className={`${style.card} ${style[`skeleton-${type}`]}`}
        ></div>
      ))}
    </div>
  );
}

export default Skeleton;
