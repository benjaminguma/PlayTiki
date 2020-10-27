// takes a react component
// takes the name of the prop to generate the data eg "album" "songs" "artist"
// takes the required callback ef fetchsongs, fetchalbum or sth
// keeps track of songs fetched
// give songs to the component together with props to play the song
// each component knows what it expects
//  below the component rendered by juice you will have a load more button to load more data
// the load button ceases to appear when the server has brought all the data(not too necessary)
import React, { Component } from "react";
import LoaderSuper from "../LoaderSuper";

export default class Juice extends Component {
  constructor() {
    super();

    this.fetchData = async (page) => {
      this.setState({ loading: true });
      const { callback } = this.props;
      if (!callback) return;
      const { data } = this.state;
      const res = await callback(this.state.page);
      this.setState({
        data: [...data, ...res.data],
        _dataFetched: true,
        page: page,
        loading: false,
        has_submitted_playlist: false,
      });
    };
  }
  state = {
    _dataFetched: false,
    data: [],
    has_submitted_playlist: false,
    page: 0,
    loading: false,
  };

  playSong = (song, data) => {
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

  async componentDidMount() {
    try {
      this.fetchData(1);
    } catch (error) {
      // cancel and tell parent to show modal with error msg;
    }
  }
  changePage = (page) => {
    this.fetchData(page);
  };
  // async componentDidUpdate(props, state) {
  //   if (state.page !== this.state.page) this.fetchData(this.state.page);
  // }

  render() {
    const { Component } = this.props;
    const { _dataFetched } = this.state;
    if (!_dataFetched) {
      return <LoaderSuper />;
    }

    return (
      <Component
        data={this.state.data}
        changePage={this.fetchData}
        page={this.state.page}
        loading={this.state.loading}
        playSong={this.playSong}
        {...this.props}
      />
    );
  }
}
