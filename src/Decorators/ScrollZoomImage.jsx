"use client";
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "@/Utils/StateLink";

import "./styles/scrollZoom.css";

const ScrollZoomSection = ({ data }) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const scrollAmount = Math.min(
          Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
          1
        );
        setScrollProgress(scrollAmount);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const zoomScale = 1 + scrollProgress * 0.5; // up to 1.5x zoom

  return (
    <section ref={sectionRef} className="zoomImage-section">
      <div className="zoomImage-container">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} style={{ height: "400px" }}>
              <>
                <div className="zoomImage-imageWrapper">
                  <Link href={`/college-details/${item.name.replace(/\s/g, "-")}`}
                    state={item}
                    key={index}
                    className="popular-college-img"
                  >
                    <picture>
                      {/*
                        `fill` resolves against .zoomImage-imageWrapper, which
                        scrollZoom.css already sets to position:relative with
                        overflow:hidden — the same box the 100%/100% img filled
                        before. The scroll-driven transform stays inline
                        because it changes on every scroll frame.
                      */}
                      <Image
                        style={{
                          ...styles.image,
                          transform: `scale(${zoomScale})`,
                        }}
                        loading="lazy"
                        src={item.img}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 900px"
                      />
                    </picture>

                    <div className="zoom-image">
                      <h3 className="zoom-text">{item.name}</h3>
                      <p style={{ margin: 0, fontSize: "1rem" }}>
                        {item.location}
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const styles = {
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "18vw",
    transition: "transform 0.3s ease-out",
    willChange: "transform",
  },
};

export default ScrollZoomSection;
