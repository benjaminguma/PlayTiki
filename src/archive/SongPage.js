import React, { Component } from "react";
import Loader from "../components/Loader";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// utils
import Client from "../utils/client";

//components
import Song from "../components/Song";
import LoaderSuper from "../components/LoaderSuper";

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
};

const song_hover = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
  },
};

export default class SongPage extends Component {
  constructor() {
    super();

    this.fetchData = async (page) => {
      const { songs } = this.state;
      const res = await Client.getSongs(30, page, null);
      this.setState({
        songs: [...songs, ...res.data],
        _dataFetched: true,
        page: page,
        loading: false,
        has_submitted_playlist: false,
      });
    };
  }
  state = {
    _dataFetched: false,
    songs: [],
    has_submitted_playlist: false,
    page: 1,
    loading: false,
  };
  playSong = (song) => {
    const { has_submitted_playlist } = this.state;
    if (!has_submitted_playlist) {
      this.props.createPlaylist([...this.state.songs].concat());
      this.setState({ has_submitted_playlist: true }, () => {
        this.props.playme(song);
      });
    } else {
      this.props.playme(song);
    }
  };

  createSong = (song) => {
    return (
      <motion.div variants={song_hover} whileHover="hover">
        <Song
          key={song.id}
          song={song}
          {...this.props}
          playSong={this.playSong}
        />
      </motion.div>
    );
  };

  async componentDidMount() {
    try {
      this.fetchData(1);
    } catch (error) {
      // cancel and tell parent to show modal with error msg;
    }
  }
  async componentDidUpdate(props, state) {
    if (state.page != this.state.page) this.fetchData(this.state.page);
  }

  render() {
    const { _dataFetched } = this.state;
    if (!_dataFetched) {
      return <LoaderSuper />;
    }
    return (
      <div className="main_cont ">
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
        <motion.div variants={fadein} initial="initial" animate="final">
          {this.state.songs.map((da, index) => {
            return (
              <div key={index} className="container-flex">
                <div className="con-3-4">{this.createSong(da)}</div>
              </div>
            );
          })}
        </motion.div>
        <div className="u-center" style={{ padding: "1.5rem" }}>
          {this.state.loading ? (
            <Loader />
          ) : (
            <button
              className="btn-xlarge white"
              style={{ color: "#fff" }}
              onClick={() =>
                this.setState({ page: this.state.page + 1, loading: true })
              }
            >
              load more
            </button>
          )}
        </div>
      </div>
    );
  }
}
{
  /* <Route
                exact
                path="/songs"
                render={({ match }) => (
                  <SongPage
                    playme={this.playSong}
                    currentSong={playing}
                    isPlaying={isPlaying}
                    createPlaylist={this.createPlaylist}
                    setModal={this.setModal}
                    addToFav={this.addToFav}
                    favorites={favorites}
                  />
                )}
              /> */
}

// export default class App extends Component {
//   state = {
//     playlist: [],
//     playing: {},
//     next: null,
//     isPlaying: false,
//     favorites: [],

//     showModal: true,
//     modal_err: false,
//     message: "continue to accept cookies from this site ...Enjoy!!!",
//   };
//   createPlaylist = (songs) => {
//     this.setState({ playlist: songs });
//   };

//   setModal = (message, err = true) =>
//     this.setState({ message, showModal: true, modal_err: err });

//   toggleModal = () => this.setState({ showModal: false });

//   addToFav = (song) => {
//     let { favorites } = this.state;
//     // if your favorites are more than 7 then prompt an error
//     if (favorites.length > 7) {
//       return this.setModal(
//         "you can only have 7 favorite songs...please decrease your selection and try again"
//       );
//     }
//     if (!favorites.some(({ id }) => id === song.id))
//       return this.setState({ favorites: favorites.concat([song]) });

//     favorites = favorites.filter(({ id }) => id !== song.id);
//     this.setState({ favorites });
//   };

//   playSong = (song) => {
//     const song_id = song.id,
//       current_song = this.state.playing;
//     // if the song to be played is the same as the current song pause import PropTypes from 'prop-types'
//     if (song_id === current_song.id) {
//       alert("ok");
//       return;
//     }
//     //know index of song
//     const song_index = this.state.playlist.findIndex(
//       (song) => song.id == song_id
//     );

//     this.setState({ playing: { index: song_index, ...song }, isPlaying: true });
//   };

//   toggleIsplaying = () => {
//     const { isPlaying } = this.state;
//     this.setState({ isPlaying: !isPlaying });
//   };

//   switchSong = (num) => {
//     let { index } = this.state.playing,
//       playlist_length = this.state.playlist.length;
//     //  ensures that our next song is not more than array length
//     index = (index + num) % playlist_length;

//     index = index < 0 ? 1 : index;
//     // set next song to play using index;
//     this.setState({ playing: { ...this.state.playlist[index], index } });
//   };

//   render() {
//     const {
//       playlist,
//       playing,
//       next,
//       isPlaying,
//       favorites,
//       message,
//       showModal,
//       modal_err,
//     } = this.state;

//     return (
//       <div className="app-container">
//         <Header favorites={favorites} />
//         <main className="main" id="main">
//           <Modal
//             showModal={showModal}
//             toggleModal={this.toggleModal}
//             error={modal_err}
//             message={message}
//           />
//           <Sidebar favorites={favorites} />
//           <AnimatePresence exitBeforeEnter>
//             <Switch>
//               {/* <Route
//                 path="/artists/:id"
//                 render={({ match }) => {
//                   return (
//                     <Current
//                       id={match.params.id}
//                       playme={this.playSong}
//                       currentSong={playing}
//                       isPlaying={isPlaying}
//                       createPlaylist={this.createPlaylist}
//                       setModal={this.setModal}
//                       callback={(id) => Client.getArtistSongs(id)}
//                       Component={Album2}
//                       addToFav={this.addToFav}
//                       favorites={favorites}
//                       img={11}
//                     />
//                   );
//                 }}
//               /> */}

//               <Route path="/artists">
//                 <Juice
//                   playme={this.playSong}
//                   currentSong={playing}
//                   isPlaying={isPlaying}
//                   createPlaylist={this.createPlaylist}
//                   Component={ArtistPageii}
//                   callback={(page) => Client.getArtists(28, page, null)}
//                   setModal={this.setModal}
//                   addToFav={this.addToFav}
//                   favorites={favorites}
//                 />
//               </Route>

//               <Route path="/albums">
//                 <AlbumPageii
//                   playme={this.playSong}
//                   currentSong={playing}
//                   isPlaying={isPlaying}
//                   createPlaylist={this.createPlaylist}
//                   setModal={this.setModal}
//                   addToFav={this.addToFav}
//                   favorites={favorites}
//                 />
//               </Route>
//               <Route
//                 exact
//                 path="/songs"
//                 render={({ match }) => (
//                   <Songii
//                     playme={this.playSong}
//                     currentSong={playing}
//                     isPlaying={isPlaying}
//                     createPlaylist={this.createPlaylist}
//                     setModal={this.setModal}
//                     addToFav={this.addToFav}
//                     favorites={favorites}
//                   />
//                 )}
//               />

//               <Route path="/favorites">
//                 <Favorite
//                   favorites={favorites}
//                   addToFav={this.addToFav}
//                   playme={this.playSong}
//                   currentSong={playing}
//                   isPlaying={isPlaying}
//                   createPlaylist={this.createPlaylist}
//                 />
//               </Route>

//               <Route
//                 exact
//                 path="/discover"
//                 render={({ match }) => (
//                   <DiscoverPage
//                     playme={this.playSong}
//                     currentSong={playing}
//                     isPlaying={isPlaying}
//                     createPlaylist={this.createPlaylist}
//                     addToFav={this.addToFav}
//                     favorites={favorites}
//                   />
//                 )}
//               />

//               <Route
//                 exact
//                 path="/"
//                 render={() => <Redirect to="/discover" />}
//               />
//             </Switch>
//           </AnimatePresence>
//         </main>
//         <MusicPlayer
//           switchSong={this.switchSong}
//           currentSong={playing}
//           isPlaying={isPlaying}
//           toggleIsplaying={this.toggleIsplaying}
//           song={playing}
//         />
//       </div>
//     );
//   }
// }
