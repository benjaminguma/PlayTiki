import React, { Component } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Song from "../components/Song";

const fadein = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
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

export default class Favorite extends Component {
  state = {
    has_submitted_playlist: false,
  };
  createSong = (song) => {
    return (
      <AnimatePresence>
        {
          <motion.div variants={song_hover} exit="initial">
            <Song
              key={song.id}
              song={song}
              {...this.props}
              playSong={this.playSong}
            />
          </motion.div>
        }
      </AnimatePresence>
    );
  };

  componentWillUnmount() {
    this.setState({});
  }

  playSong = (song, data = this.props.favorites) => {
    //  data was passed too because this class may fetch albums songs or artists
    // this.props.createplaylist takes only array of songs
    // so attimes this.stste.data may not contain songs so it has to be explicitly passed
    const { has_submitted_playlist } = this.state;
    if (!has_submitted_playlist) {
      if (data) {
        this.props.createPlaylist([...data].concat());
      } else this.props.createPlaylist([...this.state.data].concat());
      this.setState({ has_submitted_playlist: true }, () => {
        this.props.playme(song);
      });
    } else {
      this.props.playme(song);
    }
  };
  render() {
    return (
      <div className="main_cont">
        <section className="showcase-title">
          <div className="container-flex">
            <div className="con-3-4">
              <div className="heading-box">
                <div className="heading-box-1">
                  <h2 className="acc1 heading-small">favorites</h2>
                </div>
                <div className="heading-box-2"></div>
              </div>
            </div>
          </div>
        </section>

        <motion.div variants={fadein} initial="initial" animate="final">
          {this.props.favorites.map((da, index) => {
            return (
              <div key={index} className="container-flex">
                <div className="con-3-4">{this.createSong(da)}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  }
}
