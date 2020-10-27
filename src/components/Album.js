import React from "react";
import { Link } from "react-router-dom";
import Socials from "./Socials";
// images
import sprite from "../images/svg/sprite.svg";
export default function Album({
  year,
  name,
  artist,
  modifier,
  cover,
  songs_length,
  id,
}) {
  return (
    <div className={`album ${modifier} `}>
      <Link to={`/albums/${id}`} className="album-img">
        <img src={`/pictures${cover}`} alt="" />
      </Link>
      <Socials />
      <div className="album-desc">
        <ul className="album-details">
          <li>
            <h2 className="heading-small light">{name}</h2>
          </li>
          <li>
            <h3 className="heading-med ">{artist.name}</h3>
          </li>
          <li>
            <p className="bold">
              release-Year: <span className="light small">{year}</span>
            </p>
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
