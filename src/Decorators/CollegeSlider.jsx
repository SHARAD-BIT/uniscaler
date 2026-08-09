"use client";
import img1Src from "../assets/s-logo-1.svg";
const img1 = img1Src.src;
import img2Src from "../assets/s-logo-2.jpg";

const img2 = img2Src.src;
import img3Src from "../assets/s-logo-3.jpg";

const img3 = img3Src.src;
import img4Src from "../assets/s-logo-4.png";

const img4 = img4Src.src;
import img5Src from "../assets/s-logo-5.png";

const img5 = img5Src.src;
import img6Src from "../assets/s-logo-6.jpg";

const img6 = img6Src.src;
import img7Src from "../assets/s-logo-7.webp";

const img7 = img7Src.src;
import img8Src from "../assets/s-logo-8.jpeg";

const img8 = img8Src.src;
import img9Src from "../assets/s-logo-9.png";

const img9 = img9Src.src;
import img10Src from "../assets/s-logo-10.jpg";

const img10 = img10Src.src;
import img11Src from "../assets/s-logo-11.png";

const img11 = img11Src.src;
import img12Src from "../assets/s-logo-12.webp";

const img12 = img12Src.src;
import img13Src from "../assets/s-logo-13.png";

const img13 = img13Src.src;
import img14Src from "../assets/s-logo-14.png";

const img14 = img14Src.src;
import img15Src from "../assets/s-logo-15.jpg";

const img15 = img15Src.src;
import img16Src from "../assets/s-logo-16.png";

const img16 = img16Src.src;
import img17Src from "../assets/s-logo-17.png";

const img17 = img17Src.src;
import img18Src from "../assets/s-logo-18.jpg";

const img18 = img18Src.src;
import img19Src from "../assets/s-logo-19.webp";

const img19 = img19Src.src;
import img20Src from "../assets/s-logo-20.svg";

const img20 = img20Src.src;
import img21Src from "../assets/s-logo-21.svg";

const img21 = img21Src.src;
import "./styles/collegeSlider.css";
import Image from "next/image";
const CollegeSlider = () => {
  const imgList = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21
  ];
  return (
    <section className="collegeSlider">
      <h2>Our Education Partners</h2>
      <div className="slider">
        <div className="slider-track">
          {imgList.map((item, index) => {
            return (
              <div className="slide" key={index}>
                {/* .slide is locked to 100×100 by min/max-width and
                    min/max-height, so the intrinsic size is known and there is
                    no need for `fill`. The SVG logos in this list are passed
                    through untouched — next/image skips optimizing .svg. */}
                <Image
                  src={item}
                  alt="college logo"
                  width={100}
                  height={100}
                  loading="lazy"
                />
              </div>
            );
          })}
          {imgList.map((item, index) => {
            return (
              <div className="slide" key={index}>
                {/* .slide is locked to 100×100 by min/max-width and
                    min/max-height, so the intrinsic size is known and there is
                    no need for `fill`. The SVG logos in this list are passed
                    through untouched — next/image skips optimizing .svg. */}
                <Image
                  src={item}
                  alt="college logo"
                  width={100}
                  height={100}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollegeSlider;
