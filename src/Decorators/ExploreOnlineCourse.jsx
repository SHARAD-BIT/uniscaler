"use client";
import "./styles/exploreOnlineCourse.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// The Navigation module is registered below, but its stylesheet was never
// imported. Without it the arrows get no `position: absolute`, so they drop
// into normal flow and stack in the corner — the rules in globals.css that
// place them at the sides are inert until this loads.
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import img1Src from "../assets/cOnline-1.jpg";

const img1 = img1Src.src;
import img2Src from "../assets/cOnline-2.avif";

const img2 = img2Src.src;
import img3Src from "../assets/cOnline-3.jpg";

const img3 = img3Src.src;
import img4Src from "../assets/cOnline-4.png";

const img4 = img4Src.src;
import TextAnimation from "../Utils/TextAnimation";
import { onlineCourseDetails } from "../Helper/Helper";
import Link from "@/Utils/StateLink";

const ExploreOnlineCourse = () => {
  const [word, setWord] = useState("Titan");
  const courseDetails = [
    {
      name: "BBA With an Extra Edge!",
      tagLine: [
        "Computer Application and Business Management",
        "Diploma in Financial Services & Portfolio Management",
        "Diploma in Computer Application and  Business Management",
      ],
      img: img1,
      data: onlineCourseDetails[0],
    },
    {
      name: "Unleash Your Potential with BCA Plus!",
      tagLine: [
        "Diploma in Native Mobile Application Development",
        "Diploma in Neural Network and Deep Learning",
        "Diploma in Blockchain Technology",
      ],
      img: img2,
      data: onlineCourseDetails[1],
    },
    {
      name: "Expand Your Leadership MBA Plus!",
      tagLine: [
        "P G Diploma in Digital & Social Media Marketing",
        "P G Diploma in Industrial Relations & Personnel Management",
      ],
      img: img3,
      data: onlineCourseDetails[2],
    },
    {
      name: "Tomorrow's Mastery MCA Advanced!",
      tagLine: [
        "Diploma in Native Mobile Application Development",
        "Diploma in Block-Chain Technology",
      ],
      img: img4,
      data: onlineCourseDetails[3],
    },
  ];
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
    const wordChange = ["Geniuses", "Titans"];

    const timer = setInterval(() => {
      setWord(wordChange[Math.floor(Math.random() * wordChange.length)]);
    }, 2000);
    window.addEventListener("resize", countHandler);
    return () => {
      window.removeEventListener("resize", countHandler);
      clearInterval(timer);
    };
  }, []);
  return (
    <section className="explore-online-course">
      <h2>
        Online/AI Courses For Tomorrow&apos;s <big>{word}</big>
      </h2>
      <div className="cardContainer">
        <Swiper
          className={`cardWrapper`}
          slidesPerView={slideCount}
          navigation={true}
          spaceBetween={30}
          modules={[Navigation]}
          pagination={{ clickable: true }}
        >
          {courseDetails.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="CardBox">
                  <div className="textUp">
                    <h3>{item.name}</h3>
                    <TextAnimation TEXTS={item.tagLine} />
                  </div>
                  <div className="imgWrapper">
                    {/* .imgWrapper is position:absolute with a fixed height
                        and overflow:hidden — a containing block `fill` can use
                        directly. object-position:top stays in the CSS. */}
                    <Image
                      loading="lazy"
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 90vw, 340px"
                    />
                  </div>
                  <button>
                    <Link href={`/online-course/${item.name.replace(/\s/g,"-")}`}
                      state={{ course: item.data }}
                    >
                      View Insights{" "}
                    </Link>
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};
export default ExploreOnlineCourse;
