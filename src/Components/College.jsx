"use client";
import { useEffect } from "react";
import Header from "../Utils/Header";
import TopCollege from "../Decorators/TopCollege";
import NewsLetter from "../Decorators/NewsLetter";
import ExplorePrograms from "../Decorators/ExplorePrograms";
import TakeAdmission from "../Decorators/TakeAdmission";
import Faq from "../Decorators/Faq";
import CollegeLocation from "../Decorators/CollegeLocation";
import Slider from "../Decorators/Slider";
import DUSrc from "../assets/DU.png";

const DU = DUSrc.src;
import IITDSrc from "../assets/IIT_Delhi.png";

const IITD = IITDSrc.src;
import IITMSrc from "../assets/IIT_Mumbai.svg";

const IITM = IITMSrc.src;
import IITCSrc from "../assets/IIT_Chennai.png";

const IITC = IITCSrc.src;
import IITKSrc from "../assets/IIT_Kharagpur.png";

const IITK = IITKSrc.src;
import IIT_KANSrc from "../assets/IIT_Kanpur.png";

const IIT_KAN = IIT_KANSrc.src;
import IIT_RSrc from "../assets/IIT_R.png";

const IIT_R = IIT_RSrc.src;
import BITS_PilaniSrc from "../assets/BITS_Pilani.png";

const BITS_Pilani = BITS_PilaniSrc.src;
import MEDICAL_DelhiSrc from "../assets/MEDICAL_Delhi.svg";

const MEDICAL_Delhi = MEDICAL_DelhiSrc.src;
import IISSrc from "../assets/IIS.png";

const IIS = IISSrc.src;
const College = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const faqItems = [
    {
      title: "How does the university support research initiatives?",
      description:
        "Uncover the resources and facilities provided by our university to support research activities across various disciplines, including funding opportunities, labs, and collaborative projects.",
    },
    {
      title: "Can you describe the study abroad programs available?",
      description:
        "Learn about our global study opportunities, including partner universities, exchange programs, and international internships, to enhance your educational experience.",
    },
    {
      title: "What are the housing options for students?",
      description:
        "Explore the different housing options available for students, from on-campus dormitories to off-campus apartments, including amenities, costs, and application processes.",
    },
    {
      title: "How does the alumni network benefit graduates?",
      description:
        "Discover how our extensive alumni network can help with your career growth, including mentorship opportunities, networking events, and how to stay connected after graduation.",
    },
    {
      title: "What student support services are offered?",
      description:
        "Find out about the comprehensive support services available to students, including academic advising, mental health resources, disability services, and tutoring programs.",
    },
    {
      title: "What innovative teaching methods are used in the classroom?",
      description:
        "Delve into the innovative teaching strategies employed by our faculty, including blended learning, project-based assignments, and the use of technology to enhance learning outcomes.",
    },
    {
      title: "How does the university promote student wellness and health?",
      description:
        "Learn about the wellness programs and health services provided by the university, including fitness classes, mental health counseling, nutritional advice, and medical facilities on campus.",
    },
    {
      title: "What are the unique traditions or events at the university?",
      description:
        "Discover the unique traditions, annual events, and cultural celebrations that define the student experience and foster a sense of community on campus.",
    },
    {
      title: "How can students get involved in community service?",
      description:
        "Explore the opportunities for students to engage in community service and social impact projects, including volunteer programs, service learning courses, and partnerships with local organizations.",
    },
    {
      title: "What resources are available for international students?",
      description:
        "Find out about the dedicated support and resources available for international students, including visa assistance, language support services, cultural adjustment, and networking opportunities.",
    },
  ];
  const CardItems = [
    {
      img: DU,
      title: "University of Delhi",
      des: "Delhi University, formally the University of Delhi, is a central university located in Delhi, India. It was founded in 1922 by an Act of the Central Legislative Assembly and is recognized as an Institute of Eminence by the University Grants Commission",
      link: "https://en.wikipedia.org/wiki/Delhi_University",
    },
    {
      img: IITD,
      title: "Indian Institute Of Technology-Delhi",
      des: "IIT Delhi, officially the Indian Institute of Technology Delhi, is a public institute of technology located in Delhi, India. It is one of the 23 Indian Institutes of Technology created to be Centre of Excellence for India's training, research and development in science, engineering and technology.",
      link: "https://en.wikipedia.org/wiki/IIT_Delhi",
    },
    {
      img: IITC,
      title: "Indian Institute Of Technology-Madras",
      des: "Indian Institute of Technology Madras is a public technical university located in Chennai, Tamil Nadu, India. It is one of the eight public Institutes of Eminence of India. As one of the Indian Institutes of Technology, IIT Madras is also recognized as an Institute of National Importance",
      link: "https://en.wikipedia.org/wiki/IIT_Delhi",
    },
    {
      img: IITM,
      title: "Indian Institute of Technology-Bombay",
      des: "The Indian Institute of Technology Bombay is a public research university and technical institute in Powai, Mumbai, Maharashtra, India. IIT Bombay was founded in 1958. In 1961, the Parliament decreed IITs as Institutes of National Importance",
      link: "https://en.wikipedia.org/wiki/IIT_Bombay",
    },
    {
      img: IIT_R,
      title: "Indian Institute Of Technology-Roorkee",
      des: "Indian Institute of Technology Roorkee is a technical university located in Roorkee, Uttarakhand, India",
      link: "https://en.wikipedia.org/wiki/IIT_Roorkee",
    },
    {
      img: IITK,
      title: "Indian Institute of Technology-Kharagpur",
      des: "Indian Institute of Technology Kharagpur is a public institute of technology research university established by the Government of India in Kharagpur, West Bengal, India. Established in 1951, the institute is the first of the IITs to be established and is recognised as an Institute of National Importance",
      link: "https://en.wikipedia.org/wiki/IIT_Kharagpur",
    },
    {
      img: IIT_KAN,
      title: "Indian Institute of Technology-Kanpur",
      des: "Indian Institute of Technology Kanpur is a public institute of technology located in Kanpur, Uttar Pradesh, India. It was declared an Institute of National Importance by the Government of India under the Institutes of Technology Act. IIT Kanpur is ranked among the most prestigious academic institutions in India",
      link: "https://en.wikipedia.org/wiki/IIT_Kanpur",
    },
    {
      img: BITS_Pilani,
      title: "Birla Institute of Technology And Science-Pilani",
      des: "Birla Institute of Technology & Science, Pilani is a deemed university in Pilani, Rajasthan, India. It focuses primarily on higher education and research in engineering and sciences. BITS Pilani is one of the first six institutes in India to be granted Institute of Eminence status",
      link: "https://en.wikipedia.org/wiki/BITS_Pilani",
    },
    {
      img: MEDICAL_Delhi,
      title: "All India Institute Of Medical Sciences",
      des: "All India Institute of Medical Sciences, New Delhi, also known as AIIMS Delhi, is a public medical research university and hospital in New Delhi, India. The institute is governed by the AIIMS Act, 1956 and operates autonomously under the Ministry of Health and Family Welfare.",
      link: "https://en.wikipedia.org/wiki/All_India_Institute_of_Medical_Sciences,_New_Delhi",
    },
    {
      img: IIS,
      title: "Indian Institute of Science",
      des: "The Indian Institute of Science is a public, deemed, research university for higher education and research in science, engineering, design, and management. It is located in the southern Indian city of Bangalore, Karnataka.",
      link: "https://en.wikipedia.org/wiki/Indian_Institute_of_Science",
    },
  ];
  return (
    <main className="top college">
      <Header
        title="College What You Need To Know"
        image="https://images.pexels.com/photos/586570/pexels-photo-586570.jpeg"
      />
      <Slider
        title="Explore Top College"
        des="Explore top Indian colleges and universities."
        CardItems={CardItems}
        type={"college"}
      />
      <TopCollege />
      <ExplorePrograms />
      <TakeAdmission />
      <CollegeLocation />
      <Faq items={faqItems} />
      <NewsLetter />
    </main>
  );
};

export default College;
