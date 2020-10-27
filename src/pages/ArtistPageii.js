import ArtistPage from "./ArtistPage";
import Merger from "../components/higherComponents/Merger";
import Client from "../utils/client";
export default Merger(
  ArtistPage,
  (page) => Client.getArtists(24, page, null),
  true,
  "/artists"
);
