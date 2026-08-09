"use client";
import { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import "./styles/ourSuccess.css";
import Image from "next/image";
import BitPilaniSrc from "../assets/BITS_Pilani.png";
import DPSSrc from "../assets/dps.png";
const logo = "/mainLogo.svg";
import CU1Src from "../assets/CU-1.jpg";
import CU2Src from "../assets/CU-2.jpg";
import CU3Src from "../assets/CU-3.jpg";
import CU4Src from "../assets/CU-4.jpg";
import DUSrc from "../assets/DU.png";
import VidhyaSrc from "../assets/vidhya.png";
import GalSrc from "../assets/galgotia.png";
import adaniSrc from "../assets/adani.png";
import jimsSrc from "../assets/logo-noida-2.jpg";
import IMtSrc from "../assets/imt.jpeg";
const OurSuccess = () => {
  const data = {
    admission: [3567, 3782],
    scholar: [72, 84],
    hire: [1321, 1561],
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const Cdata = [
    {
      name: "Rajiv",
      userImg: CU2Src,
      collegeName: DPSSrc,
      placedIn: BitPilaniSrc,
      tag: "12TH",
      tag2: "B.TECH",
      hike: "12th Score : 72",
    },
    {
      name: "Aarti",
      userImg: CU1Src,
      collegeName: DUSrc,
      placedIn: VidhyaSrc,
      tag: "BBA",
      tag2: "MBA",
      hike: "Grad. Score : 50",
    },
    {
      name: "Mukul anand",
      userImg: CU3Src,
      collegeName: GalSrc,
      placedIn: adaniSrc,
      tag: "B.TECH",
      tag2: "M.TECH",
      hike: "Grad. Score : 55",
    },
    {
      name: "Shivani",
      userImg: CU4Src,
      collegeName: jimsSrc,
      placedIn: IMtSrc,
      tag: "B.COM",
      tag2: "PGDM",
      hike: "Grad. Score : 60",
    },
  ];
  const clickHandler = (p) => {
    if (p === "plus" && currentSlide < Cdata.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (p === "minus" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const [year, setYear] = useState(2021);
  return (
    <section className="ourSuccess">
      <h2>Real Stories, Incredible Journeys</h2>
      <p>
        Discover fellow learners like yourself with a swipe, or consult a career
        expert to begin your journey today.
      </p>
      <div className="slideGtp">
        <div className="clicker">
          <div className="yearty">{year + "-" + (year + 1)}</div>
          <div
            className={year === 2021 ? "iconLeft active" : "iconLeft"}
            onClick={() => setYear(2021)}
          >
            <MdOutlineArrowBackIosNew />
          </div>
          <div
            className={year === 2022 ? "iconRight active" : "iconRight"}
            onClick={() => setYear(2022)}
          >
            <MdOutlineArrowBackIosNew />
          </div>
        </div>
        <div className="successStory">
          <div className="text">
            <h3>{year === 2021 ? data.admission[0] : data.admission[1]}+</h3>
            <p>Got dream college</p>
          </div>
          <div className="text">
            <h3>{year === 2021 ? data.scholar[0] : data.scholar[1]}%</h3>
            <p>Got In-House Scholarship</p>
          </div>
          <div className="text">
            <h3>{year === 2021 ? data.hire[0] : data.hire[1]}+</h3>
            <p>Get Placed in Companies</p>
          </div>
        </div>
      </div>
      <div className="studentWrapper">
        <div className="userImage">
          <div className="ourLogo">
            <img src={logo} alt="Uniscaler" />
          </div>
          <div className="imageU">
            {/*
              width/height, not `fill`: ourSuccess.css gives .imageU
              position:absolute on desktop but position:unset under 768px, so a
              filled image would escape the box on mobile and size itself
              against .userImage instead.
            */}
            <Image
              src={Cdata[currentSlide].userImg}
              alt={Cdata[currentSlide].name}
              sizes="(max-width: 768px) 60vw, 320px"
            />
          </div>
          <div className="hike">{Cdata[currentSlide].hike} %</div>
          <div className="userChanger">
            <h3>{Cdata[currentSlide].name}</h3>
            <div className="gtc">
              <div
                className={`icons ${currentSlide === 0 && "active"}`}
                onClick={() => clickHandler("minus")}
              >
                <MdOutlineArrowBackIosNew />
              </div>
              <p> {currentSlide + 1 + "/ " + Cdata.length}</p>
              <div
                className={`icons ${currentSlide === Cdata.length - 1 && "active"}`}
                onClick={() => clickHandler("plus")}
              >
                <MdOutlineArrowBackIosNew />
              </div>
            </div>
          </div>
        </div>
        <div className="gridBv">
          <div className="boxLeft">
            <p>Previously</p>
            <div className="collegeLogo">
              <Image
                src={Cdata[currentSlide].collegeName}
                alt={Cdata[currentSlide].name}
                sizes="160px"
              />
            </div>
            <p className="tags">{Cdata[currentSlide].tag}</p>
          </div>
          <div className="line"></div>
          <div className="boxRight">
            <p>Thereafter</p>
            <div className="collegeLogo">
              <Image
                src={Cdata[currentSlide].placedIn}
                alt={Cdata[currentSlide].name}
                sizes="160px"
              />
            </div>
            <p className="tags">{Cdata[currentSlide].tag2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurSuccess;
