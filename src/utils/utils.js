const getSongTime = (music_time) => {
  const mins = Math.floor(music_time / 60);
  let secs = Math.floor(music_time % 60);

  if (secs < 10) secs = `0${secs}`;

  return `${mins}:${secs}`;
};
const getPlayerGradient = (music_currentime, music_duration) => {
  let percentage = (music_currentime / music_duration) * 100;
  return ` linear-gradient(
        90deg,
        #2392f5 0%,
        #d90ebc,
        #fe0095 ${percentage}%,
        #29165e ${percentage + 1}%
      )`;
};

function clickOut() {
  const exit = () => {
    const el = document.querySelector("input[type='radio']:checked");
    if (el) {
      el.checked = false;
    }
  };
  window.addEventListener("click", exit);
  return { cancel: () => window.removeEventListener("click", exit) };
}

const keys = ["ARROWLEFT", "ARROWRIGHT", "KEYP"];

const keyboardEventsHandler = (_functions) => {
  const handler = (event) => {
    const { next, previous, toggle_play } = _functions;
    if (!keys.some((key) => key === event.code.toUpperCase())) return;

    switch (event.code.toUpperCase()) {
      case "ARROWLEFT":
        previous();
        break;

      case "ARROWRIGHT":
        next();
        break;
      case "KEYP":
        toggle_play();
        break;
      default:
        break;
    }
  };

  window.addEventListener("keydown", handler);

  return () => window.removeEventListener("keydown", handler);
};
export { getSongTime, getPlayerGradient, keyboardEventsHandler, clickOut };
