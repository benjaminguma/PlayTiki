import React from "react";
import sprite2 from "../../images/svg/sprite2.svg";

export default function Nav2() {
  return (
    <nav className="nav2">
      <div className="container-def">
        <div className="heading-box">
          <div className="heading-box-1">
            <div
              className="nav2-icon-box"
              onClick={() => window.history.back()}
            >
              <svg className="nav-icon">
                <use xlinkHref={sprite2 + "#west-black-48dp"}></use>
              </svg>
            </div>
          </div>
          <div className="heading-box-2"></div>
        </div>
      </div>
    </nav>
  );
}
