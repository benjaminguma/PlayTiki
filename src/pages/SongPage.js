import React, { useState, useEffect } from "react";
// utils

//components
import Loader from "../components/Loader";
import Song from "../components/Song";
import Nav2 from "../components/higherComponents/Nav2";
import LoadButton from "../components/LoadButton";

function SongPage(props) {
  //const [hasPlayed, setPlayed] = useState(false);
  const [song, setSong] = useState({});
  const [songClicked, setSongClicked] = useState(false);

  useEffect(() => {
    if (song.id) props.playSong(song);
  }, [song, songClicked]);
  const playSong1 = (song_to_play) => {
    // setsongclicked just mutates state just incase you are playin a song
    // called "A" and you pause the song then you click play again
    // it makes useeffect play the song again so that the if statement below doesnt hinder it
    setSongClicked((songClicked) => !songClicked);
    if (song_to_play.id === song.id) return;
    setSong(song_to_play);
    props.createPlaylist(props.data);
  };
  const createSong = (song) => {
    return (
      // <motion.div variants={song_hover} initial="initial" animate="final"></motion.div>
      <Song key={song.id} song={song} {...props} playSong={playSong1} />
    );
  };

  return (
    <div className="main_cont ">
      <Nav2 />
      <section className="showcase-title">
        <div className="container-flex">
          <div className="con-3-4">
            <div className="heading-box">
              <div className="heading-box-1">
                <h2 className="acc1 heading-small">All songs</h2>
              </div>
              <div className="heading-box-2"></div>
            </div>
          </div>
        </div>
      </section>
      {/* <motion.div variants={fadein} initial="initial" animate="final"> </motion.div> */}
      {props.data.map((da, index) => {
        return (
          <div key={index} className="container-flex">
            <div className="con-3-4">{createSong(da)}</div>
          </div>
        );
      })}

      <div className="u-center" style={{ padding: "1.5rem" }}>
        {props.loading ? (
          <Loader />
        ) : (
          <LoadButton
            showLoadButton={props.showLoadButton}
            loadMore={() => props.changePage(props.page + 1)}
          />
        )}
      </div>
    </div>
  );
}
export default SongPage;
