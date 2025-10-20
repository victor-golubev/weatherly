import { Link, useLocation } from "react-router-dom";
import style from "./style.module.css";

function Header() {
  const location = useLocation();

  return (
    <header className={style.header}>
      <Link to="/" className={style.logo}>
        Weatherly
      </Link>
      <nav className={style.nav}>
        {location.pathname === "/" && <Link to="/history">История поиска</Link>}
        {location.pathname === "/history" && <Link to="/">Главная</Link>}
      </nav>
    </header>
  );
}

export default Header;
