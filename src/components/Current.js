import React, { Component } from "react";
import { motion, AnimatePresence } from "framer-motion";

// components
import NAv2 from "./higherComponents/Nav2";
import Album from "./Album";
import Loader from "./Loader";
import Song from "./Song";
import Footer from "./Footer";
// images
import img6 from "../images/photos/6.jpg";
import img11 from "../images/photos/11.jpg";

const fadein = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.1,
      // transition orcestration
      when: "beforeChildren",
      staggerChildren: 0.06,
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
  hover: {
    scale: 1.007,
  },
};
export default class Current extends Component {
  state = {
    _dataFetched: false,
    data: [],
    songs: [],
    has_submitted_playlist: false,
    song: {},
    songClicked: false,
  };

  async componentDidMount() {
    const { id, callback } = this.props;
    try {
      const res = await callback(id);
      this.setState({
        data: res.data,
        _dataFetched: true,
        songs: res.data.songs,
      });
    } catch (error) {
      this.sendMessage();
      // handle error
    }
  }

  sendMessage = () => {
    const message =
      "an error occured while fetching songs please check your connection ";
    this.props.setModal(message);
  };
  playSong = (song_to_play) => {
    const { has_submitted_playlist, songClicked, song } = this.state;
    if (!has_submitted_playlist)
      this.props.createPlaylist([...this.state.songs]);
    if (song_to_play.id === song.id) return;
    this.setState({
      song: song_to_play,
      has_submitted_playlist: true,
      songClicked: !songClicked,
    });
  };

  componentDidUpdate(prev_props, prev_state) {
    let { songClicked, song } = this.state;
    if (songClicked !== prev_state.songClicked) {
      this.props.playSong(song);
    }
  }

  createSong = (song) => {
    return (
      <motion.div variants={song_hover}>
        <Song
          key={song.id}
          song={song}
          {...this.props}
          playSong={this.playSong}
        />
      </motion.div>
    );
  };

  render() {
    const { Component, img } = this.props;
    const { _dataFetched, data } = this.state;
    if (!_dataFetched)
      return (
        <div className="main_cont flex" style={{ position: "relative" }}>
          <div className="abs-cen">
            <Loader />
          </div>
        </div>
      );
    return (
      <AnimatePresence>
        <motion.div className="main_cont abs" variants={fadein} exit="initial">
          <NAv2 />
          <motion.div variants={fadein} initial="initial" animate="final">
            <section className="currently">
              <div className="currently-img">
                <img src={img === 6 ? img6 : img11} alt="null" />
              </div>
            </section>
            <div className="currently-pack">
              <div className="container-flex">
                <div className="con-2-3">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                  >
                    <Component {...data} />
                  </motion.div>
                </div>
              </div>
            </div>
            {data.songs.map((song) => {
              return (
                <motion.div key={song.id} className="container-flex">
                  <motion.div className="con-2-3">
                    {this.createSong(song)}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          <Footer />
        </motion.div>
      </AnimatePresence>
    );
  }
}
