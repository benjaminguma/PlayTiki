import React from "react";
import { Link } from "react-router-dom";
import Socials from "./Socials";
// images
import sprite from "../images/svg/sprite.svg";

export default function Album({ name, image, id, __v }) {
  return (
    <div className="album album_small">
      <Link to={`/albums/${id}`} className="album-img" href="#">
        <img src={`/pictures${image}`} alt="" />
      </Link>
      <Socials />
      <div className="album-desc">
        <ul className="album-details">
          <li>
            <h2 className="heading-med light">{name}</h2>
          </li>
          <li>
            <h3 className="heading-small ">
              {__v > 1 ? `${__v + 1} songs` : `${__v + 1} song`}
            </h3>
          </li>
        </ul>
        <div className="album-play">
          <Link to={`/albums/${id}`}>
            <button className="round u-center play_btn">
              <svg className="player_controls">
                <use xlinkHref={sprite + "#play_arrow-white-48dp"}></use>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
