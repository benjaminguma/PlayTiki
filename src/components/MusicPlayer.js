import React, { Component } from "react";
import PropTypes from "prop-types";
import Player from "./Player";

export default class MusicPlayer extends Component {
  static propTypes = {
    song: PropTypes.object,
  };

  render() {
    return <Player {...this.props} />;
  }
}
