import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Redirect } from "react-router-dom";
import sprite2 from "../images/svg/sprite2.svg";
import search from "../images/svg/search-black-48dp.svg";

const variant = {
  initial: {
    opacity: 0,
    y: "100%",
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

const SearchBar = ({
  showBack,
  text,
  setText,
  setSearchKey,
  toggleSearchOpen,
}) => {
  const [error, setError] = useState(false);
  const [redirect, setredirect] = useState(false);

  const getButton = () => {
    if (showBack)
      // this enables the search icon to be displayed as an arrow to close the search bar on smaller devices
      return (
        <div onClick={toggleSearchOpen}>
          <svg className="input-svg ml-1 mr-1">
            <use xlinkHref={sprite2 + "#west-black-48dp"}></use>
          </svg>
        </div>
      );

    return (
      <div>
        <svg className="input-svg">
          <use xlinkHref={search + "#search-black-48dp"}></use>
        </svg>
      </div>
    );
  };
  const disabledClass = () => {
    return error ? "disabled" : "";
  };

  const handleChange = (e) => {
    const value = e.target.value;

    let err = false;
    if (/[^\w\s]/.test(value.trim())) {
      err = true;
    } else if (value.trim() != "" && value.trim().length < 3) {
      err = true;
    } else {
      err = false;
    }
    setError(err);

    setText(value);
  };
  const handleSubmit = () => {
    setredirect(true);
    setSearchKey(text);
    // this prvents the search page from automatically going to fetch data from the data_base when the search route is hit and the value of the search field is changed
    setTimeout(() => setredirect(false), 400);
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variant}
        initial="initial"
        animate="animate"
        exit="exit"
        className="nav-search-wrappar"
      >
        <div className="nav-search">
          {getButton()}
          <input
            className="nav-input"
            type="text"
            name="search"
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            value={text}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="search for a song,album e.t.c"
          />
          {redirect && !error && text ? (
            <Redirect
              to={{
                pathname: "/search",
                state: {
                  key: text,
                },
              }}
            />
          ) : (
            ""
          )}
          <button
            disabled={error}
            onClick={handleSubmit}
            className={`next `}
            id={disabledClass()}
          >
            search
          </button>
        </div>
        {error && (
          <small className="error acc1 ">
            {" "}
            3 characters at least no special symbols :{")"}
          </small>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchBar;
