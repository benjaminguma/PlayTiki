import React from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Media from "react-media";
import twitter from "../../images/socials/icon-twitter.svg";
import whatsapp from "../../images/socials/icon-whatsapp.svg";
import github from "../../images/socials/icon-github.svg";
import sprite from "../../images/svg/sprite.svg";
const variant = {
  initial: {
    scale: 3,
    backgroundColor: "#fe0095",
    y: 10,
  },
  final: {
    scale: 1,
    backgroundColor: "#2392f5",
    y: 0,

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

export default function Sidebar({ favorites }) {
  const getFavoriteCount = () => {
    const lent = favorites.length;

    return (
      <AnimatePresence>
        {lent && (
          <motion.span
            className={`nav-notification round`}
            style={{ position: "static" }}
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
  return (
    <div className="sidebar">
      <ul className="sidebar-ul">
        <li className="sidebar-li temp sidebar-li-title">Recommended</li>
        <li className="sidebar-li">
          <NavLink to="/discover" className="sidebar-link" href="/discover">
            <svg className="sidebar-icon">
              <use xlinkHref={sprite + "#headset-24px"}></use>
            </svg>
            <span>discover music</span>
          </NavLink>
        </li>
        <Media query={{ minWidth: 500 }}>
          <li className="sidebar-li">
            <NavLink to="/radio" className="sidebar-link" href="/radio">
              <svg className="sidebar-icon">
                <use xlinkHref={sprite + "#tv-24px"}></use>
              </svg>
              <span>private radio</span>
            </NavLink>
          </li>
        </Media>
        <li className="sidebar-li temp sidebar-li-title">my music</li>
        <li className="sidebar-li">
          <NavLink to="/songs" className="sidebar-link" href="/songs">
            <svg className="sidebar-icon">
              <use xlinkHref={sprite + "#music_note-black-24dp"}></use>
            </svg>
            <span>songs</span>
          </NavLink>
        </li>
        <li className="sidebar-li">
          <NavLink to="/albums" className="sidebar-link" href="/albums">
            <svg className="sidebar-icon">
              <use xlinkHref={sprite + "#folder_open-24px"}></use>
            </svg>
            <span>albums</span>
          </NavLink>
        </li>
        <li className="sidebar-li">
          <NavLink to="/artists" className="sidebar-link" href="/artists">
            <svg className="sidebar-icon">
              <use xlinkHref={sprite + "#music-playero"}></use>
            </svg>
            <span>artists</span>
          </NavLink>
        </li>
        <sidebar-ul></sidebar-ul>
        <li className="sidebar-li temp sidebar-li-title">songs list</li>
        <li className="sidebar-li">
          <NavLink to="/favorites" className="sidebar-link" href="#">
            <svg className="sidebar-icon">
              <use xlinkHref={sprite + "#favorite-black-48dp"}></use>
            </svg>
            <span>favorites</span>
            {getFavoriteCount()}
          </NavLink>
        </li>
        <li className="sidebar-li">
          <NavLink to="/downloads" className="sidebar-link" href="#">
            <svg className="sidebar-icon">
              <use
                xlinkHref={sprite + "#vertical_align_bottom-black-48dp"}
              ></use>
            </svg>
            <span>downloads</span>
          </NavLink>
        </li>
        <div className="sidebar-socials">
          <a
            className="sidebar-icon next"
            href="https://twitter.com/benjaminguma?s=09"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="" />
          </a>
          <a
            className="sidebar-icon next"
            href="https://github.com/benjaminguma"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="" />
          </a>
          <a
            className="sidebar-icon next"
            href="https://wa.me/2348141908042?text=hello%20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={whatsapp} alt="" />
          </a>
        </div>
      </ul>
    </div>
  );
}
