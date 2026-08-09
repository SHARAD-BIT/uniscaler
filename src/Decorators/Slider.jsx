"use client";
import Card from "../Utils/Card";
import "./styles/topCollege.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Slider = ({ title, des, CardItems, type }) => {
  const [slideCount, setSlideCount] = useState(3);
  useEffect(() => {
    const countHandler = () => {
      if (window.innerWidth < 768) {
        setSlideCount(1);
      }
      if (window.innerWidth < 1024 && window.innerWidth > 768) {
        setSlideCount(2);
      }
      if (window.innerWidth > 1024) {
        setSlideCount(3);
      }
    };
    countHandler();
    window.addEventListener("resize", countHandler);
    return () => {
      window.removeEventListener("resize", countHandler);
    };
  }, []);
  return (
    <section className="top-college">
      <h2>{title}</h2>
      <p> {des} </p>
      <Swiper
        className={`cardWrapper`}
        slidesPerView={slideCount}
        navigation={true}
        spaceBetween={30}
        modules={[Navigation]}
        pagination={{ clickable: true }}
      >
        {CardItems.map((item) => (
          <SwiperSlide key={item.title}>
            <Card {...item} type={type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
Slider.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
  CardItems: PropTypes.array.isRequired,
  type: PropTypes.string,
};
