import React from "react";

export default function LoadButton({ loadMore, showLoadButton }) {
  return showLoadButton ? (
    <button
      className="btn-xlarge white mb-3 mt-2"
      style={{ color: "#fff" }}
      onClick={() => loadMore()}
    >
      load more
    </button>
  ) : null;
}
