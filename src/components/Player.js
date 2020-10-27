import React, { Component } from "react";
import Media from "react-media";
// images
import Logo from "../images/photos/logo1.png";
import sprite from "../images/svg/sprite.svg";
import sprite2 from "../images/svg/sprite2.svg";

//utils
import {
  getSongTime,
  getPlayerGradient,
  keyboardEventsHandler,
} from "../utils/utils";

//image
// import imgSprite from "../images/sprite.svg";
import PropTypes from "prop-types";

//components
import ArtistShowcase from "./ArtistShowcase";
import Pause_Play_btn from "./Pause_Play_btn";
import Loader from "./Loader";

//test audio
export default class Player extends Component {
  constructor(props) {
    super(props);
    this.audio = null;
    this.canvas = null;
    this.state = {
      _playState: "locked",
      _volume: 0.5,
      _currentTime: 0,
      _repeat: false,
      duration: 0,
    };
  }
  setAudioRef = (element) => {
    this.audio = element;
  };
  setCanvasRef = (element) => {
    this.canvas = element;
  };

  static propTypes = {
    song: PropTypes.object,
  };

  prepareAudioConfig = () => {
    const song_src = this.props.currentSong.preview;
    if (song_src) {
      this.audio.src = "/music/" + song_src;
    }
    // when audio loads this will trigger handleloadeddata()
    this.setState({ _playState: "loading" }, () => {
      this.audio.load();
    });
    return this;
  };

  frameLooper = () => {
    if (window.innerWidth < 690) return;
    let { _playState } = this.state;
    if (_playState === "playing") {
      requestAnimationFrame(this.frameLooper);
    }
    //create a unit 8 (eah element is an unsigned 8 bits) of size analyser.frequencyBinCount which is half the size of the fft array
    // this.analyser.frequencyBinCount
    let fbc_array = new Uint8Array(300);
    // put fft values into the array
    this.analyser.getByteFrequencyData(fbc_array);
    // console.log("run");
    // try catch is for widow resize so that on small phones it doesnt show bars
    try {
      this.ctx.fillStyle = "#170846";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } catch (error) {
      return;
    }
    const bars = 285,
      bar_width = 2;
    let start = 0;
    for (let i = 0; i < bars; i++) {
      start = i * 4;
      //create a gradient for the  whole canvas
      let gradient = this.ctx.createLinearGradient(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      gradient.addColorStop(0.0, "#2392f5");
      gradient.addColorStop(0.5, "#fe0095");
      gradient.addColorStop(1.0, "purple");

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(
        start,
        this.canvas.height,
        bar_width,
        -fbc_array[i] / 2.2
      );
    }
  };

  handleLoadedData = (e) => {
    // get song length thesame as this.audio.duration
    const music_duration = e.currentTarget.duration;
    if (this.canvas) this.ctx = this.canvas.getContext("2d");
    // this.setState({ _playState: "playing", duration: music_duration });

    this.handlePlay();
    return this;

    // setTimeout(() => {
    //   this.setState({ _playState: "ready", duration: music_duration });
    // }, 5000);
  };

  togglePlay = () => {
    const { isPlaying } = this.props;
    if (isPlaying) {
      this.handlePlay();
    }
  };

  handlePlay = (e) => {
    if (e?.currentTarget) {
      e.persist();
    }
    const contxt = new AudioContext();
    // if analyser node has not been connected to this.audio create it
    if (!this.analyser) {
      this.ctx = this.canvas && this.canvas.getContext("2d");
      this.analyser = contxt.createAnalyser();
      this.source = contxt.createMediaElementSource(this.audio);
      this.source.connect(this.analyser);
      this.analyser.connect(contxt.destination);
    }
    this.audio.play();
    //after setting playstate start drawing on canvas
    this.setState(
      (state) => {
        return {
          _playState: "playing",
          duration: this.props.currentSong.duration,
        };
      },
      () => {
        this.canvas && this.frameLooper();
      }
    );
  };

  handlePause = () => {
    this.audio.pause();
    this.setState({ _playState: "paused" });
  };

  handleMusicSeek = (e) => {
    //get the current playing music's time and duration
    let { duration } = this.state;
    //convert value of range  input to percentage
    const percentage = e.currentTarget.value / 100;
    // set the audios current time to this percentage this will trigger a call to this.handletimeupdate
    this.audio.currentTime = percentage * duration;
  };

  handleTimeUpdate = (e) => {
    const current_music_time = this.audio.currentTime;
    let { _playState, duration } = this.state;
    //ensures that current_time is not 0 first if not overlay no go appear
    if (current_music_time && current_music_time === duration) {
      // the strict equal to comarison above is to show that the song has ended so that playstate is paused
      _playState = "paused";
    }

    this.setState((state) => {
      return { _currentTime: current_music_time, _playState };
    });
  };
  handleMusicEnded = (e) => {
    this.props.switchSong(1);
  };

  componentDidUpdate(prevProps, prevState) {
    const { _playState } = this.state;
    const { currentSong } = this.props;

    if (_playState === "locked" && currentSong.preview) {
      this.prepareAudioConfig();
      this.keysHandler = keyboardEventsHandler({
        next: () => this.props.switchSong(1),
        previous: () => this.props.switchSong(-1),
        toggle_play: () => this.props.toggleIsplaying(),
      });
      return;
    }

    if (this.props.isPlaying !== prevProps.isPlaying) {
      if (this.props.isPlaying) {
        this.handlePlay();
      } else {
        this.handlePause();
      }
      //song has either beeen paused or played
    }
    if (prevProps.currentSong !== this.props.currentSong) {
      // new song came
      this.prepareAudioConfig();
    }
  }

  render() {
    const { _currentTime, _playState, duration } = this.state;
    return (
      <div className="music_tab">
        <audio
          ref={this.setAudioRef}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleMusicEnded}
          onLoadedData={this.handleLoadedData}
          src=""
        ></audio>
        <Media query={{ minWidth: 800 }}>
          <div className="visualizer">
            <canvas ref={this.setCanvasRef} width={1140}></canvas>
          </div>
        </Media>

        <div className="player">
          <ArtistShowcase {...this.props.currentSong} />
          <div className="player_terminal">
            <div className="player_control_pack">
              <button onClick={() => this.props.switchSong(-1)}>
                <svg className="player_controls next">
                  <use xlinkHref={`${sprite}#skip_previous`}></use>
                </svg>
              </button>
              <Pause_Play_btn playState={_playState} {...this.props} />
              {/*   play pause buttons stay here */}
              <button onClick={() => this.props.switchSong(+1)}>
                <svg className="player_controls next">
                  <use xlinkHref={`${sprite}#skip_next-black`}></use>
                </svg>
              </button>
            </div>
            <div className="player_timer u-center">
              <span className="small">{getSongTime(_currentTime)}</span>
              <input
                style={{
                  backgroundImage: getPlayerGradient(_currentTime, duration),
                }}
                onChange={this.handleMusicSeek}
                className="player_range"
                type="range"
                name="ranger"
                min="0"
                value={(_currentTime / duration) * 100 || 0}
                max="100"
              />
              <span className="small">
                {"-" + getSongTime(duration - _currentTime)}
              </span>
            </div>
          </div>
          <div className="player_playlist_controls">
            <button>
              <svg className="small next circle">
                <use xlinkHref={`${sprite}#volume_up-white-48dp`}></use>
              </svg>
            </button>
            <button>
              <svg className="small next circle">
                <use xlinkHref={`${sprite}#replay-black-48dp`}></use>
              </svg>
            </button>
            <button>
              <svg className="small next circle">
                <use xlinkHref={`${sprite}#queue_music-black-48dp`}></use>
              </svg>
            </button>
          </div>
        </div>

        <Overlay playState={_playState} />
      </div>
    );
  }
}

function Overlay({ playState }) {
  const play_states = ["loading", "locked", "error"];
  if (play_states.includes(playState)) {
    return (
      <div className="overlay">
        <div className="overlay_content">
          <h1>POWERED BY</h1>
          <img src={Logo} alt="" />
          <div className="err"></div>
          <LoadingError playState={playState} />
        </div>
      </div>
    );
  } else return false;
}

function LoadingError({ playState }) {
  const chooseIcon = () => {
    if (playState == "locked") {
      return `${sprite2}#lock-black-48dp `;
    }
    return `${sprite}#replay-black-48dp`;
  };

  return {
    loading: <Loader />,
    locked: (
      <button className="play_btn round">
        <svg className="small next">
          <use xlinkHref={`${chooseIcon()}`}></use>
        </svg>
      </button>
    ),
  }[playState];
}
