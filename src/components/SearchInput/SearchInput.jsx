import { useEffect, useState } from "react";
import style from "./style.module.css";

function SearchInput({ value, onChange, placeholder = "Поиск по истории" }) {
  const [searchQuery, setEearchQuery] = useState("");

  return (
    <input
      autoFocus
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={style.input}
    />
  );
}

export default SearchInput;
