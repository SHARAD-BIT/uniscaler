"use client";
import { TypeAnimation } from "react-type-animation";
import itsSrc from "../assets/its-group.webp";

const its = itsSrc.src;
import iimaSrc from "../assets/iima.png";

const iima = iimaSrc.src;
import iilmSrc from "../assets/iilm-university.jpg";

const iilm = iilmSrc.src;
import mbGroupSrc from "../assets/bm-group.jpeg";

const mbGroup = mbGroupSrc.src;
import "./styles/popularCollege.css";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ScrollZoomImage from "./ScrollZoomImage"


const PopularCollege = () => {
  const [list, setList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [imageData, setImageData] = useState([
    {
      name: "BM Group of Institutions",
      img: mbGroup,
      id: "f5db",
      location: "Gurugram, Haryana",
    },
    {
      name: "IILM University",
      img: iilm,
      id: "f5dc",
      location: "Gurugram, Haryana",
    },
    {
      name: "Ahmedabad Institute of Business Management",
      img: iima,
      id: "f5dd",
      location: "Ahemdabad, Gujarat",
    },
    {
      name: "ITS Engineering College",
      img: its,
      id: "f5de",
      location: "Noida, Uttar Pradesh",
    },
  ]);
  const Data = new Date().getDate();
  const encryptedToken = CryptoJS.AES.encrypt(
    JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
    process.env.NEXT_PUBLIC_PUBLIC_ENC
  ).toString();
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/fetchPopularColleges`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: encryptedToken,
      }),
    })
      .then((res) =>
        res.json().then((data) => {
          data.code === 200 && data.data.length> 0 && setList(data.data);
          data.code === 200 && setIsFetch(true);
        })
      )
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    list.map((item) => {
      return setImageData((prev) => [
        ...prev,
        {
          name: item.cName.trim(),
          location: item.address,
          id: `f5d${item.id}`,
          img: `${process.env.NEXT_PUBLIC_SERVER_URL}popularCollegeLogo/${item.logo}`,
        },
      ]);
    });
  }, [isFetch]);
  return (
    <section className="popular-college">
      <h2 className="main-heading">Popular Colleges</h2>
      <TypeAnimation
        sequence={[
          "Where Tradition Meets Innovation",
          500,
          "Discover Your Potential",
          500,
          "Empowering Future Leaders",
          500,
          "Building Brighter Futures Together",
          500,
          "Explore, Learn, Grow",
          500,
          "Transforming Lives, Impacting Communities",
          500,
        ]}
        wrapper="p"
        className="typing-text-zoom typing-text"
        speed={50}
        repeat={Infinity}
      />
      <div className="popular-college-wrapper">
        {/* <div className="popular-college"> */}
          {/* {imageData.map((item, index) => (
            <Link href={`/college-details/${item.name.replace(/\s/g, "-")}`}
              state={item}
              key={index}
              className="popular-college-img"
            >
              <picture>
                <img loading="lazy" src={item.img} alt={item.name} />
              </picture>
              <div className="text">
                <h3>{item.name}</h3>
                <p>{item.location}</p>
              </div>
            </Link>
          ))} */}
          <ScrollZoomImage data={imageData} />
        {/* </div> */}
      </div>
    </section>
  );
};

export default PopularCollege;
