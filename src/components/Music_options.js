import React, { useState } from "react";
import axios from "axios";
import sprite from "../images/svg/sprite.svg";
import sprite2 from "../images/svg/sprite2.svg";

export default function Music_options({
  song,
  favorites,
  addToFav,
  setModal,
  isPlaying,
  playNextSong1,
  showPlayingNext,
}) {
  const { id, preview } = song;
  const [downloading, setDownloading] = useState(false);

  const getFavClass = () => {
    if (favorites.some((e) => e.id === id)) {
      return "act";
    }
    return "";
  };

  const download_song = async (song_uri) => {
    let uri = `/download?file=${song_uri}`;
    setDownloading(true);
    try {
      let res = await axios({
        url: uri,
        method: "GET",
        responseType: "blob",
        Headers: {
          "content-type": "application/json",
        },
      });
      // creates object url from the raw binary data gotten from the server in a blob
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.data.type })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${song_uri}`); //or any other extension
      // no need to apppend link to body unless you need it there
      //document.body.appendChild(link);

      // wait for some time then change ...downloading to download
      link.click();
      setTimeout(() => {
        setDownloading(false);
      }, 300);
    } catch (error) {
      setModal("an error occured while parsing the file please try again");
      console.error(error);
      setDownloading(false);
    }
  };

  return (
    <div className="music-opt" onClick={(e) => e.stopPropagation()}>
      <input id={"music-option-toog" + id} type="radio" name="toog" />
      <label
        className="music-opt-toogle next"
        htmlFor={"music-option-toog" + id}
      >
        <svg className="player_controls">
          <use xlinkHref={sprite2 + "#more_vert-black-48dp"}></use>
        </svg>
      </label>

      <ul className="music-opt-box">
        <li className="music-opt-li">
          <button
            className="music-opt-link"
            to={`/download?file=${preview}`}
            onClick={(e) => {
              download_song(preview);
              e.preventDefault();
            }}
          >
            <svg className="music-opt-icon">
              <use
                xlinkHref={sprite + "#vertical_align_bottom-black-48dp"}
              ></use>
            </svg>
            <span>{downloading ? "...downloading" : "download"}</span>
          </button>
        </li>
        <li className="music-opt-li">
          <a className={`music-opt-link ${getFavClass()}`} href="#">
            <svg className="music-opt-icon">
              <use xlinkHref={sprite + "#favorite-black-48dp"}></use>
            </svg>
            <span onClick={() => addToFav(song)}>
              {getFavClass() ? `remove ` : `add to favorites`}
            </span>
          </a>
        </li>
        {isPlaying && (
          <li className="music-opt-li">
            <a
              className={`music-opt-link ${showPlayingNext && "act"}`}
              href="#"
              onClick={() => playNextSong1()}
            >
              <svg className="music-opt-icon">
                <use xlinkHref={sprite + "#replay-black-48dp"}></use>
              </svg>
              <span>{showPlayingNext ? "playing next" : " play next"}</span>
            </a>
          </li>
        )}
        <li className="music-opt-li">
          <a className="music-opt-link" href="#">
            <svg className="music-opt-icon">
              <use xlinkHref={sprite2 + "#mood-black-48dp"}></use>
            </svg>
            <span>share</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
