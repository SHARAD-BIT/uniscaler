"use client";
import Slider from "./Slider";
import "./styles/ourMentor.css";
import mentor1Src from "../assets/mentor-1.jpg";

const mentor1 = mentor1Src.src;
import mentor2Src from "../assets/mentor-2.jpg";

const mentor2 = mentor2Src.src;
import mentor3Src from "../assets/mentor-3.jpg";

const mentor3 = mentor3Src.src;
import mentor4Src from "../assets/mentor-4.webp";

const mentor4 = mentor4Src.src;
const OurMentor = () => {
  const Mentors = [
    {
      img: mentor1,
      title: "Shiv",
      des: "Shiv is renowned as a top mentor at Uniscaler, where his profound dedication and expertise have transformed countless lives. As the founder, he embodies visionary leadership, shaping a nurturing environment where learning thrives.",
      link: "/",
    },
    {
      img: mentor2,
      title: "Deepak",
      des: "Deepak, with his creative mind, illuminates pathways of innovation and ingenuity, infusing projects with fresh perspectives and imaginative solutions.",
    },
    {
      img: mentor3,
      title: "Khushi",
      des: "Khushi, armed with a deep understanding of the education system, navigates its intricacies adeptly, shaping strategies and fostering improvement.",
      link: "/",
    },
    {
      img: mentor4,
      title: "Priya",
      des: "Priya, adept at data management, meticulously adds and modifies website content, ensuring accuracy and relevance for optimal user experience.",
      link: "/",
    },
  ];
  return (
    <section className="our-mentor">
      <h2>
        Discuss with our <span>mentor</span>
      </h2>
      <p>
        Dedicated mentors provide guidance, support, and expertise to nurture
        skills, foster growth, and empower mentees for success.
      </p>
      <Slider CardItems={Mentors} type={"user"} />
    </section>
  );
};

export default OurMentor;
