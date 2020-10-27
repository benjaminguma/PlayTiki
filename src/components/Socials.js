import React from "react";
import twitter from "../images/socials/icon-twitter.svg";
import instagram from "../images/socials/icon-instagram.svg";
import whatsapp from "../images/socials/icon-whatsapp.svg";
import facebook from "../images/socials/icon-facebook.svg";
import github from "../images/socials/icon-github.svg";

const socials = {
  twitter: {
    share:
      "https://twitter.com/intent/tweet?text=checkout%20this%20awesome%20music%20player%20http%3A//playtiki.herokuapp.com",
    profile: "https://twitter.com/benjaminguma?s=09",
    icon: twitter,
  },
  whatsapp: {
    share: "",
    profile: "https://wa.me/2348141908042?text=hello%20",
    icon: whatsapp,
  },
  instagram: {
    share: "",
    profile: "https://www.instagram.com/benjamin_guma/",
    icon: instagram,
  },
  facebook: {
    share:
      "https://www.facebook.com/sharer/sharer.php?u=checkout%20this%20awesome%20music%20player%20http%3A//playtiki.herokuapp.com",
    profile: "",
    icon: facebook,
  },
  github: {
    share: "",
    profile: "https://github.com/benjaminguma",
    icon: github,
  },
};
export default function Socials({
  links = ["twitter", "facebook", "whatsapp"],
  showShare = true,
  styles,
}) {
  return (
    <ul className="album-social" style={styles}>
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={showShare ? socials[link].share : socials[link].profile}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={socials[link].icon} alt={`_${link}`} />
          </a>
        </li>
      ))}
    </ul>
  );
}
