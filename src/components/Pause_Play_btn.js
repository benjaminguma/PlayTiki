import React from "react";
import sprite from "../images/svg/sprite.svg";

export default function Pause_Play_btn({ playState, toggleIsplaying, plai }) {
  const getIcon = (params) => {
    if (playState === "playing") return "#pause-white-48dp";

    return "#play_arrow-white-48dp";
  };
  return (
    <button onClick={toggleIsplaying} className="round u-center play_btn">
      <svg className="player_controls">
        <use xlinkHref={`${sprite}${getIcon()}`}></use>
      </svg>
    </button>
  );
}
