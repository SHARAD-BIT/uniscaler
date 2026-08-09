"use client";
import "./styles/top-College.css";
import CollegeCard from "../Utils/CollegeCard";
import imageASrc from "../assets/college-a.avif";

const imageA = imageASrc.src;
import imageBSrc from "../assets/college-b.jpg";

const imageB = imageBSrc.src;
import imageCSrc from "../assets/college-c.jpg";

const imageC = imageCSrc.src;
import imageDSrc from "../assets/college-d.jpeg";

const imageD = imageDSrc.src;
import imageESrc from "../assets/college-e.jpg";

const imageE = imageESrc.src;
import imageFSrc from "../assets/college-f.jpg";

const imageF = imageFSrc.src;
import imageGSrc from "../assets/college-g.jpg";

const imageG = imageGSrc.src;
import imageHSrc from "../assets/college-h.jpg";

const imageH = imageHSrc.src;
import imageISrc from "../assets/college-i.jpeg";

const imageI = imageISrc.src;
import imageJSrc from "../assets/college-j.jpg";

const imageJ = imageJSrc.src;
import imageKSrc from "../assets/college-k.jpg";

const imageK = imageKSrc.src;
import imageLSrc from "../assets/college-l.jpg";

const imageL = imageLSrc.src;
const TopCollege = () => {
  const collegeData = [
    {
      title: "Top Engineering colleges",
      link: "/college/engineering",
      image: imageA,
    },
    {
      title: "Top Medical colleges",
      link: "/college/medical",
      image: imageB,
    },
    {
      title: "Top Law colleges",
      link: "/college/law",
      image: imageC,
    },
    {
      title: "Top Architecture colleges",
      link: "/college/architecture",
      image: imageD,
    },
    {
      title: "Top Management colleges",
      link: "/college/management",
      image: imageE,
    },
    {
      title: "Top Commerce colleges",
      link: "/college/commerce",
      image: imageF,
    },
    {
      title: "Top Science colleges",
      link: "/college/science",
      image: imageG,
    },
    {
      title: "Top Arts colleges",
      link: "/college/arts",
      image: imageH,
    },
    {
      title: "Top Hotel Management colleges",
      link: "/college/hotel",
      image: imageI,
    },
    {
      title: "Top Pharmacy colleges",
      link: "/college/pharmacy",
      image: imageJ,
    },
    {
      title: "Top IT colleges",
      link: "/college/it",
      image: imageK,
    },
    {
      title: "Top Other university",
      link: "/college/other",
      image: imageL,
    },
  ];
  return (
    <section className="top-college">
      <h2>Our Best Collections</h2>
      <div className="card-container">
        {collegeData.map((item) => (
          <CollegeCard
            title={item.title}
            link={item.link}
            image={item.image}
            key={item.title}
          />
        ))}
      </div>
    </section>
  );
};

export default TopCollege;
