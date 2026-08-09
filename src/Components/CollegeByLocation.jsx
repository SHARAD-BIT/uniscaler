"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import "./styles/collegeByLocation.css";
import Header from "../Utils/Header";
// import CryptoJS from "crypto-js";
import { useEffect } from "react";
import CollegeTable from "../Utils/CollegeTable";
import CollegeLocation from "../Decorators/CollegeLocation";
import NewsLetter from "../Decorators/NewsLetter";
import TakeAdmission from "../Decorators/TakeAdmission";
import bgimgSrc from "../assets/location.png";

const bgimg = bgimgSrc.src;
import logon1Src from "../assets/logo-noida-1.jpg";

const logon1 = logon1Src.src;
import logon2Src from "../assets/logo-noida-2.jpg";

const logon2 = logon2Src.src;
import logon3Src from "../assets/logo-noida-3.png";

const logon3 = logon3Src.src;
import logon4Src from "../assets/logo-noida-4.png";

const logon4 = logon4Src.src;
import logon5Src from "../assets/logo-noida-5.png";

const logon5 = logon5Src.src;
import logon6Src from "../assets/logo-noida-6.png";

const logon6 = logon6Src.src;
import logon7Src from "../assets/logo-noida-7.png";

const logon7 = logon7Src.src;
import logog1Src from "../assets/logo-gurugram-1.png";

const logog1 = logog1Src.src;
import logog2Src from "../assets/logo-gurugram-2.webp";

const logog2 = logog2Src.src;
import logog3Src from "../assets/logo-gurugram-3.png";

const logog3 = logog3Src.src;
import logog4Src from "../assets/logo-gurugram-4.webp";

const logog4 = logog4Src.src;
import logog5Src from "../assets/logo-gurugram-5.svg";

const logog5 = logog5Src.src;
import logog6Src from "../assets/logo-gurugram-6.jpg";

const logog6 = logog6Src.src;
import logog7Src from "../assets/logo-gurugram-7.webp";

const logog7 = logog7Src.src;
import logog8Src from "../assets/logo-gurugram-8.svg";

const logog8 = logog8Src.src;
import logoag1Src from "../assets/logo-agra-1.webp";

const logoag1 = logoag1Src.src;
import logoag2Src from "../assets/logo-agra-2.jpg";

const logoag2 = logoag2Src.src;
import logoag3Src from "../assets/logo-agra-3.jpeg";

const logoag3 = logoag3Src.src;
import logoag4Src from "../assets/logo-agra-4.png";

const logoag4 = logoag4Src.src;
import logoag5Src from "../assets/logo-agra-5.jpeg";

const logoag5 = logoag5Src.src;
import logoag6Src from "../assets/logo-agra-6.png";

const logoag6 = logoag6Src.src;
import PopularCollege from "../Decorators/PopularCollege";

const CollegeByLocation = () => {
  const location = usePathname().split("/")[2];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const collegesInGurugram = [
    {
      name: "Sushant University",
      logo: logog1,
      description:
        "Sushant University is a leading institution offering a wide array of programs in various disciplines.",
      location: "Sector 55, Gurugram",
      courses: [
        {
          name: "Bachelor of Architecture (B.Arch)",
          fees: "Approx. ₹2,80,000 per year",
        },
        {
          name: "Master of Architecture (M.Arch)",
          fees: "Approx. ₹2,50,000 per year",
        },
      ],
    },
    {
      name: "Amity University Gurugram",
      logo: logog4,
      description:
        "Amity University Gurugram is a leading private university offering a wide range of undergraduate and postgraduate programs.",
      location: "Sector 83, Gurugram",
      courses: [
        {
          name: "Bachelor of Business Administration (BBA)",
          fees: "Approx. ₹1,50,000 per year",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Approx. ₹3,00,000 per year",
        },
      ],
    },
    {
      name: "Shiv Nadar University Gurugram",
      logo: logog5,
      description:
        "Shiv Nadar University Gurugram offers multidisciplinary education in various fields including engineering, humanities, and management.",
      location: "Sector 82, Gurugram",
      courses: [
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Approx. ₹1,80,000 per year",
        },
        {
          name: "Master of Science (M.Sc)",
          fees: "Approx. ₹2,20,000 per year",
        },
      ],
    },
    {
      name: "GD Goenka University",
      logo: logog6,
      description:
        "GD Goenka University is a private university known for its academic excellence and state-of-the-art facilities.",
      location: "Sohna Road, Gurugram",
      courses: [
        {
          name: "Bachelor of Arts (BA)",
          fees: "Approx. ₹1,20,000 per year",
        },
        {
          name: "Master of Arts (MA)",
          fees: "Approx. ₹1,50,000 per year",
        },
      ],
    },
    {
      name: "Ansal University",
      description:
        "Ansal University offers a diverse range of undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Sector 55, Gurugram",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Approx. ₹2,50,000 per year",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Approx. ₹1,80,000 per year",
        },
      ],
    },
    {
      name: "K.R. Mangalam University",
      logo: logog7,
      description:
        "K.R. Mangalam University is a leading institution known for its focus on holistic development and innovative teaching methods.",
      location: "Sohna Road, Gurugram",
      courses: [
        {
          name: "Bachelor of Computer Applications (BCA)",
          fees: "Approx. ₹1,00,000 per year",
        },
        {
          name: "Master of Computer Applications (MCA)",
          fees: "Approx. ₹1,20,000 per year",
        },
      ],
    },
    {
      name: "Apeejay Stya University",
      description:
        "Apeejay Stya University offers a diverse range of programs in areas like engineering, management, and design, with a focus on industry relevance.",
      location: "Sohna Road, Gurugram",
      courses: [
        {
          name: "Bachelor of Design (B.Des)",
          fees: "Approx. ₹2,20,000 per year",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Approx. ₹3,50,000 per year",
        },
      ],
    },
    {
      name: "BML Munjal University",
      logo: logog8,
      description:
        "BML Munjal University is a research-driven institution offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Sohna Road, Gurugram",
      courses: [
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Approx. ₹1,80,000 per year",
        },
        {
          name: "Master of Commerce (M.Com)",
          fees: "Approx. ₹2,00,000 per year",
        },
      ],
    },
    {
      name: "The NorthCap University",
      logo: logog2,
      description:
        "The NorthCap University is known for its emphasis on innovation, research, and industry collaboration, offering programs in engineering, management, and law.",
      location: "Sector 23-A, Gurugram",
      courses: [
        {
          name: "Bachelor of Laws (LLB)",
          fees: "Approx. ₹2,50,000 per year",
        },
        {
          name: "Master of Laws (LLM)",
          fees: "Approx. ₹3,00,000 per year",
        },
      ],
    },
    {
      name: "Manav Rachna University",
      logo: logog3,
      description:
        "Manav Rachna University is a leading institution offering a wide array of programs in engineering, management, and applied sciences.",
      location: "Sector 43, Faridabad",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Approx. ₹2,20,000 per year",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Approx. ₹3,50,000 per year",
        },
      ],
    },
  ];
  const collegesInNoida = [
    {
      name: "Birla Institute of Management Technology (BIMTECH)",
      logo: logon4,
      description:
        "BIMTECH is a prestigious business school recognized for its contribution to management education, research, and consultancy. It has a strong focus on ethical leadership and corporate governance.",
      location:
        "Plot No. 5, Knowledge Park II, Greater Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Post Graduate Diploma in Management (PGDM)",
          fees: "Varies based on specialization and program details",
        },
        {
          name: "PGDM in International Business",
          fees: "Varies based on the program",
        },
        {
          name: "PGDM in Insurance Business Management",
          fees: "Varies based on the program",
        },
        {
          name: "PGDM in Retail Management",
          fees: "Varies based on the program",
        },
        {
          name: "Fellow Program in Management (FPM)",
          fees: "Varies based on the program",
        },
        {
          name: "Executive PGDM",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Jaypee Institute of Information Technology (JIIT)",
      logo: logon5,
      description:
        "JIIT is a deemed university known for its excellence in engineering and technology education.",
      location: "A-10, Sector-62, Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Jagannath International Management School (JIMS)",
      logo: logon2,
      description:
        "JIMS, Noida is a premier institute known for its academic excellence in the fields of management and information technology.",
      location: "Plot No. 3, Phase-II, Sector-125, Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Business Administration (BBA)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Computer Applications (BCA)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Amity University, Noida",
      logo: logon7,
      description:
        "Amity University is a leading private university offering a wide range of undergraduate and postgraduate programs.",
      location: "Sector-125, Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Galgotias University",
      logo: logon1,
      description:
        "Galgotias University offers diverse programs in engineering, management, law, and humanities.",
      location:
        "Plot No. 2, Sector 17-A, Yamuna Expressway, Greater Noida, Gautam Buddh Nagar, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sharda University",
      logo: logon6,
      description:
        "Sharda University offers programs in engineering, management, medical sciences, law, and more.",
      location:
        "Plot No. 32-34, Knowledge Park III, Greater Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Amity School of Engineering and Technology (ASET)",
      logo: logon7,
      description:
        "Amity School of Engineering and Technology offers engineering programs with a focus on research and innovation.",
      location: "Sector-125, Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Jaipuria Institute of Management",
      logo: logon3,
      description:
        "Jaipuria Institute of Management is a leading management institute offering MBA programs.",
      location: "A-32A, Sector 62, Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "JSS Academy of Technical Education",
      description:
        "JSS Academy of Technical Education offers undergraduate and postgraduate programs in technical education.",
      location: "C-20/1, Sector-62, Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Bennett University",
      description:
        "Bennett University is a private research university offering programs in engineering, management, law, and media.",
      location:
        "Plot Nos 8-11, TechZone II, Greater Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Noida Institute of Engineering and Technology (NIET)",
      description:
        "NIET is a renowned engineering institute offering undergraduate and postgraduate programs in engineering.",
      location:
        "19, Knowledge Park II, Institutional Area, Greater Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "IIMT University",
      description:
        "IIMT University offers a wide range of undergraduate and postgraduate programs in various disciplines.",
      location:
        "Plot No. 20-A, Knowledge Park III, Greater Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInKota = [
    {
      name: "Indian Institute of Technology (IIT) - Kota",
      description:
        "IIT Kota is one of the premier engineering institutes in India, known for its excellence in education and research.",
      location: "Hatkoti, Rajasthan, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "University of Kota",
      description:
        "The University of Kota offers a wide range of undergraduate, postgraduate, and doctoral programs across various disciplines.",
      location: "Near Kabir Circle, MBS Marg, Kota, Rajasthan, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Bansal Classes",
      description:
        "Bansal Classes is a renowned coaching institute for IIT-JEE and other engineering entrance exams.",
      location:
        "Bansal Tower, A-10, Road No.1, Indraprastha Industrial Area, Kota, Rajasthan, India",
      courses: [
        { name: "IIT-JEE Coaching", fees: "Varies based on the program" },
        { name: "NEET Coaching", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Resonance Eduventures Pvt. Ltd.",
      description:
        "Resonance is a leading coaching institute providing preparation for IIT-JEE, NEET, and other competitive exams.",
      location:
        "CG Tower, A-46 & 52, IPIA, Near City Mall, Jhalawar Road, Kota, Rajasthan, India",
      courses: [
        { name: "IIT-JEE Coaching", fees: "Varies based on the program" },
        { name: "NEET Coaching", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Career Point",
      description:
        "Career Point is a premier coaching institute providing coaching for IIT-JEE, NEET, and other competitive exams.",
      location: "CP Tower, Road No. 1, IPIA, Kota, Rajasthan, India",
      courses: [
        { name: "IIT-JEE Coaching", fees: "Varies based on the program" },
        { name: "NEET Coaching", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Allen Career Institute",
      description:
        "Allen Career Institute is a renowned coaching institute for IIT-JEE, NEET, and other competitive exams.",
      location: "Samudayik Bhawan, Talwandi, Kota, Rajasthan, India",
      courses: [
        { name: "IIT-JEE Coaching", fees: "Varies based on the program" },
        { name: "NEET Coaching", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Resonance Eduventures Pvt. Ltd.",
      description:
        "Resonance is a leading coaching institute providing preparation for IIT-JEE, NEET, and other competitive exams.",
      location:
        "CG Tower, A-46 & 52, IPIA, Near City Mall, Jhalawar Road, Kota, Rajasthan, India",
      courses: [
        { name: "IIT-JEE Coaching", fees: "Varies based on the program" },
        { name: "NEET Coaching", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Vibrant Academy",
      description:
        "Vibrant Academy is a premier coaching institute for IIT-JEE and other engineering entrance exams.",
      location:
        "Vibrant Tower, A-14(A), Road No.1, IPIA, Kota, Rajasthan, India",
      courses: [
        { name: "IIT-JEE Coaching", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Motion Education Pvt. Ltd.",
      description:
        "Motion Education is a renowned coaching institute providing preparation for IIT-JEE, NEET, and other competitive exams.",
      location: "Building No. 394, Rajeev Gandhi Nagar, Kota, Rajasthan, India",
      courses: [
        { name: "IIT-JEE Coaching", fees: "Varies based on the program" },
        { name: "NEET Coaching", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Aakash Institute",
      description:
        "Aakash Institute is a leading coaching institute providing preparation for medical and engineering entrance exams.",
      location:
        "B-149, Chhatarpur Extension, Chhatarpur, Kota, Rajasthan, India",
      courses: [
        {
          name: "Medical Entrance Coaching",
          fees: "Varies based on the program",
        },
        {
          name: "Engineering Entrance Coaching",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInDelhi = [
    {
      name: "Indian Institute of Technology (IIT) - Delhi",
      description:
        "IIT Delhi is one of the premier engineering institutes in India, known for its excellence in education and research.",
      location: "Hauz Khas, New Delhi, Delhi, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Delhi Technological University (DTU)",
      description:
        "Delhi Technological University is a leading technical university in India, offering undergraduate, postgraduate, and doctoral programs in engineering and technology.",
      location: "Shahbad Daulatpur, Main Bawana Road, Delhi, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Jamia Millia Islamia",
      description:
        "Jamia Millia Islamia is a central university located in New Delhi, offering a wide range of undergraduate, postgraduate, and doctoral programs.",
      location: "Jamia Nagar, New Delhi, Delhi, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Delhi University",
      description:
        "The University of Delhi, commonly known as Delhi University, is a collegiate public central university, located in New Delhi, India.",
      location: "North Campus, South Campus, New Delhi, Delhi, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "All India Institute of Medical Sciences (AIIMS) - Delhi",
      description:
        "AIIMS Delhi is a medical college and medical research public university, located in New Delhi, India.",
      location: "Ansari Nagar, New Delhi, Delhi, India",
      courses: [
        { name: "MBBS", fees: "Varies based on the program" },
        { name: "MD/MS", fees: "Varies based on the program" },
        { name: "DM/M.Ch", fees: "Varies based on the program" },
      ],
    },
    {
      name: "National Institute of Fashion Technology (NIFT) - Delhi",
      description:
        "NIFT Delhi is a fashion institute located in New Delhi, India. It offers courses in fashion and design.",
      location: "Hauz Khas, Near Gulmohar Park, New Delhi, Delhi, India",
      courses: [
        {
          name: "Bachelor of Design (B.Des)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Design (M.Des)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Indian Statistical Institute (ISI) - Delhi",
      description:
        "ISI Delhi is an academic institution of national importance, located in New Delhi, India. It specializes in the study of statistics and related sciences.",
      location:
        "7, SJS Sansanwal Marg, Qutab Institutional Area, New Delhi, Delhi, India",
      courses: [
        {
          name: "Bachelor of Statistics (B.Stat)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Statistics (M.Stat)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "National Law University (NLU) - Delhi",
      description:
        "NLU Delhi is a specialized law university and one of the most prestigious law schools in India.",
      location: "Sector 14, Dwarka, New Delhi, Delhi, India",
      courses: [
        { name: "Bachelor of Laws (LLB)", fees: "Varies based on the program" },
        { name: "Master of Laws (LLM)", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Indraprastha Institute of Information Technology (IIIT) - Delhi",
      description:
        "IIIT Delhi is a state university located in New Delhi, India. It focuses on research and education in information technology.",
      location:
        "Okhla Industrial Estate, Phase III, Near Govind Puri Metro Station, New Delhi, Delhi, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Jawaharlal Nehru University (JNU) - Delhi",
      description:
        "JNU Delhi is a public central university located in New Delhi, India. It is known for its strong faculty and research emphasis.",
      location: "New Mehrauli Road, JNU Ring Road, New Delhi, Delhi, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
  ];
  const collegesInMumbai = [
    {
      name: "Indian Institute of Technology (IIT) - Bombay",
      description:
        "IIT Bombay is one of the premier engineering institutes in India, known for its excellence in education and research.",
      location: "Powai, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "University of Mumbai",
      description:
        "The University of Mumbai is a collegiate public state university, located in Mumbai, Maharashtra, India.",
      location: "Kalina, Santacruz East, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Tata Institute of Social Sciences (TISS)",
      description:
        "TISS Mumbai is a social sciences institute located in Mumbai, Maharashtra, India. It offers programs in social work, social sciences, and human resources management.",
      location: "VN Purav Marg, Deonar, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Arts in Social Work (B.A. Social Work)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Arts in Social Work (M.A. Social Work)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Narsee Monjee Institute of Management Studies (NMIMS)",
      description:
        "NMIMS Mumbai is a private deemed university located in Mumbai, Maharashtra, India. It offers programs in management, engineering, law, and other fields.",
      location: "V. L. Mehta Road, Vile Parle West, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Business Administration (BBA)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Jamnalal Bajaj Institute of Management Studies (JBIMS)",
      description:
        "JBIMS Mumbai is a management institute located in Mumbai, Maharashtra, India. It offers postgraduate programs in management.",
      location:
        "164, Backbay Reclamation, H.T. Parekh Marg, Churchgate, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Master of Management Studies (MMS)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Xavier Institute of Communications (XIC)",
      description:
        "XIC Mumbai is a communication institute located in Mumbai, Maharashtra, India. It offers programs in journalism, public relations, and advertising.",
      location:
        "St. Xavier's College Campus, Mahapalika Marg, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Postgraduate Diploma in Journalism & Mass Communication",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "St. Xavier's College, Mumbai",
      description:
        "St. Xavier's College is a private autonomous college located in Mumbai, Maharashtra, India. It offers undergraduate programs in arts, science, and commerce.",
      location: "5, Mahapalika Marg, Dhobi Talao, Mumbai, Maharashtra, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "S.P. Jain Institute of Management and Research (SPJIMR)",
      description:
        "SPJIMR Mumbai is a management institute located in Mumbai, Maharashtra, India. It offers postgraduate programs in management.",
      location:
        "Bhavan's Campus, Munshi Nagar, Dadabhai Road, Andheri West, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Post Graduate Diploma in Management (PGDM)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Institute of Chemical Technology (ICT)",
      description:
        "ICT Mumbai is a chemical engineering research institute located in Mumbai, Maharashtra, India. It offers undergraduate, postgraduate, and doctoral programs in chemical engineering.",
      location: "Nathalal Parekh Marg, Matunga, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Chemical Engineering (B.Chem.Eng)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Chemical Engineering (M.Chem.Eng)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "National Institute of Industrial Engineering (NITIE)",
      description:
        "NITIE Mumbai is an industrial engineering institute located in Mumbai, Maharashtra, India. It offers postgraduate and doctoral programs in industrial engineering.",
      location: "Vihar Lake, Powai, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Post Graduate Diploma in Industrial Management (PGDIM)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sydenham Institute of Management Studies, Research and Entrepreneurship Education (SIMSREE)",
      description:
        "SIMSREE Mumbai is a management institute located in Mumbai, Maharashtra, India. It offers postgraduate programs in management.",
      location: "B-Road, Churchgate, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Master of Management Studies (MMS)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Veermata Jijabai Technological Institute (VJTI)",
      description:
        "VJTI Mumbai is an engineering institute located in Mumbai, Maharashtra, India. It offers undergraduate, postgraduate, and doctoral programs in engineering.",
      location: "H. R. Mahajani Marg, Matunga, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sophia College for Women",
      description:
        "Sophia College is a women's college located in Mumbai, Maharashtra, India. It offers undergraduate programs in arts, science, and commerce.",
      location:
        "Bhulabhai Desai Road, Cumballa Hill, Mumbai, Maharashtra, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Mass Media (BMM)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sir J.J. Institute of Applied Art",
      description:
        "Sir J.J. Institute of Applied Art is an art institute located in Mumbai, Maharashtra, India. It offers undergraduate and postgraduate programs in applied art.",
      location: "Dr. D.N. Road, Fort, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Fine Arts (BFA)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Fine Arts (MFA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "K.J. Somaiya Institute of Management Studies and Research",
      description:
        "K.J. Somaiya Institute of Management Studies and Research is a management institute located in Mumbai, Maharashtra, India. It offers postgraduate programs in management.",
      location: "Vidyanagar, Vidya Vihar, Mumbai, Maharashtra, India",
      courses: [
        {
          name: "Master of Management Studies (MMS)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInBangalore = [
    {
      name: "Indian Institute of Science (IISc) - Bangalore",
      description:
        "IISc Bangalore is a premier public research university for higher education and research in science, engineering, design, and management.",
      location: "C V Raman Rd, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Bachelor of Science (Research)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Science (Research)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Indian Institute of Management (IIM) - Bangalore",
      description:
        "IIM Bangalore is a leading management institute offering postgraduate and doctoral programs in management.",
      location: "Bannerghatta Road, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Post Graduate Programme in Management (PGP)",
          fees: "Varies based on the program",
        },
        {
          name: "Fellow Programme in Management (FPM)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Bangalore Institute of Technology (BIT)",
      description:
        "BIT Bangalore is an engineering college affiliated with Visvesvaraya Technological University (VTU), offering undergraduate and postgraduate programs in engineering.",
      location: "K.R. Road, V V Puram, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Christ University",
      description:
        "Christ University is a private deemed university in Bangalore, offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Hosur Road, Bengaluru, Karnataka, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "RV College of Engineering (RVCE)",
      description:
        "RVCE Bangalore is a private engineering college affiliated with Visvesvaraya Technological University (VTU), offering undergraduate and postgraduate programs in engineering.",
      location:
        "Mysuru Road, R V Vidyanikethan Post, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "National Institute of Fashion Technology (NIFT) - Bangalore",
      description:
        "NIFT Bangalore is a fashion institute offering undergraduate and postgraduate programs in fashion and design.",
      location:
        "C.A. Site No 21, 27th Main Road, Sector 1, HSR Layout, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Bachelor of Design (B.Des)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Design (M.Des)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "PES University",
      description:
        "PES University is a private university in Bangalore, offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "100 Feet Ring Road, Banashankari Stage III, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "BMS College of Engineering (BMSCE)",
      description:
        "BMSCE Bangalore is a private engineering college affiliated with Visvesvaraya Technological University (VTU), offering undergraduate and postgraduate programs in engineering.",
      location: "Bull Temple Road, Basavanagudi, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "St. Joseph's College of Commerce",
      description:
        "St. Joseph's College of Commerce is an autonomous college offering undergraduate and postgraduate programs in commerce and management.",
      location: "Brigade Road, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Commerce (M.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "MS Ramaiah Institute of Technology (MSRIT)",
      description:
        "MSRIT Bangalore is a private engineering college affiliated with Visvesvaraya Technological University (VTU), offering undergraduate and postgraduate programs in engineering.",
      location: "MSR Nagar, MSRIT Post, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Mount Carmel College",
      description:
        "Mount Carmel College is an autonomous college for women offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location:
        "Palace Road, Abshot Layout, Vasanth Nagar, Bengaluru, Karnataka, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Master of Science (M.Sc)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Ramaiah Institute of Management Studies (RIMS)",
      description:
        "RIMS Bangalore is a private management institute offering postgraduate programs in management.",
      location: "MSR Nagar, MSRIT Post, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Bangalore Medical College and Research Institute (BMCRI)",
      description:
        "BMCRI Bangalore is a medical college affiliated with Rajiv Gandhi University of Health Sciences (RGUHS), offering undergraduate and postgraduate programs in medicine and surgery.",
      location: "Fort, K.R. Road, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Bengaluru School of Management Studies (BSMS)",
      description:
        "BSMS Bangalore is a management institute offering postgraduate programs in management.",
      location:
        "Maruti Infotech Centre, Outer Ring Road, A Block, Nagavara, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Bangalore University",
      description:
        "Bangalore University is a public state university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Jnanabharathi Campus, Nagarbhavi, Bengaluru, Karnataka, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
  ];
  const collegesInPune = [
    {
      name: "Savitribai Phule Pune University (SPPU)",
      description:
        "Savitribai Phule Pune University, formerly the University of Pune, is a collegiate public state university located in Pune, Maharashtra, India.",
      location: "Ganeshkhind, Pune, Maharashtra, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "College of Engineering Pune (COEP)",
      description:
        "College of Engineering Pune is an autonomous engineering college affiliated with Savitribai Phule Pune University, offering undergraduate and postgraduate programs in engineering.",
      location: "Wellesley Road, Shivajinagar, Pune, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Fergusson College",
      description:
        "Fergusson College is an autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "F.C. Road, Shivajinagar, Pune, Maharashtra, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Master of Science (M.Sc)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Symbiosis International University (SIU)",
      description:
        "Symbiosis International University is a private deemed university located in Pune, Maharashtra, India, offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Senapati Bapat Road, Pune, Maharashtra, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "MIT World Peace University",
      description:
        "MIT World Peace University is a private university in Pune, Maharashtra, India, offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "S.No.124, Paud Road, Kothrud, Pune, Maharashtra, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Symboisis Institute of Business Management (SIBM)",
      description:
        "Symbiosis Institute of Business Management is a part of Symbiosis International University, offering postgraduate programs in management.",
      location: "Hill Base, Lavale, Pune, Maharashtra, India",
      courses: [
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
        { name: "Executive MBA", fees: "Varies based on the program" },
      ],
    },
    {
      name: "MIT College of Engineering (MITCOE)",
      description:
        "MIT College of Engineering is a private engineering college affiliated with Savitribai Phule Pune University, offering undergraduate and postgraduate programs in engineering.",
      location: "S.No.124, Paud Road, Kothrud, Pune, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "SP College",
      description:
        "SP College, officially named Sir Parashurambhau College, is an autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Tilak Road, Sadashiv Peth, Pune, Maharashtra, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Master of Science (M.Sc)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Modern College of Arts, Science, and Commerce",
      description:
        "Modern College is an autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Ganeshkhind Road, Shivajinagar, Pune, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
        { name: "Master of Arts (MA)", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Pune Institute of Computer Technology (PICT)",
      description:
        "Pune Institute of Computer Technology is a private engineering college affiliated with Savitribai Phule Pune University, offering undergraduate and postgraduate programs in computer science and engineering.",
      location: "Dhankawadi, Pune-Satara Road, Pune, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInChennai = [
    {
      name: "Indian Institute of Technology (IIT) - Madras",
      description:
        "IIT Madras is one of the premier engineering institutes in India, known for its excellence in education and research.",
      location:
        "Sardar Patel Road, Opposite to C.L.R.I, Adyar, Chennai, Tamil Nadu, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Anna University",
      description:
        "Anna University is a public state university offering undergraduate and postgraduate programs in engineering, technology, and applied sciences.",
      location: "Sardar Patel Road, Guindy, Chennai, Tamil Nadu, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Engineering (M.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Madras Medical College (MMC)",
      description:
        "Madras Medical College is a medical college and tertiary care hospital located in Chennai, Tamil Nadu, India.",
      location:
        "E.V.R Periyar High Road, Park Town, Chennai, Tamil Nadu, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Loyola College, Chennai",
      description:
        "Loyola College is a private autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Sterling Road, Nungambakkam, Chennai, Tamil Nadu, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Master of Science (M.Sc)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Stella Maris College",
      description:
        "Stella Maris College is a Catholic women's college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Cathedral Road, Teynampet, Chennai, Tamil Nadu, India",
      courses: [
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
        { name: "Master of Arts (MA)", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Vellore Institute of Technology (VIT) - Chennai Campus",
      description:
        "VIT Chennai is a private deemed university offering undergraduate and postgraduate programs in engineering, management, and applied sciences.",
      location: "Vandalur-Kelambakkam Road, Chennai, Tamil Nadu, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Madras Christian College (MCC)",
      description:
        "Madras Christian College is a Christian college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Tambaram, Chennai, Tamil Nadu, India",
      courses: [
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Commerce (M.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sri Ramachandra Institute of Higher Education and Research (SRIHER)",
      description:
        "SRIHER is a private deemed university offering undergraduate, postgraduate, and doctoral programs in medical and health sciences.",
      location: "No.1, Ramachandra Nagar, Porur, Chennai, Tamil Nadu, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Philosophy (Ph.D.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Ethiraj College for Women",
      description:
        "Ethiraj College for Women is an autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce exclusively for women.",
      location: "Ethiraj Salai, Egmore, Chennai, Tamil Nadu, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Master of Science (M.Sc)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "SRM Institute of Science and Technology (SRMIST) - Chennai Campus",
      description:
        "SRMIST Chennai is a private deemed university offering undergraduate and postgraduate programs in engineering, medicine, management, and science.",
      location:
        "SRM Nagar, Potheri, Kattankulathur, Chennai, Tamil Nadu, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInLucknow = [
    {
      name: "Indian Institute of Management (IIM) - Lucknow",
      description:
        "IIM Lucknow is one of the premier management institutes in India, offering postgraduate and doctoral programs in management.",
      location: "Prabandh Nagar, IIM Road, Lucknow, Uttar Pradesh, India",
      courses: [
        {
          name: "Post Graduate Programme in Management (PGP)",
          fees: "Varies based on the program",
        },
        {
          name: "Fellow Programme in Management (FPM)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "King George's Medical University (KGMU)",
      description:
        "KGMU Lucknow is a medical university offering undergraduate and postgraduate programs in medicine and allied sciences.",
      location: "Shah Mina Road, Chowk, Lucknow, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Dr. Ram Manohar Lohia National Law University (RMLNLU)",
      description:
        "RMLNLU Lucknow is a national law university offering undergraduate and postgraduate programs in law.",
      location:
        "Sec- D1, Kanpur Road Scheme, LDA Colony, Lucknow, Uttar Pradesh, India",
      courses: [
        { name: "Bachelor of Laws (LLB)", fees: "Varies based on the program" },
        { name: "Master of Laws (LLM)", fees: "Varies based on the program" },
      ],
    },
    {
      name: "University of Lucknow",
      description:
        "The University of Lucknow is a public state university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "University Road, Babuganj, Hasanganj, Lucknow, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "National Post Graduate College (NPGC)",
      description:
        "NPGC Lucknow is an autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "2, Rana Pratap Marg, Lucknow, Uttar Pradesh, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Master of Science (M.Sc)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Babu Banarasi Das University (BBDU)",
      description:
        "BBDU Lucknow is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "BBD City, Faizabad Road, Lucknow, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Central Institute of Medicinal and Aromatic Plants (CIMAP)",
      description:
        "CIMAP Lucknow is a research institute affiliated with the Council of Scientific and Industrial Research (CSIR), focusing on medicinal and aromatic plants.",
      location:
        "Kukrail Picnic Spot Road, Jankipuram Extension, Lucknow, Uttar Pradesh, India",
      courses: [
        { name: "Research programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Institute of Engineering and Technology (IET), Lucknow",
      description:
        "IET Lucknow is an engineering institute affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU), offering undergraduate and postgraduate programs in engineering.",
      location: "Sitapur Road, Lucknow, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Amity University, Lucknow Campus",
      description:
        "Amity University Lucknow is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Malhaur, Near Railway Station, Gomti Nagar Extension, Lucknow, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Integral University",
      description:
        "Integral University Lucknow is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Kursi Road, Dasauli, Lucknow, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
  ];
  const collegesInAgra = [
    {
      name: "Dr. B.R. Ambedkar University",
      logo: logoag4,
      description:
        "Dr. B.R. Ambedkar University, formerly known as Agra University, is a public university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Paliwal Park, Agra, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Raja Balwant Singh Engineering Technical Campus (RBSETC)",
      logo: logoag3,
      description:
        "RBSETC Agra is an engineering college offering undergraduate and postgraduate programs in engineering.",
      location: "Bichpuri, Agra, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "St. John's College, Agra",
      logo: logoag5,
      description:
        "St. John's College is a private college offering undergraduate programs in arts, science, and commerce.",
      location: "Mahatma Gandhi Road, Mantola, Agra, Uttar Pradesh, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Dayalbagh Educational Institute (DEI)",
      logo: logoag2,
      description:
        "DEI Agra is a deemed university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Dayal Bagh Road, Dayal Bagh, Agra, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Dr. MPS Group of Institutions",
      logo: logoag1,
      description:
        "Dr. MPS Group of Institutions Agra offers undergraduate and postgraduate programs in engineering, management, and pharmacy.",
      location:
        "Agra-Delhi Highway, Bhagwan Talkies, Agra, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Hindustan College of Science and Technology (HCST)",
      description:
        "HCST Agra is an engineering college offering undergraduate and postgraduate programs in engineering.",
      location: "Farah, Mathura, Agra Highway, Agra, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sharda Group of Institutions",
      logo: logoag6,
      description:
        "Sharda Group of Institutions Agra offers undergraduate and postgraduate programs in engineering, management, and pharmacy.",
      location: "NH-2, Agra-Delhi Highway, Agra, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "IIMT College of Engineering, Greater Noida",
      description:
        "IIMT College of Engineering Agra offers undergraduate and postgraduate programs in engineering.",
      location: "NH-2, Agra-Kanpur Highway, Agra, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Raja Balwant Singh College (RBS College)",
      description:
        "RBS College Agra is a private college offering undergraduate programs in arts, science, and commerce.",
      location:
        "Dr. B.R. Ambedkar University, Paliwal Park, Agra, Uttar Pradesh, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Agra College",
      description:
        "Agra College is a public college offering undergraduate programs in arts, science, and commerce.",
      location: "Mahatma Gandhi Road, Mantola, Agra, Uttar Pradesh, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInIndore = [
    {
      name: "Indian Institute of Technology (IIT) - Indore",
      description:
        "IIT Indore is one of the premier engineering institutes in India, known for its excellence in education and research.",
      location: "Khandwa Road, Simrol, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Devi Ahilya Vishwavidyalaya (DAVV)",
      description:
        "Devi Ahilya Vishwavidyalaya is a public university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Nalanda Campus, RNT Marg, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Institute of Engineering and Technology (IET) - DAVV",
      description:
        "IET DAVV is an engineering institute affiliated with Devi Ahilya Vishwavidyalaya (DAVV), offering undergraduate and postgraduate programs in engineering.",
      location: "Khandwa Road, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Engineering (M.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Medi-Caps University",
      description:
        "Medi-Caps University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines including engineering, management, and pharmacy.",
      location: "A.B. Road, Pigdamber, Rau, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Shri Govindram Seksaria Institute of Technology and Science (SGSITS)",
      description:
        "SGSITS Indore is an engineering college offering undergraduate and postgraduate programs in engineering.",
      location: "23, Park Road, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Engineering (M.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "International Institute of Professional Studies (IIPS) - DAVV",
      description:
        "IIPS DAVV is a management institute affiliated with Devi Ahilya Vishwavidyalaya (DAVV), offering undergraduate and postgraduate programs in management.",
      location: "Nalanda Campus, RNT Marg, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Business Administration (BBA)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Mahatma Gandhi Memorial Medical College (MGMMC)",
      description:
        "MGMMC Indore is a medical college offering undergraduate and postgraduate programs in medicine and surgery.",
      location: "AB Rd, near the Goyal Nagar, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sanghvi Institute of Management and Science (SIMS)",
      description:
        "SIMS Indore is a management institute offering undergraduate and postgraduate programs in management.",
      location:
        "Opp. IIM Indore, Pigdambar, Rau, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Business Administration (BBA)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Prestige Institute of Management and Research (PIMR)",
      description:
        "PIMR Indore is a management institute offering undergraduate and postgraduate programs in management.",
      location: "Scheme 74C, Vijay Nagar, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Business Administration (BBA)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Astral Institute of Technology and Research (AITR)",
      description:
        "AITR Indore is an engineering college offering undergraduate and postgraduate programs in engineering.",
      location:
        "Gram Jhalaria, Opposite Revati Range, Sanwer Road, Indore, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Engineering (M.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInJaipur = [
    {
      name: "Malaviya National Institute of Technology (MNIT) - Jaipur",
      description:
        "MNIT Jaipur is one of the premier engineering institutes in India, known for its excellence in education and research.",
      location:
        "Jawahar Lal Nehru Marg, Jhalana Gram, Malviya Nagar, Jaipur, Rajasthan, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Manipal University Jaipur",
      description:
        "Manipal University Jaipur is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Dehmi Kalan, Near GVK Toll Plaza, Jaipur-Ajmer Expressway, Jaipur, Rajasthan, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Banasthali Vidyapith",
      description:
        "Banasthali Vidyapith is a women's university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "C-62, Sarojini Marg, C-Scheme, Jaipur, Rajasthan, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Jaipur National University (JNU)",
      description:
        "Jaipur National University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Jaipur-Agra Bypass, Near New RTO Office, Jagatpura, Jaipur, Rajasthan, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Maharishi Arvind University",
      description:
        "Maharishi Arvind University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Mundiaramsar, Near Bindayaka Industrial Area, Jaipur, Rajasthan, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Rajasthan Technical University (RTU)",
      description:
        "RTU Jaipur is a state technical university offering undergraduate, postgraduate, and doctoral programs in engineering and management.",
      location: "Rawatbhata Road, Kota, Rajasthan, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Jaipur Engineering College and Research Centre (JECRC)",
      description:
        "JECRC Jaipur is an engineering college offering undergraduate and postgraduate programs in engineering.",
      location:
        "Shri Ram Ki Nangal, via Sitapura RIICO, Tonk Road, Jaipur, Rajasthan, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Jagan Nath University",
      description:
        "Jagan Nath University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "State Highway 22, Bahadurgarh, Rajasthan, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Mahatma Jyoti Rao Phoole University (MJRP)",
      description:
        "MJRP University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "SP-2 & 3, Kant Kalwar, RIICO Industrial Area, NH-8, Near Achrol, Jaipur, Rajasthan, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Poornima University",
      description:
        "Poornima University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "IS 2027 to 2031, Ramchandrapura, P.O. Vidhani Vatika, Sitapura Extension, Jaipur, Rajasthan, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
  ];
  const collegesInFaridabad = [
    {
      name: "National Institute of Financial Management (NIFM)",
      description:
        "NIFM is a public management institute offering postgraduate programs in financial management.",
      location: "Sector 48, Pali Road, Faridabad, Haryana, India",
      courses: [
        {
          name: "Post Graduate Diploma in Management (Financial Management)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Manav Rachna University",
      description:
        "Manav Rachna University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Delhi Surajkund Road, Sector 43, Faridabad, Haryana, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "YMCA University of Science and Technology",
      description:
        "YMCA University is a public university offering undergraduate, postgraduate, and doctoral programs in science and technology.",
      location: "NH-2, Sector 6, Mathura Road, Faridabad, Haryana, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Aravali College of Engineering and Management",
      description:
        "Aravali College of Engineering and Management is a private engineering college offering undergraduate and postgraduate programs in engineering and management.",
      location:
        "Surajkund Badkhal Road, Village Jasana, Faridabad, Haryana, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "IBS Business School",
      description:
        "IBS Business School is a private business school offering postgraduate programs in management.",
      location:
        "IBS House, A-10/A, Sector-62, Institutional Area, Noida, Uttar Pradesh, India",
      courses: [
        {
          name: "Post Graduate Programme in Management (PGPM)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Lingaya's University",
      description:
        "Lingaya's University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Nachauli, Jasana Road, Old Faridabad, Faridabad, Haryana, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Manav Rachna International Institute of Research and Studies (MRIIRS)",
      description:
        "MRIIRS is a private institute offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Delhi Surajkund Road, Sector 43, Faridabad, Haryana, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Asian Institute of Medical Sciences",
      description:
        "Asian Institute of Medical Sciences is a private medical institute offering undergraduate and postgraduate programs in medicine.",
      location: "Badkal Flyover Road, Sector 21 A, Faridabad, Haryana, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Rawal Institute of Engineering and Technology",
      description:
        "Rawal Institute of Engineering and Technology is a private engineering college offering undergraduate programs in engineering.",
      location: "Sohna Road, Near Zakopur, Faridabad, Haryana, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Career Institute of Technology and Management (CITM)",
      description:
        "CITM is a private institute offering undergraduate and postgraduate programs in management and technology.",
      location: "Ballabgarh-Sohna Road, Faridabad, Haryana, India",
      courses: [
        {
          name: "Bachelor of Business Administration (BBA)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInChandigarh = [
    {
      name: "Panjab University",
      description:
        "Panjab University is a public collegiate university located in Chandigarh, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Sector 14, Chandigarh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Punjab Engineering College (PEC)",
      description:
        "Punjab Engineering College is a public engineering college located in Chandigarh, India. It offers undergraduate and postgraduate programs in engineering and technology.",
      location: "Sector 12, Chandigarh, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Engineering (M.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Post Graduate Government College (PGGC), Sector 11",
      description:
        "PGGC Sector 11 is a public college affiliated with Panjab University, offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Sector 11, Chandigarh, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Government Medical College and Hospital (GMCH)",
      description:
        "GMCH Chandigarh is a public medical college and hospital offering undergraduate and postgraduate programs in medicine and surgery.",
      location: "Sector 32, Chandigarh, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Government College of Commerce and Business Administration",
      description:
        "Government College of Commerce and Business Administration is a public college affiliated with Panjab University, offering undergraduate and postgraduate programs in commerce and business administration.",
      location: "Sector 50, Chandigarh, India",
      courses: [
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Commerce (M.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Chandigarh College of Architecture (CCA)",
      description:
        "CCA Chandigarh is a public college offering undergraduate and postgraduate programs in architecture.",
      location: "Sector 12, Chandigarh, India",
      courses: [
        {
          name: "Bachelor of Architecture (B.Arch)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Architecture (M.Arch)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Chandigarh Group of Colleges (CGC)",
      description:
        "CGC is a private college offering undergraduate and postgraduate programs in engineering, management, pharmacy, and other disciplines.",
      location:
        "Landran, Kharar-Banur Road, Sector 112, Landran, Sahibzada Ajit Singh Nagar, Punjab, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "University Institute of Engineering and Technology (UIET), Panjab University",
      description:
        "UIET is a public engineering institute affiliated with Panjab University, offering undergraduate and postgraduate programs in engineering and technology.",
      location: "Sector 25, Chandigarh, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Engineering (M.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Chandigarh University",
      description:
        "Chandigarh University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Gharuan, Mohali, Punjab, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Government Home Science College",
      description:
        "Government Home Science College is a public college affiliated with Panjab University, offering undergraduate and postgraduate programs in home science.",
      location: "Sector 10, Chandigarh, India",
      courses: [
        {
          name: "Bachelor of Science (B.Sc) in Home Science",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Science (M.Sc) in Home Science",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInKolkata = [
    {
      name: "University of Calcutta",
      description:
        "The University of Calcutta is a collegiate public state university located in Kolkata, West Bengal, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Senate House, 87/1, College Street, Kolkata, West Bengal, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Jadavpur University",
      description:
        "Jadavpur University is a public research university located in Kolkata, West Bengal, India. It offers undergraduate, postgraduate, and doctoral programs in science, engineering, arts, and other fields.",
      location:
        "Raja Subodh Chandra Mallick Rd, Jadavpur, Kolkata, West Bengal, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Indian Institute of Management (IIM) - Kolkata",
      description:
        "IIM Kolkata is a leading management institute offering postgraduate and doctoral programs in management.",
      location: "Diamond Harbour Road, Joka, Kolkata, West Bengal, India",
      courses: [
        {
          name: "Post Graduate Programme in Management (PGP)",
          fees: "Varies based on the program",
        },
        {
          name: "Fellow Programme in Management (FPM)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "St. Xavier's College, Kolkata",
      description:
        "St. Xavier's College is a private autonomous college located in Kolkata, West Bengal, India. It offers undergraduate programs in arts, science, and commerce.",
      location: "30 Park St, Park Street area, Kolkata, West Bengal, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Presidency University",
      description:
        "Presidency University is a public state university located in Kolkata, West Bengal, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "86/1 College St, Calcutta University, College Square, Kolkata, West Bengal, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Indian Statistical Institute (ISI) - Kolkata",
      description:
        "ISI Kolkata is an academic institution of national importance, specializing in the study of statistics and related sciences.",
      location: "203 Barrackpore Trunk Road, Kolkata, West Bengal, India",
      courses: [
        {
          name: "Bachelor of Statistics (B.Stat)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Statistics (M.Stat)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Aliah University",
      description:
        "Aliah University is a state government controlled autonomous university in Kolkata, West Bengal, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "New Town, Kolkata, West Bengal, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Indian Institute of Science Education and Research (IISER) - Kolkata",
      description:
        "IISER Kolkata is a premier autonomous public research institution located in Kolkata, West Bengal, India. It offers undergraduate, postgraduate, and doctoral programs in science.",
      location: "Mohanpur, Nadia, West Bengal, India",
      courses: [
        {
          name: "Integrated Master of Science (MS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Philosophy (Ph.D.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "National Institute of Fashion Technology (NIFT) - Kolkata",
      description:
        "NIFT Kolkata is a fashion institute offering undergraduate and postgraduate programs in fashion and design.",
      location:
        "Plot No-3B, Block-LA, Near 16 No. Water Tank (South), Kolkata, West Bengal, India",
      courses: [
        {
          name: "Bachelor of Design (B.Des)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Design (M.Des)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Indian Institute of Engineering Science and Technology (IIEST) - Shibpur",
      description:
        "IIEST Shibpur is a public technical and research university located in Shibpur, Howrah, West Bengal, India. It offers undergraduate, postgraduate, and doctoral programs in engineering and technology.",
      location: "IIEST, Shibpur, Howrah, West Bengal, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInHyderabad = [
    {
      name: "University of Hyderabad",
      description:
        "The University of Hyderabad is a public research university located in Hyderabad, Telangana, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Prof C R Rao Road, Gachibowli, Hyderabad, Telangana, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Indian School of Business (ISB)",
      description:
        "ISB Hyderabad is a private business school offering postgraduate programs in management.",
      location: "Gachibowli, Hyderabad, Telangana, India",
      courses: [
        {
          name: "Post Graduate Programme in Management (PGP)",
          fees: "Varies based on the program",
        },
        {
          name: "Fellow Programme in Management (FPM)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "International Institute of Information Technology (IIIT) - Hyderabad",
      description:
        "IIIT Hyderabad is a research university located in Hyderabad, Telangana, India. It focuses on information technology and offers undergraduate, postgraduate, and doctoral programs.",
      location: "Gachibowli, Hyderabad, Telangana, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Osmania University",
      description:
        "Osmania University is a public state university located in Hyderabad, Telangana, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Osmania University Main Rd, Amberpet, Hyderabad, Telangana, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "BITS Pilani - Hyderabad Campus",
      description:
        "BITS Pilani Hyderabad Campus is a private engineering institute affiliated with Birla Institute of Technology and Science (BITS), Pilani. It offers undergraduate, postgraduate, and doctoral programs in engineering.",
      location: "Shameerpet, Hyderabad, Telangana, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Engineering (M.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Indian Institute of Technology (IIT) - Hyderabad",
      description:
        "IIT Hyderabad is one of the premier engineering institutes in India, known for its excellence in education and research.",
      location: "Kandi, Sangareddy, Telangana, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "NALSAR University of Law",
      description:
        "NALSAR University of Law is a legal studies institute located in Hyderabad, Telangana, India. It offers undergraduate, postgraduate, and doctoral programs in law.",
      location:
        "Justice City, Shameerpet, Ranga Reddy District, Hyderabad, Telangana, India",
      courses: [
        { name: "Bachelor of Laws (LLB)", fees: "Varies based on the program" },
        { name: "Master of Laws (LLM)", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Jawaharlal Nehru Technological University (JNTU) - Hyderabad",
      description:
        "JNTU Hyderabad is a public university located in Hyderabad, Telangana, India. It offers undergraduate, postgraduate, and doctoral programs in engineering.",
      location: "Kukatpally, Hyderabad, Telangana, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Maulana Azad National Urdu University (MANUU)",
      description:
        "MANUU is a central university located in Hyderabad, Telangana, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines with Urdu as the medium of instruction.",
      location: "Gachibowli, Hyderabad, Telangana, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Sri Venkateswara Institute of Medical Sciences (SVIMS)",
      description:
        "SVIMS is a medical institute located in Tirupati, Andhra Pradesh, India, with a campus in Hyderabad, Telangana, India. It offers undergraduate, postgraduate, and doctoral programs in medical sciences.",
      location:
        "Tirumala By-Pass Rd, Sri Padmavati Mahila Visvavidyalayam, Tirupati, Andhra Pradesh, India",
      courses: [
        { name: "MBBS", fees: "Varies based on the program" },
        { name: "MD/MS", fees: "Varies based on the program" },
        { name: "DM/M.Ch", fees: "Varies based on the program" },
      ],
    },
    {
      name: "ICFAI Foundation for Higher Education (IFHE)",
      description:
        "IFHE Hyderabad is a deemed university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Donthanapally, Shankarapalli Road, Hyderabad, Telangana, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
  ];
  const collegesInBhopal = [
    {
      name: "Indian Institute of Science Education and Research (IISER) - Bhopal",
      description:
        "IISER Bhopal is a premier research institute in Bhopal, Madhya Pradesh, India, dedicated to scientific research and education.",
      location: "Bhopal Bypass Road, Bhauri, Bhopal, Madhya Pradesh, India",
      courses: [
        {
          name: "Integrated Master of Science (MS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Philosophy (Ph.D.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Maulana Azad National Institute of Technology (MANIT) - Bhopal",
      description:
        "MANIT Bhopal is an Institute of National Importance located in Bhopal, Madhya Pradesh, India. It offers undergraduate, postgraduate, and doctoral programs in engineering.",
      location:
        "Link Road Number 3, Near Kali Mata Mandir, Bhopal, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Philosophy (Ph.D.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Barkatullah University",
      description:
        "Barkatullah University is a public university located in Bhopal, Madhya Pradesh, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Habib Ganj, Bhopal, Madhya Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "People's University",
      description:
        "People's University is a private university located in Bhopal, Madhya Pradesh, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "People's Campus, Bhanpur, Bhopal, Madhya Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "LNCT University",
      description:
        "LNCT University is a private university located in Bhopal, Madhya Pradesh, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Kolar Road, Kalchuri Nagar, Bhopal, Madhya Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "RGPV University",
      description:
        "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV) is a public university located in Bhopal, Madhya Pradesh, India. It offers undergraduate, postgraduate, and doctoral programs in engineering, technology, pharmacy, and other fields.",
      location:
        "Airport Bypass Road, Gandhi Nagar, Bhopal, Madhya Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Sagar Institute of Science and Technology (SISTec)",
      description:
        "Sagar Institute of Science and Technology (SISTec) is a private engineering college located in Bhopal, Madhya Pradesh, India. It offers undergraduate and postgraduate programs in engineering and technology.",
      location:
        "Opposite International Public School, Raisen Road, Bhopal, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Engineering (M.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "IEHE Bhopal",
      description:
        "Institute for Excellence in Higher Education (IEHE) is an autonomous college located in Bhopal, Madhya Pradesh, India. It offers undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Govindpura, BHEL, Bhopal, Madhya Pradesh, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        { name: "Master of Arts (MA)", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Scope College of Engineering",
      description:
        "Scope College of Engineering is a private engineering college located in Bhopal, Madhya Pradesh, India. It offers undergraduate programs in engineering.",
      location: "Gautam Nagar, Bhopal, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Patel Group of Institutions",
      description:
        "Patel Group of Institutions is a private college located in Bhopal, Madhya Pradesh, India. It offers undergraduate programs in engineering, pharmacy, and management.",
      location: "Ratibad, Bhopal, Madhya Pradesh, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Pharmacy (B.Pharm)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInMohali = [
    {
      name: "Indian School of Business (ISB) - Mohali Campus",
      description:
        "ISB Mohali Campus is one of the campuses of the prestigious Indian School of Business, offering postgraduate programs in management.",
      location: "Knowledge City, Sector 81, SAS Nagar, Mohali, Punjab, India",
      courses: [
        {
          name: "Post Graduate Programme in Management (PGP)",
          fees: "Varies based on the program",
        },
        {
          name: "Fellow Programme in Management (FPM)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Chandigarh University",
      description:
        "Chandigarh University is a private university located near Mohali, Punjab, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Gharuan, Mohali, Punjab, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Indian Institute of Science Education and Research (IISER) - Mohali",
      description:
        "IISER Mohali is one of the premier research institutes in Mohali, Punjab, India, dedicated to scientific research and education.",
      location: "Knowledge City, Sector 81, SAS Nagar, Mohali, Punjab, India",
      courses: [
        {
          name: "Integrated Master of Science (MS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Philosophy (Ph.D.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Aryans Group of Colleges",
      description:
        "Aryans Group of Colleges is a private college located in Mohali, Punjab, India. It offers undergraduate and postgraduate programs in various disciplines.",
      location:
        "Chandigarh-Patiala Highway, Near Chandigarh, Nepra, Mohali, Punjab, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "ISF College of Pharmacy",
      description:
        "ISF College of Pharmacy is a private pharmacy college located in Mohali, Punjab, India. It offers undergraduate and postgraduate programs in pharmacy.",
      location: "Ghal Kalan, Ferozepur Road, Moga, Punjab, India",
      courses: [
        {
          name: "Bachelor of Pharmacy (B.Pharm)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Pharmacy (M.Pharm)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Swami Parmanand College of Engineering and Technology",
      description:
        "Swami Parmanand College of Engineering and Technology is a private engineering college located in Mohali, Punjab, India. It offers undergraduate programs in engineering.",
      location: "Banur, Mohali, Punjab, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Indo Global Colleges",
      description:
        "Indo Global Colleges is a group of private colleges located in Mohali, Punjab, India. It offers undergraduate and postgraduate programs in engineering, management, pharmacy, and other fields.",
      location: "Abhipur, Mohali, Punjab, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Shaheed Udham Singh College of Research and Technology",
      description:
        "Shaheed Udham Singh College of Research and Technology is a private college located in Mohali, Punjab, India. It offers undergraduate and postgraduate programs in various disciplines.",
      location: "Tangori, Mohali, Punjab, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInKanpur = [
    {
      name: "Indian Institute of Technology (IIT) - Kanpur",
      description:
        "IIT Kanpur is one of the premier engineering institutes in India, known for its excellence in education and research.",
      location: "Kalyanpur, Kanpur, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Harcourt Butler Technical University (HBTU)",
      description:
        "HBTU, formerly known as HBTI, is a technical university in Kanpur, Uttar Pradesh, India, offering undergraduate and postgraduate programs in engineering and technology.",
      location: "Nawabganj, Kanpur, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Chhatrapati Shahu Ji Maharaj University (CSJMU)",
      description:
        "CSJMU, formerly known as Kanpur University, is a public state university in Kanpur, Uttar Pradesh, India, offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Kalyanpur, Kanpur, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Dr. Ambedkar Institute of Technology for Handicapped (AITH)",
      description:
        "AITH is an autonomous institution located in Kanpur, Uttar Pradesh, India, offering degree programs for students with disabilities in engineering and technology.",
      location: "GT Road, Kanpur, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Dayanand Dinanath College (DDC)",
      description:
        "DDC is a private college in Kanpur, Uttar Pradesh, India, offering undergraduate programs in various disciplines.",
      location: "Kanpur, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Pranveer Singh Institute of Technology (PSIT)",
      description:
        "PSIT is a private engineering college in Kanpur, Uttar Pradesh, India, affiliated with AKTU, Lucknow. It offers undergraduate and postgraduate programs in engineering.",
      location: "Kanpur, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Allenhouse Institute of Technology (AIT)",
      description:
        "AIT is a private engineering college in Kanpur, Uttar Pradesh, India, affiliated with AKTU, Lucknow. It offers undergraduate and postgraduate programs in engineering.",
      location: "Kanpur, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Rama University",
      description:
        "Rama University is a private university in Kanpur, Uttar Pradesh, India, offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Kanpur, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
  ];
  const collegesInAllahabad = [
    {
      name: "Indian Institute of Information Technology (IIIT) - Allahabad",
      description:
        "IIIT Allahabad is a premier institute of excellence in information technology and related fields, offering undergraduate, postgraduate, and doctoral programs.",
      location: "Deoghat, Jhalwa, Allahabad, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "University of Allahabad",
      description:
        "The University of Allahabad is one of the oldest central universities in India, offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Old Katra, Prayagraj, Allahabad, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Motilal Nehru National Institute of Technology (MNNIT) - Allahabad",
      description:
        "MNNIT Allahabad is an Institute of National Importance, offering undergraduate, postgraduate, and doctoral programs in engineering, technology, and related fields.",
      location: "Teliarganj, Prayagraj, Allahabad, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Ewing Christian College (ECC)",
      description:
        "ECC is an autonomous college affiliated with the University of Allahabad, offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Allenganj, Prayagraj, Allahabad, Uttar Pradesh, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Bachelor of Science (B.Sc)",
          fees: "Varies based on the program",
        },
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "United College of Engineering and Research",
      description:
        "United College of Engineering and Research is a private engineering college in Allahabad, Uttar Pradesh, India, offering undergraduate and postgraduate programs in engineering.",
      location: "Near Isapur, Naini, Allahabad, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Shambhunath Institute of Engineering and Technology (SIET)",
      description:
        "SIET is a private engineering college in Allahabad, Uttar Pradesh, India, offering undergraduate and postgraduate programs in engineering.",
      location: "Jhalwa, Allahabad, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "BBS College of Engineering and Technology (BBSCET)",
      description:
        "BBSCET is a private engineering college in Allahabad, Uttar Pradesh, India, offering undergraduate and postgraduate programs in engineering.",
      location: "Phaphamau, Allahabad, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInPatna = [
    {
      name: "Indian Institute of Technology (IIT) - Patna",
      description:
        "IIT Patna is one of the premier engineering institutes in India, known for its excellence in education and research.",
      location: "Bihta, Patna, Bihar, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "National Institute of Technology (NIT) - Patna",
      description:
        "NIT Patna is an Institute of National Importance, offering undergraduate, postgraduate, and doctoral programs in engineering and technology.",
      location: "Ashok Rajpath, Patna, Bihar, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Patna University",
      description:
        "Patna University is one of the oldest universities in India, offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Ashok Rajpath, Near Patna College, Patna, Bihar, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Chanakya National Law University (CNLU)",
      description:
        "CNLU Patna is a national law university offering undergraduate, postgraduate, and doctoral programs in law and related fields.",
      location: "Nyaya Nagar, Mithapur, Patna, Bihar, India",
      courses: [
        {
          name: "Bachelor of Laws (LL.B.)",
          fees: "Varies based on the program",
        },
        { name: "Master of Laws (LL.M.)", fees: "Varies based on the program" },
        { name: "Ph.D. in Law", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Patna Medical College and Hospital (PMCH)",
      description:
        "PMCH is one of the oldest medical colleges in India, offering undergraduate and postgraduate programs in medicine and surgery.",
      location: "Ashok Rajpath, Patna, Bihar, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Nalanda Open University (NOU)",
      description:
        "NOU Patna is a distance learning university offering undergraduate, postgraduate, and diploma programs in various disciplines.",
      location:
        "2nd/3rd Floor, Biskoman Bhawan, West Gandhi Maidan, Patna, Bihar, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Diploma programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Birla Institute of Technology (BIT) - Patna",
      description:
        "BIT Patna is a private engineering college affiliated with BIT Mesra, offering undergraduate and postgraduate programs in engineering and technology.",
      location: "Near Patna Airport, Patna, Bihar, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Engineering (M.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInSurat = [
    {
      name: "Sardar Vallabhbhai National Institute of Technology (SVNIT) - Surat",
      description:
        "SVNIT Surat is an Institute of National Importance, offering undergraduate, postgraduate, and doctoral programs in engineering and technology.",
      location: "Ichchhanath, Surat, Gujarat, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Veermata Jijabai Technological Institute (VJTI)",
      description:
        "VJTI Surat is an engineering institute located in Surat, Gujarat, India. It offers undergraduate, postgraduate, and doctoral programs in engineering.",
      location: "Ring Road, Majura Gate, Surat, Gujarat, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "South Gujarat University (SGU)",
      description:
        "SGU Surat is a public state university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Udhana - Magdalla Road, Someshwar Char Rasta, Near Airport, Surat, Gujarat, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Government Medical College (GMC) - Surat",
      description:
        "GMC Surat is a medical college affiliated with the Veer Narmad South Gujarat University, offering undergraduate and postgraduate programs in medicine and surgery.",
      location: "Majura Gate, Surat, Gujarat, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Dr. S & S.S. Ghandhy Government Engineering College",
      description:
        "Dr. S & S.S. Ghandhy Government Engineering College is a government engineering college located in Surat, Gujarat, India. It offers undergraduate programs in engineering.",
      location: "Near Majura Gate, Majura, Surat, Gujarat, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "C. U. Shah Medical College (CUSMC)",
      description:
        "CUSMC Surat is a medical college offering undergraduate and postgraduate programs in medicine and surgery.",
      location:
        "Dudhia Talav, Post Box No. 23, Sahada, Wadi, Surat, Gujarat, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInVaranasi = [
    {
      name: "Banaras Hindu University (BHU)",
      description:
        "BHU is a public central university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Varanasi, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Institute of Medical Sciences (IMS), Banaras Hindu University (BHU)",
      description:
        "IMS BHU is a medical college affiliated with Banaras Hindu University, offering MBBS and MD programs.",
      location: "Varanasi, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Indian Institute of Technology (IIT) - BHU, Varanasi",
      description:
        "IIT BHU is a premier engineering institute offering B.Tech, M.Tech, and Ph.D. programs in engineering and technology.",
      location: "Varanasi, Uttar Pradesh, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Faculty of Management Studies (FMS), Banaras Hindu University (BHU)",
      description:
        "FMS BHU offers postgraduate programs in management, including MBA and Ph.D. in Management.",
      location: "Varanasi, Uttar Pradesh, India",
      courses: [
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. in Management", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Mahatma Gandhi Kashi Vidyapith",
      description:
        "Mahatma Gandhi Kashi Vidyapith is a public university offering undergraduate and postgraduate programs in various disciplines.",
      location: "Varanasi, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Institute of Science, Banaras Hindu University (BHU)",
      description:
        "The Institute of Science BHU offers undergraduate, postgraduate, and doctoral programs in science and research.",
      location: "Varanasi, Uttar Pradesh, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
  ];
  const collegesInNagpur = [
    {
      name: "Visvesvaraya National Institute of Technology (VNIT) - Nagpur",
      description:
        "VNIT Nagpur is one of the premier engineering institutes in India, offering undergraduate, postgraduate, and doctoral programs in engineering and technology.",
      location: "South Ambazari Road, Nagpur, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)",
      description:
        "RTMNU is a public state university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Chhatrapati Shivaji Maharaj Administrative Premises, Ravindranath Tagore Marg, Nagpur, Maharashtra, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Government Medical College and Hospital (GMCH) - Nagpur",
      description:
        "GMCH Nagpur is a medical college and hospital offering undergraduate and postgraduate programs in medicine and surgery.",
      location: "Hanuman Nagar, Nagpur, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Anjuman College of Engineering and Technology",
      description:
        "Anjuman College of Engineering and Technology offers undergraduate programs in engineering.",
      location: "Mangalwari Bazar Road, Sadar, Nagpur, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Dhanwate National College (DNC)",
      description:
        "DNC Nagpur is an autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Congress Nagar, Nagpur, Maharashtra, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Master of Science (M.Sc)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Hislop College",
      description:
        "Hislop College is an autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Temple Road, Civil Lines, Nagpur, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Commerce (M.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Guru Nanak Institute of Engineering and Technology (GNIET)",
      description: "GNIET Nagpur offers undergraduate programs in engineering.",
      location: "Kalmeshwar, Nagpur, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "G.H. Raisoni Institute of Engineering and Technology (GHRIET)",
      description:
        "GHRIET Nagpur offers undergraduate and postgraduate programs in engineering.",
      location: "CRPF Gate No. 3, Hingna Road, Nagpur, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "KDK College of Engineering",
      description:
        "KDK College of Engineering offers undergraduate programs in engineering.",
      location: "Great Nag Road, Nandanvan, Nagpur, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sarode Institute of Technology",
      description:
        "Sarode Institute of Technology offers undergraduate programs in engineering.",
      location: "Gondia Bhandara Road, Bhandara, Nagpur, Maharashtra, India",
      courses: [
        {
          name: "Bachelor of Engineering (B.E.)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInBhubaneswar = [
    {
      name: "Indian Institute of Technology (IIT) - Bhubaneswar",
      description:
        "IIT Bhubaneswar is one of the premier engineering institutes in India, offering undergraduate, postgraduate, and doctoral programs in engineering and technology.",
      location: "Argul, Jatni, Khordha, Bhubaneswar, Odisha, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "National Institute of Science Education and Research (NISER)",
      description:
        "NISER Bhubaneswar is a research institute offering integrated M.Sc. and Ph.D. programs in science.",
      location: "Jatni, Khordha, Bhubaneswar, Odisha, India",
      courses: [
        { name: "Integrated M.Sc.", fees: "Varies based on the program" },
        { name: "Ph.D. in Science", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Xavier Institute of Management (XIMB)",
      description:
        "XIMB is a premier business school offering postgraduate and doctoral programs in management.",
      location: "Xavier Square, Jayadev Vihar, Bhubaneswar, Odisha, India",
      courses: [
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. in Management", fees: "Varies based on the program" },
      ],
    },
    {
      name: "KIIT Deemed to be University",
      description:
        "KIIT is a private deemed university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Patia, Bhubaneswar, Odisha, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Institute of Physics (IOP)",
      description:
        "IOP Bhubaneswar is a research institute offering doctoral programs in physics.",
      location: "Sachivalaya Marg, Sainik School, Bhubaneswar, Odisha, India",
      courses: [
        { name: "Ph.D. in Physics", fees: "Varies based on the program" },
      ],
    },
    {
      name: "International Institute of Information Technology (IIIT) - Bhubaneswar",
      description:
        "IIIT Bhubaneswar is an autonomous institute offering undergraduate, postgraduate, and doctoral programs in information technology.",
      location: "Gothapatna, PO: Malipada, Bhubaneswar, Odisha, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech) in Information Technology",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech) in Information Technology",
          fees: "Varies based on the program",
        },
        {
          name: "Ph.D. in Information Technology",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Siksha 'O' Anusandhan (SOA) Deemed to be University",
      description:
        "SOA Deemed to be University offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Khandagiri Square, Bhubaneswar, Odisha, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Centurion University of Technology and Management",
      description:
        "Centurion University offers undergraduate, postgraduate, and doctoral programs in technology and management.",
      location: "Jatni, Khordha, Bhubaneswar, Odisha, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Orissa University of Agriculture and Technology (OUAT)",
      description:
        "OUAT is a public agricultural university offering undergraduate, postgraduate, and doctoral programs in agriculture and technology.",
      location: "Bhubaneswar, Odisha, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Regional College of Management (RCM)",
      description:
        "RCM Bhubaneswar offers postgraduate programs in management.",
      location: "Baramunda, Bhubaneswar, Odisha, India",
      courses: [
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInThiruvananthapuram = [
    {
      name: "Indian Institute of Space Science and Technology (IIST)",
      description:
        "IIST Thiruvananthapuram is an autonomous institution offering undergraduate, postgraduate, and doctoral programs in space science and technology.",
      location: "Valiamala, Thiruvananthapuram, Kerala, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Indian Institute of Information Technology and Management Kerala (IIITM-K)",
      description:
        "IIITM-K is an autonomous institution offering postgraduate and doctoral programs in information technology and management.",
      location:
        "Technopark Campus, Karyavattom, Thiruvananthapuram, Kerala, India",
      courses: [
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Trivandrum Medical College",
      description:
        "Trivandrum Medical College is a government medical college offering undergraduate and postgraduate programs in medicine and surgery.",
      location: "Medical College Campus, Thiruvananthapuram, Kerala, India",
      courses: [
        {
          name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
          fees: "Varies based on the program",
        },
        {
          name: "Doctor of Medicine (MD)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "College of Engineering Trivandrum (CET)",
      description:
        "CET Trivandrum is a government engineering college offering undergraduate and postgraduate programs in engineering.",
      location: "Sreekariyam, Thiruvananthapuram, Kerala, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sree Chitra Thirunal College of Engineering (SCTCE)",
      description:
        "SCTCE Thiruvananthapuram is a government engineering college offering undergraduate and postgraduate programs in engineering.",
      location: "Pappanamcode, Thiruvananthapuram, Kerala, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Kerala University College of Engineering (KUCE)",
      description:
        "KUCE Thiruvananthapuram is a government engineering college offering undergraduate and postgraduate programs in engineering.",
      location: "Kariavattom, Thiruvananthapuram, Kerala, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Government Arts College Thiruvananthapuram",
      description:
        "Government Arts College Thiruvananthapuram offers undergraduate programs in arts and humanities.",
      location: "Thiruvananthapuram, Kerala, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Government Law College Thiruvananthapuram",
      description:
        "Government Law College Thiruvananthapuram offers undergraduate and postgraduate programs in law.",
      location: "Thiruvananthapuram, Kerala, India",
      courses: [
        { name: "Bachelor of Laws (LLB)", fees: "Varies based on the program" },
        { name: "Master of Laws (LLM)", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Mar Ivanios College",
      description:
        "Mar Ivanios College is an autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Nalanchira, Thiruvananthapuram, Kerala, India",
      courses: [
        { name: "Bachelor of Arts (BA)", fees: "Varies based on the program" },
        {
          name: "Master of Science (M.Sc)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Sree Kerala Varma College",
      description:
        "Sree Kerala Varma College is an autonomous college offering undergraduate and postgraduate programs in arts, science, and commerce.",
      location: "Kunnukuzhy, Thiruvananthapuram, Kerala, India",
      courses: [
        {
          name: "Bachelor of Commerce (B.Com)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Commerce (M.Com)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];
  const collegesInDehradun = [
    {
      name: "Indian Institute of Technology (IIT) Roorkee, Saharanpur Campus",
      description:
        "IIT Roorkee, Saharanpur Campus is a branch of the prestigious Indian Institute of Technology, offering undergraduate, postgraduate, and doctoral programs in engineering and technology.",
      location: "Saharanpur, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
        { name: "Ph.D.", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Doon University",
      description:
        "Doon University is a public university located in Dehradun, Uttarakhand, India. It offers undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Motharawala Road, Kedarpur, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Graphic Era Hill University (GEHU)",
      description:
        "GEHU Dehradun is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location: "Chakrata Road, Bhimtal, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Forest Research Institute (FRI) Deemed University",
      description:
        "FRI Dehradun is a premier institution for forestry research and education, offering undergraduate and postgraduate programs in forestry and related fields.",
      location:
        "P.O. New Forest, Forest Research Institute, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Bachelor of Science (B.Sc.) in Forestry",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Science (M.Sc.) in Forestry",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Uttaranchal University",
      description:
        "Uttaranchal University is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Arcadia Grant, P.O. Chandanwari, Premnagar, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "University of Petroleum and Energy Studies (UPES)",
      description:
        "UPES Dehradun is a private university offering undergraduate, postgraduate, and doctoral programs in petroleum, energy, and allied sectors.",
      location:
        "Energy Acres, P.O. Bidholi, Via-Prem Nagar, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Institute of Chartered Financial Analysts of India University (ICFAI)",
      description:
        "ICFAI Dehradun is a private university offering undergraduate, postgraduate, and doctoral programs in various disciplines.",
      location:
        "Rajawala Road, Central Hope Town, Selaqui, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Various undergraduate programs",
          fees: "Varies based on the program",
        },
        {
          name: "Various postgraduate programs",
          fees: "Varies based on the program",
        },
        { name: "Ph.D. programs", fees: "Varies based on the program" },
      ],
    },
    {
      name: "Doon Business School (DBS)",
      description:
        "DBS Dehradun is a private business school offering undergraduate and postgraduate programs in management.",
      location:
        "Mi-122, Behind Pharma City, Selaqui, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Bachelor of Business Administration (BBA)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Himalayan Institute of Technology",
      description:
        "Himalayan Institute of Technology is a private institute offering undergraduate and postgraduate programs in engineering and technology.",
      location:
        "Near Central Excise Colony, Suddhowala, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Bachelor of Technology (B.Tech)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Technology (M.Tech)",
          fees: "Varies based on the program",
        },
      ],
    },
    {
      name: "Institute of Management Studies (IMS)",
      description:
        "IMS Dehradun is a private business school offering undergraduate and postgraduate programs in management.",
      location:
        "Makkawala Greens, Mussoorie Diversion Road, Dehradun, Uttarakhand, India",
      courses: [
        {
          name: "Bachelor of Business Administration (BBA)",
          fees: "Varies based on the program",
        },
        {
          name: "Master of Business Administration (MBA)",
          fees: "Varies based on the program",
        },
      ],
    },
  ];

  const collegeData = [
    {
      location: "gurugram",
      colleges: collegesInGurugram,
      des: `Gurugram, also known as Gurgaon, is a city located in the northern Indian state of Haryana. Over the past few decades, Gurugram has transformed from a small agricultural town into a major financial and technological hub, often referred to as the "Millennium City." Here are some key points about Gurugram:`,
    },
    {
      location: "agra",
      colleges: collegesInAgra,
      des: "Agra, situated in the northern state of Uttar Pradesh, India, is renowned worldwide for its rich cultural heritage, architectural marvels, and historical significance. Here are some specialties that make Agra stand out:",
    },
    {
      location: "mohali",
      colleges: collegesInMohali,
      des: "Mohali, Punjab, thrives as an educational and technological hub. It hosts esteemed institutions like the Indian School of Business and Chandigarh University. With a growing IT sector, Mohali houses numerous tech companies and startups. The city's education infrastructure and IT opportunities attract students and professionals from across India. Its strategic location near Chandigarh adds to its appeal. Additionally, Mohali boasts modern amenities, infrastructure, and a cosmopolitan culture. These factors contribute to Mohali's reputation as a dynamic city for education, innovation, and economic growth in the region.",
    },
    {
      location: "chandigarh",
      colleges: collegesInChandigarh,
      des: "Chandigarh, the capital of Punjab and Haryana, is renowned for its urban planning, cleanliness, and greenery. Designed by Swiss-French architect Le Corbusier, it is a masterpiece of modern architecture and city planning. The city's distinctive grid layout, with sectors dedicated to specific functions, fosters efficient organization and navigation. Chandigarh is also known for its lush gardens, including the famous Rock Garden and Rose Garden, which attract visitors from around the world. As a union territory, it serves as the administrative and cultural center of the region. Chandigarh's high standard of living, well-maintained infrastructure, and vibrant cultural scene make it a coveted destination for residents and tourists alike.",
    },
    {
      location: "delhi",
      colleges: collegesInDelhi,
      des: "Delhi, the capital city of India, is a prominent educational hub renowned for its diverse range of educational institutions and opportunities. From prestigious universities to renowned schools, Delhi offers a plethora of options for students seeking quality education.",
    },
    {
      location: "noida",
      colleges: collegesInNoida,
      des: "Noida, a prominent city in the National Capital Region (NCR) of India, has emerged as a bustling educational hub, offering a diverse range of educational opportunities across various disciplines.One of the key features of education in Noida is its robust infrastructure and modern amenities. The city is home to numerous schools, colleges, and universities equipped with state-of-the-art facilities, laboratories, libraries, and sports complexes, providing students with a conducive learning environment.",
    },
    {
      location: "kota",
      colleges: collegesInKota,
      des: `Kota, often referred to as the "Coaching Capital of India," is renowned for its exceptional coaching institutes specializing in engineering and medical entrance exams. These institutes have propelled Kota into a prominent educational center, attracting students from all over the country.`,
    },
    {
      location: "lucknow",
      colleges: collegesInLucknow,
      des: "Lucknow, the capital city of Uttar Pradesh, is celebrated for its rich cultural heritage and educational institutions that date back centuries. Renowned for its Nawabi culture, Lucknow has also emerged as a significant educational hub in northern India.",
    },
    {
      location: "kanpur",
      colleges: collegesInKanpur,
      des: "Kanpur, a major industrial city in Uttar Pradesh, India, is also recognized for its educational institutions that contribute significantly to the region's academic landscape.One of the notable educational establishments in Kanpur is the Indian Institute of Technology (IIT), Kanpur. Established in 1959, IIT Kanpur is one of the premier engineering institutes in India, offering undergraduate, postgraduate, and doctoral programs in various engineering disciplines.",
    },
    {
      location: "allahabad",
      colleges: collegesInAllahabad,
      des: "Allahabad, now known as Prayagraj, is steeped in historical and cultural significance, offering a rich tapestry of educational institutions.The city hosts the esteemed Allahabad University, one of the oldest and most prestigious universities in India, established in 1887. Renowned for its academic excellence, Allahabad University offers a wide array of undergraduate, postgraduate, and doctoral programs across various disciplines.",
    },
    {
      location: "patna",
      colleges: collegesInPatna,
      des: "Patna, the capital city of Bihar, is a vibrant educational hub with a blend of historical significance and modern educational institutions.The city boasts several esteemed educational establishments, including the prestigious Patna University, one of the oldest universities in India, founded in 1917. Patna University offers a wide range of undergraduate, postgraduate, and doctoral programs across various disciplines.",
    },
    {
      location: "mumbai",
      colleges: collegesInMumbai,
      des: "Mumbai, the financial capital of India, is renowned for its bustling educational landscape and diverse opportunities for learning and growth.The city is home to prestigious institutions like the University of Mumbai, one of the largest universities in the world, offering a wide array of undergraduate, postgraduate, and research programs across various disciplines.",
    },
    {
      location: "bangalore",
      colleges: collegesInBangalore,
      des: "Bangalore, known as the Silicon Valley of India, is celebrated for its thriving educational landscape and technological advancements.The city is home to premier institutions like the Indian Institute of Science (IISc), renowned for its excellence in scientific research and innovation across various disciplines.",
    },
    {
      location: "hyderabad",
      colleges: collegesInHyderabad,
      des: `Hyderabad, often referred to as the "City of Pearls" and "Cyberabad," is renowned for its rich history, cultural heritage, and burgeoning technological landscape.The city boasts a vibrant educational ecosystem, housing esteemed institutions like the Indian School of Business (ISB) and the International Institute of Information Technology (IIIT), which are globally recognized for their excellence in management and technology education, respectively.`,
    },
    {
      location: "chennai",
      colleges: collegesInChennai,
      des: `Chennai, the capital city of Tamil Nadu, is renowned for its vibrant culture, rich history, and significant contributions to various sectors, including education, healthcare, and technology.The city hosts several prestigious educational institutions, including the Indian Institute of Technology Madras (IIT Madras), one of India's premier engineering colleges known for its research and academic excellence. Chennai is also home to the University of Madras, which is one of the oldest universities in India, offering a wide range of undergraduate, postgraduate, and research programs.`,
    },
    {
      location: "jaipur",
      colleges: collegesInJaipur,
      des: `Jaipur, the capital city of Rajasthan, is renowned for its rich history, vibrant culture, and architectural marvels. Popularly known as the "Pink City" due to its distinct pink-colored buildings, Jaipur is a treasure trove of heritage and tradition.The city is home to several iconic landmarks, including the majestic Amer Fort, Jaigarh Fort, and Nahargarh Fort, which reflect the grandeur of Rajasthan's royal past. The Hawa Mahal, with its intricate latticework and unique architectural design, is another emblematic symbol of Jaipur's architectural brilliance.`,
    },
    {
      location: "kolkata",
      colleges: collegesInKolkata,
      des: `Kolkata, the capital city of West Bengal, is a vibrant metropolis known for its rich cultural heritage, intellectual legacy, and artistic contributions. Fondly referred to as the "City of Joy," Kolkata exudes a unique charm that blends the old-world charm with modernity seamlessly.The city boasts an illustrious history as the former capital of British India, evident in its architectural marvels like the Victoria Memorial, Howrah Bridge, and the iconic Writer's Building. Kolkata's colonial-era buildings, bustling streets, and quaint alleys offer a glimpse into its storied past.`,
    },
    {
      location: "bhopal",
      colleges: collegesInBhopal,
      des: `Bhopal, the capital city of Madhya Pradesh, is renowned for its rich history, scenic beauty, and cultural heritage. Known as the "City of Lakes," Bhopal is characterized by its picturesque landscapes, historic monuments, and vibrant culture.Bhopal is also known for its thriving art and culture scene, with numerous art galleries, museums, and cultural centers showcasing the region's heritage and creativity.  The Upper and Lower Lakes, situated in the heart of the city, offer serene surroundings and opportunities for leisure activities such as boating and picnicking.`,
    },
    {
      location: "surat",
      colleges: collegesInSurat,
      des: `Surat, located in the state of Gujarat, is a bustling city renowned for its vibrant culture, thriving economy, and rich history. As one of the fastest-growing cities in India, Surat has earned the nickname "Diamond City" due to its prominence in the global diamond industry.The city is a major center for diamond cutting and polishing, with numerous diamond markets and trading centers catering to both domestic and international markets. Surat's diamond industry has played a pivotal role in the city's economic growth and has earned it a reputation as one of the world's largest diamond processing hubs.`,
    },
    {
      location: "varanasi",
      colleges: collegesInVaranasi,
      des: `Varanasi, also known as Kashi or Banaras, is one of the oldest cities in the world and holds immense spiritual and cultural significance in Hinduism. Situated on the banks of the sacred river Ganges in the state of Uttar Pradesh, Varanasi is revered as the spiritual capital of India.The city is renowned for its ghats, which are series of steps leading down to the Ganges River, where devotees gather to perform rituals, take holy baths, and witness mesmerizing evening aarti ceremonies. The Dashashwamedh Ghat is particularly famous for its elaborate aarti rituals performed by priests with oil lamps, incense, and chants, creating a captivating spectacle.`,
    },
    {
      location: "nagpur",
      colleges: collegesInNagpur,
      des: `Nagpur, located in the Indian state of Maharashtra, is a city known for its rich cultural heritage, historical significance, and rapid industrial growth. Often referred to as the "Orange City" due to the abundant cultivation of oranges in the region, Nagpur serves as a prominent commercial and educational hub in central India.The city is renowned for its historical landmarks, including the majestic Deekshabhoomi, a sacred Buddhist monument marking the spot where Dr. B.R. Ambedkar converted to Buddhism. It is a symbol of social equality and attracts pilgrims and tourists from all over the world.`,
    },
    {
      location: "indore",
      colleges: collegesInIndore,
      des: `Indore, located in the heart of Madhya Pradesh, is a vibrant and rapidly growing city known for its rich cultural heritage, culinary delights, and thriving economy. Fondly referred to as the "Food Capital of India," Indore offers a diverse culinary scene that attracts food enthusiasts from far and wide.The city is renowned for its historical landmarks, including the Rajwada Palace, a majestic 18th-century palace that serves as a symbol of the Maratha rule in the region. The Lal Bagh Palace, with its stunning architecture and lush gardens, is another prominent attraction that reflects the grandeur of the Holkar dynasty.`,
    },
    {
      location: "pune",
      colleges: collegesInPune,
      des: `Pune, often referred to as the "Oxford of the East," is a dynamic city located in the western Indian state of Maharashtra. It is renowned for its rich cultural heritage, educational institutions, and thriving IT industry.One of Pune's most notable features is its prestigious educational institutions, including the Savitribai Phule Pune University, the Film and Television Institute of India (FTII), and the National Defence Academy (NDA). These institutions attract students from across the country and abroad, earning Pune its reputation as a major educational hub.`,
    },
    {
      location: "bhubaneswar",
      colleges: collegesInBhubaneswar,
      des: `Bhubaneswar, known as the "Temple City of India," embraces its rich history with ancient temples like Lingaraj and Mukteshwar. Its educational prowess shines through institutions like Utkal University and NIT. The city's evolution into a smart city showcases its commitment to sustainable development and modernization. Bhubaneswar's cultural heritage, spanning over 3,000 years, attracts visitors worldwide, offering insights into its glorious past. As a vibrant economic center, it fosters growth in various sectors, from tourism to IT. With its blend of tradition and progress, Bhubaneswar stands as a testament to Odisha's cultural richness and future aspirations.`,
    },
    {
      location: "thiruvananthapuram",
      colleges: collegesInThiruvananthapuram,
      des: `Thiruvananthapuram, the capital of Kerala, is renowned for its lush greenery, historic landmarks, and vibrant culture. It houses the iconic Padmanabhaswamy Temple, a marvel of Dravidian architecture, and the Napier Museum, showcasing Kerala's rich cultural heritage. The city's serene beaches like Kovalam and Varkala offer a perfect retreat for tourists. Thiruvananthapuram is also a hub for education and research, with esteemed institutions like the Indian Institute of Space Science and Technology (IIST) and the Indian Institute of Science Education and Research (IISER). With its blend of tradition, natural beauty, and academic excellence, Thiruvananthapuram holds a unique charm.`,
    },
    {
      location: "faridabad",
      colleges: collegesInFaridabad,
      des: `Faridabad, a bustling city in the National Capital Region (NCR), is known for its industrial prowess, educational institutions, and rapidly developing infrastructure. It hosts several large-scale industrial units, contributing significantly to the region's economy. The city's strategic location and excellent connectivity via roads and metro make it a preferred choice for businesses and commuters alike. Faridabad boasts numerous schools, colleges, and technical institutes offering quality education across various disciplines. With modern residential complexes, commercial centers, and recreational facilities, Faridabad continues to attract residents and investors seeking a blend of urban amenities and industrial opportunities.`,
    },
    {
      location: "dehradun",
      colleges: collegesInDehradun,
      des: `Dehradun, nestled in the picturesque foothills of the Himalayas, is renowned for its serene beauty, educational institutions, and vibrant culture. It serves as the capital of Uttarakhand state in India. The city is home to prestigious educational establishments like the Indian Military Academy (IMA) and the Forest Research Institute (FRI), attracting students from across the country. Dehradun's pleasant climate, lush greenery, and proximity to tourist destinations like Mussoorie make it a favored destination for both tourists and residents. With a mix of modern amenities and natural charm, Dehradun offers a unique blend of urban comfort and tranquil surroundings.`,
    },
  ];
  // const [data, setData] = useState([]);
  // const [isFetch, setisFetched] = useState(false);
  // const fetchDataFromServer = async () => {
  //   const Data = new Date().getDate();
  //   const encryptedToken = CryptoJS.AES.encrypt(
  //     JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
  //     process.env.NEXT_PUBLIC_PUBLIC_ENC
  //   ).toString();
  //   await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/fetchCollegeForSearch`, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       token: encryptedToken,
  //       searchTerm: location,
  //     }),
  //   })
  //     .then((res) => {
  //       res.json().then((data) => {
  //         data.code === 200 &&
  //           setData(
  //             data.data.map((item) => {
  //               return {
  //                 name: item.collegeName,
  //                 logo: JSON.parse(item.images)[0],
  //                 courses: JSON.parse(item.course).map((item) => {
  //                   return item.name;
  //                 }),
  //                 description: item.description.substring(0, 200),
  //               };
  //             })
  //           );
  //         data.code === 200 && setisFetched(true);
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };
  // useEffect(() => {
  //   fetchDataFromServer();
  //   data.length > 0 &&
  //     setCollegeData((pre) => {
  //       return [...pre, ...data];
  //     });
  //   // update state college data when location changes
  // }, [location]);
  return (
    <main className="top collegeByLocation">
      <Header
        title={`Top Colleges And Universities in ${location}`}
        image={bgimg}
      />
      <div className="slider">
        <h2>All Locations</h2>
        <div className="tags">
          {collegeData.map((item) => {
            return (
              <Link className={location === item.location ? "active" : ""}
                key={item.location}
                href={`/college-search-by-location/${item.location}`}
              >
                {`${item.location}`}
              </Link>
            );
          })}
        </div>
      </div>
      <h2>Colleges and universities Listing in {location}</h2>
      {collegeData
        .filter((item) => item.location.includes(location))
        .map((item, index) => {
          return (
            <CollegeTable
              key={index}
              colleges={item.colleges}
              description={item.des}
              location={item.location}
            />
          );
        })}
      <TakeAdmission />
      <PopularCollege />
      <div className="findMore">
        <CollegeLocation />
      </div>
      <NewsLetter />
    </main>
  );
};

export default CollegeByLocation;
