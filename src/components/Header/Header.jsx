import { Link } from "react-router-dom";
import style from "./style.module.css";

function Header() {
  return (
    <div className={style.header}>
      <div className={style.logo}>Weatherly</div>
      <nav className={style.nav}>
        <Link to="/">Главная</Link>
        <Link to="/history">История поиска</Link>
      </nav>
    </div>
  );
}

export default Header;
