import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
// utils
import Client from "../utils/client";

// components
import ArtistPage from "./ArtistPage";
import AlbumPage from "./AlbumPage";
import SongPage from "./SongPage";
import Merger from "../components/higherComponents/Merger";
import Nav2 from "../components/higherComponents/Nav2";
export default function SearchPage({ searchKey, ...restProps }) {
  let getArtist = (key) => Client.search(searchKey, "artists", 0, 0);
  let getAlbum = (key) => Client.search(searchKey, "albums", 0, 0);
  let getSongs = (key) => Client.search(searchKey, "songs", 0, 0);

  const [Art, setArt] = useState(() =>
    Merger(ArtistPage, getArtist, false, "/search")
  );

  const [Alb, setAlb] = useState(() =>
    Merger(AlbumPage, getAlbum, false, "/search")
  );
  const [Son, setSong] = useState(() =>
    Merger(SongPage, getSongs, false, "/search")
  );

  useEffect(() => {
    setSong(() => Merger(SongPage, getSongs, false, "/search"));
    setAlb(() => Merger(AlbumPage, getAlbum, false, "/search"));
    setArt(() => Merger(ArtistPage, getArtist, false, "/search"));

    return () => {
      setSong(null);
      setAlb(null);
      setArt(null);
    };
  }, [searchKey]);

  if (!searchKey.length) return <Redirect to="/" />;
  return (
    <div id="main_cont">
      <Nav2 />
      {searchKey && (
        <div className="container-main u-center mt-2">
          <h1 className="heading-large">
            showing results for <span className="acc1">"{searchKey}"</span>
          </h1>
        </div>
      )}

      <TabsPack tabs={["songs", "albums", "artists"]}>
        <Son {...restProps} />
        <Alb />
        <Art />
      </TabsPack>
    </div>
  );
}

function TabsPack({ children, tabs }) {
  const [count, setCount] = useState(0);

  const Pikins = React.Children.toArray(children);

  return (
    <React.Fragment>
      <div className="search-tab">
        {Pikins.map((child, i) => (
          <button
            key={i}
            className={`search-tab-btn ${count === i ? "active" : ""}`}
            onClick={() => setCount(i)}
          >
            {tabs[i]}
          </button>
        ))}
      </div>
      {Pikins[count]}
    </React.Fragment>
  );
}
