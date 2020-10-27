import React, { Component } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
//modules
import axios from "axios";
import Client from "../utils/client";
// components
import Album from "../components/Album";
import Jumper from "../components/Jumper";
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

export default class AlbumPage extends Component {
  state = {
    albums: [],
    _dataFetched: false,
  };
  async componentDidMount() {
    try {
      const res = await Client.getAlbums();
      console.log(res.data);
      this.setState({ _dataFetched: true, albums: [...res.data] });
    } catch (error) {}
  }
  createAlbum = (album) => {
    return (
      <div className="con-1-2 mt-2">
        <Album key={album.id} {...album} />
      </div>
    );
  };

  render() {
    const { _dataFetched, albums } = this.state;

    if (!_dataFetched) {
      return <LoaderSuper />;
    }
    return (
      <div className="main_cont ">
        <Jumper />
        <motion.div variants={fadein} initial="initial" animate="final">
          {_dataFetched && (
            <div className="container-flex">
              {albums.map((album) => this.createAlbum(album))}
            </div>
          )}
        </motion.div>
      </div>
    );
  }
}
{
  /* <Route path="/albums" component={AlbumPage} /> */
}
