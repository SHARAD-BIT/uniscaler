"use client";
import itsSrc from "../assets/its-group.webp";

const its = itsSrc.src;
import iimaSrc from "../assets/iima.png";

const iima = iimaSrc.src;
import iilmSrc from "../assets/iilm-university.jpg";

const iilm = iilmSrc.src;
import mbGroupSrc from "../assets/bm-group.jpeg";

const mbGroup = mbGroupSrc.src;
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
// The section is rendered by PopularCollegeRail (heading, lead, list and
// the pinned card row — client ask 2026-09-03, after rothfinder.com). The
// ScrollZoomImage carousel and popularCollege.css it replaced are left in
// place, unimported, so the previous look can be restored.
import PopularCollegeRail from "./PopularCollegeRail";


/* The first paragraph of a fetched college's overview, as one short line for
   the rail's open card. `overView` is the JSON the college page parses
   (CollegeDetails.jsx) — an array whose entries have been strings or objects
   — so every step here is defensive: bad JSON, an empty array or an object
   without text all yield "", and the rail then shows no drawer for that
   card rather than "undefined". Tags are stripped and the text cut at a
   word boundary around 150 characters. */
const blurbFrom = (overView) => {
  if (!overView) return "";
  let first;
  try {
    const parsed = typeof overView === "string" ? JSON.parse(overView) : overView;
    first = Array.isArray(parsed) ? parsed.flat()[0] : parsed;
  } catch {
    first = overView;
  }
  if (first && typeof first === "object") {
    first = Object.values(first).find((v) => typeof v === "string") || "";
  }
  const text = String(first || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 150) return text;
  const cut = text.slice(0, 150);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : 150)}…`;
};

const PopularCollege = () => {
  const [list, setList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  // `blurb` is the line or two the rail shows under the card that is in view
  // (client ask, 2026-09-03, after the reference's open card). For the six
  // fixed entries it is written here; for the fetched ones it is the first
  // paragraph of their overview — see `blurbFrom` below.
  const [imageData, setImageData] = useState([
    {
      name: "BM Group of Institutions",
      img: mbGroup,
      id: "f5db",
      location: "Gurugram, Haryana",
      blurb:
        "A multi-disciplinary campus in Gurugram with programmes in engineering, management, computer applications and pharmacy.",
    },
    {
      name: "IILM University",
      img: iilm,
      id: "f5dc",
      location: "Gurugram, Haryana",
      blurb:
        "A private university in Gurugram known for its management, law, design and liberal-arts programmes.",
    },
    {
      name: "Ahmedabad Institute of Business Management",
      img: iima,
      id: "f5dd",
      location: "Ahemdabad, Gujarat",
      blurb:
        "An Ahmedabad business school focused on management education with industry-oriented programmes.",
    },
    {
      name: "ITS Engineering College",
      img: its,
      id: "f5de",
      location: "Noida, Uttar Pradesh",
      blurb:
        "An engineering college offering B.Tech programmes in computer science, IT, electronics and mechanical, alongside management courses.",
    },
    // Two more on the client's ask (2026-09-03, "abhi 4 college hai, 6 kar
    // do"). Their photos are campus images the admin uploaded to the college
    // gallery (the files the college pages and Explore-by-College already
    // show), served from the backend like the fetched colleges' logos, so
    // nothing was added to the bundle. `name` is the exact database name —
    // CollegeDetails matches it character for character, and Amity is stored
    // as "Amity university " — while `label` is what the card and the list
    // display.
    {
      name: "Sharda University",
      img:
        process.env.NEXT_PUBLIC_SERVER_URL +
        "collegeGallery/CollegeImage-1715275266060.jpg",
      id: "f5df",
      location: "Greater Noida, Uttar Pradesh",
      blurb:
        "A Greater Noida university with a wide range of programmes across engineering, management, law, sciences and more.",
    },
    {
      name: "Amity university",
      label: "Amity University",
      img:
        process.env.NEXT_PUBLIC_SERVER_URL +
        "collegeGallery/CollegeImage-1715260750774.jpg",
      id: "f5e0",
      location: "Noida, Uttar Pradesh",
      blurb:
        "A private university in Noida offering programmes across engineering, management, design, sciences and more.",
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
          blurb: blurbFrom(item.overView),
        },
      ]);
    });
  }, [isFetch]);
  return <PopularCollegeRail data={imageData} />;
};

export default PopularCollege;
