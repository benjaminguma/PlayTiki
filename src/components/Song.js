import React from "react";
import Music_options from "./Music_options";
// images
import sprite from "../images/svg/sprite.svg";

export default function Song(props) {
  const { title, trueUri, artists, id, preview } = props.song;
  const {
    show_img,
    currentSong,
    playSong,
    isPlaying,
    addToFav,
    favorites,
    setModal,
    playNextSong,
    playNext,
  } = props;

  const getArtists = (artists) => {
    if (artists && !artists.length) return artists;

    return artists.join(",");
  };

  // choose btw pause and play icons
  const chooseIcon = () => {
    if (isPlaying && currentSong.id === id) {
      return `#pause-white-48dp `;
    }
    return `#play_arrow-white-48dp`;
  };
  // know weda the song is playing to animate it
  const getPlayingClass = () =>
    isPlaying && currentSong.id === id ? "playing" : null;

  const play = () => {
    playSong(props.song);
  };
  const playNextSong1 = () => {
    playNextSong(props.song);
  };

  return (
    <div className={`music  ${getPlayingClass()}`}>
      <input className="music-checkbox" type="checkbox" name="" />
      <figure className="artist_img round">
        <img
          className="music-img"
          src={show_img === false ? " " : trueUri}
          alt=""
        />
      </figure>
      <div onClick={play} className="music-data">
        <div className="heading-box">
          <div className="heading-box-1">
            <div className="music-des">
              <div className="music-info">
                <p className=" grey">{title}</p>
                <p className="light acc2">{getArtists(artists)}</p>
              </div>
            </div>
          </div>
          <div className="heading-box-2">
            <div className="music-play">
              <button className="u-center play-btn">
                <svg className="player_controls">
                  <use xlinkHref={`${sprite}${chooseIcon()}`}></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* music options go here */}
      <Music_options
        song={props.song}
        addToFav={addToFav}
        favorites={favorites}
        setModal={setModal}
        isPlaying={isPlaying}
        playNextSong1={playNextSong1}
        showPlayingNext={playNext.id === props.song.id}
      />
    </div>
  );
}
