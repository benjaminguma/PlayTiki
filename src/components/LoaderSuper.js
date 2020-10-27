import React from "react";
import Loader from "./Loader";

export default function LoaderSuper() {
  return (
    <div className="main_cont flex" style={{ position: "relative" }}>
      <div className="abs-cen">
        <Loader />
      </div>
    </div>
  );
}
