import React from "react";
import { Link } from "react-router-dom";
import Socials from "./Socials";
// images
import footer_top from "../images/svg/footer-top.svg";
import footer_bottom from "../images/svg/footer-bottom.svg";
import Logo from "../images/photos/logo1.png";

const Footer = () => {
  return (
    <footer className="footer">
      <img
        className="footer-img footer-img-top"
        src={footer_top}
        alt="footer-img-top"
      />
      <header className="container-def u-center">
        <img className="footer-logo" src={Logo} alt="" />
      </header>
      <div className="container-def">
        <section className="footer-link-section ">
          <menu className="footer-link-pack ">
            <h5 className=" mb-1">Browse</h5>
            <Link href="/discover" to="/discover" className="footer-link">
              {" "}
              discover music
            </Link>
            <Link href="/artists" to="/artists" className="footer-link">
              {" "}
              artists
            </Link>
            <Link href="/albums" to="/albums" className="footer-link">
              {" "}
              albums
            </Link>
            <Link href="/songs" to="/songs" className="footer-link">
              {" "}
              songs
            </Link>
          </menu>

          <menu>
            <h5 className=" mb-1">Follow me</h5>
            <Socials
              links={["twitter", "instagram", "github"]}
              showShare={false}
            />
          </menu>
        </section>
      </div>

      <img
        className="footer-img footer-img-bottom"
        src={footer_bottom}
        alt="footer-img-bottom"
      />

      <div className="container-def u-center">
        <h2 className=" footer-copyright u-center mb-1">
          &copy; 2020 <span className="bold"> GUMAA's lab :)</span>
        </h2>
      </div>
    </footer>
  );
};
export default Footer;
