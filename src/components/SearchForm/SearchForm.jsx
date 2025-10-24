import { useState } from "react";
import style from "./style.module.css";

function SearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    onSearch(trimmedValue);
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
        aria-label="Поиск города"
      />
      <button
        type="submit"
        className={style.button}
        disabled={!inputValue.trim()}
      >
        Поиск
      </button>
    </form>
  );
}

export default SearchForm;
