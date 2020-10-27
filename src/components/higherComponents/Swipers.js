import React, { Component } from "react";
// swiper
import Swiper from "swiper/bundle";
// components
import Album from "../Album";

export default class Swipers extends Component {
  constructor(props) {
    super(props);

    this.swiper_ref = React.createRef();
  }
  componentDidMount() {
    this.swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      speed: 800,
      slidesPerView: 1,
      autoHeight: true,
      longSwipes: true,
      followFinger: true,
      loop: true,
      touchEventsTarget: "wrappar",
      longSwipes: true,
      allowTouchMove: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 150,
        modifier: 2,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      pagination: ".swiper-pagination",
      pagination: {
        el: ".swiper-pagination",
      },
      autoplay: {
        delay: 3000,
      },
    });
    this.swiper.on("autoplayStop", () => {
      setTimeout(() => {
        this.swiper.autoplay.start();
      }, 8000);
    });
  }
  render() {
    const { albums } = this.props;
    return (
      <section className="album-showcase">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {albums.map((album) => {
              return (
                <div key={album.id} className="swiper-slide">
                  <Album key={album.id} {...album} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </section>
    );
  }
}
