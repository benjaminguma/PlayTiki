import React from "react";


export default function ArtistShowcase({ trueUri, artists, title }) {
  const getArtists = (artists) => {
    if (!artists.length) return artists;

    return artists.join(",");
  };
  if (!artists) {
    return null;
  }
  return (
    <>
      <figure className="artist_img round">
        <img src={trueUri} />
      </figure>
      <div className="artist_song_des">
        <p className="bold">{title}</p>
        <p className="light">{getArtists(artists)}</p>
      </div>
    </>
  );
}
