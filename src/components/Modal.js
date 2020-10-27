import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import blob from "../images/svg/blob.svg";
import errorImg from "../images/svg/error.svg";
import alert from "../images/svg/alert.svg";

const fade_in = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,

    transition: {
      duration: 1,
      delay: 2.7,
      when: "beforeChildren",
      staggerChildren: 10,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const bluppy = {
  initial: {
    scale: 0,
    rotate: 180,
  },

  final: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      duration: 0.23,
      mass: 0.4,
      stifness: 200,
      damping: 5.4,
    },
  },
};

export default function Modal({ error, showModal, message, toggleModal }) {
  const resolveIcon = () => {
    if (error) return errorImg;
    return alert;
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          variants={fade_in}
          className="modal"
          initial="initial"
          onClick={() => toggleModal()}
          animate="final"
          exit="exit"
        >
          <div className="modal-wrapper">
            <svg className="modal-bg">
              <use xlinkHref={blob + "#bolb"}></use>
            </svg>
            <div className="modal-content">
              <div className="modal-alert-img">
                <motion.div variants={bluppy}>
                  <img src={resolveIcon()} alt="alert_icon" />
                </motion.div>
              </div>
              <p className="mb-2 u-center light">{message}</p>
              <div onClick={() => toggleModal()} className="u-center">
                <button className="btn-xlarge next">continue</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
