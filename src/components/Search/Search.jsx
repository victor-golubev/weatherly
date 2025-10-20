import { useEffect, useState } from "react";
import style from "./style.module.css";

function Search({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSearch(inputValue.trim());
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        autoFocus
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите город..."
        className={style.input}
      />
      <button type="submit" className={style.button}>
        Поиск
      </button>
    </form>
  );
}

export default Search;
