import React from "react";
import { Route } from "react-router-dom";

//modules
import { motion } from "framer-motion";
import Client from "../utils/client";
// components
import Nav2 from "../components/higherComponents/Nav2";
import Current from "../components/Current";
import Album2 from "../components/Album2";
import Artist from "../components/Artist";
import Loader from "../components/Loader";
import LoadButton from "../components/LoadButton";

const fadein = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      // transition orcestration
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },

  exit: {
    x: "-90vh",
    opacity: 0,
  },

  exit2: {
    scale: 2,
    opacity: 0,
  },
};
const ArtistPage = (props) => {
  // console.log(props.page);
  const createArtist = (artist) => {
    return (
      <motion.div className="con-1-4 " key={artist.id} variants={fadein}>
        <Artist key={artist.id} {...artist} />
      </motion.div>
    );
  };

  return (
    <motion.div variants={fadein} exit="exit" className="main_cont">
      <div className="mb-2">
        <Nav2 />
      </div>
      <motion.div variants={fadein} initial="initial" animate="final">
        <div className="container-flex">
          {props.data.map((artist) => createArtist(artist))}
        </div>
      </motion.div>

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

      <Route
        path="/artists/:id"
        render={({ match }) => {
          return (
            <Current
              id={match.params.id}
              show_img={false}
              playme={props.playSong}
              currentSong={props.currentSong}
              playSong={props.playSong}
              isPlaying={props.isPlaying}
              createPlaylist={props.createPlaylist}
              setModal={props.setModal}
              callback={(id) => Client.getArtistSongs(id)}
              Component={Album2}
              addToFav={props.addToFav}
              favorites={props.favorites}
              playNextSong={props.playNextSong}
              playNext={props.playNext}
              img={11}
            />
          );
        }}
      />
    </motion.div>
  );
};
export default ArtistPage;
