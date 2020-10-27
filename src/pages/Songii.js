import Client from "../utils/client";
import Merger from "../components/higherComponents/Merger";
import SongPage from "./SongPage";
export default Merger(
  SongPage,
  (page) => Client.getSongs(30, page, null),
  true,
  "/songs"
);
