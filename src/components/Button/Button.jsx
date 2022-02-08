import React from "react";
import s from "./Button.module.css";

export default function loadMore({ onClick, title, type }) {
  return (
    <button type={type} className={s.button} onClick={onClick}>
      {title}
    </button>
  );
}
