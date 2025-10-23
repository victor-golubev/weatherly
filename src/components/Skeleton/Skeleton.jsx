import style from "./style.module.css";

function Skeleton({ type = "weather", count = 1 }) {
  const cards = Array.from({ length: count });

  return (
    <div className={style.skeletonContainer}>
      {cards.map((_, i) => (
        <div
          key={i}
          className={`${style.card} ${style[`skeleton-${type}`]}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default Skeleton;
