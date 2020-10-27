import React, { Component } from "react";
import { motion } from "framer-motion";
import Media from "react-media";
// modules
import Client from "../utils/client";
import axios from "axios";
// components
import Footer from "../components/Footer";
import LoaderSuper from "../components/LoaderSuper";
import Swipers from "../components/higherComponents/Swipers";
import Song from "../components/Song";
import Artist from "../components/Artist";
import Jumper from "../components/Jumper";
// imgs
import trend from "../images/svg/trend.svg";

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

export default class DiscoverPage extends Component {
  constructor(props) {
    super(props);
    this.fetchData = async () => {
      try {
        const [albums, songs, artists] = await axios.all([
          Client.getAlbums(3, 0, "2020"),
          Client.getSongs(10, 0, "2020"),
          Client.getArtists(7, 0),
          // album 5 0
          // song 10 1.5
          // artist 7 1
        ]);
        this.setState({
          _dataFetched: true,
          albums: albums.data,
          songs: songs.data,
          artists: artists.data,
        });
      } catch (error) {
        // do sth
      }
    };
    this.state = {
      _dataFetched: false,
      songs: [],
      albums: [],
      artists: [],
      showJumper: false,
    };
  }
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

  componentWillUnmount() {
    this.state = {};
  }

  async componentDidMount() {
    await this.fetchData();
  }
  createSong = (song) => {
    return (
      <motion.div key={song.id}>
        <Song song={song} {...this.props} playSong={this.playSong} />
      </motion.div>
    );
  };

  handleScroll = (e) => {
    const scrolli = e.target.scrollTop;
    clearInterval(this.iv);
    this.iv = setTimeout(() => {
      if (scrolli > 200) this.setState({ showJumper: true });
      if (scrolli < 200) {
        this.setState({ showJumper: false });
      }
    }, 300);
  };
  heading = () => {
    return (
      <>
        <span>
          <img className="nav-icon" src={trend} alt="trending" />
        </span>
        <h2 className="heading-small grey">
          <span className="cap acc2">trending</span> albums
        </h2>
      </>
    );
  };

  render() {
    const { _dataFetched, albums, songs, artists } = this.state;
    if (!_dataFetched) {
      return <LoaderSuper />;
    }
    return (
      <>
        <div className="main_cont bg-none" onScroll={this.handleScroll}>
          <motion.div
            variants={fadein}
            initial="initial"
            animate="final"
            className="con-3-41"
          >
            <Jumper showJumper={this.state.showJumper} />
            <section className="showcase-title">
              <div className="container-def">
                <h2 className="heading-small acc1 cap ml-2">discover </h2>
              </div>
            </section>
            <Media query={{ minWidth: 702 }}>
              <section className="some-heading">
                <div className="container-def">
                  <div className="heading-box">
                    <div className="heading-box-1">{this.heading()}</div>
                    <div className="heading-box-2">
                      <h2 className="heading-small grey mr-3">
                        <span className="cap">songs</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </section>
            </Media>

            <div className="container-flex mt-3  colum">
              <div className="con-1-21">
                <Media query={{ maxWidth: 702 }}>
                  <div
                    style={{ marginLeft: "2rem", marginBottom: "1.4rem" }}
                    className="container-def"
                  >
                    {this.heading()}
                  </div>
                </Media>
                <Swipers albums={albums} />
              </div>
              <div className="con-1-21">
                <Media query={{ maxWidth: 702 }}>
                  <div
                    style={{ marginLeft: "2rem", marginBottom: "1.4rem" }}
                    className="container-def "
                  >
                    <h2 className="heading-small grey mr-3">
                      <span className="cap">songs</span>
                    </h2>
                  </div>
                </Media>
                <section className="music-showcase">
                  {songs.map((song) => this.createSong(song))}
                </section>
              </div>
            </div>
            <section className="new-releases-showcase">
              <div className="container-def">
                <h2 className="heading-small acc2 cap mt-1 mb-2 ml-2">
                  new releases{" "}
                  <span className="grey">(recommended for you)</span>
                </h2>
              </div>

              <div className="container-flex">
                {artists.map((artist) => {
                  return (
                    <div key={artist.id} className="con-1-4">
                      <Artist {...artist} />
                    </div>
                  );
                })}
              </div>
            </section>
          </motion.div>
          <Footer />
        </div>
      </>
    );
  }
}
