import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Media from "react-media";

import SearchBar from "../SearchBar";
import ziggy from "../../images/svg/ziggy.svg";
import sprite from "../../images/svg/sprite.svg";
import sprite2 from "../../images/svg/sprite2.svg";
import search from "../../images/svg/search-black-48dp.svg";

const variant = {
  initial: {
    scale: 4,
    y: 70,
    backgroundColor: "#fe0095",
  },
  final: {
    scale: 1,
    x: "50%",
    y: "-50%",
    backgroundColor: "#2392f5",

    transition: {
      duration: 0.4,
      type: "spring",
      yoyo: 2,
    },
  },
  exit: {
    opacity: 0,
  },
};
const var2 = {
  initial: {
    opacity: 0,
    y: "-100%",
  },
  animate: {
    y: "0%",
    opacity: 1,
  },

  exit: {
    y: "-100%",
    opacity: 0,
  },
};

export default function Header({ favorites, setSearchKey }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [text, setText] = useState("");
  const getFavoriteCount = () => {
    const lent = favorites.length;

    return (
      <AnimatePresence>
        {lent && (
          <motion.span
            className={`nav-notification round`}
            // style={{ position: "static" }}
            variants={variant}
            initial="initial"
            animate="final"
            exit="exit"
          >
            {lent}
          </motion.span>
        )}
      </AnimatePresence>
    );
  };

  if (searchOpen) {
    return (
      <SearchBar
        showBack={true}
        setSearchKey={setSearchKey}
        text={text}
        setText={(text) => setText(text)}
        toggleSearchOpen={() => setSearchOpen(false)}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.header
        variants={var2}
        initial="initial"
        animate="animate"
        exit="exit"
        className="header"
      >
        <div className="container">
          <div className="header-logo u-center">
            <Link to="/">
              <img src={ziggy} alt="play-tiki-logo" />
            </Link>
          </div>
          <nav className="nav">
            <Media query={{ maxWidth: 500 }}>
              {(matches) =>
                matches ? (
                  <button
                    className="input-button-small"
                    onClick={() => setSearchOpen(true)}
                  >
                    <svg className="input-svg">
                      <use xlinkHref={search + "#search-black-48dp"}></use>
                    </svg>
                  </button>
                ) : (
                  <SearchBar
                    text={text}
                    setSearchKey={setSearchKey}
                    setText={(text) => setText(text)}
                    showBack={false}
                  />
                )
              }
            </Media>

            <ul className="nav-list">
              <li className="nav-list-item">
                <img className="round" src="/images/img2.jpg" alt="prof" />
              </li>
              <li className="nav-list-item">
                <Link to="#" href="">
                  <svg className="nav-icon">
                    <use
                      xlinkHref={sprite2 + "#notifications_none-black-48dp"}
                    ></use>
                  </svg>
                </Link>
                <span className="nav-notification round">2</span>
              </li>

              <Media query={{ maxWidth: 900 }}>
                {(matches) =>
                  matches && (
                    <li className="nav-list-item">
                      <Link to="/favorites" href="/favorites">
                        <svg className="nav-icon">
                          <use
                            xlinkHref={sprite + "#favorite-black-48dp"}
                          ></use>
                        </svg>
                      </Link>

                      {getFavoriteCount()}
                    </li>
                  )
                }
              </Media>
            </ul>
          </nav>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
