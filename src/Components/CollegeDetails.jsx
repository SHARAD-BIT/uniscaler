"use client";
import { useNavigationState } from "@/Helper/NavigationState";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import CollegeHeader from "../Utils/CollegeHeader";
import "./styles/collegeDetails.css";
import Overview from "../Utils/Overview";
import CourseData from "../Utils/CourseData";
import EnquiryForm from "../Utils/Enquiry";
import NewsLetter from "../Decorators/NewsLetter";
import SocialMedia from "../Utils/SocialMedia";
import CryptoJS from "crypto-js";
const CollegeDetails = () => {
  const { navState: state, setNavState } = useNavigationState();
  const [details, setDetails] = useState("overview");
  const [fetched, setIsFetch] = useState(false);
  const [list, setList] = useState([]);
  const [enquiryData, setEnquiryData] = useState(null);
  const Data = new Date().getDate();
  const navigate = useRouter();
  const encryptedToken = CryptoJS.AES.encrypt(
    JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
    process.env.NEXT_PUBLIC_PUBLIC_ENC
  ).toString();
  const [data, setData] = useState({
    f5db: {
      name: "BM Group of Institutions",
      id: "f5db",
      paragraph: [
        `BM Group of Institutions, located in Gurugram, India, is a distinguished educational institution renowned for its commitment to excellence in education and holistic development of students. Established with a vision to empower students with knowledge and skills that are relevant in today's dynamic world, BM Group of Institutions has emerged as a leading hub for quality education in the region.`,
        `The institution offers a wide range of programs across various disciplines including engineering, management, computer applications, education, law, and pharmacy. Each program is meticulously designed to provide students with a strong foundation in theoretical knowledge along with practical exposure, ensuring they are well-prepared to meet the demands of the industry.`,
        `One of the distinguishing features of BM Group of Institutions is its faculty, comprising experienced academicians and industry experts who are dedicated to nurturing talent and fostering a culture of innovation and creativity among students. The faculty members not only impart knowledge but also mentor and guide students, helping them explore their potential and pursue their passions.`,
        `The institution's state-of-the-art infrastructure provides students with a conducive learning environment equipped with modern amenities and facilities. From well-equipped laboratories and libraries to sports complexes and recreational spaces, BM Group of Institutions ensures that students have access to resources that support their overall development.`,
        `In addition to academic excellence, the institution places a strong emphasis on extracurricular activities and personality development. Through various clubs, societies, and events, students are encouraged to hone their leadership skills, communication abilities, and teamwork, preparing them to become well-rounded individuals capable of contributing positively to society.`,
        `Furthermore, BM Group of Institutions is committed to fostering industry linkages and collaborations to enhance the employability of its students. The institution regularly organizes guest lectures, workshops, and industry visits to expose students to real-world scenarios and emerging trends in their respective fields.`,
        `With a focus on innovation, integrity, and inclusivity, BM Group of Institutions continues to set new benchmarks in the field of education, shaping the future leaders and professionals of tomorrow. As it continues to evolve and expand its offerings, the institution remains steadfast in its mission to empower students and make a meaningful impact on society.`,
      ],
      courseDetails: [
        {
          name: "Engineering Courses",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
            "Bachelor of Technology (B.Tech) in Mechanical Engineering",
            "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering",
            "Bachelor of Technology (B.Tech) in Civil Engineering",
            "Bachelor of Technology (B.Tech) in Electrical Engineering",
          ],
        },
        {
          name: "management Courses",
          list: [
            "Bachelor of Business Administration (BBA)",
            "Master of Business Administration (MBA) with specialization in Marketing",
            "Master of Business Administration (MBA) with specialization in Finance",
            "Master of Business Administration (MBA) with specialization in Human Resource Management",
            "Master of Business Administration (MBA) with specialization in Operations Management",
            "Master of Business Administration (MBA) with specialization in Information Technology",
          ],
        },
        {
          name: "Computer Application",
          list: [
            "Bachelor of Computer Applications (BCA)",
            "Master of Computer Applications (MCA)",
          ],
        },
        {
          name: "Pharmacy Courses",
          list: [
            "Bachelor of Pharmacy (B.Pharm)",
            "Diploma in Pharmacy (D.Pharm)",
            "Master of Pharmacy (M.Pharm) with specialization in Pharmaceutical Chemistry",
            "Master of Pharmacy (M.Pharm) with specialization in Pharmacology",
            "Master of Pharmacy (M.Pharm) with specialization in Pharmaceutics",
          ],
        },
        {
          name: "Law Courses",
          list: ["Bachelor of Laws (LLB)", "Master of Laws (LLM)"],
        },
        {
          name: "Education Courses",
          list: [
            "Bachelor of Education (B.Ed)",
            "Master of Education (M.Ed)",
            "Diploma in Education (D.Ed)",
          ],
        },
      ],
      socialMedia: {
        twitter: "https://www.twitter.com/bmgroupgurgaon",
        youtube: "https://www.youtube.com/channel/UC7vxwmSdmfCpwi0-Dh4vOfQ",
        instagram: "https://www.instagram.com/bmgroupofinstitution",
        facebook: "https://www.facebook.com/portal.bmctm",
      },
    },
    f5dc: {
      name: "IILM University",
      id: "f5dc",
      paragraph: [
        `IILM University, situated in Gurugram, India, is a renowned educational institution committed to providing a transformative learning experience to its students. Established with a vision to nurture future leaders equipped with knowledge, skills, and values essential for success in a rapidly evolving world, IILM University stands out as a beacon of excellence in higher education.`,
        `IILM University offers a diverse range of undergraduate, postgraduate, and doctoral programs across various disciplines including Management, Liberal Arts, Law, Design, Technology, and Health Sciences. This multidisciplinary approach enables students to explore their interests, pursue their passions, and develop a well-rounded perspective.`,
        `With a focus on fostering a global mindset, IILM University emphasizes international collaborations, exchange programs, and partnerships with leading universities and institutions worldwide. This exposure to diverse cultures, perspectives, and academic practices enriches the learning experience and prepares students to thrive in a globalized world.`,
        `The university boasts a distinguished faculty comprising experienced academicians, industry professionals, and researchers who are committed to academic excellence and student development. Through innovative teaching methodologies, mentorship, and research guidance, the faculty members inspire and empower students to unleash their full potential.`,
        ` IILM University provides world-class infrastructure equipped with modern amenities and facilities to support academic, extracurricular, and recreational activities. From well-equipped classrooms and laboratories to libraries, sports complexes, and student lounges, the university offers a conducive environment for holistic development.`,
        `Recognizing the importance of industry exposure and practical experience, IILM University maintains strong ties with leading corporates, organizations, and industry bodies. These collaborations facilitate internships, projects, guest lectures, and placement opportunities, enabling students to gain real-world insights and enhance their employability.`,
        `The university promotes a culture of research, innovation, and entrepreneurship among students and faculty members. Through research centers, incubation hubs, and innovation labs, students are encouraged to explore new ideas, solve real-world challenges, and contribute to knowledge creation and societal development.`,
        `Apart from academic rigor, IILM University places a strong emphasis on holistic development, encompassing extracurricular activities, community service, leadership development, and ethical values. Various clubs, societies, events, and initiatives are organized to nurture talents, foster creativity, and instill a sense of social responsibility among students.`,
        `Situated in the bustling city of Gurugram, IILM University offers students the advantage of proximity to the corporate hub of India, providing opportunities for industry exposure, internships, and networking. The vibrant campus life, coupled with the dynamic city environment, offers a unique blend of academic excellence and urban lifestyle.`,
        `Overall, IILM University stands as a premier institution dedicated to shaping future leaders and professionals who are equipped to navigate the complexities of the modern world with confidence, competence, and compassion. With its commitment to excellence, innovation, and inclusivity, IILM University continues to inspire and empower the next generation of global citizens.`,
      ],
      courseDetails: [
        {
          name: "Management Courses",
          list: [
            "Bachelor of Business Administration (BBA)",
            "Master of Business Administration (MBA) with specializations",
            "Ph.D. in Management",
          ],
        },
        {
          name: "Engineering Courses",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
            "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering",
            "Master of Technology (M.Tech) in Computer Science and Engineering",
            "Master of Technology (M.Tech) in Electronics and Communication Engineering",
            "Ph.D. in Engineering",
          ],
        },
        {
          name: "Law Courses",
          list: [
            "Bachelor of Laws (LLB)",
            "Master of Laws (LLM)",
            "Integrated BA LLB (Hons.)",
          ],
        },
        {
          name: "Design Courses",
          list: ["Bachelor of Design (B.Des)", "Master of Design (M.Des)"],
        },
        {
          name: "Medical Courses",
          list: [
            "Bachelor of Pharmacy (B.Pharm)",
            "Bachelor of Physiotherapy (BPT)",
            "Master of Pharmacy (M.Pharm)",
            "Master of Physiotherapy (MPT)",
            "Ph.D. in Health Sciences",
          ],
        },
      ],
      socialMedia: {
        facebook: "https://www.facebook.com/iilmuniversity/",
        instagram: "https://www.instagram.com/iilmgurugramofficial/",
        linkedin: "https://www.linkedin.com/school/iilm-university-gurugram/",
        twitter: "https://twitter.com/IilmInstitute",
        youtube: "https://www.youtube.com/@iilm",
      },
    },
    f5dd: {
      name: "Ahmedabad Institute of Business Management (AIBM)",
      id: "f5dd",
      paragraph: [
        `Ahmedabad Institute of Business Management (AIBM) is a renowned educational institution located in Ahmedabad, Gujarat, India. Established with a vision to provide quality management education and groom future business leaders, AIBM is committed to excellence in academic and professional development.`,
        ` AIBM offers a variety of undergraduate and postgraduate programs in the field of management. These programs include Bachelor of Business Administration (BBA), Master of Business Administration (MBA), Executive MBA (EMBA), and specialized postgraduate diplomas in areas such as finance, marketing, human resources, and operations management.`,
        `The institute boasts a team of experienced faculty members who are experts in their respective domains. They bring a blend of academic knowledge and industry experience to the classroom, providing students with practical insights and theoretical foundations necessary for success in the business world.`,
        `The curriculum at AIBM is carefully designed to meet the evolving needs of the industry and equip students with relevant skills and knowledge. It includes a mix of core courses, electives, case studies, projects, and experiential learning opportunities to ensure holistic development and readiness for the corporate world.`,
        `AIBM maintains strong ties with the industry through partnerships, collaborations, and industry-academia interactions. Guest lectures, seminars, workshops, and corporate visits are regularly organized to expose students to real-world business scenarios, industry trends, and best practices.`,
        `The institute is equipped with modern infrastructure and state-of-the-art facilities to support academic, research, and extracurricular activities. This includes spacious classrooms, seminar halls, computer labs, libraries, and recreational facilities that foster an enriching learning environment.`,
        `AIBM has a dedicated placement cell that works closely with leading companies and organizations to facilitate internship opportunities, campus placements, and career counseling services for students. The institute has a strong track record of placements in diverse sectors such as banking, consulting, FMCG, IT, and manufacturing.`,
        `Recognizing the importance of entrepreneurship in today's economy, AIBM promotes entrepreneurship development initiatives among students. This includes startup incubation support, entrepreneurship workshops, mentorship programs, and networking opportunities with industry experts and successful entrepreneurs.`,
        ` AIBM encourages research and innovation through faculty-led research projects, industry collaborations, and participation in conferences and seminars. This fosters a culture of intellectual inquiry, knowledge creation, and thought leadership within the institute.`,
        `With an increasingly interconnected world, AIBM emphasizes the importance of a global perspective in business education. The institute offers international exchange programs, study tours, and collaborations with foreign universities to expose students to diverse cultures, markets, and business practices.`,
        `Overall, Ahmedabad Institute of Business Management stands as a reputable institution committed to nurturing talent, fostering innovation, and preparing students to excel as responsible and ethical business leaders in a rapidly changing global environment.`,
      ],
      courseDetails: [
        {
          name: "Management Courses",
          list: [
            "Bachelor of Business Administration (BBA)",
            "Master of Business Administration (MBA)",
            "Ph.D. in Management",
          ],
        },
        {
          name: "Liberal Arts",
          list: [
            "Bachelor of Arts (BA) in Liberal Arts",
            "Master of Arts (MA) in Liberal Arts",
            "Ph.D. in Liberal Arts",
          ],
        },
        {
          name: "Law Courses",
          list: [
            "Bachelor of Laws (LLB)",
            "Master of Laws (LLM)",
            "Integrated BA LLB (Hons.)",
          ],
        },
        {
          name: "Design Courses",
          list: ["Bachelor of Design (B.Des)", "Master of Design (M.Des)"],
        },
        {
          name: "Medical Courses",
          list: [
            "Bachelor of Pharmacy (B.Pharm)",
            "Bachelor of Physiotherapy (BPT)",
            "Master of Pharmacy (M.Pharm)",
            "Master of Physiotherapy (MPT)",
            "Ph.D. in Health Sciences",
          ],
        },
        {
          name: "Engineering Courses",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
            "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering",
            "Master of Technology (M.Tech) in Computer Science and Engineering",
            "Master of Technology (M.Tech) in Electronics and Communication Engineering",
            "Ph.D. in Engineering",
          ],
        },
      ],
      socialMedia: {
        facebook: "https://facebook.com/aibmconnect",
        instagram: "https://instagram.com/aibmconnect",
        linkedin:
          "https://linkedin.com/company/ahmedabad-insitute-of-business-management/",
      },
    },
    f5de: {
      name: "ITS Engineering College",
      paragraph: [
        `I.T.S Engineering College, located in Greater Noida, Uttar Pradesh, India, is a renowned institution known for providing quality education in the field of engineering and technology. Here's an overview of the key aspects of I.T.S Engineering College`,
        `I.T.S Engineering College offers a wide range of undergraduate and postgraduate programs in various branches of engineering and technology. These programs typically include Bachelor of Technology (B.Tech) degrees in disciplines such as Computer Science and Engineering, Electronics and Communication Engineering, Mechanical Engineering, Civil Engineering, Electrical Engineering, and Information Technology. Additionally, the college may offer postgraduate programs such as Master of Technology (M.Tech) and doctoral (Ph.D.) programs in specialized areas.`,
        `The college is often affiliated with a recognized university and may be accredited by national bodies such as the All India Council for Technical Education (AICTE). Accreditation ensures that the institution meets certain standards of quality in education and infrastructure.`,
        `I.T.S Engineering College boasts a team of highly qualified and experienced faculty members who are experts in their respective fields. These faculty members play a crucial role in delivering lectures, conducting research, guiding student projects, and providing mentorship.`,
        `The college campus is equipped with state-of-the-art infrastructure and modern facilities to support academic and extracurricular activities. This includes well-equipped classrooms, laboratories, computer centers, libraries, workshops, and sports facilities.`,
        ` I.T.S Engineering College emphasizes industry-academia collaboration to bridge the gap between theoretical knowledge and practical application. The college may have partnerships with industries for internships, training programs, industry visits, and guest lectures by industry professionals.`,
        `The college encourages research and innovation among students and faculty members. It may have research centers, labs, and facilities for conducting research in emerging areas of engineering and technology. Students are encouraged to participate in research projects and present their findings at conferences.`,
        `I.T.S Engineering College has a dedicated placement cell that assists students in securing job placements and internships. The placement cell organizes campus recruitment drives, conducts training sessions on interview preparation and resume writing, and maintains connections with leading companies and organizations.`,
        `The college may offer programs and initiatives to foster entrepreneurship among students. This could include startup incubation centers, entrepreneurship development cells, workshops on business planning and innovation, and support for student-led startups.`,
        `I.T.S Engineering College may have collaborations with international universities and institutions for academic exchange programs, joint research projects, and student mobility programs. This provides students with opportunities for global exposure and cross-cultural learning experiences.`,
        `Along with academics, the college encourages students to participate in extracurricular activities such as sports, cultural events, technical competitions, and student clubs. These activities promote holistic development and enhance the overall college experience.`,
        `In summary, I.T.S Engineering College in Greater Noida is committed to providing a conducive environment for academic excellence, research, innovation, and overall personality development of its students. Through its comprehensive educational programs and industry-oriented approach, the college aims to nurture competent engineers and technocrats capable of meeting the challenges of the modern world.`,
      ],
      courseDetails: [
        {
          name: "Engineering Courses",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
            "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering",
            "Bachelor of Technology (B.Tech) in Mechanical Engineering",
            "Bachelor of Technology (B.Tech) in Civil Engineering",
            "Bachelor of Technology (B.Tech) in Electrical Engineering",
            "Bachelor of Technology (B.Tech) in Information Technology",
            "Master of Technology (M.Tech) in Computer Science and Engineering",
            "Master of Technology (M.Tech) in Electronics and Communication Engineering",
            "Master of Technology (M.Tech) in Mechanical Engineering",
            "Master of Technology (M.Tech) in Civil Engineering",
            "Master of Technology (M.Tech) in Electrical Engineering",
            "Master of Technology (M.Tech) in Information Technology",
            "Ph.D. in Computer Science and Engineering",
            "Ph.D. in Electronics and Communication Engineering",
            "Ph.D. in Mechanical Engineering",
            "Ph.D. in Civil Engineering",
            "Ph.D. in Electrical Engineering",
            "Ph.D. in Information Technology",
          ],
        },
      ],
      socialMedia: {
        facebook: "https://www.facebook.com/ITSengggn/",
        instagram: "https://www.instagram.com/itsengggn/",
        linkedin: "https://www.linkedin.com/school/itsengggn/",
        twitter: "https://twitter.com/ITSengggn/",
        youtube: "https://www.youtube.com/user/itsengg",
      },
    },
  });
  const allName = Object.keys(data).map((item) => {
    return data[item].name;
  });
  useLayoutEffect(() => {
    if (!state) {
      navigate.replace("/");
    }
    window.scrollTo(0, 0);
    const title = document.title;
    document.title = `${state?.name} - Uniscaler`;
    // fetch data from for server
    !allName.includes(state?.name) &&
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
            data.code === 200 && setList(data.data);
            data.code === 200 && setIsFetch(true);
            data.code === 200 && setDetails("paragraph");
          })
        )
        .catch((err) => console.log(err));
    return () => {
      document.title = title;
    };
  }, []);

  useLayoutEffect(() => {
    list?.map((item) => {
      if (item.cName.trim() === state?.name.replace(/-/g, " ") && fetched) {
        const paragraph = [];
        paragraph.push(JSON.parse(item.overView));
        paragraph.push(JSON.parse(item.otherKeyPoints));
        setData({
          ...data,
          [state?.id]: {
            name: item.cName,
            paragraph: paragraph.flat(),
            courseDetails: JSON.parse(item.courseDetails),
            socialMedia: JSON.parse(item.socialMedia),
          },
        });
      }
    });
  }, [fetched]);

  useEffect(() => {
    details === "contact" ? navigate.push("/contact") : null;
    if (details === "apply") {
      setNavState({ name: state?.name });
      navigate.push("/admission");
    }
  }, [details]);
  const func = (value, name) => {
    setEnquiryData({
      courseName: value,
      collegeName: name,
    });
    setDetails("enquiry");
  };
  // No navigation state means this page was opened directly. The effect above
  // redirects; render nothing until it does, rather than dereferencing null.
  if (!state) return null;
  return (
    <main className="top">
      <CollegeHeader image={state?.img} alt={state?.name} />
      <div className={`buttons ${fetched && details === "" && `btnmn`}`}>
        <button onClick={() => setDetails("overview")}> Overview </button>
        <button onClick={() => setDetails("course")}> Course Details </button>
        <button onClick={() => setDetails("enquiry")}>Enquire Now</button>
        <button onClick={() => setDetails("apply")}> Apply </button>
        <button onClick={() => setDetails("socialMedia")}>
          {" "}
          Social Media{" "}
        </button>
        <button onClick={() => setDetails("contact")}> Contact Us </button>
      </div>
      {details === "overview" ? (
        <Overview data={data} state={state} />
      ) : details === "course" ? (
        <CourseData func={func} data={data} state={state} />
      ) : details === "enquiry" ? (
        <EnquiryForm data={data} state={state} enquiry={enquiryData} />
      ) : details === "socialMedia" ? (
        <SocialMedia data={data[state?.id].socialMedia} />
      ) : <div style={{height:"80px"}}></div>}
      <NewsLetter />
    </main>
  );
};

export default CollegeDetails;
