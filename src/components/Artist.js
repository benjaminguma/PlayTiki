import React from "react";
import { Link } from "react-router-dom";
import sprite from "../images/svg/sprite.svg";

export default function Artist({ id, name, image, __v, songs, albums }) {
  return (
    <div className="artista">
      <div className="artista-img">
        <Link to={`/artists/${id}`}>
          <img src={`/pictures${image}`} alt="" />
          <button className="round play_btn">
            <svg className="player_controls">
              <use xlinkHref={sprite + "#play_arrow-white-48dp"}></use>
            </svg>
          </button>
        </Link>
      </div>
      <div className="artista-des">
        <div className="artista-info">
          <p className="bold grey">{name}</p>
          <p className="light acc2">
            {" "}
            {__v + 1} {__v + 1 > 1 ? "songs" : "song"}
          </p>
        </div>
      </div>
    </div>
  );
}
