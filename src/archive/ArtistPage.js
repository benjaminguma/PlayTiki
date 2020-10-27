import React, { Component } from "react";
import PropTypes from "prop-types";

//modules
import axios from "axios";
import { motion } from "framer-motion";
import Client from "../utils/client";
// components
import LoaderSuper from "../components/LoaderSuper";
import Artist from "../components/Artist";

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
export default class ArtistPage extends Component {
  state = {
    artists: [],
    _dataFetched: false,
  };
  async componentDidMount() {
    try {
      const res = await Client.getArtists();
      console.log(res);
      this.setState({ _dataFetched: true, artists: [...res.data] });
    } catch (error) {}
  }
  createArtist = (artist) => {
    return (
      <motion.div className="con-1-4 " variants={fadein}>
        <Artist key={artist.id} {...artist} />
      </motion.div>
    );
  };

  render() {
    const { _dataFetched, artists } = this.state;

    if (!_dataFetched) {
      return <LoaderSuper />;
    }

    return (
      <div className="main_cont">
        <motion.div variants={fadein} initial="initial" animate="final">
          <div className="container-flex">
            {artists.map((artist) => this.createArtist(artist))}
          </div>
        </motion.div>
      </div>
    );
  }
}
{
  /* <Route path="/artists" component={ArtistPage} /> */
}
