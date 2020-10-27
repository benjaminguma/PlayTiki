import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  show: {
    scaleY: 1,
    opacity: 1,
    originX: 0.5,
    originY: 0,
  },
  hide: {
    scaleY: 0,
    originX: 0.5,
    originY: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
export default function Jumper({ showJumper }) {
  return (
    <AnimatePresence>
      {showJumper && (
        <motion.div variants={variants} animate="show" exit="hide">
          <div className="jumper">
            <div className="container-def">
              <div className="heading-box">
                <div className="heading-box-1">
                  <h2 className="grey heading-small">
                    trending albums and songs
                  </h2>
                </div>
                <div className="heading-box-2">
                  <Link to="/songs" style={{ color: "#fff" }}>
                    <button className="btn-large next">see all songs</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
