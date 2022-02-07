import { Link, useLocation } from "react-router-dom";
import React from "react";

import s from "./SuperherosList.module.css";

const SuperherosList = ({ superheros }) => {
  const location = useLocation();
  return (
    <ul className={s.list}>
      {superheros.map(
        (superhero) =>
          superhero.nickname && (
            <li key={superhero._id} className={s.item}>
              <Link
                className={s.link}
                to={`/superheros/${superhero._id}`}
                state={{
                  from:
                    location.pathname === "/"
                      ? "/"
                      : "/superheros" + location.search,
                }}
              >
                <div className={s.superhero}>
                  {superheros.avatarURL ? (
                    <img
                      className={s.superhero_img}
                      src={`http://localhost:3000/api/superheros${superhero.avatarURL}`}
                      alt={superheros.nickname}
                    />
                  ) : (
                    <img
                      className={s.superhero_img}
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'
                      alt={superheros.nickname}
                    />
                  )}
                </div>
                <div className={s.superhero_info}>
                  <h2 className={s.superhero_title}>{superhero.nickname}</h2>
                </div>
              </Link>
            </li>
          )
      )}
    </ul>
  );
};

export default SuperherosList;
