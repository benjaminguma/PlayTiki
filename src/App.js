import React, { useState, useEffect } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
// components
import Header from "./components/higherComponents/Header";
import Sidebar from "./components/higherComponents/Sidebar";
import Modal from "./components/Modal";
import MusicPlayer from "./components/MusicPlayer";

// pages
import SearchPage from "./pages/SearchPage";
import Songii from "./pages/Songii";
import ArtistPageii from "./pages/ArtistPageii";
import AlbumPageii from "./pages/AlbumPageii";
import DiscoverPage from "./pages/DiscoverPage";
import Favorite from "./pages/Favorite";

//utils
import Client from "./utils/client";
import { clickOut } from "./utils/utils";

export default function App() {
  const [state, setState] = useState({
    playlist: [],
    playing: {},
    next: null,
    isPlaying: false,
    favorites: [],
    playNext: {},
    songs: [],
    albums: [],
    artists: [],
    showModal: true,
    modal_err: false,
    searchKey: "",
    message:
      window.innerWidth < 750
        ? "Hi there ,thanks for coming around..hope u enjoy what u see :)"
        : "use P to pause and arrow keys to switch songs...enjoy!!",
  });

  useEffect(() => {
    clickOut();
    return clickOut().cancel();
  }, []);

  const createPlaylist = (songs) => {
    setState({ ...state, playlist: [...songs] });
  };
  const dispachContent = (chunk, state_key) => {
    let content = [...chunk];
    setState({ ...state, [state_key]: content });
  };

  const setSearchKey = (key) => {
    setState((prev) => ({ ...prev, searchKey: key }));
  };

  const setModal = (message, err = true) =>
    setState({ ...state, message, showModal: true, modal_err: err });

  const toggleModal = () => setState({ ...state, showModal: false });

  const addToFav = (song) => {
    let { favorites } = state;
    // if your favorites are more than 7 then prompt an error
    if (favorites.length > 7) {
      return this.setModal(
        "you can only have 7 favorite songs...please decrease your selection and try again"
      );
    }
    if (!favorites.some(({ id }) => id === song.id))
      return setState({ ...state, favorites: favorites.concat([song]) });

    favorites = favorites.filter(({ id }) => id !== song.id);
    setState({ ...state, favorites });
  };

  const playNextSong = (song) => {
    // if the song to be played next is thesame as the song the user clicked again to play next do nothing
    if (state.playNext.id === song.id) return;
    const { index } = state.playing;
    const playNext = {
      index,
      ...song,
    };

    setState({ ...state, playNext });
  };

  const playSong = (song) => {
    const song_id = song.id,
      { isPlaying, playing } = state;

    // if the song to be played is the same as the current song pause import PropTypes from 'prop-types'
    if (song_id === playing.id && isPlaying) {
      return;
    }
    //know index of song
    const song_index = state.playlist.findIndex((song) => song.id === song_id);

    setState({
      ...state,
      playing: { index: song_index, ...song },
      isPlaying: true,
    });
  };

  const toggleIsplaying = () => {
    const { isPlaying } = state;
    setState({ ...state, isPlaying: !isPlaying });
  };

  const switchSong = (num) => {
    const { playlist, playNext } = state;
    let { index } = state.playing,
      playlist_length = playlist.length;
    // set next song to play using index;
    let next_song;
    if (playNext.index > -1) next_song = { ...playNext, index };
    else {
      //  ensures that our next song is not more than array length
      index = (index + num) % playlist_length;
      index = index < 0 ? 1 : index;
      next_song = { ...playlist[index], index };
    }
    setState({
      ...state,
      playing: next_song,
      isPlaying: true,
      playNext: {},
    });
  };

  const {
    playing,
    next,
    isPlaying,
    favorites,
    message,
    showModal,
    modal_err,
    searchKey,
    playNext,
  } = state;

  return (
    <div className="app-container">
      {/* <Tabu /> */}
      <Header favorites={favorites} setSearchKey={setSearchKey} />
      <main className="main" id="main">
        <Modal
          showModal={showModal}
          toggleModal={toggleModal}
          error={modal_err}
          message={message}
        />
        <Sidebar favorites={favorites} />

        <Switch>
          <Route
            path="/search"
            render={() => {
              return (
                <SearchPage
                  playme={playSong}
                  currentSong={playing}
                  isPlaying={isPlaying}
                  createPlaylist={createPlaylist}
                  setModal={setModal}
                  addToFav={addToFav}
                  favorites={favorites}
                  cached={state.songs}
                  count={30}
                  dispatchContent={(chunk) => dispachContent(chunk, "songs")}
                  searchKey={searchKey}
                  playNextSong={playNextSong}
                  playNext={playNext}
                />
              );
            }}
          />

          <Route path="/artists">
            <ArtistPageii
              playme={playSong}
              currentSong={playing}
              isPlaying={isPlaying}
              createPlaylist={createPlaylist}
              Component={ArtistPageii}
              callback={(page) => Client.getArtists(28, page, null)}
              setModal={setModal}
              addToFav={addToFav}
              favorites={favorites}
              dispatchContent={(chunk) => dispachContent(chunk, "artists")}
              cached={state.artists}
              playNextSong={playNextSong}
              playNext={playNext}
            />
          </Route>

          <Route path="/albums">
            <AlbumPageii
              playme={playSong}
              currentSong={playing}
              isPlaying={isPlaying}
              createPlaylist={createPlaylist}
              setModal={setModal}
              addToFav={addToFav}
              favorites={favorites}
              count={24}
              cached={state.albums}
              dispatchContent={(chunk) => dispachContent(chunk, "albums")}
              playNextSong={playNextSong}
              playNext={playNext}
            />
          </Route>
          <Route
            exact
            path="/songs"
            render={({ match }) => (
              <Songii
                playme={playSong}
                currentSong={playing}
                isPlaying={isPlaying}
                createPlaylist={createPlaylist}
                setModal={setModal}
                addToFav={addToFav}
                favorites={favorites}
                cached={state.songs}
                count={30}
                dispatchContent={(chunk) => dispachContent(chunk, "songs")}
                playNextSong={playNextSong}
                playNext={playNext}
              />
            )}
          />

          <Route path="/favorites">
            <Favorite
              favorites={favorites}
              addToFav={addToFav}
              playme={playSong}
              currentSong={playing}
              isPlaying={isPlaying}
              createPlaylist={createPlaylist}
              playNextSong={playNextSong}
              playNext={playNext}
            />
          </Route>

          <Route
            exact
            path="/discover"
            render={({ match }) => (
              <DiscoverPage
                playme={playSong}
                currentSong={playing}
                isPlaying={isPlaying}
                createPlaylist={createPlaylist}
                addToFav={addToFav}
                favorites={favorites}
                playNextSong={playNextSong}
                playNext={playNext}
              />
            )}
          />

          <Route exact path="/" render={() => <Redirect to="/discover" />} />
        </Switch>
      </main>
      <MusicPlayer
        switchSong={switchSong}
        currentSong={playing}
        isPlaying={isPlaying}
        toggleIsplaying={toggleIsplaying}
        song={playing}
      />
    </div>
  );
}
