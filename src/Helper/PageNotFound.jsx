"use client";
import { useEffect, useRef } from "react";
import "./styles/notFound.css";
import Link from "next/link";

import pnf1Src from "../assets/pnf-1.png";

const pnf1 = pnf1Src.src;
import pnf2Src from "../assets/pnf-2.png";

const pnf2 = pnf2Src.src;
import pnf3Src from "../assets/pnf-3.png";

const pnf3 = pnf3Src.src;
import pnf4Src from "../assets/pnf-4.png";

const pnf4 = pnf4Src.src;
import pnf5Src from "../assets/pnf-5.png";

const pnf5 = pnf5Src.src;
const PageNotFound = () => {
  const image = useRef();
  const imageHandler = (e) => {
    image.current.src = e.target.src;
    localStorage.setItem("image", e.target.src);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      localStorage.getItem("image") !== undefined &&
      localStorage.getItem("image") !== null
    ) {
      image.current.src = localStorage.getItem("image");
    } else {
      image.current.src = pnf1;
    }
  }, []);
  return (
    <section className="main top">
      <div className="text-404">
        <h1>4 X 4</h1>
        <h2>Page not found!</h2>
        <div className="back-btn">
          <Link href="/">Go Back</Link>
        </div>
      </div>
      <div className="image">
        <img ref={image} id="big_image" src={pnf1} alt="astronaut" />
      </div>
      <div className="image-box">
        <img
          className="small_image active"
          src={pnf1}
          style={{ maxWidth: "50%", animationDelay: "800ms" }}
          alt="astronaut"
          onClick={imageHandler}
        />

        <img
          className="small_image"
          src={pnf2}
          style={{ maxWidth: "80%", animationDelay: "900ms" }}
          alt="ghost image"
          onClick={imageHandler}
        />
        <img
          className="small_image"
          src={pnf3}
          style={{ maxWidth: "50%", animationDelay: "1000ms" }}
          alt="girl"
          onClick={imageHandler}
        />
        <img
          className="small_image"
          src={pnf4}
          style={{ maxWidth: "70%", animationDelay: "1100ms" }}
          alt="mirror Glance"
          onClick={imageHandler}
        />
        <img
          className="small_image"
          src={pnf5}
          style={{ maxWidth: "80%", animationDelay: "1200ms" }}
          alt="boy search"
          onClick={imageHandler}
        />
      </div>
    </section>
  );
};

export default PageNotFound;
