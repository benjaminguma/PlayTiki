import Client from "../utils/client";
import Merger from "../components/higherComponents/Merger";
import AlbumPage from "./AlbumPage";
export default Merger(
  AlbumPage,
  (page) => Client.getAlbums(8, page, null),
  true,
  "/albums"
);
