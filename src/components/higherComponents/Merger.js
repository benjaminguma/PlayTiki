import React, { Component } from "react";

//components
import LoaderSuper from "../LoaderSuper";

export default function Merger(
  WrappedComponent,
  callback,
  //   load_button_show is because for the search page i dont want the loadmore button to display so that it doesnt fetch search results again and duplicate the data
  load_button_show = true,
  pathname = ""
) {
  return class extends Component {
    constructor() {
      super();

      this.fetchData = async (page) => {
        // for nested routes in other component so that data fetching does not occur
        if (window.location.pathname !== pathname) {
          console.log({ pathname });
          this.setState({ _dataFetched: true });
          return;
        }
        this.setState({ loading: true });
        const { data, callback } = this.state;
        // state uses previous page number to fetch data before setting state.page to the page arg passed to this.fetchData
        const res = await callback(this.state.page);
        console.log(data);

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
      callback,
    };

    async componentDidMount() {
      // let page = 0;
      // const { cached, count } = this.props;
      // if (cached.length) page = cached.length / count;
      // if (cached.length) {
      //   return this.setState({ page, data: [...cached], _dataFetched: true });
      // }
      try {
        this.fetchData(1);
        // prev 1
      } catch (error) {
        // cancel and tell parent to show modal with error msg;
      }
    }
    changePage = (page) => {
      this.fetchData(page);
    };
    componentWillUnmount() {
      // if (dispatchOnUnmount) this.props.dispatchContent([...this.state.data]);
    }

    render() {
      const { _dataFetched } = this.state;
      if (!_dataFetched) {
        return <LoaderSuper />;
      }

      return (
        <WrappedComponent
          key={2}
          data={this.state.data}
          changePage={this.fetchData}
          page={this.state.page}
          currentSong={this.props.currentSong}
          loading={this.state.loading}
          playSong={this.props.playme}
          showLoadButton={
            window.location.pathname !== pathname ? false : load_button_show
          }
          {...this.props}
        />
      );
    }
  };
}
