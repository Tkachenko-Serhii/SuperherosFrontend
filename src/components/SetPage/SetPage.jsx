import React from "react";
import s from "./SetPage.module.css";

export default function loadMore({ onClick, title }) {
  return (
    <button type='button' className={s.button} onClick={onClick}>
      {title}
    </button>
  );
}
