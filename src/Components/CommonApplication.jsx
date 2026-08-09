"use client";
import CPASrc from "../assets/cpa.jpg";
const CPA = CPASrc.src;
import "./styles/commonApplication.css";
import shivNadarSrc from "../assets/shiv-nadar.svg";

const shivNadar = shivNadarSrc.src;
import parulUniversitySrc from "../assets/parul-university.png";

const parulUniversity = parulUniversitySrc.src;
import amitySrc from "../assets/amity-university.png";

const amity = amitySrc.src;
import galgotiaSrc from "../assets/galgotia.png";

const galgotia = galgotiaSrc.src;
import kalingaSrc from "../assets/kalinga.png";

const kalinga = kalingaSrc.src;
import sgtUnoversitySrc from "../assets/sgt-university.jpg";

const sgtUnoversity = sgtUnoversitySrc.src;
import jimsSrc from "../assets/jims.jpeg";

const jims = jimsSrc.src;
import iilmSrc from "../assets/iilm-1.png";

const iilm = iilmSrc.src;
import Button from "../Utils/Button";
const CommonApplication = () => {
  const ApplicationList = [
    {
      name: "IILM UNIVERSITY",
      image: iilm,
      course: [
        {
          name: "Undergraduate Programs",
          list: [
            "Bachelor of Business Administration (BBA)",
            "Bachelor of Commerce (B.Com)",
            "Bachelor of Technology (B.Tech) in Computer Science Engineering, Electronics and Communication Engineering, Mechanical Engineering, etc.",
            "Bachelor of Arts (BA) in Economics, Psychology, Sociology, etc.",
            " Bachelor of Science (B.Sc) in Mathematics, Physics, Chemistry, etc.",
          ],
        },
        {
          name: "Postgraduate Programs:",
          list: [
            "Master of Business Administration (MBA) with various specializations like Marketing, Finance, Human Resource Management, Operations Management, etc.",
            "Master of Commerce (M.Com)",
            "Master of Technology (M.Tech) in Computer Science Engineering, Electronics and Communication Engineering, Mechanical Engineering, etc.",
            "Master of Arts (MA) in Economics, Psychology, Sociology, etc.",
            "Master of Science (M.Sc) in Mathematics, Physics, Chemistry, etc.",
            "Master of Journalism and Mass Communication (MJMC)",
            "Master of Social Work (MSW)",
            "Master of Fine Arts (MFA)",
          ],
        },
        {
          name: "Doctoral Programs:",
          list: [
            "Doctor of Philosophy (Ph.D.) in various disciplines like Management, Engineering, Social Sciences, etc.",
          ],
        },
        {
          name: "Integrated Programs:",
          list: ["Integrated BBA-MBA", "Integrated B.Tech-M.Tech"],
        },
        {
          name: "Certificate and Diploma Courses:",
          list: [
            "Various short-term certificate and diploma courses may also be offered in specialized areas.",
          ],
        },
      ],
    },
    {
      name: "JIMS GREATER NOIDA",
      image: jims,
      course: [
        {
          name: "Undergraduate Programs:",
          list: [
            "Bachelor of Business Administration (BBA)",
            "Bachelor of Computer Application (BCA)",
            "Bachelor of Commerce (B.Com)",
            "Bachelor of Arts (BA) in Journalism and Mass Communication",
          ],
        },
        {
          name: "Postgraduate Programs:",
          list: [
            "Master of Business Administration (MBA) with specializations such as Marketing, Finance, Human Resource Management, Operations Management, etc.",
            "Master of Computer Application (MCA)",
          ],
        },
        {
          name: "Integrated Programs:",
          list: ["Integrated BBA-MBA"],
        },
        {
          name: "Certificate and Diploma Courses:",
          list: [
            "JIMS Greater Noida may offer various short-term certificate and diploma courses in specialized areas, but these may vary over time.",
          ],
        },
      ],
    },
    {
      name: "KALINGA UNIVERSITY",
      image: kalinga,
      course: [
        {
          name: "Undergraduate Programs:",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science Engineering, Mechanical Engineering, Civil Engineering, Electrical Engineering, Electronics and Communication Engineering, etc.",
            "Bachelor of Science (B.Sc) in Nursing, Agriculture, Biotechnology, Computer Science, etc.",
            "Bachelor of Commerce (B.Com)",
            "Bachelor of Business Administration (BBA)",
            "Bachelor of Arts (BA) in various subjects like English, Economics, Political Science, Sociology, etc.",
            "Bachelor of Education (B.Ed)",
            "Bachelor of Pharmacy (B.Pharm)",
            "Bachelor of Design (B.Des)",
          ],
        },
        {
          name: "Postgraduate Programs:",
          list: [
            "Master of Technology (M.Tech) in Computer Science Engineering, Mechanical Engineering, Civil Engineering, Electrical Engineering, Electronics and Communication Engineering, etc.",
            "Master of Science (M.Sc) in Nursing, Agriculture, Biotechnology, Computer Science, etc.",
            "Master of Business Administration (MBA) with specializations such as Marketing, Finance, Human Resource Management, Operations Management, etc.",
            "Master of Commerce (M.Com)",
            "Master of Arts (MA) in various subjects like English, Economics, Political Science, Sociology, etc.",
            "Master of Education (M.Ed)",
            "Master of Pharmacy (M.Pharm)",
            "Master of Design (M.Des)",
          ],
        },
        {
          name: "Doctoral Programs:",
          list: ["Doctor of Philosophy (Ph.D.) in various disciplines."],
        },
        {
          name: "Diploma and Certificate Courses:",
          list: [
            "Diploma courses in fields like Engineering, Pharmacy, Education, etc.",
            "Certificate courses in specialized areas.",
          ],
        },
      ],
    },
    {
      name: "AMITY UNIVERSITY",
      image: amity,
      course: [
        {
          name: "Undergraduate Programs:",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science Engineering, Mechanical Engineering, Electronics and Communication Engineering, Civil Engineering, etc.",
            "Bachelor of Science (B.Sc) in Biotechnology, Physics, Chemistry, Mathematics, etc.",
            "Bachelor of Commerce (B.Com) with various specializations.",
            "Bachelor of Business Administration (BBA)",
            "Bachelor of Arts (BA) in Economics, Psychology, English Literature, Political Science, etc.",
            "Bachelor of Fine Arts (BFA) in Visual Arts, Performing Arts, etc.",
            "Bachelor of Architecture (B.Arch)",
            "Bachelor of Design (B.Des) in Fashion Design, Graphic Design, Interior Design, etc.",
            "Bachelor of Pharmacy (B.Pharm)",
            "Bachelor of Hotel Management (BHM)",
          ],
        },
        {
          name: "Postgraduate Programs:",
          list: [
            "Master of Technology (M.Tech) in Computer Science Engineering, Mechanical Engineering, Electronics and Communication Engineering, Civil Engineering, etc.",
            "Master of Science (M.Sc) in Biotechnology, Physics, Chemistry, Mathematics, etc.",
            "Master of Commerce (M.Com) with various specializations.",
            "Master of Business Administration (MBA) with specializations such as Marketing, Finance, Human Resource Management, Operations Management, etc.",
            "Master of Arts (MA) in Economics, Psychology, English Literature, Political Science, etc.",
            "Master of Fine Arts (MFA) in Visual Arts, Performing Arts, etc.",
            "Master of Design (M.Des) in Fashion Design, Graphic Design, Interior Design, etc.",
            "Master of Pharmacy (M.Pharm)",
            "Master of Hotel Management (MHM)",
          ],
        },
        {
          name: "Doctoral Programs:",
          list: ["Doctor of Philosophy (Ph.D.) in various disciplines."],
        },
        {
          name: "Diploma and Certificate Courses:",
          list: [
            "Diploma and certificate courses in specialized areas such as Digital Marketing, Event Management, Animation, etc.",
          ],
        },
      ],
    },
    {
      name: "PARUL UNIVERSITY",
      image: parulUniversity,
      course: [
        {
          name: "Engineering and Technology:",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science Engineering, Mechanical Engineering, Electronics and Communication Engineering, Civil Engineering, Electrical Engineering, etc.",
            "Master of Technology (M.Tech) in Computer Science Engineering, Mechanical Engineering, Electronics and Communication Engineering, Civil Engineering, Electrical Engineering, etc.",
          ],
        },
        {
          name: "Health Sciences:",
          list: [
            "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
            "Bachelor of Dental Surgery (BDS)",
            "Bachelor of Pharmacy (B.Pharm)",
            "Bachelor of Physiotherapy (BPT)",
            "Bachelor of Science (B.Sc) in Nursing, Medical Laboratory Technology, Optometry, etc.",
            "Master of Pharmacy (M.Pharm)",
            "Master of Physiotherapy (MPT)",
            "Doctor of Medicine (MD) in various specialties",
            "Master of Surgery (MS) in various specialties",
          ],
        },
        {
          name: "Management Studies:",
          list: [
            "Bachelor of Business Administration (BBA)",
            "Master of Business Administration (MBA) with specializations such as Marketing, Finance, Human Resource Management, Operations Management, etc.",
          ],
        },
        {
          name: "Pharmaceutical Sciences:",
          list: [
            "Bachelor of Pharmacy (B.Pharm)",
            "Master of Pharmacy (M.Pharm)",
          ],
        },
        {
          name: "Applied Sciences:",
          list: [
            "Bachelor of Science (B.Sc) in Chemistry, Physics, Mathematics, Biotechnology, Microbiology, etc.",
            "Master of Science (M.Sc) in Chemistry, Physics, Mathematics, Biotechnology, Microbiology, etc.",
          ],
        },
        {
          name: "Law:",
          list: ["Bachelor of Laws (LLB)", "Master of Laws (LLM)"],
        },
        {
          name: "Architecture and Planning:",
          list: [
            "Bachelor of Architecture (B.Arch)",
            "Master of Architecture (M.Arch)",
          ],
        },
        {
          name: "Design:",
          list: [
            "Bachelor of Design (B.Des) in Fashion Design, Interior Design, Visual Communication, etc.",
          ],
        },
        {
          name: "Social Work:",
          list: [
            "Bachelor of Social Work (BSW)",
            "Master of Social Work (MSW)",
          ],
        },
        {
          name: "Diploma and Certificate Courses:",
          list: [
            "Diploma and certificate courses in various fields such as Nursing, Medical Laboratory Technology, Interior Design, Fashion Design, etc.",
          ],
        },
      ],
    },
    {
      name: "SGT UNIVERSITY",
      image: sgtUnoversity,
      course: [
        {
          name: "Medical and Health Sciences:",
          list: [
            "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
            "Bachelor of Dental Surgery (BDS)",
            "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
            "Bachelor of Physiotherapy (BPT)",
            "Bachelor of Pharmacy (B.Pharm)",
            "Bachelor of Science (B.Sc) in Nursing, Medical Laboratory Technology, Optometry, etc.",
            "Master of Medicine (MD) in various specialties",
            "Master of Surgery (MS) in various specialties",
            "Master of Dental Surgery (MDS)",
            "Master of Physiotherapy (MPT)",
            "Master of Pharmacy (M.Pharm)",
            "Master of Science (M.Sc) in Medical Laboratory Technology, Nursing, etc.",
            "Doctor of Medicine (DM) in various specialties",
            "Doctor of Philosophy (Ph.D.) in Medical and Health Sciences",
          ],
        },
        {
          name: "Engineering and Technology:",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science Engineering, Mechanical Engineering, Electronics and Communication Engineering, Civil Engineering, Electrical Engineering, etc.",
            "Master of Technology (M.Tech) in Computer Science Engineering, Mechanical Engineering, Electronics and Communication Engineering, Civil Engineering, Electrical Engineering, etc.",
            "Doctor of Philosophy (Ph.D.) in Engineering and Technology",
          ],
        },
        {
          name: "Management Studies:",
          list: [
            "Bachelor of Business Administration (BBA)",
            "Master of Business Administration (MBA) with specializations such as Marketing, Finance, Human Resource Management, Operations Management, etc.",
            "Doctor of Philosophy (Ph.D.) in Management Studies",
          ],
        },
        {
          name: "Law:",
          list: [
            "Bachelor of Laws (LLB)",
            "Master of Laws (LLM)",
            "Doctor of Philosophy (Ph.D.) in Law",
          ],
        },
        {
          name: "Pharmaceutical Sciences:",
          list: [
            "Bachelor of Pharmacy (B.Pharm)",
            "Master of Pharmacy (M.Pharm)",
            "Doctor of Philosophy (Ph.D.) in Pharmaceutical Sciences",
          ],
        },
        {
          name: "Education:",
          list: [
            "Bachelor of Education (B.Ed)",
            "Master of Education (M.Ed)",
            "Doctor of Philosophy (Ph.D.) in Education",
          ],
        },
        {
          name: "Applied Sciences:",
          list: [
            "Bachelor of Science (B.Sc) in Chemistry, Physics, Mathematics, Biotechnology, Microbiology, etc.",
            "Master of Science (M.Sc) in Chemistry, Physics, Mathematics, Biotechnology, Microbiology, etc.",
            "Doctor of Philosophy (Ph.D.) in Applied Sciences",
          ],
        },
        {
          name: "Hotel Management and Catering Technology:",
          list: [
            "Bachelor of Hotel Management (BHM)",
            "Master of Hotel Management (MHM)",
          ],
        },
        {
          name: "Nursing:",
          list: [
            "Bachelor of Science (B.Sc) in Nursing",
            "Master of Science (M.Sc) in Nursing",
          ],
        },
        {
          name: "Diploma and Certificate Courses:",
          list: [
            "Diploma and certificate courses in various fields such as Nursing, Medical Laboratory Technology, etc. ",
          ],
        },
      ],
    },
    {
      name: "GALGOTIAS UNIVERSITY",
      image: galgotia,
      course: [
        {
          name: "Engineering and Technology:",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science Engineering, Mechanical Engineering, Electronics and Communication Engineering, Civil Engineering, Electrical Engineering, etc.",
            "Master of Technology (M.Tech) in Computer Science Engineering, Mechanical Engineering, Electronics and Communication Engineering, Civil Engineering, Electrical Engineering, etc.",
            "Doctor of Philosophy (Ph.D.) in Engineering and Technology",
          ],
        },
        {
          name: "Management Studies:",
          list: [
            "Bachelor of Business Administration (BBA)",
            "Master of Business Administration (MBA) with specializations such as Marketing, Finance, Human Resource Management, Operations Management, etc.",
            "Doctor of Philosophy (Ph.D.) in Management Studies",
          ],
        },
        {
          name: "Computer Applications:",
          list: [
            "Bachelor of Computer Applications (BCA)",
            "Master of Computer Applications (MCA)",
            "Doctor of Philosophy (Ph.D.) in Computer Applications",
          ],
        },
        {
          name: "Law:",
          list: [
            "Bachelor of Laws (LLB)",
            "Master of Laws (LLM)",
            "Doctor of Philosophy (Ph.D.) in Law",
          ],
        },
        {
          name: "Pharmaceutical Sciences:",
          list: [
            "Bachelor of Pharmacy (B.Pharm)",
            "Master of Pharmacy (M.Pharm)",
            "Doctor of Philosophy (Ph.D.) in Pharmaceutical Sciences",
          ],
        },
        {
          name: "Applied Sciences:",
          list: [
            "Bachelor of Science (B.Sc) in Chemistry, Physics, Mathematics, Biotechnology, Microbiology, etc.",
            "Master of Science (M.Sc) in Chemistry, Physics, Mathematics, Biotechnology, Microbiology, etc.",
            "Doctor of Philosophy (Ph.D.) in Applied Sciences",
          ],
        },
        {
          name: "Business Studies:",
          list: ["Bachelor of Commerce (B.Com)", "Master of Commerce (M.Com)"],
        },
        {
          name: "Architecture and Planning:",
          list: [
            "Bachelor of Architecture (B.Arch)",
            "Master of Architecture (M.Arch)",
          ],
        },
        {
          name: "Mass Communication and Journalism:",
          list: [
            "Bachelor of Arts (BA) in Journalism and Mass Communication",
            "Master of Arts (MA) in Journalism and Mass Communication",
          ],
        },
        {
          name: "Hospitality and Tourism Management:",
          list: [
            "Bachelor of Hotel Management and Catering Technology (BHMCT)",
            "Master of Hotel Management and Catering Technology (MHMCT)",
          ],
        },
        {
          name: "Education:",
          list: ["Bachelor of Education (B.Ed)", "Master of Education (M.Ed)"],
        },
        {
          name: "Design:",
          list: [
            "Bachelor of Design (B.Des) in Fashion Design, Interior Design, Product Design, etc.",
          ],
        },
        {
          name: "Nursing:",
          list: [
            "Bachelor of Science (B.Sc) in Nursing",
            "Master of Science (M.Sc) in Nursing",
          ],
        },
        {
          name: "Pharmacy:",
          list: ["Diploma in Pharmacy (D.Pharm)"],
        },
        {
          name: "Diploma and Certificate Courses:",
          list: [
            "Diploma and certificate courses in various fields such as Digital Marketing, Event Management, Animation, etc.",
          ],
        },
      ],
    },
    {
      name: "SHIVNADAR UNIVERSITY",
      image: shivNadar,
      course: [
        {
          name: "Undergraduate Programs:",
          list: [
            "Bachelor of Technology (B.Tech) in Computer Science and Engineering, Electronics and Communication Engineering, Mechanical Engineering, Civil Engineering, etc.",
            "Bachelor of Science (B.Sc) in Physics, Chemistry, Mathematics, Economics, Biotechnology, etc.",
            "Bachelor of Arts (B.A) in Humanities and Social Sciences, English, History, Sociology, etc.",
            "Bachelor of Management Studies (BMS)",
            "Integrated Bachelor of Science - Master of Science (B.Sc-M.Sc) in Economics, Mathematics, etc.",
            "Integrated Bachelor of Arts - Master of Arts (B.A-M.A) in English, Sociology, etc.",
            "Integrated Bachelor of Technology - Master of Technology (B.Tech-M.Tech)",
          ],
        },
        {
          name: "Postgraduate Programs:",
          list: [
            "Master of Technology (M.Tech) in Computer Science and Engineering, Electronics and Communication Engineering, Mechanical Engineering, Civil Engineering, etc.",
            "Master of Science (M.Sc) in Physics, Chemistry, Mathematics, Economics, Biotechnology, etc.",
            "Master of Arts (M.A) in Humanities and Social Sciences, English, History, Sociology, etc.",
            "Master of Business Administration (MBA)",
            "Master of Fine Arts (MFA) in Visual Arts",
            "Master of Design (M.Des) in Industrial Design",
            "Master of Public Health (MPH)",
            "Master of Arts in Education (MA Education)",
          ],
        },
      ],
    },
  ];
  return (
    <main className="top common-application">
      <div className="group">
        <div className="text">
          <h1>
            1 Single form for access to all{" "}
            <span style={{ color: "var(--accent)" }}>
              Uniscaler Applications
            </span>{" "}
            all in one place
          </h1>
        </div>
        <div className="img">
          <img src={CPA} alt="cpa" />
        </div>
      </div>
      <section className="form-area">
        <h2>Apply for Admission for any course from Uniscaler</h2>
        <div className="card-lists">
          {ApplicationList.map((item) => (
            <div className="list-card" key={item.name}>
              <div className="card-header">
                <div className="img">
                  <img src={item.image} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
              </div>
              <div className="btn-grp">
                <h4>
                  Course Offered :{" "}
                  {item.course.map((course) => course.list).flat().length}
                </h4>
                <span>499rs.</span>
              </div>
              <Button
                text="Apply in one click"
                link={`/caf-details/${item.name
                  .toLocaleLowerCase()
                  .replace(" ", "-")}`}
                state={item}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CommonApplication;
