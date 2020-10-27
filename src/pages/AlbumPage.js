import React from "react";
import { motion } from "framer-motion";
import { Route } from "react-router-dom";
//modules
import Client from "../utils/client";
// components
import LoadButton from "../components/LoadButton";
import Current from "../components/Current";
import Loader from "../components/Loader";
import Album from "../components/Album";
import Nav2 from "../components/higherComponents/Nav2";

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

function AlbumPage(props) {
  const createAlbum = (album) => {
    return (
      <div key={album.id} className="con-1-2 mt-2">
        <Album modifier="album_mod" key={album.id} {...album} />
      </div>
    );
  };

  return (
    <motion.div
      variants={fadein}
      exit="exit"
      className="main_cont album-section"
    >
      <div className="mb-2">
        <Nav2 />
      </div>
      <motion.div variants={fadein} initial="initial" animate="final">
        <div className="container-flex no-wrap">
          {props.data.map((album) => {
            return createAlbum(album);
          })}
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
        path="/albums/:id"
        render={({ match }) => {
          return (
            <Current
              id={match.params.id}
              playme={props.playSong}
              currentSong={props.currentSong}
              isPlaying={props.isPlaying}
              playSong={props.playSong}
              createPlaylist={props.createPlaylist}
              setModal={props.setModal}
              addToFav={props.addToFav}
              callback={(id) => Client.getAlbumSongs(id)}
              Component={Album}
              show_img={false}
              favorites={props.favorites}
              playNextSong={props.playNextSong}
              playNext={props.playNext}
              img={6}
            />
          );
        }}
      />
    </motion.div>
  );
}
export default AlbumPage;
